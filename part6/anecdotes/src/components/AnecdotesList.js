/* eslint-disable no-unused-vars */
import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from "../reducers/anecdoteReducer"
import { voteNotification,clearNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </li>
  )
}

const AnecdotesList = (props) => {
  const dispatch = useDispatch()
  const handleVote=(id,content)=>{
    dispatch(voteFor(id))
    dispatch(voteNotification(content))
    setTimeout(()=>dispatch(clearNotification()),5000)
  }
  const anecdotes = useSelector(state => {
    const filter=state.filter.toLowerCase()
    return state.anecdotes.filter(
      anecdote=>anecdote.content.toLowerCase().includes(filter)
    ).sort((current,next)=>next.votes-current.votes)
  })
  /* const filteredAnecdotes=useSelector(state=>{
    const filter=new RegExp(state.filter,'i')
    return state.anecdotes.filter(
      anecdote=>anecdote.content.match(filter)!==null
    ).sort((current,next)=>next.votes-current.votes)
  }) */
  return (
    <div>
      <ul>
        {anecdotes.map(
          anecdote => <Anecdote anecdote={anecdote} handleVote={()=>handleVote(anecdote.id,anecdote.content)} key={anecdote.id} />
        )}
      </ul>
    </div>
  )
}

export default AnecdotesList