import { createStore ,combineReducers} from "redux"
import anecdoteReducer from "../reducers/anecdoteReducer"
import notificationReducer from "../reducers/notificationReducer"
import filterReducer from "../reducers/filterReducer"
import {composeWithDevTools} from 'redux-devtools-extension'

const anecdotesStore=createStore(combineReducers({
  anecdotes:anecdoteReducer,
  notification:notificationReducer,
  filter:filterReducer
}),composeWithDevTools())

export default anecdotesStore