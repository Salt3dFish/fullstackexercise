import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import blogsStore from './components/store'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Provider store={blogsStore}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
)