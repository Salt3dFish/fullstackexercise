import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { handleLogOut } from "../reducers/userReducer"
import {
  Button
} from '@material-ui/core'

const LogoutForm = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  return (
    <div>
      <h3>{loggedUser.username} logged in</h3>
      <div>
        <Button variant='contained' size='small' onClick={() => dispatch(handleLogOut())}>log out</Button>
      </div>
    </div>
  )
}

export default LogoutForm