import React, { useState } from 'react'

const BlogForm = ({ handleCreateService }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog={ title,author,url }
    handleCreateService(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog} >
        <div>
          title: <input id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )}

export default BlogForm