import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

import { EditDialog } from './EditDialog';
import { ContactRow } from './ContactRow';

const ADD_CONTACT = gql`
  mutation MyMutation($input: CreateContactInput!) {
    __typename
    createContact(input: $input) {
      contact {
        firstName
        lastName
        contactPhones {
          nodes {
            phoneNumber
            id
          }
        }
      }
    }
  }
`;

const UPDATE_CONTACT = gql`
  mutation MyMutation($input: CreateContactInput!) {
    __typename
    createContact(input: $input) {
      contact {
        firstName
        lastName
        # contactPhones {
        #   nodes {
        #     phoneNumber
        #     id
        #   }
        # }
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

export function Contacts({
  modalOpen,
  setModalOpen,
  contacts,
  contactMutations
}) {
  const [editable, setEditable] = useState(defaultModalState);

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
    console.log('handle submit', inputs);

    // // insert
    // const input = {
    //   contact: {
    //     userId: 1,
    //     firstName: inputs.firstName,
    //     lastName: inputs.lastName,
    //     contactPhonesUsingId: {
    //       create: inputs.phones
    //     }
    //   }
    // };

    // const result = await client.mutate({
    //   mutation: ADD_CONTACT,
    //   variables: { input }
    // });

    // update
    const input = {
      id: inputs.id,
      patch: {
        firstName: inputs.firstName,
        lastName: inputs.lastName
        // contactPhonesUsingId: {
        //   create: { phoneNumber: '8053228444' },
        //   deleteById: { id: 10 },
        //   updateById: { patch: { phoneNumber: '6053228444' }, id: 10 }
        // }
      }
    };

    // const result = await client.mutate({
    //   mutation: UPDATE_CONTACT,
    //   variables: { input }
    // });

    // console.log('result', result);
  };

  const handleDelete = async ({ id }) => {
    await client.mutate({
      mutation: DELETE_CONTACT,
      variables: { input: { id } }
    });
  };

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
          {contacts.map(({ node: contact }) => {
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
