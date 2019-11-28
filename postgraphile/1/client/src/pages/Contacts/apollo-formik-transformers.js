import { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

const defaultInitialValues = {
  id: undefined,
  firstName: '',
  lastName: '',
  contactPhones: { edges: [] }
};

export function useResource(resource, { queries, mutations }) {
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
      variables: resourceVariables(formikInput, formValues, type),
      optimisticResponse: optimisticResponse(formValues, type),
      update: updateResourceStore(queries)
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

function updateResourceStore(queries) {
  return (store, { data }) => {
    const contactData = store.readQuery({
      query: queries.GET_CONTACTS,
      variables: { condition: { userId: 1 } }
    });

    if ('updateContact' in data) {
      const index = contactData.contacts.edges.findIndex(
        ({ node }) => node.id === data.updateContact.contact.id
      );
      contactData[index] = data.updateContact;
    } else if ('createContact' in data) {
      contactData.contacts.edges.push({
        __typename: 'ContactsEdge',
        node: {
          ...data.createContact.contact
        }
      });
    } else if ('deleteContact' in data) {
      const index = contactData.contacts.edges.findIndex(
        ({ node }) => node.id === data.deleteContact.contact.id
      );

      if (index >= 0) {
        contactData.contacts.edges.splice(index, 1);
      }
    }

    store.writeQuery({
      query: queries.GET_CONTACTS,
      variables: { condition: { userId: 1 } },
      data: contactData
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

function resourceVariables(initialValues, { id, ...currentValues }, type) {
  if (type === 'Delete') {
    return { input: { id } };
  }

  return {
    input: {
      id,
      [id ? 'patch' : 'contact']: Object.keys(currentValues).reduce(
        (mutation, key) => {
          if (Array.isArray(currentValues[key])) {
            mutation.contactPhonesUsingId = createArrayMutations(
              initialValues[key],
              currentValues[key]
            );
          } else {
            mutation[key] = currentValues[key];
          }

          return mutation;
        },
        { contactPhonesUsingId: {}, userId: 1 }
      )
    }
  };
}

function optimisticResponse({ id = -Math.random(), ...rest }, type) {
  const defaultValues = {
    contactPhones: {
      __typename: 'ContactPhonesConnection',
      edges: []
    }
  };

  const result = {
    __typename: 'Mutation',
    id: undefined,
    [`${type.toLowerCase()}Contact`]: {
      __typename: `${type}ContactPayload`,
      contact: {
        __typename: 'Contact',
        id,
        ...Object.keys(rest).reduce((previous, key) => {
          if (Array.isArray(rest[key])) {
            previous.contactPhones.edges = rest[key].map(
              ({ id = -Math.random(), ...item }) => ({
                __typename: 'ContactPhonesEdge',
                node: { __typename: 'ContactPhone', id, ...item }
              })
            );
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

// Move this into its own file…
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
