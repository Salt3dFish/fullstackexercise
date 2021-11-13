import { NewPatient, gender } from "../types";

const toNewPatient = (obj: any): NewPatient => {
  return {
    name: parseName(obj.name),
    dateOfBirth: parseBirthday(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation)
  }
}


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`)
  }
  return name
}

const isBirthday = (birthday: string): boolean => {
  return Boolean(Date.parse(birthday))
}
const parseBirthday = (birthday: unknown): string => {
  if (!birthday || !isString(birthday) || !isBirthday(birthday)) {
    throw new Error(`Incorrect or missing birthday: ${birthday}`)
  }
  return birthday
}
const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn} `)
  }
  return ssn
}
const isGender = (param: any): param is gender => {
  return Object.values(gender).includes(param)
}
const parseGender = (gender: unknown) => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender} `)
  }
  return gender
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`)
  }
  return occupation
}

export default toNewPatient