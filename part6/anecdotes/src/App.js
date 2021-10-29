/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdotesList from './components/AnecdotesList'
import AnecdotesForm from './components/AnecdoteForm'

const App = () => {



  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesForm />
      <AnecdotesList />
    </div>
  )
}

export default App