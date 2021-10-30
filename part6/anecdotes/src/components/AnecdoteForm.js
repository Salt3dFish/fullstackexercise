import React from "react"
import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import { createNotification,clearNotification } from "../reducers/notificationReducer"


const AnecdotesForm = (props) => {
  const dispatch=useDispatch()
  const addAnecdote=event=>{
    event.preventDefault()
    const content=event.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(createNotification(content))
    setTimeout(()=>dispatch(clearNotification()),5000)
    event.target.anecdote.value=''
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdotesForm