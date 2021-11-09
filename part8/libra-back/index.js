const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URI = 'mongodb+srv://sb:123@cluster0.vtob4.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to MongoDB')
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })


let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Query {
    bookCount (author:String) : Int!
    authorCount: Int!
    allBooks (author:String,genre:String) : [Book!]!
    allAuthors:[Author!]!
    me:User
  }
  type Mutation {
    addBook(
      title:String!,
      author:String!,
      published:Int!,
      genres:[String!]!
    ) : Book
    editAuthor(
      name:String!,
      setBornTo:Int!
    ) : Author
    createUser(
      username:String!,
      password:String!,
      favoriteGenre:String!
    ): User
    login(
      username:String!
      password:String!
    ): Token
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username:String!
    favoriteGenre:String!
    id:ID!
  }
  type Token{
    value:String!
  }
`

const JWT_SECRET = "FUCK_YOUR_MOTHER"

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({})
      return books.reduce((sum, book) => {
        if (book.author.toString() === root._id.toString()) {
          return sum + 1
        }
        return sum
      }, 0)
    }
  },
  Query: {
    bookCount: (root, args) => {
      if (!args.author) {
        return books.length
      }
      const authorName = args.author
      return books.reduce((sum, book) => {
        if (book.author === authorName) {
          return sum + 1
        }
        return sum
      }, 0)
    },
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      } else if (!args.author) {
        return books.filter(
          book => book.genres.find(genre => genre === args.genre)
        )
      } else if (!args.genre) {
        return books.filter(
          book => book.author === args.author
        )
      } else {
        return books.filter(
          book => (book.author === args.author && book.genres.find(genre => genre === args.genre))
        )
      }
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root,args,{currentUser}) => {
      return currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated')
      }
      if (await Book.findOne({ title: args.title })) {
        console.log('book found')
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      try {
        const book = new Book({ ...args })
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          console.log('new author')
          author = new Author({ name: args.author })
          author = await author.save()
        }
        book.author = author._id
        console.log(book, author)
        return await (await book.save()).populate('author')
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args,{currentUser}) => {
      if (!currentUser){
        throw new AuthenticationError('Not Authenticated!')
      }
      return await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true, runValidators: true })
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== '123') {
        throw new UserInputError('Wrong Credentials')
      }
      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id
      }
      const token = jwt.sign(userForToken, JWT_SECRET)
      return { value: token }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})