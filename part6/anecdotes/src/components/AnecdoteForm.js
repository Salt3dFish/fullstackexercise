import React from "react"
// import {useDispatch} from 'react-redux'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdotesForm = (props) => {
  // const dispatch=useDispatch()
  const addAnecdote=async(event)=>{
    event.preventDefault()
    const content=event.target.anecdote.value
    /* dispatch(createAnecdote(content))
    dispatch(setNotification(`you create Anecdote: ${content}`,3)) */
    props.createAnecdote(content)
    props.setNotification(`you create Anecdote: ${content}`,3)
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

const mapDispatchToProps=(dispatch)=>{
  return {
    createAnecdote:(value)=>{
      dispatch(createAnecdote(value))
    },
    setNotification:(params1,params2)=>{
      dispatch(setNotification(params1,params2))
    }
  }
}

export default connect(null,mapDispatchToProps)(AnecdotesForm)