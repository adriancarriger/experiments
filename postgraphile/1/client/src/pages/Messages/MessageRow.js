import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  row: {
    cursor: 'pointer',
    '&:not(:hover)': {
      '& button': {
        visibility: 'hidden'
      }
    },
    '& td:last-of-type': {
      minWidth: '130px'
    }
  },
  bodyCell: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '38vw'
  }
}));

const ThreadRowComponent = ({ thread, history }) => {
  const { body } = thread.messages.nodes[0];

  const threadRoute = `/messages/${thread.id}`;
  const viewThread = () => history.push(threadRoute);

  const classes = useStyles({});

  return (
    <TableRow hover className={classes.row}>
      <TableCell onClick={viewThread}>{thread.lastMessage}</TableCell>
      <TableCell onClick={viewThread}>{contactReadable(thread)}</TableCell>
      <TableCell onClick={viewThread} className={classes.bodyCell}>
        {body}
      </TableCell>
      <TableCell align="right">
        <Tooltip enterDelay={200} title="Edit contact">
          <Link to={threadRoute}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {popupState => (
            <React.Fragment>
              <Tooltip enterDelay={200} title="More actions">
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  {...bindTrigger(popupState)}
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              <Menu {...bindMenu(popupState)}>
                <MenuItem
                  onClick={() => {
                    console.log('Delete something?');
                    popupState.close();
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  Delete
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </TableCell>
    </TableRow>
  );
};

function contactReadable(thread) {
  if (thread.contactThreads.totalCount === 0) {
    const { direction, toNumber, fromNumber } = thread.messages.nodes[0];

    return direction === 'inbound' ? fromNumber : toNumber;
  }

  const { firstName, lastName } = thread.contactThreads.nodes[0].contact;

  let readable = `${firstName} ${lastName}`;

  if (thread.contactThreads.totalCount > 1) {
    readable += ` and ${thread.contactThreads.totalCount - 1} others`;
  }

  return readable;
}

export const ThreadRow = withRouter(ThreadRowComponent);
