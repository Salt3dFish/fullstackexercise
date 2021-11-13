import { Patient, NewPatient } from "../types";
import patients from "../data/patients";
const { v4: uuid } = require('uuid')

const getDetailedPatients = (): Array<Patient> => {
  return patients
}

const getNonSensitivePatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(
    p => {
      const { ssn, ...patient } = { ...p }
      return patient
    }
  )
}

const addPatient = (obj: NewPatient): Patient => {
  return {
    ...obj,
    id: uuid()
  }
}

export default {
  getDetailedPatients,
  getNonSensitivePatients,
  addPatient,
}