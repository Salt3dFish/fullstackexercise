import React,{ useState,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import {
  Button
} from '@material-ui/core'

const Togglable=React.forwardRef((props,ref) => {
  const [visible,setVisible]=useState(false)
  const hideWhenVisible={ display:visible ? 'none':'' }
  const showWhenVisible={ display:visible ? '':'none' }

  const toggleVisibility=() => {
    setVisible(!visible)
  }
  useImperativeHandle(ref,() => {
    return {
      toggleVisibility
    }
  })
  Togglable.propTypes={
    buttonLabel:PropTypes.string.isRequired
  }
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button color='primary' variant='outlined' size='small' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div id='loginFormDiv' style={showWhenVisible}>
        {props.children}
        <br />
        <Button color='secondary'  size='small' variant='contained' onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName='Togglable'

export default Togglable