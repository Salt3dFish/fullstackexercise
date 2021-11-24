import { Patient, NewPatient, PublicPatient, Entry, NewEntry } from "../types";
import patients from "../data/patients";
const { v4: uuid } = require('uuid')

const getDetailedPatients = (): Array<Patient> => {
  return patients
}

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(
    p => {
      const { ssn, entries, ...patient } = { ...p }
      return patient
    }
  )
}
const getAPublicPatientByID = (id: string): PublicPatient | undefined => {
  return patients.find(p => p.id === id)
}
const getADetailedPatientByID = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id)
}

const addPatient = (obj: NewPatient): Patient => {
  return {
    ...obj,
    id: uuid()
  }
}

const addEntry = (obj: NewEntry, id: string): Patient | null => {
  const patient = patients.find(p => p.id === id)
  if (!patient)
    return null
  const newEntry:Entry = { ...obj, id: uuid() }
  return {
    ...patient,
    entries: [
      ...patient.entries,newEntry
    ]
  }
}


export default {
  getDetailedPatients,
  getNonSensitivePatients,
  getAPublicPatientByID,
  getADetailedPatientByID,
  addPatient,
  addEntry,
}