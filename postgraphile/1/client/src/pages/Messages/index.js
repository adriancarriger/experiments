import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { useQuery } from '@apollo/react-hooks';

import { GET_THREADS } from './messages.graphql';
import { ThreadRow } from './MessageRow';

const useStyles = makeStyles(() => ({ table: { minWidth: 650 } }));

export function Messages() {
  const classes = useStyles({});

  const { loading, error, data } = useQuery(GET_THREADS, {
    variables: { condition: { userId: 1 } }
  });

  if (loading) {
    return <div>loading…</div>;
  }

  if (error) {
    return <div>error => {JSON.stringify(error)}</div>;
  }

  console.log(data);

  return (
    <div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Message</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.threads.edges.map(({ node: thread }) => (
            <ThreadRow key={thread.id} thread={thread} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
