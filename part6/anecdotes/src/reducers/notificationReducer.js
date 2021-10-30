
const createNotification=(content)=>{
  return ({
    type:'CREATE_NOTIFICATION',
    data:{content}
  })
}

const voteNotification=(content)=>{
  return ({
    type:'VOTE_NOTIFICATION',
    data:{content}
  })
}

const clearNotification=()=>{
  return ({
    type:'CLEAR_NOTIFICATION'
  })
}



const notificationReducer=(state='',action)=>{
  switch (action.type) {
    case 'VOTE_NOTIFICATION':
      return `you vote:${action.data.content}`
    case 'CREATE_NOTIFICATION':
      return `you create Anecdote:${action.data.content}`
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}


export default notificationReducer
export {createNotification,voteNotification,clearNotification}