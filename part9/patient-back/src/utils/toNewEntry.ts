import { BaseEntry, HealthCheckRating, Diagnosis, NewEntry, EntryTypes } from "../types";

export const toNewEntry = (obj: any): NewEntry => {
  const type = parseType(obj.type)
  const baseEntry = {
    description: parseValidString(obj.description, 'description'),
    date: parseValidString(obj.date, 'date'),
    specialist: parseValidString(obj.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes)
  } as BaseEntry
  switch (type) {
    case EntryTypes.HealthCheck:
      return {
        ...baseEntry,
        type,
        healthCheckRating: parseHealthCheckRating(obj.healthCheckRating)
      }
    case EntryTypes.Hospital:
      return {
        ...baseEntry,
        type,
        discharge: parseDischarge(obj.discharge)
      }

    case EntryTypes.OccupationalHealthcare:
      return {
        ...baseEntry,
        type,
        employerName: parseValidString(obj.employerName, 'employerName'),
        sickLeave: parseSickLeave(obj.sickLeave)
      }

    default:
      throw new Error(`Incorrect or missing type: ${type}`)
  }
}


const isValidCodes = (value: any): value is Array<Diagnosis['code']> => {
  if (!Array.isArray(value))
    return false
  return true;
}

const parseDiagnosisCodes = (value: unknown): Array<Diagnosis['code']> | undefined => {
  if (value === undefined) {
    return undefined
  }
  if (!isValidCodes(value))
    throw new Error(`Incorrect Diagnosis Codes: ${value}`)
  return value
}

const isEntryTypes = (text: any): text is EntryTypes => {
  return Boolean(Object.values(EntryTypes).includes(text))
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

const parseValidString = (text: unknown, field: string): string => {
  if (!text || !isString(text))
    throw new Error(`Incorrect or missing ${field}: ${text}`)
  return text;
}

const parseType = (text: unknown): EntryTypes => {
  if (!text || !isEntryTypes(text))
    throw new Error(`Incorrect or missing type: ${text}`)
  return text
}

const isHealthCheckRating = (value: any): value is HealthCheckRating => {
  return Boolean(Object.values(HealthCheckRating).includes(value))
}

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  if (value===undefined || !isHealthCheckRating(value))
    throw new Error(`Incorrect or missing HealthCheckRating: ${value}`)
  return value;
}

const parseDischarge = (value: any): { date: string, criteria: string } => {
  if (!value.date || !value.criteria || !isString(value.date) || !isString(value.criteria))
    throw new Error(`Incorrect or missing discharge: ${value}`)
  return value
}

const parseSickLeave = (value: any): { startDate: string, endDate: string } | undefined => {
  if (value === undefined) {
    return undefined
  } else if (!value.startDate || !value.endDate || !isString(value.startDate) || !isString(value.endDate)) {
    throw new Error(`Incorrect or missing sickLeave: ${value}`)
  }
  return value;
}

export default toNewEntry