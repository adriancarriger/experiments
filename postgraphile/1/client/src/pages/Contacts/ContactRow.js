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

const useStyles = makeStyles(theme => ({
  row: {
    '&:not(:hover)': {
      '& button': {
        visibility: 'hidden'
      }
    }
  }
}));

export function ContactRow({ contact, handleEdit, handleDelete }) {
  const firstPhone = contact.contactPhones.edges[0];
  const editContact = () => handleEdit(contact);
  const classes = useStyles({});

  return (
    <TableRow hover className={classes.row}>
      <TableCell onClick={editContact}>
        {contact.firstName} {contact.lastName}
      </TableCell>
      <TableCell onClick={editContact}>
        {firstPhone && firstPhone.node.phoneNumber}
      </TableCell>
      <TableCell onClick={editContact}></TableCell>
      <TableCell onClick={editContact}></TableCell>
      <TableCell align="right">
        <Tooltip enterDelay={200} title="Edit contact">
          <IconButton onClick={editContact}>
            <EditIcon />
          </IconButton>
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
                    handleDelete({ id: contact.id });
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
}
