import express from 'express'
import patientService from '../services/patientService'
import toNewPatient from '../utils/toNewPatient'
import toNewEntry from '../utils/toNewEntry'

const router = express.Router()


router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients())
})

router.get('/detailed', (_req, res) => {
  res.json(patientService.getDetailedPatients())
})

router.get('/:id', (req, res) => {
  res.json(patientService.getADetailedPatientByID(req.params.id))
})


router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body)
    const savedPatient = patientService.addPatient(newPatient)
    res.json(savedPatient)
  } catch (error) {
    let errorMessage = 'Sth went wrong. :('
    if (error instanceof Error) {
      errorMessage += '\nError: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body)
    const savedPatient = patientService.addEntry(newEntry, req.params.id)
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