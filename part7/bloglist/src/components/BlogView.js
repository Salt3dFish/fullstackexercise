import React,{useRef} from "react"
import Togglable from "./togglable"
import CommentForm from "./CommentForm"
import {
  Table,
  TableBody
} from '@material-ui/core'

const BlogView = ({ blog }) => {
  const commentFormref=useRef()
  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user.username}</p>
      <h3>comments</h3>
      <Togglable buttonLabel='add comment' ref={commentFormref}>
        <CommentForm id={blog.id} hide={commentFormref} />
      </Togglable>
      <ul>{blog.comments.map(
        comment => <li key={comment}>{comment}</li>
      )}
      </ul>
    </div>
  )
}

export default BlogView