import React from 'react'
import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import {
  Button,
  TextField
} from '@material-ui/core'


const BlogForm = ({ handleCreateService, hide }) => {

  const title = useField('title')
  const author = useField('author')
  const url = useField('url')
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    hide.current.toggleVisibility()
    const newBlog = {
      title: title.props.value,
      author: author.props.value,
      url: url.props.value
    }
    dispatch(handleCreateService(newBlog))
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <div>
      <form onSubmit={addBlog} >
        <div>
          <TextField label='title' variant='outlined' {...title.props} />
        </div>
        <br />
        <div>
          <TextField label='author' variant='outlined' {...author.props} />
        </div>
        <br />
        <div>
          <TextField label='url' variant='outlined' {...url.props} />
        </div>
        <br />
        <Button color='primary' variant='contained' type='submit'>
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm