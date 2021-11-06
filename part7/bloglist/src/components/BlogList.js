/* eslint-disable no-unreachable */
import React from 'react'
import { clickLikes, clickDelete } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Link as MLink
} from '@material-ui/core'
const Blog = ({ blog, likesClickedHandler, deleteClickedHandler, loggedUserName }) => {
  /* console.log(`lgUser:${loggedUserName}\n
  blog:${blog}
  bloguser:${blog.user.username}`) */
  return (
    <TableRow >
      <TableCell>
        <MLink component={Link} to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </MLink>
      </TableCell>
    </TableRow>
  )

}


const BlogList = ({ blogs, loggedUserName }) => {
  const dispatch = useDispatch()

  const handleLikesClicked = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    dispatch(clickLikes(blog))
  }
  const handleDeleteClicked = (id) => {
    dispatch(clickDelete(id))
  }
  return (
    <Table>
      <TableBody>
        {blogs.map(
          blog =>
            <Blog
              blog={blog}
              likesClickedHandler={() => handleLikesClicked(blog.id)}
              deleteClickedHandler={() => handleDeleteClicked(blog.id)}
              key={blog.id}
              loggedUserName={loggedUserName} />
        )}
      </TableBody>
    </Table>
  )
}

export default BlogList