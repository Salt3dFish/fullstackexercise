
const setNotification = (notification,seconds) => {
  return async dispatch =>{
    dispatch({
      type:'SET_NOTIFICATION',
      data:notification,
    })
    setTimeout(
      ()=>dispatch({
        type:'CLEAR_NOTIFICATION'
      })
    ,seconds*1000)
  }
}

const clearNotification = () => {
  return ({
    type: 'CLEAR_NOTIFICATION'
  })
}



const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}


export default notificationReducer
export { setNotification, clearNotification }