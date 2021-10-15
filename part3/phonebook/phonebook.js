const express=require('express')
const morgan=require('morgan')

const app = express()


app.use(express.json())

morgan.token('data',(req,res)=>{
    var jsonData=req.body
    jsonData=JSON.stringify(jsonData)
    return jsonData
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))




let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]


app.get('/', (request, response) => {
    response.send('<h1>hello,this is persons</h1>')
})

app.get('/info', (request, response) => {
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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (!person)
        return response.status(404).end()
    response.json(person)
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
    const addedPerson=request.body
    
    if (!addedPerson.name || !addedPerson.number)
        return response.status(400).json({
            error:'name or number missing'
        })

    if (persons.find(
        person=>person.name===addedPerson.name
    ))
        return response.status(400).json({
            error:'name must be unique'
        })

    const newId=Math.floor(1000*Math.random())
    const newPerson={
        id:newId,
        name:addedPerson.name,
        number:addedPerson.number
    }
    persons=persons.concat(newPerson)
    response.json(newPerson)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const PORT = 3003
app.listen(PORT, () => {
    console.log(`on port ${PORT}`)
})