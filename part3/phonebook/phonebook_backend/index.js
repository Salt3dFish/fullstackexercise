const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./models/pbook')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('data', (req, res) => {
    var jsonData = req.body
    jsonData = JSON.stringify(jsonData)
    return jsonData
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))



app.get('/', (request, response) => {
    response.send('<h1>hello,this is persons</h1>')
})

app.get('/info', (request, response) => {
    Person.find({}).then(
        persons => {
            response.send(`
                <div>
                    <p>
                        PhoneBook has info for ${persons.length} people
                    </p>
                </div>
                <div>
                    <p>
                        ${new Date}
                    </p>
                </div>
        `)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(
        persons => { response.json(persons) }
    )
})
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(
        person => {
            if (person)
                response.json(person)
            else
                response.status(404).end()
        }
    ).catch(error => next(error))
})
app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(
        () => { response.status(204).end() }
    )
})
app.post('/api/persons', (request, response) => {
    const addedPerson = request.body
    if (!addedPerson.name || !addedPerson.number)
        return response.status(400).json({
            error: 'name or number missing'
        })
    Person.findOne({ name: addedPerson.name }).then(
        returnedPerson => {
            if (!returnedPerson) {
                const newPerson = new Person({
                    name: addedPerson.name,
                    number: addedPerson.number.toString()
                })
                newPerson.save()
                    .then(
                        returnedPerson => {
                            response.json(returnedPerson)
                        }
                    )
            }
            else {
                response.status(400).json({ error: 'name must be unique!' })
            }
        }
    )
})
app.put('/api/persons/:id', (request, response, next) => {
    const newPerson = request.body
    Person.findByIdAndUpdate(request.params.id, { number: newPerson.number }, { new: true })
        .then(
            returnedPerson => {
                response.json(returnedPerson)
            }
        )
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId')
        response.status(400).send({ error: 'malformatted id' })
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`on port ${PORT}`)
})