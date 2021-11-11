import { gql } from '@apollo/client'


const BOOK_INFO = gql`
  fragment BOOKINFO on Book {
    title
    published
    genres
    id
    author {
      name
      bookCount
      born
      id
    }
  } 
`

const AUTHOR_INFO = gql`
  fragment AUTHORINFO on Author {
    name
    id
    born
    bookCount
  }
`


export const ALL_BOOKS = gql`
  query(
    $author:String,
    $genre:String
  ) {
    allBooks(
      author:$author,
      genre:$genre
    ) {
      ...BOOKINFO
    }
  }
 ${BOOK_INFO}
`


export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AUTHORINFO
    }
  }
${AUTHOR_INFO}
`

export const ALL_AUTHORS_NAMES = gql`
  query {
    allAuthors {
      name
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
      ...BOOKINFO
    }
  }
${BOOK_INFO}
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
      ...AUTHORINFO
    }
  }
${AUTHOR_INFO}
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

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BOOKINFO
    }
  }
${BOOK_INFO}
`




