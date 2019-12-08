import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1.5em 0'
  },
  messageInput: {
    width: '100%'
  }
}));

export function MessageInput({ onMessage }) {
  const classes = useStyles({});

  return (
    <Formik
      validationSchema={Yup.object({
        message: Yup.string().required('Required')
      })}
      initialValues={{ message: '' }}
      onSubmit={({ message }, { resetForm }) => {
        onMessage(message);
        resetForm();
      }}
    >
      {({ values: { message }, handleChange }) => (
        <Form className={classes.form}>
          <TextField
            autoFocus
            autoComplete="off"
            name="message"
            variant="outlined"
            placeholder="Text Message"
            onChange={handleChange}
            value={message}
            className={classes.messageInput}
          />
        </Form>
      )}
    </Formik>
  );
}
