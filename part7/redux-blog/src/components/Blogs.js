import Blog from './Blog'
import React,{ useState } from 'react'
import { clickLikes,clickDelete } from '../reducers/blogsReducer'
import {useDispatch} from 'react-redux'

const Blogs = ({ blogs,currentUsername }) => {
  const [viewClicked, setViewClicked] = useState(false)
  const dispatch=useDispatch()
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
  const handleLikesClicked=(id)=>{
    const blog=blogs.find(blog=>blog.id===id)
    dispatch(clickLikes(blog))
  }
  const handleDeleteClicked=(id)=>{
    dispatch(clickDelete(id))
  }
  return (
    <div>
      {blogs.map(
        blog =>
          <Blog
            blog={blog}
            clickHandler={clickViewButton}
            likesClickedHandler={()=>handleLikesClicked(blog.id)}
            deleteClickedHandler={()=>handleDeleteClicked(blog.id)}
            key={blog.id}
            currentUsername={currentUsername} />
      )}
    </div>
  )
}

export default Blogs