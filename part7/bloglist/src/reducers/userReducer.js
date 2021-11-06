import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const handleLoginService=(userToPost)=>{
  return async dispatch=>{
    try{
      const user=await loginService.login(userToPost)
      window.localStorage.setItem('loggedUser',JSON.stringify(user))      
      blogService.setToken(user.token)
      dispatch({
        type:'SET_USER',
        data:user
      })
      dispatch(setNotification(`welcome ${user.username}`,3))
    }catch(exception){
      dispatch(setNotification('Wrong Credentials',3))
      console.log('error login')
    }
  }
}

export const handleLogOut=()=>{
  return dispatch=>{
    // console.log('log out ...')
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type:'REMOVE_USER'
    })
  }
}




const userReducer=(state=null,action)=>{
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'REMOVE_USER':
      return null
    default:
      return state
  }
}

export default userReducer