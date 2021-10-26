/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blog'
//some services
import blogService from './services/blogs'
import loginService from './services/login'
//services end
// some forms
import LoginForm from './components/loginform'
import BlogForm from './components/blogform'
import Togglable from './components/togglable'
//import end
const App = () => {
  const [blogs, setBlogs] = useState([])
  //listen view clicked
  const [viewStatus, setViewStatus] = useState(false)
  //message
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  // ref
  const blogFormRef = useRef()
  //
  /*  move to loginForm
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  */
  const [user, setUser] = useState(null)
  /* create new Blog removed to blogform ...
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  */
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (user !== null) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /* log in
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(
        () => setErrorMessage(null)
        , 3000
      )
    }
  }
  */
  // log out clear local token
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  /* func to generate log form
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password <input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>log in</button>
    </form>
  )
  */
  // create new blog
  const createNewBlog = async () => {
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
  }

  const handleLoginService = async (userToPost) => {
    try {
      const user = await loginService.login(userToPost)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(
        () => setErrorMessage(null)
        , 3000)
    }
  }

  const handleCreateService = async (newBlog) => {
    blogFormRef.current.toggleVisibility() //hide create form
    try {
      const returnedBlog = await blogService.create(newBlog)
      /*
      console.log('------------')
      console.log(`this is blog returned :${returnedBlog.title}`)
      console.log('----------')
      */
      setBlogs(blogs.concat(returnedBlog))
    } catch (exception) {
      setErrorMessage(exception.error)
      setTimeout(
        () => setErrorMessage(null)
        , 3000)
    }
  }

  const clickDelete = async (id, title, author) => {
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
      }}}

  const clickLikes = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id)
      const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      console.log('------------')
      console.log(`likes: ${blog.likes} -> ${changedBlog.likes}\n
      id:${blog.id}`)
      console.log('---------------')
      const updatedBlog = await blogService.update(id, changedBlog)
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
      setErrorMessage('cant updated')
      setTimeout(
        () => setErrorMessage(null)
        , 3000)
    }
  }
  const blogsToShow = blogs.sort(
    (current, next) => next.likes - current.likes
  )
  if (user === null) {
    return (
      <div>
        <h2>{errorMessage}</h2>
        <h2>Log in to application</h2>
        <Togglable buttonLabel='log in'>
          <LoginForm handleLoginService={handleLoginService} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>{message}</h2>
      </div>
      <div>
        <h2>{errorMessage}</h2>
      </div>
      <h2>blogs</h2>
      <div>
        {user.username}    logged in
        <button onClick={handleLogout}>log out</button>
      </div>
      <br></br>
      <div>
        <Togglable
          buttonLabel='create new blog'
          ref={blogFormRef}>
          <BlogForm handleCreateService={handleCreateService} />
        </Togglable >
      </div>
      <div>
        <Blogs
          blogs={blogsToShow}
          likesClickedHandler={clickLikes}
          deleteClickedHandler={clickDelete}
          currentUsername={user.username}
        />
      </div>
    </div>
  )
}

export default App