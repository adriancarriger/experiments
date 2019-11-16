import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 240
  }
}));

export function EditDialog({
  modalOpen,
  onSubmit,
  editable,
  setEditable,
  onClose
}) {
  const classes = useStyles({});

  const handleChange = name => event => {
    setEditable({ ...editable, [name]: event.target.value });
  };

  const handlePhoneChange = (index, newNumber) => {
    const newPhones = [...(editable.phones || [])];
    newPhones[index].phoneNumber = newNumber;

    setEditable({
      ...editable,
      phones: newPhones
    });
  };

  const handleNewPhone = () =>
    setEditable({
      ...editable,
      phones: [...(editable.phones || []), { phoneNumber: '' }]
    });

  return (
    <Dialog aria-labelledby="dialog-title" open={modalOpen} onClose={onClose}>
      <form
        onSubmit={event => {
          event.preventDefault();
          onClose();
          onSubmit({ ...editable });
        }}
      >
        <DialogContent dividers>
          <TextField
            autoFocus
            className={classes.textField}
            label="First name"
            value={editable.firstName || ''}
            onChange={handleChange('firstName')}
            margin="normal"
            required
          />
          <TextField
            className={classes.textField}
            label="Last name"
            value={editable.lastName || ''}
            onChange={handleChange('lastName')}
            margin="normal"
            required
          />
          {editable.phones &&
            editable.phones.map((item, index) => {
              return (
                <TextField
                  autoFocus
                  key={index}
                  className={classes.textField}
                  label={`Phone`}
                  value={item.phoneNumber}
                  onChange={event =>
                    handlePhoneChange(index, event.target.value)
                  }
                  margin="normal"
                />
              );
            })}
          <Button color="primary" onClick={handleNewPhone}>
            New phone
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
