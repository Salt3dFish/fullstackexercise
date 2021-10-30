import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import anecdotesStore from './components/store'


ReactDOM.render(
  <Provider store={anecdotesStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)