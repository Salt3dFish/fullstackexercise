
let id

export const setNotification = (notification, seconds) => {
	return dispatch => {
		if (id !== undefined)
			clearTimeout(id)
		dispatch({
			type: 'SET_NOTIFICATION',
			data:notification,
		})
		setTimeout(()=>{
			dispatch({
				type:'CLEAR_NOTIFICATION'
			})
		},1000*seconds)
	}
}




const notificationReducer = (state='', action) => {
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