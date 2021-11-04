import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import blogsStore from './components/store'

ReactDOM.render(
  <Provider store={blogsStore}>
    <App/>
  </Provider>,
  document.getElementById('root')
)