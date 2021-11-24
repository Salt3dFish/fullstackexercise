import { Diagnosis } from "../types";
import diagnoses from "../data/diagnoses";

export const getAllDiagnoses = (): Array<Diagnosis> => {
  return diagnoses
}

export default {
  getAllDiagnoses
}