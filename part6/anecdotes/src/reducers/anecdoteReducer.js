import anecdoteService from '../services/anecdotes'





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
  // console.log('Create Action:accept anecdote')
  return async dispatch=>{
    const savedAnecdote=await anecdoteService.create(content)
    dispatch({
      type:'CREATE',
      data:savedAnecdote,
    })
  }
}

const initializeAnecdotes = () => {
  // console.log('initializing...')
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


const anecdotesReducer = (state = [], action) => {
  /* console.log('state now: ', state)
  console.log('action:', action) */
  switch (action.type) {
    case 'VOTE':
      // console.log(`vote for ${action.data.id}`)
      const votedAnecdote=action.data
      return state.map(
        anecdote => anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
      )
    case 'CREATE':
      // console.log('receive create action and create new state')
      const newAnecdote = action.data
      return [...state, newAnecdote]
    case 'INIT_ANECDOTES':
      // console.log('reducer:init...')
      return action.data
    default:
      return state
  }
}

export default anecdotesReducer
export { voteFor, createAnecdote, initializeAnecdotes }