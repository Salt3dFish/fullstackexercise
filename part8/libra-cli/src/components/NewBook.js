import React, { useState } from 'react'
import { useMutation, useSubscription } from '@apollo/client'
import { useField } from '../hooks'
import { ALL_BOOKS, ADD_BOOKS, ALL_AUTHORS, BOOK_ADDED } from '../queries'

const NewBook = (props) => {
  const title = useField('')
  const author = useField('')
  const published = useField('number')
  const genre = useField('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOKS, {
    update: (store, response) => {
      const booksInStore = store.readQuery({ query: ALL_BOOKS })
      const authorsInStore = store.readQuery({ query: ALL_AUTHORS })
      const genres = response.data.addBook.genres
      let notification
      if (!booksInStore.allBooks.find(
        b => b.title === response.data.addBook.title
      )) {
        // console.log('MUTA UPDATE BOOK !');
        notification = `book ${response.data.addBook.title} added`
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

        const index = authorsInStore.allAuthors.findIndex(a => a.name === response.data.addBook.author.name)

        if (index === -1) {
          notification += `\nand add a new author ${response.data.addBook.author.name}`
          store.writeQuery({
            query: ALL_AUTHORS,
            data: {
              ...authorsInStore,
              allAuthors: [...authorsInStore.allAuthors, response.data.addBook.author]
            }
          })
        } else {
          const authors = [...authorsInStore.allAuthors]
          authors[index] = response.data.addBook.author
          // console.log(authors, author)
          store.writeQuery({
            query: ALL_AUTHORS,
            data: {
              ...authorsInStore,
              allAuthors: authors
            }
          })
        }
      }
      if (notification) {
        window.alert(notification)
      }
    },
    onError: (error) => props.setError(error.message)
  })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const booksInStore = client.readQuery({ query: ALL_BOOKS })
      const authorsInStore = client.readQuery({ query: ALL_AUTHORS })
      const newBook = subscriptionData.data.bookAdded
      const author = subscriptionData.data.bookAdded.author
      // console.log(booksInStore, newBook,author)
      let notification
      if (!booksInStore.allBooks.find(
        b => b.title === newBook.title
      )) {
        // console.log('SUBS UPDATE BOOK & AUTHOR')
        notification = `book ${newBook.title} added`
        client.writeQuery({
          query: ALL_BOOKS,
          data: {
            ...booksInStore,
            allBooks: [...booksInStore.allBooks, newBook]
          }
        })

        if (newBook.genres) {
          // console.log(`new book genres:${newBook.genres}`)
          newBook.genres.forEach(
            g => {
              const genredBooks = client.readQuery({
                query: ALL_BOOKS,
                variables: { genre: g }
              })
              // console.log(`genredbooks:${genredBooks}`)
              if (genredBooks) {
                client.writeQuery({
                  query: ALL_BOOKS,
                  variables: { genre: g },
                  data: {
                    ...genredBooks,
                    allBooks: [...genredBooks.allBooks, newBook]
                  }
                })
              }
            }
          )
        }

        const index = authorsInStore.allAuthors.findIndex(a => a.name === author.name)
        if (index === -1) {
          notification += `\nand add a new author ${author.name}`
          client.writeQuery({
            query: ALL_AUTHORS,
            data: {
              ...authorsInStore,
              allAuthors: [...authorsInStore.allAuthors, author]
            }
          })
        } else {
          const authors = [...authorsInStore.allAuthors]
          authors[index] = author
          // console.log(authors, author)
          client.writeQuery({
            query: ALL_AUTHORS,
            data: {
              ...authorsInStore,
              allAuthors: authors
            }
          })
        }
      }
      if (notification) {
        window.alert(notification)
      }
    }
  })

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



