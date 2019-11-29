import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { useQuery } from '@apollo/react-hooks';

import { EditDialog } from './EditDialog';
import { ContactRow } from './ContactRow';
import graphql from './contacts.graphql';
import { useResource } from '../../hooks/use-resource';
import { useModal } from '../../hooks/use-modal';

const useStyles = makeStyles(() => ({ table: { minWidth: 650 } }));

const defaultInitialValues = {
  id: undefined,
  firstName: '',
  lastName: '',
  contactPhones: { edges: [] }
};

export function Contacts() {
  const classes = useStyles({});

  const { editModalOpen, setModal } = useModal();

  const { loading, error, data } = useQuery(graphql.queries.GET_CONTACTS, {
    variables: { condition: { userId: 1 } }
  });

  const { formikInput, setValuesFromApollo, mutateFromFormik } = useResource(
    'Contact',
    graphql,
    defaultInitialValues
  );

  const handleClose = () => {
    setModal(false);
    setValuesFromApollo();
  };

  const createMutation = formValues => {
    handleClose();
    mutateFromFormik(formValues);
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
                handleEdit={contact => {
                  setValuesFromApollo(contact);
                  setModal(true);
                }}
                handleDelete={createMutation}
              />
            );
          })}
        </TableBody>
      </Table>

      <div>
        <EditDialog
          modalOpen={editModalOpen}
          onSubmit={createMutation}
          onClose={handleClose}
          initialValues={formikInput}
        />
      </div>
    </div>
  );
}
