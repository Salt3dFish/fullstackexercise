const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server-express')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


const app = express()
const httpServer = http.createServer(app)


const MONGODB_URI = 'mongodb+srv://sb:123@cluster0.vtob4.mongodb.net/library?retryWrites=true&w=majority'

console.log('connecting to MongoDB')
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

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
      favoriteGenre:String
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
    user:User!
    value:String!
  }
  type Subscription{
    bookAdded:Book!
  }
`

const JWT_SECRET = "FUCK_YOUR_MOTHER"

const resolvers = {
  Author: {
    bookCount: (root) => {
      return root.books.length
    }
  },
  Query: {
    authorCount: () => authors.length,
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author')
      } else if (!args.author) {  // filter by genre
        return Book.find({ genres: args.genre }).populate('author')
      } else if (!args.genre) { //filter by author
        const author = await Author.findOne({ name: args.author })
        return Book.find({ author: author._id }).populate('author')
      } else {
        const author = await Author.findOne({ name: args.author })
        return Book.find({ genres: args.genre, author: author._id }).populate('author')
      }
    },
    allAuthors: async () => {
      return await Author.find({})
    },
    me: (root, args, { currentUser }) => {
      console.log('fuck', currentUser)
      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated')
      }
      return currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('Not Authenticated')
      }
      try {
        const book = new Book({ ...args })
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          // console.log('new author')
          author = new Author({ name: args.author })
          await author.save()
        }
        book.author = author._id
        await book.save()
        await Author.findByIdAndUpdate(author._id, { books: [...author.books, book._id] })
        await book.populate('author')
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        // console.log(book, author)
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
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
      /*       console.log(`new user:
            \n ${user.username} ${user.favoriteGenre}`) */
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
      return {
        user: {
          username: user.username,
          id: user.id,
          favoriteGenre: user.favoriteGenre
        },
        value: token
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const parseToken = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
    const decodedToken = jwt.verify(
      auth.substring(7),
      JWT_SECRET
    )
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  }
}


const server = new ApolloServer({
  schema,
  context: parseToken,
  plugins: [{
    async serverWillStart() {
      return {
        async drainServer() {
          subscriptionServer.close()
        }
      }
    }
  }]
})

const subscriptionServer = SubscriptionServer.create(
  { schema, execute, subscribe, context: parseToken },
  { server: httpServer, path: server.graphqlPath }
);

(async () => {
  await server.start()
  server.applyMiddleware({ app, path: '/' })
})()

const PORT = 4000

httpServer.listen(PORT, () => {
  console.log(`🚀🚀🚀🐱‍🚀 Server on http://localhost:${PORT}/graphql`);
})