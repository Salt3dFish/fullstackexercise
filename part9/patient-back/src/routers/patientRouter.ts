import express from 'express'
import patientService from '../services/patientService'
import toNewPatient from '../utils/toNewPatient'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients())
})

router.post('/', (req, res) => {
  try {
    const newPatient=toNewPatient(req.body)
    const savedPatient=patientService.addPatient(newPatient)
    res.json(savedPatient)
  } catch (error) {
    let errorMessage = 'Sth went wrong. :('
    if (error instanceof Error) {
      errorMessage += '\nError: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router