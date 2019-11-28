import React from 'react';
import { FieldArray as FormikFieldArray } from 'formik';

export default function FieldArray({ values, name, items }) {
  return (
    <FormikFieldArray
      name={name}
      render={arrayHelpers => (
        <div>
          {values[name] &&
            values[name].map((_, index) => (
              <div key={index}>
                <button
                  type="button"
                  onClick={() => arrayHelpers.remove(index)}
                >
                  -
                </button>
                {items.map(({ key, as }) => {
                  const ItemComponent = as;

                  return (
                    <ItemComponent
                      key={key}
                      name={`${name}[${index}].${key}`}
                    />
                  );
                })}
              </div>
            ))}
          <button
            type="button"
            onClick={() => arrayHelpers.push({ phoneNumber: '' })}
          >
            +
          </button>
        </div>
      )}
    />
  );
}
