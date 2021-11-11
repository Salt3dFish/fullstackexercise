import React, { useEffect } from 'react'
import {  useMutation } from '@apollo/client'
import { useField } from '../hooks'
import { LOG_IN } from '../queries'

const LoginForm = ({ setPage, show, setError, setToken ,setUser}) => {
  const username = useField('')
  const password = useField('')

  const [login, { loading, data }] = useMutation(LOG_IN, {
    onError: (error) => { setError(error.message) }
  })

  useEffect(() => {
    if (!loading && data) {
      const token = data.login.value
      const user=data.login.user
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setToken(token)
      setUser(user)
      setPage('books')
    }
  }, [data])

  if (!show) {
    return null
  }


  const submit = e => {
    e.preventDefault()
    console.log('login...')
    login({
      variables: {
        username: username.value,
        password: password.value
      },
    })
  }

  return (
    <div>
      <h2>Log in</h2>
      <div>
        <form onSubmit={submit}>
          <div>
            username <input {...username.props} />
          </div>
          <div>
            password <input {...password.props} />
          </div>
          <button type='submit'>log in</button>
        </form>
      </div>
    </div>
  )


}

export default LoginForm