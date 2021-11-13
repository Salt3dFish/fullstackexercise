import express from 'express'
import diagnoseRouter from './routers/diagnoseRouter'
import patientRoter from './routers/patientRouter'

const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.get('/api/ping', (_req, res) => {
  res.send('pong')
})

app.use('/api/diagnoses', diagnoseRouter)

app.use('/api/patients', patientRoter)

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT} 🚀🚀`)
})
