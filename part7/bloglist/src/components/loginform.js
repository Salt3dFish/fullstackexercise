import React from 'react'
import { useField } from '../hooks'
import {useDispatch} from 'react-redux'
import {
  Button,
  TextField
} from '@material-ui/core'

const LoginForm = ({ handleLoginService }) => {
  const username=useField('username')
  const password=useField('password')
  const dispatch=useDispatch()
  
  const handleLogin = (event) => {
    event.preventDefault()
    const userToPost = { username:username.props.value,password: password.props.value }
    dispatch(handleLoginService(userToPost))
    username.reset()
    password.reset()
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <div>
            <TextField label='username' {...username.props} />
          </div>
          <div>
            <TextField label='password' {...password.props} />
          </div>
          <br />
          <Button color='primary' variant='contained' type='submit'>login</Button>
        </div>
      </form>
    </div>
  )}

export default LoginForm