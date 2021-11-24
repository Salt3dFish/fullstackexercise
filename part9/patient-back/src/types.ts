export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum EntryTypes {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;


export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryTypes.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryTypes.OccupationalHealthcare;
  employerName: string;
  sickLeave?: { startDate: string; endDate: string; }
}

interface HospitalEntry extends BaseEntry {
  type: EntryTypes.Hospital;
  discharge: { date: string; criteria: string; }
}

export type Entry = HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export type NewPatient = UnionOmit<Patient, 'id'>
export type PublicPatient = UnionOmit<Patient, 'ssn' | 'entries'>
export type NewEntry = UnionOmit<Entry, 'id'>