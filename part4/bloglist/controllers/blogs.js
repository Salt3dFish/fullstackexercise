const blogsRouter=require('express').Router()
const Blog=require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(returnedBlog => returnedBlog.toJSON())
    .then(savedAndFormattedBlog => {
      response.status(201).json(savedAndFormattedBlog)
    })
})

module.exports=blogsRouter