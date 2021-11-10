import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


export const BooksList = ({ books }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map(
            book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

const Books = (props) => {
  const [selectedGenre, setGenre] = useState('')
  const [getBooksByGenre, { loading, error, data }] = useLazyQuery(ALL_BOOKS)
  const [getAllBooks, res] = useLazyQuery(ALL_BOOKS)
  const [allBooks, setBooks] = useState([])

  useEffect(() => {
    if (res.data) {
      setBooks(res.data.allBooks)
    }
  }, [res])

  useEffect(() => {
    getAllBooks()
    getBooksByGenre()
  }, [])

  /*   useEffect(() => {
      if (selectedGenre) {
        getBooksByGenre({
          variables: { genre: selectedGenre }
        })
      }
      else {
        getBooksByGenre()
      }
    }, [selectedGenre]) */

  const sendQuery = (genre) => {
    // console.log(genre)
    setGenre(genre)
    if (genre) {
      getBooksByGenre({
        variables: { genre: genre }
      })
    } else {
      getBooksByGenre()
    }
  }

  if (!props.show) {
    return null
  }


  if (loading) {
    return (
      <div>
        loading...
      </div>
    )
  }

  const booksToShow = data.allBooks
  // console.log(allBooks)

  const genres = allBooks.reduce((sumGenres, book) => {
    book.genres.forEach((genre) => {
      if (!sumGenres.find(
        (genreInSum) => genre === genreInSum
      )) {
        sumGenres = sumGenres.concat(genre)
      }
    })
    return sumGenres
  }, [])

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre {selectedGenre ? selectedGenre : 'all genres'}
      </div>
      <BooksList books={booksToShow} />
      <div>
        {genres.map(
          genre => <button key={genre} onClick={() => sendQuery(genre)}>{genre}</button>
        )}
        <button key=" " onClick={() => sendQuery('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books