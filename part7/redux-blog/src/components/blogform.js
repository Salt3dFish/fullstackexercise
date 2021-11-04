import React from 'react'
import { useField } from '../hooks/index'
import {useDispatch} from 'react-redux'

const BlogForm = ({ handleCreateService ,hide}) => {

  const title = useField('title')
  const author = useField('author')
  const url = useField('url')
  const dispatch=useDispatch()

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
          title: <input {...title.props} />
        </div>
        <div>
          author: <input {...author.props} />
        </div>
        <div>
          url: <input {...url.props} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm