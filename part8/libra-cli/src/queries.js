import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query(
    $author:String,
    $genre:String
  ) {
    allBooks(
      author:$author,
      genre:$genre
    ) {
      title
      author{
        name
        id
      }
      published
      genres
      id
    }
  }
`


export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_AUTHORS_NAMES = gql`
  query {
    allAuthors {
      name
    }
  }
`

export const WHO_AM_I = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`


export const ADD_BOOKS = gql`
  mutation createBook(
    $title:String!,
    $author:String!,
    $published:Int!,
    $genres:[String!]!
  ) {
    addBook(
      title:$title,
      author:$author,
      published:$published,
      genres:$genres,
    ) {
      title
      author{
        name
        id
      }
      published
      genres
      id
    }
  }
`

export const UPDATE_AUTHOR_BORN = gql`
  mutation updateAuthor (
    $name:String!,
    $born:Int!
  ) {
    editAuthor (
      name:$name,
      setBornTo:$born
    ) {
      name
      born
      id
    }
  }
`

export const LOG_IN = gql`
  mutation log_in(
    $username:String!,
    $password:String!    
  ) {
    login (
      username:$username,
      password:$password
  ) {
      value
      user {
        username
        favoriteGenre
        id
      }
   }
  }
`

export const REGISTER = gql`
  mutation register(
    $username:String!,
    $password:String!,
    $favoriteGenre:String
  ) {
    createUser (
      username:$username,
      password:$password,
      favoriteGenre:$favoriteGenre
    ) {
      username
      favoriteGenre
      id
    }
  }
`






