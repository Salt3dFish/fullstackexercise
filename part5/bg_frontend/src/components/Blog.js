/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react'


const Blog = ({ blog, clickHandler, likesClickedHandler, deleteClickedHandler,currentUsername }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (blog.viewStatus === undefined || blog.viewStatus === false) {
    return (
      < div style={blogStyle} >
        <div className='blogContent'>
          {blog.title} {blog.author}
          <button onClick={() => clickHandler(blog)}>view</button>
        </div>
      </div >
    )
  }
  else {
    return (
      <div style={blogStyle}>
        <div className='blogContent'>
          <div>
            {blog.title} {blog.author}
            <button onClick={() => clickHandler(blog)}>hide</button>
          </div>
          <div className='likes'>
            likes: {blog.likes}
            <button className='likesButton' onClick={() => likesClickedHandler(blog.id)}>like</button>
          </div>
          <div className='url'>
            {blog.url}
          </div>
          <div className='username'>
            {blog.user.username}
          </div>
          {
            blog.user.username===currentUsername?
              <button onClick={() => deleteClickedHandler(blog.id, blog.title, blog.author)}>delete</button>:
              null}
        </div>
      </div>
    )
  }
}



export default Blog