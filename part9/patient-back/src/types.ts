export enum gender {
  Male = 'male',
  Female = 'female'
}


export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: gender;
  occupation: string;
}

export interface Diagnose {
  code: string,
  name: string,
  latin?: string
}

export type NewPatient = Omit<Patient, 'id'>