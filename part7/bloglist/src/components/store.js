import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogsReducer from '../reducers/blogsReducer'
import notificationReducer from '../reducers/notificationReducer'
import userReducer from '../reducers/userReducer'
import usersReducer from '../reducers/usersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'


const blogsStore=createStore(combineReducers({
  blogs:blogsReducer,
  notification:notificationReducer,
  loggedUser:userReducer,
  users:usersReducer
}),composeWithDevTools(applyMiddleware(thunk)))


export default blogsStore