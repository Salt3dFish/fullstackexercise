import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const Notify=({notification})=>{
  if (!notification){
    return null
  }
  const style={
    color:'red'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [notification,setNotification]=useState('')

  const setMessage=(notification)=>{
    setNotification(notification)
    setTimeout(()=>setNotification(''),3000)
  }


  return (
    <div>
      <Notify notification={notification} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        setError={setMessage}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={setMessage}
      />

    </div>
  )
}

export default App