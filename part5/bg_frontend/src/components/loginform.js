import React, { useState } from 'react'

const LoginForm = ({ handleLoginService }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    const userToPost = { username, password }
    handleLoginService(userToPost)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <div>
            username <input id='username' value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password <input id='password' value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button id='login-button' type='submit'>login</button>
        </div>
      </form>
    </div>
  )}

export default LoginForm