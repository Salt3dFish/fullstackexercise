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
        <div>
          {blog.title} {blog.author}
          <button onClick={() => clickHandler(blog)}>view</button>
        </div>
      </div >
    )
  }
  else {
    return (
      <div style={blogStyle}>
        <div>
          <div>
            {blog.title} {blog.author}
            <button onClick={() => clickHandler(blog)}>hide</button>
          </div>
          <div>
            likes: {blog.likes}
            <button onClick={() => likesClickedHandler(blog.id)}>like</button>
          </div>
          <div>
            {blog.url}
          </div>
          <div>
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


const Blogs = ({ blogs, likesClickedHandler, deleteClickedHandler,currentUsername }) => {
  const [viewClicked, setViewClicked] = useState(false)
  const clickViewButton = (blog) => {
    /*
    console.log('---------')
    console.log(`before:${blog.viewStatus}`)
    */
    blog.viewStatus = !blog.viewStatus
    setViewClicked(!viewClicked)
    /*
    console.log(`after: ${blog.viewStatus}`)
    console.log('-----------')
    */
  }
  return (
    <div>
      {blogs.map(
        blog =>
          <Blog
            blog={blog}
            clickHandler={clickViewButton}
            likesClickedHandler={likesClickedHandler}
            deleteClickedHandler={deleteClickedHandler}
            key={blog.id}
            currentUsername={currentUsername} />
      )}
    </div>
  )
}

export default Blogs