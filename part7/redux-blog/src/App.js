/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
//some services
import blogService from './services/blogs'
import loginService from './services/login'
//services end
// some forms
import LoginForm from './components/loginform'
import BlogForm from './components/blogform'
import Togglable from './components/togglable'
import Notification from './components/Notification'
import { handleCreateService } from './reducers/blogsReducer'
import { handleLoginService ,handleLogOut } from './reducers/userReducer'
// redux
import {useDispatch,useSelector} from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
//
//import end
const App = () => {
  //listen view clicked
  const [viewStatus, setViewStatus] = useState(false)
  // ref
  const blogFormRef = useRef()
  //
  const dispatch=useDispatch()
  //

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs())
    )
  },[dispatch])
  const blogs=useSelector(state=>state.blogs)

  const user=useSelector(state=>state.user)

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (user !== null) {
      dispatch({
        type:'SET_USER',
        data:user
      })
      blogService.setToken(user.token)
    }
  }, [dispatch])

 /*  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  } */
  /* const createNewBlog = async () => {
    if (!author || !title || !url)
      console.log('invalid blog')
    else {
      console.log('valid')
      const newBlog = {
        title,
        author,
        url
      }
      try {
        console.log('sending ...')
        const savedBlog = await blogService.create(newBlog)
        console.log(savedBlog)
        setBlogs(blogs.concat(savedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setMessage(`a new blog ${savedBlog.title} !by ${savedBlog.author} added`)
        setTimeout(
          () => setMessage(null)
          , 3000)
      } catch (exception) {
        setErrorMessage(exception.error)
        setTimeout(
          () => setErrorMessage(null)
          , 3000)
      }
    }
  } */

  /* const handleLoginService = async (userToPost) => {
    try {
      const user = await loginService.login(userToPost)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log('cant login')
    }
  } */

/*   const handleCreateService = async (newBlog) => {
    blogFormRef.current.toggleVisibility() //hide create form
    try {
      const returnedBlog = await blogService.create(newBlog)
      // console.log('------------')
      // console.log(`this is blog returned :${returnedBlog.title}`)
      // console.log('----------')
      setBlogs(blogs.concat(returnedBlog))
    } catch (exception) {
      setErrorMessage(exception.error)
      setTimeout(
        () => setErrorMessage(null)
        , 3000)
    }
  } */

/*   const clickDelete = async (id, title, author) => {
    if (window.confirm(`Remove blog ${title}! by${author}`)) {
      try {
        await blogService.deleteById(id)
        setBlogs(blogs.filter(
          blog => blog.id !== id
        ))
      } catch (exception) {
        setErrorMessage('delete error')
        setTimeout(
          () => setErrorMessage(null)
          , 3000)
      }}} */

/*   const clickLikes = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id)
      const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      console.log('------------')
      console.log(`likes: ${blog.likes} -> ${changedBlog.likes}\n
      id:${blog.id}`)
      console.log('---------------')
      const updatedBlog = await blogService.update(id, changedBlog)
      // 返回的Blog不带有viewStatus属性,能点击like说明vieStatus一定为true
      updatedBlog.viewStatus=true
      console.log('-----------')
      console.log(`updatedBlog:\n
      title:${updatedBlog.title}
      likes:${updatedBlog.likes}
      id:${updatedBlog.id}`)
      console.log('---------')
      setBlogs(
        blogs.map(
          blog => blog.id !== id ? blog : updatedBlog)
      )
    } catch (exception) {
      console.log('error likes')
    }
  } */
  const blogsToShow = blogs.sort(
    (current, next) => next.likes - current.likes
  )
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Togglable buttonLabel='log in'>
          <LoginForm handleLoginService={handleLoginService} />
        </Togglable>
      </div>
    )
  }



  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <div>
        {user.username} logged in
        <button onClick={()=>dispatch(handleLogOut())}>log out</button>
      </div>
      <br></br>
      <div>
        <Togglable
          buttonLabel='create new blog'
          ref={blogFormRef}>
          <BlogForm handleCreateService={handleCreateService}
            hide={blogFormRef} />
        </Togglable >
      </div>
      <div>
        <Blogs
          blogs={blogsToShow}
          currentUsername={user.username}
        />
      </div>
    </div>
  )
}

export default App