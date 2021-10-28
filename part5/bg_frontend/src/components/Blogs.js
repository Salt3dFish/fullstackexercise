import Blog from './Blog'
import React,{ useState } from 'react'


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