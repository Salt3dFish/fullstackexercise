/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'formik';
import { EntryType } from '../types';

export type EntryTypeOption = {
  value: EntryType,
  label: string
};

type SelectFieldProps = {
  name: string,
  label: string,
  options: EntryTypeOption[]
};

export const SelectField = ({
  name,
  label,
  options
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as='select' name={name} className='ui dropdown'>
      {options.map(o => (
        <option key={o.value} value={o.value}>
          {o.label || o.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

