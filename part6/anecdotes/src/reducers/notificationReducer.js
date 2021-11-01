
var id  // clear action 's ID undefined | number


const setNotification = (notification, seconds) => {
  return async dispatch => {
    // console.log('oldID: ', id)
    if (id !== undefined) {
      // console.log('clear CLR_NOTIFI,ID:', id)
      clearTimeout(id)
    }
    id = setTimeout(() => dispatch({
      type: 'CLEAR_NOTIFICATION',
    }), 1000 * seconds)
    console.log('newID: ', id)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification,
    })
  }
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
export { setNotification }