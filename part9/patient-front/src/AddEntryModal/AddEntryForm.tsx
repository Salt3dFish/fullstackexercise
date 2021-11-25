/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Field, Formik, Form } from 'formik';
import { DiagnosisSelection, TextField, NumberField } from '../AddPatientModal/FormField';
import { SelectField } from './FormField';
import { Grid, Button, Segment } from 'semantic-ui-react';
import { EntryType, Patient } from '../types';
import { useStateValue } from '../state';
import { addPatientEntry } from '../state';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

const AddEntryForm = ({ onSubmit, onCancel }: { onSubmit: any, onCancel: any }) => {
  const [{ diagnoses }, dispatch] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: '2015-01-02',
        description: 'Yearly control visit. Cholesterol levels back to normal.',
        specialist: 'MD House',
        type: EntryType.HealthCheck,
        healthCheckRating: 0,
        employerName: '',
        sickLeave: { startDate: '', endDate: '' },
        discharge: { date: '', criteria: '' },
      }}
      onSubmit={async (values) => {
        const id: string = onSubmit();
        let valuesToPost;
        switch (values.type) {
          case EntryType.HealthCheck: {
            const { employerName, discharge, sickLeave, ...rest } = values;
            valuesToPost = rest;
            break;
          }
          case EntryType.OccupationalHealthcare: {
            if (values.sickLeave.startDate && values.sickLeave.endDate) {
              const { healthCheckRating, discharge, ...rest } = values;
              valuesToPost = rest;
            } else {
              const { healthCheckRating, discharge, sickLeave, ...rest } = values;
              valuesToPost = rest;
            }
            break;
          }
          case EntryType.Hospital: {
            const { healthCheckRating, employerName, sickLeave, ...rest } = values;
            valuesToPost = rest;
            break;
          }
          default: {
            const rest = values;
            valuesToPost = rest;
            break;
          }
        }
        console.log(valuesToPost);
        try {
          const { data: savedPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`, valuesToPost);
          // console.log(savedPatient);
          dispatch(addPatientEntry(savedPatient, id));

        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
        }
      }}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        
        if (values.type===EntryType.HealthCheck && typeof values.healthCheckRating === 'string') {
          errors.healthCheckRating = requiredError;
        }
        if (values.type===EntryType.OccupationalHealthcare && !values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ values, isValid, dirty,setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Date'
              placeholder='Date'
              name='date'
              component={TextField} />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField} />
            <SelectField
              label='Type'
              name='type'
              options={Object.values(EntryType).map(
                e => ({ value: e, label: e })
              )} />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)} />
            {values.type === EntryType.HealthCheck
              && <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3} />}
            {values.type === EntryType.OccupationalHealthcare
              && (
                <>
                  <Field
                    label='employerName'
                    placeholder='Employer Name'
                    name='employerName'
                    component={TextField} />
                  <Grid columns='equal'>
                    <Grid.Row>
                      <Grid.Column>
                        <Segment>
                          <Field
                            label='startDate'
                            placeholder='YYYY-MM-DD'
                            name='sickLeave.startDate'
                            component={TextField} />
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment>
                          <Field
                            label='endDate'
                            placeholder='YYYY-MM-DD'
                            name='sickLeave.endDate'
                            component={TextField} />
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </>
              )
            }
            {values.type === EntryType.Hospital
              &&
              <Grid columns='equal'>
                <Grid.Row>
                  <Grid.Column>
                    <Segment>
                      <Field
                        label='discharge date'
                        placeholder='YYYY-MM-DD'
                        name='discharge.date'
                        component={TextField}
                        validate={
                          (value: string | undefined) => {
                            if (!value)
                              return 'Field Required';
                          }
                        }
                      />
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment>
                      <Field
                        label='criteria'
                        placeholder='criteria'
                        name='discharge.criteria'
                        component={TextField}
                        validate={
                          (value: string | undefined) => {
                            if (!value)
                              return 'Field Required';
                          }
                        }
                      />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            }
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button type='submit' color='green' disabled={!dirty || !isValid} >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};


export default AddEntryForm;

export { };