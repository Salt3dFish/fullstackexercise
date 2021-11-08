import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useField } from '../hooks'
import { ALL_BOOKS,ADD_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const title = useField('')
  const author = useField('')
  const published = useField('number')
  const genre = useField('')
  const [genres, setGenres] = useState([])

  const [createBook]=useMutation(ADD_BOOKS,{
    refetchQueries:[{query:ALL_BOOKS,query:ALL_AUTHORS}]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

    createBook({variables:{
      title:title.value,
      author:author.value,
      published:Number(published.value),
      genres
    }})

    title.reset()
    author.reset()
    published.reset()
    genre.reset()
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre.props.value))
    genre.reset()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input {...title.props} />
        </div>
        <div>
          author <input {...author.props} />
        </div>
        <div>
          published <input {...published.props} />
        </div>
        <div>
          <input {...genre.props} />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
