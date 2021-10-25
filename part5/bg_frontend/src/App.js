import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //message
  const [message,setMessage]=useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  //
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //new blog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  //new blog
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (user !== null){
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //log in
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
  // log out clear local token
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  // login form
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
          ()=>setMessage(null)
        ,3000)
      } catch (exception) {
        setErrorMessage(exception.error)
        setTimeout(
          () => setErrorMessage(null)
          , 3000)
      }
    }
  }



  if (user === null) {
    return (
      <div>
        <h2>{errorMessage}</h2>
        <h2>Log in to application</h2>
        {loginForm()}
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
        <div>
          title: <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button onClick={createNewBlog}>create</button>
        </div>
      </div>
      <br>
      </br>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App