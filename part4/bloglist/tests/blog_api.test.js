const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


const bigBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 12,
  },
  {
    title: 'Type wars 6',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = bigBlogs.map(
    blog => new Blog(blog)
  )
  const promiseArray = blogs.map(
    blog => blog.save()
  )
  await Promise.all(promiseArray)
})


test('get 6 blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(6)
})

test('contain id', async () => {
  const response = await api.get('/api/blogs')
  const blogId = response.body[0].id
  expect(blogId).toBeDefined()
})

test('add 1', async () => {
  const newBlog = {
    title: 'i am new',
    author: 'sb',
    url: 'http://www.baidu.com',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(bigBlogs.length + 1)
})


test('default likes is 0', async () => {
  const newBlog = { title: 'no likes', author: 'sb', url: 'http://www.baidu.com' }
  const response = await api.post('/api/blogs').send(newBlog)
  console.log(response.body)
  expect(response.body.likes).toBe(0)

})

test('need title and url',async() => {
  const newBlog={ author:'sb',likes:1 }
  await api.post('/api/blogs').send(newBlog)
    .expect(400)
})

describe('delete and put',() => {

  test('delete a blog',async() => {
    const newBlog={ title: 'no likes', author: 'sb', url: 'http://www.baidu.com' }
    let response=await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)
    const id=response.body.id

    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
    response=await api.get('/api/blogs')
    expect(response.body).toHaveLength(bigBlogs.length)
  })

  test('change a blog',async() => {
    const newBlog={ title: 'no likes', author: 'sb', url: 'http://www.baidu.com',likes:10 }
    let response=await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type',/application\/json/)
    expect(response.body.id).toBeDefined()

    const id=response.id
    const changedBlog={
      title:'i changed',
      author:response.body.author,
      url:response.body.url,
      likes:20
    }

    response=await api.put(`/api/blogs/${id}`).send(changedBlog)
    expect(response.body.likes).toEqual(changedBlog.likes)

  })

})

afterAll(() => {
  mongoose.connection.close()
})