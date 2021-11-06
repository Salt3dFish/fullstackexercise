/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
//some services
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
//services end
// some forms
import BlogView from './components/BlogView'
import LogoutForm from './components/logouform'
import LoginForm from './components/loginform'
import BlogForm from './components/blogform'
import Togglable from './components/togglable'
import Notification from './components/Notification'
import { handleCreateService } from './reducers/blogsReducer'
import { handleLoginService, handleLogOut } from './reducers/userReducer'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
//
// material
import Container from '@material-ui/core/Container'
//
// router
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom'
//
//
import {
  Button
} from '@material-ui/core'
//
//import end

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Button color='primary' variant='outlined' size='small' component={Link} to={'/'}>home</Button>
      <Button color='primary' variant='outlined' size='small' component={Link} to={'/users'}>users</Button>
      <LogoutForm />
    </div>
  )
}



const App = () => {
  //listen view clicked
  const [viewStatus, setViewStatus] = useState(false)
  // ref
  const blogFormRef = useRef()
  //
  const dispatch = useDispatch()
  //
  //
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])
  //
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const loggedUser = useSelector(state => state.loggedUser)

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (loggedUser !== null) {
      dispatch({
        type: 'SET_USER',
        data: loggedUser
      })
      blogService.setToken(loggedUser.token)
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

  const matchUser = useRouteMatch('/users/:id')
  const user = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  if (loggedUser === null) {
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
    <Container>
      <Notification />
      <Menu />
      <Switch>
        <Route path='/users/:id'>
          <User user={user} />
        </Route>
        <Route path='/users'>
          <Users users={users} />
        </Route>
        <Route path='/blogs/:id'>
          <BlogView blog={blog} />
        </Route>
        <Route path='/'>
          <h2>blogs app</h2>
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
            <BlogList
              blogs={blogsToShow}
              loggedUserName={loggedUser.username}
            />
          </div>
        </Route>
      </Switch>
    </Container>
  )
}

export default App