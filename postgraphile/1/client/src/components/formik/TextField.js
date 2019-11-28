import React from 'react';
import { TextField as TextFieldUi } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { Field } from 'formik';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 240
  }
}));

export default function TextField(props) {
  const classes = useStyles({});

  return (
    <Field
      margin="normal"
      className={classes.textField}
      component={TextFieldUi}
      {...props}
    />
  );
}
