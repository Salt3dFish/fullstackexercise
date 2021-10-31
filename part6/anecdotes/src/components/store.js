import { createStore ,combineReducers,applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import anecdoteReducer from "../reducers/anecdoteReducer"
import notificationReducer from "../reducers/notificationReducer"
import filterReducer from "../reducers/filterReducer"
import {composeWithDevTools} from 'redux-devtools-extension'

const anecdotesStore=createStore(combineReducers({
  anecdotes:anecdoteReducer,
  notification:notificationReducer,
  filter:filterReducer
}),composeWithDevTools(applyMiddleware(thunk)))

export default anecdotesStore