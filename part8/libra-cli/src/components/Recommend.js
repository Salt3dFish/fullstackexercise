import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { BooksList } from './Books'

const RecommendBooks = ({ user, show }) => {
  // const { loading, error, data } = useQuery(ALL_BOOKS)
  const [getBooksByGenre, {loading,error,data}] = useLazyQuery(ALL_BOOKS)


  useEffect(() => {
    if (user) {
      // console.log('effect1', user.favoriteGenre)
      getBooksByGenre({
        variables: { genre: user.favoriteGenre }
      })
    }
  }, [user])



  if (!show) {
    return null
  }

  if (loading) {
    return (
      <div>
        loading ...
      </div>
    )
  }


/*   const booksToShow = data.allBooks.filter(
    b => b.genres.find(genre => genre === favoriteGenre)
  ) */


  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in {user.username} favorite genre <strong>{user.favoriteGenre}</strong>
      </div>
      <BooksList books={data.allBooks} />
    </div>
  )
}

export default RecommendBooks