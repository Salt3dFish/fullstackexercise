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

const Notification=({message,notificationType})=>
{
  if (message===null)
    return null
  var notificationStyle={}
  if (notificationType==='success')
    notificationStyle={
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
  else
  notificationStyle={
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App=()=>{

const [newName,setNewName]=useState('')
const [newNumber,setNewNumber]=useState('')
const [persons,setPersons]=useState([])
const [filterValue,setNewFilter]=useState('')
const [successMessage,setSuccessMessage]=useState(null)
const [failMessage,setFailMessage]=useState(null)
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
      const oldPerson=persons.find(person=>person.name===newPerson.name)
      pbService.updatePerson(oldPerson.id,newPerson)
        .then(
          updatedPerson=>{
            setPersons(
              persons.map(
                person=>person.id!==oldPerson.id?person:updatedPerson
              )
            )
            setSuccessMessage(`Updated ${updatedPerson.name}'s number`)
            setTimeout(
              ()=>{setSuccessMessage(null)},3000
            )
            setNewName('')
            setNewNumber('')
          }
        )
        .catch(
          ()=>{
            setFailMessage(`Information of ${oldPerson.name} has already been removed from server`)
            setTimeout(
              ()=>{setFailMessage(null)},3000
            )
            setPersons(
              persons.filter(
                person=>person.id!==oldPerson.id
              )
            )
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
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(
            ()=>{setSuccessMessage(null)},3000
          )
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
        setSuccessMessage(`delete ${name} successfully`)
        setTimeout(
          ()=>{setSuccessMessage(null)},3000
        )
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
    <Notification message={successMessage} notificationType='success' />
    <Notification message={failMessage} notificationType='fail' />
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
