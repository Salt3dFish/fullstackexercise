const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const bigBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]
const oneBlog = [bigBlogs[0]]

describe('total likes', () => {

  test('empty list is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
  test('1 blog is itself', () => {
    expect(listHelper.totalLikes(oneBlog)).toBe(oneBlog[0].likes)
  })
  test('1 more ls is calculated right', () => {
    expect(listHelper.totalLikes(bigBlogs)).toBe(48)
  })
})

describe('favriote blogs', () => {
  test('0 blog -> return null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })
  test('1 blog is itself', () => {
    expect(listHelper.favoriteBlog(oneBlog).likes).toEqual(7)
  })
  test('1 more is max', () => {
    expect(listHelper.favoriteBlog(bigBlogs).likes).toEqual(12)
  })
})

describe('most blogs', () => {
  test('0 blog -> return null', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })
  test('1 blog itself',() => {
    expect(listHelper.mostBlogs(oneBlog)).toEqual({ author:'Michael Chan',blogs:1 })
  })
  test('1 more is Martin', () => {
    expect(listHelper.mostBlogs(bigBlogs)).toEqual({ author:'Robert C. Martin',blogs:3 })
  })
})

describe('most likes',() => {
  test('0 blog - null',() => {
    expect(listHelper.mostLikes([])).toBe(null)
  })
  test('1 blog itself',() => {
    expect(listHelper.mostLikes(oneBlog)).toEqual({ author:'Michael Chan',likes:7 })
  })
  test('1 more blogs is Martin',() => {
    expect(listHelper.mostLikes(bigBlogs).author).toEqual('Robert C. Martin')
  })
})