import { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

export function useResource(
  resource,
  { queries, mutations },
  defaultInitialValues
) {
  const client = useApolloClient();

  const [formikInput, setInitialValues] = useState(
    mapGraphqlToLocalState(defaultInitialValues, resource)
  );

  const setValuesFromApollo = (graphqlInput = defaultInitialValues) => {
    setInitialValues(mapGraphqlToLocalState(graphqlInput, resource));
  };

  const mutateFromFormik = formValues => {
    const type = mutationType(formValues);
    client.mutate({
      mutation: mutations[`${type.toUpperCase()}_${resource.toUpperCase()}`],
      variables: resourceVariables(formikInput, formValues, type, resource),
      optimisticResponse: optimisticResponse(formValues, type, resource),
      update: updateResourceStore(queries, resource)
    });
  };

  return { formikInput, setValuesFromApollo, mutateFromFormik };
}

function mapGraphqlToLocalState(resource, resourceName) {
  const lowerCaseResource = resourceName.toLowerCase();

  return Object.keys(resource).reduce((previous, current) => {
    if (
      resource[current] &&
      typeof resource[current] === 'object' &&
      'edges' in resource[current]
    ) {
      const arrayKey = current
        .split(lowerCaseResource)
        .join('')
        .toLowerCase();

      previous[arrayKey] = resource[current].edges.map(
        ({ node: { __typename, ...rest } }) => rest
      );
    } else if (current !== '__typename') {
      previous[current] = resource[current];
    }

    return previous;
  }, {});
}

function updateResourceStore(queries, resource) {
  const resourceLowerCase = resource.toLowerCase();
  const pluralResource = `${resource}s`;
  const pluralResourceLowerCase = pluralResource.toLowerCase();

  const query = queries[`GET_${pluralResource.toUpperCase()}`];

  return (store, { data }) => {
    const resourceData = store.readQuery({
      query,
      variables: { condition: { userId: 1 } }
    });

    if (`update${resource}` in data) {
      const index = resourceData[pluralResourceLowerCase].edges.findIndex(
        ({ node }) =>
          node.id === data[`update${resource}`][resourceLowerCase].id
      );
      resourceData[index] = data[`update${resource}`];
    } else if (`create${resource}` in data) {
      resourceData[pluralResourceLowerCase].edges.push({
        __typename: `${pluralResource}Edge`,
        node: {
          ...data[`create${resource}`][resourceLowerCase]
        }
      });
    } else if (`delete${resource}` in data) {
      const index = resourceData[pluralResourceLowerCase].edges.findIndex(
        ({ node }) =>
          node.id === data[`delete${resource}`][resourceLowerCase].id
      );

      if (index >= 0) {
        resourceData[pluralResourceLowerCase].edges.splice(index, 1);
      }
    }

    store.writeQuery({
      query,
      variables: { condition: { userId: 1 } },
      data: resourceData
    });
  };
}

function mutationType({ id, ...inputs }) {
  if (!id) {
    return 'Create';
  }

  return Object.values(inputs).filter(input =>
    Array.isArray(input) ? input.length : input
  ).length
    ? 'Update'
    : 'Delete';
}

function resourceVariables(
  initialValues,
  { id, ...currentValues },
  type,
  resource
) {
  if (type === 'Delete') {
    return { input: { id } };
  }

  const resourceLowerCase = resource.toLowerCase();

  return {
    input: {
      id,
      [id ? 'patch' : resourceLowerCase]: Object.keys(currentValues).reduce(
        (mutation, key) => {
          if (Array.isArray(currentValues[key])) {
            const itemKey = `${resourceLowerCase}${capitalize(key)}UsingId`;
            mutation[itemKey] = mutation[itemKey] || {};
            mutation[itemKey] = createArrayMutations(
              initialValues[key],
              currentValues[key]
            );
          } else {
            mutation[key] = currentValues[key];
          }

          return mutation;
        },
        { userId: 1 }
      )
    }
  };
}

function optimisticResponse({ id = -Math.random(), ...rest }, type, resource) {
  const resourceLowerCase = resource.toLowerCase();

  const defaultValues = {
    [`${resourceLowerCase}Phones`]: {
      __typename: `${resource}PhonesConnection`,
      edges: []
    }
  };

  const result = {
    __typename: 'Mutation',
    id: undefined,
    [`${type.toLowerCase()}${resource}`]: {
      __typename: `${type}${resource}Payload`,
      [resourceLowerCase]: {
        __typename: resource,
        id,
        ...Object.keys(rest).reduce((previous, key) => {
          if (Array.isArray(rest[key])) {
            const itemNamePlural = capitalize(key);
            const itemName = itemNamePlural.slice(0, -1);
            previous[`${resourceLowerCase}${itemNamePlural}`].edges = rest[
              key
            ].map(({ id = -Math.random(), ...item }) => ({
              __typename: `${resource}${itemNamePlural}Edge`,
              node: { __typename: `${resource}${itemName}`, id, ...item }
            }));
          } else {
            previous[key] = rest[key];
          }

          return previous;
        }, defaultValues)
      }
    }
  };

  if (type === 'Create') {
    result.id = id;
  }

  return result;
}

function createArrayMutations(previous, current) {
  return {
    ...current.reduce(upsertReducer(previous), {
      create: [],
      updateById: []
    }),
    deleteById: previous.reduce(deleteReducer(current), [])
  };
}

function deleteReducer(currentState) {
  const hash = hashById(currentState);

  return (previous, { id }) => (!hash[id] && [...previous, { id }]) || previous;
}

function upsertReducer(previousState) {
  const hash = hashById(previousState);

  return (previous, { id, ...rest }) => {
    if (!id) {
      previous.create.push(rest);
    } else if (Object.keys(rest).some(key => rest[key] !== hash[id][key])) {
      previous.updateById.push({ patch: rest, id });
    }

    return previous;
  };
}

function hashById(inputs) {
  return inputs.reduce((previous, { id, ...rest }) => {
    previous[id] = rest;

    return previous;
  }, {});
}

function capitalize(key) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}
