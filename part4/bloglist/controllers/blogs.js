const blogsRouter=require('express').Router()
const Blog=require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs=await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.likes===undefined)
    blog.likes=0
  const returnedBlog=await blog.save()
  response.status(201).json(returnedBlog)
})

blogsRouter.delete('/:id',async (request,response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id',async(request,response) => {
  const newBlog=request.body
  const returnedBlog=await Blog.findOneAndUpdate(request.params.id,newBlog,{ new:true,runValidators:true })
  response.json(returnedBlog)
})


module.exports=blogsRouter