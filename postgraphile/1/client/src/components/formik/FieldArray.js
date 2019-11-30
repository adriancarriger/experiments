import React from 'react';
import { FieldArray as FormikFieldArray } from 'formik';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  appBar: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export default function FieldArray({ values, name, items }) {
  const classes = useStyles({});
  const newItem = items.reduce(
    (previous, { key }) => ({ ...previous, [key]: '' }),
    {}
  );

  return (
    <FormikFieldArray
      name={name}
      render={arrayHelpers => (
        <div>
          {values[name] &&
            values[name].map((_, index) => (
              <div className={classes.appBar} key={index}>
                <Button
                  onClick={() => arrayHelpers.remove(index)}
                  size="small"
                  aria-label="remove"
                >
                  <CloseIcon />
                </Button>
                {items.map(({ key, as, ...props }) => {
                  const ItemComponent = as;

                  return (
                    <ItemComponent
                      key={key}
                      name={`${name}[${index}].${key}`}
                      {...props}
                    />
                  );
                })}
              </div>
            ))}
          <Button onClick={() => arrayHelpers.push(newItem)}>
            <AddIcon /> Add phone
          </Button>
        </div>
      )}
    />
  );
}
