/* eslint-disable no-unused-vars */
import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

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
  const anecdotes = useSelector(state => {
    const filter=state.filter.toLowerCase()
    return state.anecdotes.filter(
      anecdote=>anecdote.content.toLowerCase().includes(filter)
    ).sort((current,next)=>next.votes-current.votes)
  })
  const handleVote=(id)=>{
    const votedAnecdote=anecdotes.find(
      anecdote=>anecdote.id===id
    )
    votedAnecdote.votes=votedAnecdote.votes+1
    dispatch(voteFor(id,votedAnecdote))
    dispatch(setNotification(`you voted: ${votedAnecdote.content}`,3))
  }
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
          anecdote => <Anecdote anecdote={anecdote} handleVote={()=>handleVote(anecdote.id)} key={anecdote.id} />
        )}
      </ul>
    </div>
  )
}

export default AnecdotesList