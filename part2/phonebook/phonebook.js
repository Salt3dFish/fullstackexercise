import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Header=({text})=>
  <h2>
    {text}
  </h2>

const Filter=({text,filterValue,valueChangeHandler})=>
  <div>
    {text} <input value={filterValue} onChange={valueChangeHandler} />
  </div>

const Input=({text,inputValue,changeHandler})=>
  <div>
    {text}: <input value={inputValue} onChange={changeHandler} />
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

const Person=({name,number})=>
  <p>{name}:{number}</p>

const Persons=({persons,filterValue})=>
  persons.filter(
    (person)=>{
      var filterByName=new RegExp(filterValue,'i')
      return person.name.match(filterByName)!=null
    }
  ).map(
    (person)=>
    <Person name={person.name} number={person.number} key={person.id} />
  )
  /*
  (persons.map(
      (person)=>
      <Person name={person.name} number={person.number} key={person.id} />
    )
  ).filter(
    (person)=>{
      var filterbyname=new RegExp('filterValue','i');
      return person.name.match(filterbyname)!=null
    }
  )*/


const App=()=>{

  const [newName,setNewName]=useState('')
  const [newNumber,setNewNumber]=useState('')

  const [persons,setPersons]=useState([])

  const [nameFilter,setNewFilter]=useState('')

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
      id: persons.length+1
    }
    if (persons.find((person)=>person.name===newPerson.name))
      window.alert(`${newPerson.name} is already added to phonebook`)
    else{
    setNewName('')
    setNewNumber('')
    setPersons(persons.concat(newPerson))
    }
  }

useEffect(
  ()=>{
    axios.get('http://localhost:3001/persons')
    .then(
      response=>{
        setPersons(response.data)
      }
    )
  },
[])

  return (
    <div>
    <Header text='Phonebook' />
    <Filter text= 'filter shown with' filterValue={nameFilter} valueChangeHandler={handleFilterChange} />
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
    <Persons persons={persons} filterValue={nameFilter} />
    </div>
  )
}




export default App
