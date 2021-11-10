import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useField } from '../hooks'
import { ALL_BOOKS, ADD_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const title = useField('')
  const author = useField('')
  const published = useField('number')
  const genre = useField('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOKS)

  if (!props.show) {
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    console.log('add book...')

    createBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres
      },
      update: (store, response) => {
        const booksInStore = store.readQuery({ query: ALL_BOOKS })
        const genres = response.data.addBook.genres
        if (genres) {
          genres.forEach(
            genre => {
              const genredBooks = store.readQuery({ query: ALL_BOOKS, variables: { genre: genre } })
              console.log(genredBooks)
              if (genredBooks) {
                store.writeQuery({
                  query: ALL_BOOKS,
                  variables: { genre: genre },
                  data: {
                    ...genredBooks,
                    allBooks: [...genredBooks.allBooks, response.data.addBook]
                  }
                })
              }
            }
          )
        }
        store.writeQuery({
          query: ALL_BOOKS,
          data: {
            ...booksInStore,
            allBooks: [...booksInStore.allBooks, response.data.addBook]
          }
        })
      }
    }).catch(error => {
      props.setError(error.message)
    })

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
