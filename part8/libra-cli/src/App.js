import { useApolloClient } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/Login'
import NewBook from './components/NewBook'
import RecommendBooks from './components/Recommend'
import RegisterForm from './components/RegisterForm'

const Notify = ({ notification }) => {
  if (!notification) {
    return null
  }
  const style = {
    color: 'red'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState('')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('loggedUser'))
    if (token) {
      setToken(token)
    }
    if (user) {
      setUser(user)
    }
  }, [])


  const setMessage = (notification) => {
    setNotification(notification)
    setTimeout(() => setNotification(''), 3000)
  }


  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedUser')
    setToken(null)
    client.resetStore()
  }


  return (
    <div>
      <Notify notification={notification} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
        <button onClick={() => setPage('register')}>register</button>
      </div>
      <Authors show={page === 'authors'} setError={setMessage} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setError={setMessage} />
      <LoginForm
        show={page === 'login'}
        setError={setMessage}
        setToken={setToken}
        setUser={setUser}
        setPage={setPage} />
      <RecommendBooks
        show={page === 'recommend'}
        user={user} />
      <RegisterForm
        show={page === 'register'}
        setError={setMessage}
        setPage={setPage} />
    </div>
  )
}

export default App