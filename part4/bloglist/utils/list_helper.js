const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {

  return blogs.length === 0
    ? 0
    : blogs.reduce(
      (sum, blog) => sum + blog.likes
      , 0
    )
}

const favoriteBlog = blogs => {

  return blogs.length === 0
    ? null
    : blogs.reduce(
      (favBlog, blog) => {
        return blog.likes > favBlog.likes
          ? blog
          : favBlog
      }, blogs[0]
    )

}

const mostBlogs = blogs => {
  const authorArr = []
  blogs.forEach(
    blog => {
      if (authorArr.find(au => au.author === blog.author) === undefined)
        authorArr.push({ author: blog.author, blogs: 0})
    }
  )
  blogs.forEach(
    blog => {
      const i = authorArr.findIndex(sa => sa.author === blog.author)
      authorArr[i].blogs += 1
    }
  )

  return (
    blogs.length === 0
      ? null
      : authorArr.reduce(
        (maxAuthor, author) => {
          return author.blogs > maxAuthor.blogs
            ? author
            : maxAuthor
        }
        , authorArr[0]
      ))
}

const mostLikes = blogs => {
  const authorArr = []
  blogs.forEach(
    blog => {
      if (authorArr.find(au => au.author === blog.author) === undefined)
        authorArr.push({ author: blog.author, likes: 0 })
    }
  )
  blogs.forEach(
    blog => {
      const i = authorArr.findIndex(sa => sa.author === blog.author)
      authorArr[i].likes += blog.likes
    }
  )
  return (
    blogs.length === 0
      ? null
      : authorArr.reduce(
        (maxAuthor, author) => {
          return author.likes > maxAuthor.likes
            ? author
            : maxAuthor
        }
        , authorArr[0]
      ))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}