import { Diagnose } from "../types";
import diagnoses from "../data/diagnoses";

export const getAllDiagnoses = (): Array<Diagnose> => {
  return diagnoses
}

export default {
  getAllDiagnoses
}