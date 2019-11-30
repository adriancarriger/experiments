import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { FieldArray, TextField } from '../../components/formik';

export function EditDialog({ modalOpen, onSubmit, initialValues, onClose }) {
  return (
    <Dialog aria-labelledby="dialog-title" open={modalOpen} onClose={onClose}>
      <DialogContent dividers>
        <Formik
          validationSchema={Yup.object({
            firstName: Yup.string().required('Required'),
            lastName: Yup.string().required('Required')
          })}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <TextField autoFocus label="First name" name="firstName" />
              <TextField label="Last name" name="lastName" />
              <FieldArray
                values={values}
                name="phones"
                items={[{ key: 'phoneNumber', as: TextField, label: 'Phone' }]}
              />
              <DialogActions>
                <Button
                  onClick={onClose}
                  color="primary"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
