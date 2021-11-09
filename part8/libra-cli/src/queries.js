import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks{
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

export const ALL_AUTHORS=gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_AUTHORS_NAMES=gql`
  query {
    allAuthors {
      name
    }
  }
`


export const ADD_BOOKS=gql`
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

export const UPDATE_AUTHOR_BORN=gql`
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