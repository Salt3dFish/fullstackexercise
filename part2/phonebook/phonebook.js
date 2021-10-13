import React,{useState,useEffect} from 'react'
import Person,{Header,Input} from './components/PhoneBook.js'
import pbService from './service/pbservice.js'

const Filter=({text,filterValue,valueChangeHandler})=>
  <div>
    {text} <input value={filterValue} onChange={valueChangeHandler} />
  </div>

const PersonForm=({submitHandler,inputProp,filterValue})=>
  <div>
  <form onSubmit={submitHandler}>
  <div>
    <Input text={inputProp.text[0]} inputValue={inputProp.inputvalue[0]} changeHandler={inputProp.changeHandler[0]} />
    <Input text={inputProp.text[1]} inputValue={inputProp.inputvalue[1]} changeHandler={inputProp.changeHandler[1]} />
    <button type="submit">add</button>
  </div>
  </form>
  </div>


const Persons=({persons,toggleDeleteof})=>
  persons
    .map(
      (person)=>
      <Person name={person.name} number={person.number} key={person.id}
      toggleDelete={()=>toggleDeleteof(person.id,person.name)}/>
    )



const App=()=>{

const [newName,setNewName]=useState('')
const [newNumber,setNewNumber]=useState('')

const [persons,setPersons]=useState([])

const [filterValue,setNewFilter]=useState('')

const handleNameChange=(event)=>{
  setNewName(event.target.value)
}
const handleNumberChange=(event)=>{
  setNewNumber(event.target.value)
}
const handleFilterChange=(event)=>{
  setNewFilter(event.target.value)
}

const addNewPerson=(event)=>{
  event.preventDefault()
  const newPerson={
    name: newName,
    number: newNumber,
  }
  if (persons.find((person)=>person.name===newPerson.name)){
    if (window.confirm(`${newPerson.name} is already added to phonebook,replace the old number with a new one?`))
    {
      const oldPersonId=persons.find(person=>person.name===newPerson.name).id
      pbService.updatePerson(oldPersonId,newPerson)
        .then(
          updatedPerson=>{
            setPersons(
              persons.map(
                person=>person.id!==oldPersonId?person:updatedPerson
              )
            )
            setNewName('')
            setNewNumber('')
          }
        )
    }
  }
  else{
    pbService
      .createPerson(newPerson)
      .then(
        returnedPerson=>{
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        }
      )
      .catch(
        ()=>{
          alert('fail to add')
        }
      )
  }
}

useEffect(
  ()=>{
    pbService
      .getAllPersons()
      .then(
        initialPersons=>{
          setPersons(initialPersons)
        }
      )
  },
[])


const personsToShow=persons.filter(
  person=>{
    var nameFilter=new RegExp(filterValue,'i')
    return person.name.match(nameFilter)!==null
  }
)

const toggleDeleteof=(id,name)=>{
  if (window.confirm(`delete ${name} ?`))
    pbService.deletePerson(id)
    .then(
      ()=>{
        setPersons(
          persons.filter(
            person=>person.id!==id
          )
        )
      }
    )
}


  return (
    <div>
    <Header text='Phonebook' />
    <Filter text= 'filter shown with' filterValue={filterValue} valueChangeHandler={handleFilterChange} />
    <Header text='Add a new' />
    <PersonForm
    submitHandler={addNewPerson}
    inputProp={
      {
        text:['name','number'],
        inputvalue:[newName,newNumber],
        changeHandler:[handleNameChange,handleNumberChange]
      }
    }
    />
    <Header text='Number' />
    <Persons persons={personsToShow} toggleDeleteof={toggleDeleteof} />
    </div>
  )
}




export default App
