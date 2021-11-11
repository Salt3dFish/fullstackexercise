import { useMutation } from '@apollo/client'
import React from 'react'
import { useField } from '../hooks'
import { REGISTER } from '../queries'

const RegisterForm = ({ show, setError, setPage }) => {
  const username = useField('')
  const password = useField('')
  const favoriteGenre = useField('')

  const [register, {  loading, data }] = useMutation(REGISTER, {
    onError: (error) => setError(error.message),
  })


  if (!show) {
    return null
  }

  const submit = (e) => {
    e.preventDefault()
    console.log('register')
    register({
      variables: {
        username: username.value,
        password: password.value,
        favoriteGenre: favoriteGenre.value
      }
    })
  }

  if (loading) {
    return (
      <div>
        loading...
      </div>
    )
  }
  if (data) {
    setError('Register successfully')
    setPage('login')
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <div>
          username <input {...username.props} />
        </div>
        <div>
          password <input {...password.props} />
        </div>
        <div>
          favoriteGenre <input {...favoriteGenre.props} />
        </div>
        <button type='submit'>register</button>
      </form>
    </div>
  )

}

export default RegisterForm