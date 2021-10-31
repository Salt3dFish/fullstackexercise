import anecdoteService from '../services/anecdotes'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const voteFor = (id,changedAnecdote) => {
  return async dispatch=>{
    const updatedAnecdote=await anecdoteService.update(id,changedAnecdote)
    dispatch({
      type:id,
      data:updatedAnecdote
    })
  }
}
const createAnecdote = content => {
  console.log('Create Action:accept anecdote')
  return async dispatch=>{
    const savedAnecdote=await anecdoteService.create(content)
    dispatch({
      type:'CREATE',
      data:savedAnecdote,
    })
  }
}

const initializeAnecdotes = () => {
  console.log('initializing...')
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


const anecdotesReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action:', action)
  switch (action.type) {
    case 'VOTE':
      console.log(`vote for ${action.data.id}`)
      const votedAnecdote=action.data
      return state.map(
        anecdote => anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
      )
    case 'CREATE':
      console.log('receive create action and create new state')
      const newAnecdote = action.data
      return [...state, newAnecdote]
    case 'INIT_ANECDOTES':
      console.log('reducer:init...')
      return action.data
    default:
      return state
  }
}

export default anecdotesReducer
export { voteFor, createAnecdote, initializeAnecdotes }