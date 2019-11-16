import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { EditDialog } from './EditDialog';
import { ContactRow } from './ContactRow';

const GET_CONTACTS = gql`
  query($condition: ContactCondition) {
    contacts(last: 10, condition: $condition) {
      edges {
        node {
          lastName
          firstName
          id
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

const ADD_CONTACT = gql`
  mutation($input: CreateContactInput!) {
    __typename
    createContact(input: $input) {
      contact {
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
        firstName
        lastName
        id
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
    deleteContact(input: $input) {
      deletedContactNodeId
      contact {
        id
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650
  }
}));

const defaultModalState = {
  id: undefined,
  firstName: '',
  lastName: '',
  phones: []
};

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

export function Contacts({ modalOpen, setModalOpen }) {
  const [mutate] = useMutation(UPDATE_CONTACT);

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

  const handleSubmit = async inputs => {
    console.log('inputs', inputs);
    // // insert
    const input = {
      contact: {
        userId: 1,
        firstName: inputs.firstName,
        lastName: inputs.lastName,
        contactPhonesUsingId: {
          create: inputs.phones
        }
      }
    };

    await client.mutate({
      mutation: ADD_CONTACT,
      variables: { input }
    });

    const myFakeId = -(Math.random() * 1000);

    // mutate({
    //   variables: {
    //     input: {
    //       id: inputs.id,
    //       patch: {
    //         firstName: inputs.firstName,
    //         lastName: inputs.lastName
    //         // contactPhonesUsingId: {
    //         //   create: { phoneNumber: '8053228444' },
    //         //   deleteById: { id: 10 },
    //         //   updateById: { patch: { phoneNumber: '6053228444' }, id: 10 }
    //         // }
    //       }
    //     }
    //   },
    //   optimisticResponse: {
    //     __typename: 'Mutation',
    //     updateContact: {
    //       __typename: 'UpdateContactPayload',
    //       contact: {
    //         __typename: 'Contact',
    //         firstName: inputs.firstName,
    //         lastName: inputs.lastName,
    //         id: inputs.id,
    //         contactPhones: inputs.contactPhones
    //       }
    //     }
    //   },
    //   update: (store, { data: { updateContact } }) => {
    //     console.log('updateContact', updateContact);
    //     const contactData = store.readQuery({
    //       query: GET_CONTACTS,
    //       variables: { condition: { userId: 1 } }
    //     });

    //     const index = contactData.contacts.edges.findIndex(
    //       ({ node }) => node.id === updateContact.contact.id
    //     );
    //     contactData[index] = updateContact;

    //     store.writeQuery({
    //       query: GET_CONTACTS,
    //       variables: { condition: { userId: 1 } },
    //       data: contactData
    //     });
    //   }
    // });
  };

  const handleDelete = async ({ id }) => {
    await client.mutate({
      mutation: DELETE_CONTACT,
      variables: { input: { id } },
      update(store, { data: { deleteContact } }) {
        console.log('hi', deleteContact.contact.id);
      }
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
