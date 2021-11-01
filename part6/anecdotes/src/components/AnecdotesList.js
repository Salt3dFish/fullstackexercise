/* eslint-disable no-unused-vars */
import React from "react"
//import { useSelector, useDispatch } from 'react-redux'
import {connect} from 'react-redux'
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
/*   const dispatch = useDispatch() 
  const anecdotes = useSelector(state => {
    const filter=state.filter.toLowerCase()
    return state.anecdotes.filter(
      anecdote=>anecdote.content.toLowerCase().includes(filter)
    ).sort((current,next)=>next.votes-current.votes)
  }) */
  const handleVote=(id)=>{
    const votedAnecdote=props.anecdotes.find(
      anecdote=>anecdote.id===id
    )
    votedAnecdote.votes=votedAnecdote.votes+1
    props.voteFor(id,votedAnecdote)
    props.setNotification(`you voted: ${votedAnecdote.content}`,3)
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
        {props.anecdotes.map(
          anecdote => <Anecdote anecdote={anecdote} handleVote={()=>handleVote(anecdote.id)} key={anecdote.id} />
        )}
      </ul>
    </div>
  )
}

const mapStateToProps=(state)=>{
  const filter=state.filter.toLowerCase()
  return {
    anecdotes:state.anecdotes
      .filter(anecdote=>anecdote.content.toLowerCase().includes(filter))
      .sort((current,next)=>next.votes-current.votes)
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    voteFor: (params1,params2)=>{
      dispatch(voteFor(params1,params2))
    },
    setNotification:(params1,params2)=>{
      dispatch(setNotification(params1,params2))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(AnecdotesList)