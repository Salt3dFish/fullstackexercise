import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import AnecdotesList from './components/AnecdotesList'
import AnecdotesForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteFilter from './components/AnecdotesFilter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

const dispatch=useDispatch()

useEffect(()=>{
  dispatch(initializeAnecdotes())
},[dispatch])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  )
}

export default App