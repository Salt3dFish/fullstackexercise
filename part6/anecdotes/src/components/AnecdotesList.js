/* eslint-disable no-unused-vars */
import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from "../reducers/anecdoteReducer"

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

  const anecdotes = useSelector(anecdote => anecdote).sort((current, next) => next.votes - current.votes)
  return (
    <div>
      <ul>
        {anecdotes.map(
          anecdote => <Anecdote anecdote={anecdote} handleVote={() => dispatch(voteFor(anecdote.id))} key={anecdote.id} />
        )}
      </ul>
    </div>
  )
}

export default AnecdotesList