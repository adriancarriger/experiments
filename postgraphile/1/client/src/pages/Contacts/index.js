import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { gql } from 'apollo-boost';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import { EditDialog } from './EditDialog';
import { ContactRow } from './ContactRow';

const GET_CONTACTS = gql`
  query($condition: ContactCondition) {
    contacts(last: 10, condition: $condition) {
      edges {
        node {
          id
          lastName
          firstName
          contactPhones {
            edges {
              node {
                id
                phoneNumber
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_CONTACT = gql`
  mutation($input: CreateContactInput!) {
    __typename
    createContact(input: $input) {
      contact {
        id
        firstName
        lastName
        contactPhones {
          edges {
            node {
              id
              phoneNumber
            }
          }
        }
      }
    }
  }
`;

const UPDATE_CONTACT = gql`
  mutation($input: UpdateContactInput!) {
    __typename
    updateContact(input: $input) {
      __typename
      contact {
        __typename
        id
        firstName
        lastName
        contactPhones {
          edges {
            node {
              id
              phoneNumber
            }
          }
        }
      }
    }
  }
`;

const DELETE_CONTACT = gql`
  mutation($input: DeleteContactInput!) {
    __typename
    deleteContact(input: $input) {
      __typename
      contact {
        __typename
        id
      }
    }
  }
`;

const mutations = {
  GET_CONTACTS,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  CREATE_CONTACT
};

const useStyles = makeStyles(theme => ({ table: { minWidth: 650 } }));

const defaultModalState = {
  id: undefined,
  firstName: '',
  lastName: '',
  phones: []
};

export function Contacts({ modalOpen, setModalOpen }) {
  const client = useApolloClient();

  const [editable, setEditable] = useState(defaultModalState);

  const { loading, error, data } = useQuery(GET_CONTACTS, {
    variables: { condition: { userId: 1 } }
  });

  const handleClose = () => {
    setModalOpen(false);
    setEditable(defaultModalState);
  };

  const handleEdit = contact => {
    setEditable(contact);
    setModalOpen(true);
  };

  const classes = useStyles({});

  const handleSubmit = inputs => {
    const type = mutationType(inputs);
    console.log('asdf', mutations);
    client.mutate({
      mutation: mutations[`${type.toUpperCase()}_CONTACT`],
      variables: createVariables(inputs, type),
      optimisticResponse: createOptimisticResponse(inputs, type),
      update: updateContactMutation
    });
  };

  const handleDelete = inputs => {
    const type = mutationType(inputs);
    console.log('input', inputs);
    client.mutate({
      mutation: mutations[`${type.toUpperCase()}_CONTACT`],
      variables: createVariables(inputs, type),
      optimisticResponse: createOptimisticDelete(inputs, type),
      update: updateContactMutation
    });
  };

  if (loading) {
    return <div>loading…</div>;
  }

  if (error) {
    return <div>error => {JSON.stringify(error)}</div>;
  }

  return (
    <div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Labels</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.contacts.edges.map(({ node: contact }) => {
            return (
              <ContactRow
                key={contact.id}
                contact={contact}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            );
          })}
        </TableBody>
      </Table>

      <div>
        <EditDialog
          modalOpen={modalOpen}
          onSubmit={handleSubmit}
          onClose={handleClose}
          editable={editable}
          setEditable={setEditable}
        />
      </div>
    </div>
  );
}

function updateContactMutation(store, { data }) {
  const contactData = store.readQuery({
    query: GET_CONTACTS,
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
    query: GET_CONTACTS,
    variables: { condition: { userId: 1 } },
    data: contactData
  });
}

function mutationType(inputs) {
  if (inputs.id) {
    return Object.keys(inputs).length === 1 ? 'Delete' : 'Update';
  }

  return 'Create';
}

function createVariables(inputs, type) {
  if (type === 'Delete') {
    return { input: { id: inputs.id } };
  }

  return {
    input: {
      id: inputs.id,
      [inputs.id ? 'patch' : 'contact']: {
        userId: 1,
        firstName: inputs.firstName,
        lastName: inputs.lastName
        // contactPhonesUsingId: {
        //   create: { phoneNumber: '8053228444' },
        //   deleteById: { id: 10 },
        //   updateById: { patch: { phoneNumber: '6053228444' }, id: 10 }
        // }
      }
    }
  };
}

function createOptimisticDelete({ id }, type) {
  return {
    __typename: 'Mutation',
    deleteContact: {
      __typename: 'DeleteContactPayload',
      contact: { __typename: 'Contact', id }
    }
  };
}

function createOptimisticResponse(inputs, type) {
  const contactPhones = inputs.contactPhones || {
    __typename: 'ContactPhonesConnection',
    edges: []
  };

  const result = {
    __typename: 'Mutation',
    [`${type.toLowerCase()}Contact`]: {
      __typename: `${type}ContactPayload`,
      contact: {
        __typename: 'Contact',
        id: inputs.id || -Math.random(),
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        contactPhones
      }
    }
  };

  if (type === 'Create') {
    result.id = inputs.id;
  }

  return result;
}
