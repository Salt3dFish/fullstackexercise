/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button, Container, Header, Icon, List } from "semantic-ui-react";
import { Patient, Entry, Diagnosis, HealthCheckRating } from "../types";
import { useParams } from "react-router";
import { setDiagnoses, updatePatientInfo, useStateValue } from "../state";
import axios from "axios";
import AddEntryModal from "../AddEntryModal";


const baseUrl = 'http://localhost:3001/api';

const HeartIcon: React.FC<{ healthCheckRating: HealthCheckRating }> = ({ healthCheckRating }) => {
  switch (healthCheckRating) {
    case 0:
      return <Icon name='heart' color='green' />;
    case 1:
      return <Icon name='heart' color='yellow' />;
    case 2:
      return <Icon name='heart' color='olive' />;
    case 3:
      return <Icon name='heart' color='grey' />;
    default:
      return <Icon name='heart' />;
  }
};

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <div>
      <List.Item>
        <List.Content>
          <List.Header as='h3'>
            {entry.date}
            <Icon name='hospital' />
          </List.Header>
          <List.Description>
            {entry.description}
          </List.Description>
        </List.Content>
      </List.Item>
    </div>
  );
};

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.type === 'OccupationalHealthcare') {
    return (
      <div>
        <List.Item>
          <List.Content>
            <List.Header as='h3'>
              {entry.date}{'   '}
              <Icon name='stethoscope' />
              {entry.employerName}
            </List.Header>
            <List.Description>
              {entry.description}
            </List.Description>
          </List.Content>
        </List.Item>
      </div>
    );
  } else {
    return <div>FUCK</div>;
  }
};

const HealThCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.type === 'HealthCheck') {
    return (
      <div>
        <List.Item>
          <List.Content>
            <List.Header as='h3'>
              {entry.date}
              <Icon name='doctor' />
            </List.Header>
            <List.Description>
              {entry.description}
              <br></br>
              <HeartIcon healthCheckRating={entry.healthCheckRating} />
            </List.Description>
          </List.Content>
        </List.Item>
      </div>
    );
  } else {
    return <div>FUCK</div>;
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'HealthCheck':
      return <HealThCheckEntry entry={entry} />;
    default:
      return (
        <div>
          <Header as='h3'>Unknown type</Header>
        </div>
      );
  }
};

const SingleEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      {entry.description}
      <div>
        {entry.diagnosisCodes
          ? (
            <List>
              {entry.diagnosisCodes.map(
                c => <li key={c}>{c} {diagnoses[c]['name']}</li>
              )}
            </List>
          )
          : null}
      </div>
    </div>
  );
};

const PatientEntries: React.FC<{ entries: Entry[] }> = ({ entries }) => {
  return (
    <div>
      <Header as='h3'>entries</Header>
      <div>
        {entries.map(
          e => <EntryDetails entry={e} key={e.id} />
        )}
      </div>
    </div>
  );
};


const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patientsInfo }, dispatch] = useStateValue();
  const [modalOpen, setModal] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const patient = patientsInfo[id];

  const onSubmit = (id:string) => {
    console.log('submitting ...');
    closeModal();
    return id;
  };
  const closeModal = () => {
    setModal(false);
    setError(undefined);
  };
  const openModal=()=>{
    setModal(true);
  };



  const getDiagnoses = async () => {
    try {
      const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(`${baseUrl}/diagnoses`);
      // console.log(diagnosesFromApi);
      dispatch(setDiagnoses(diagnosesFromApi));
    } catch (e) {
      console.error(e);
    }
  };

  const getPatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${baseUrl}/patients/${id}`
      );
      // console.log(patientFromApi);
      dispatch(updatePatientInfo(patientFromApi));
    } catch (e) {
      console.error(e);
    }
  };


  if (patient === undefined) {
    console.log('request new Patient now...');
    void getPatient();
  }

  if (!patient) {
    return (
      <div>
        invalid id...
      </div>
    );
  }

  return (
    <div>
      <Container>
        <Header as='h2'>
          {patient.name}
          {patient.gender === 'male'
            ? <Icon name='male' />
            : <Icon name='female' />}
        </Header>
        <div>
          ssn:{patient.ssn}
        </div>
        <div>
          occupation:{patient.occupation}
        </div>
        <br></br>
        <br></br>
        <PatientEntries entries={patient.entries} />
        <AddEntryModal
          modalOpen={modalOpen}
          onClose={closeModal}
          onSubmit={()=>onSubmit(id)}
          error={error} />
        <Button onClick={openModal}>Add New Entry</Button>
      </Container>
    </div>
  );
};

export default PatientInfo;