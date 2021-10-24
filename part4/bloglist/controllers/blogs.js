const blogsRouter=require('express').Router()
const userExtractor=require('../utils/middleware').userExtractor
const Blog=require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs=await Blog.find({}).populate('user',{ username:true,name:true })
  response.json(blogs)
})

blogsRouter.get('/:id',async(request,response) => {
  const blog=await Blog.findById(request.params.id).populate('user',{ username:true,name:true })
  response.json(blog)
})

blogsRouter.post('/', userExtractor,async (request, response) => {
  const body=request.body
  const user=request.user
  if (!user._id || !request.token)
    return response.status(401).json({ error:'token missing or invalid' })

  const blog=new Blog({
    title:body.title,
    url:body.url,
    author:body.author,
    likes:body.likes,
    user:user._id
  })
  if (blog.likes===undefined)
    blog.likes=0
  const savedBlog=await blog.save()
  user.blogs=user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id',userExtractor,async (request,response) => {
  const user=request.user
  if (!request.token || !user._id)
    return response.status(401).json({ error:'token missing or invalid' })
  const blog=await Blog.findById(request.params.id)
  if (!blog)
    return response.status(400).json({ error:'this blog have been deleted' })

  if (blog.user.toString() !== user._id.toString())
    return response.status(400).json({ error:'this blog isn\'t created by you' })

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id',userExtractor,async (request,response) => {
  const user=request.user
  const body=request.body
  if (!request.token || !user._id)
    return response.status(401).json({ error:'token missing or invalid' })
  const blog=await Blog.findById(request.params.id)
  if (!blog)
    return response.status(400).json({ error:'this blog have been deleted' })

  if (user._id.toString()!==blog.user.toString())
    return response.status(400).json({ error:'this blog isn\'t created by you' })
  const newBlog={
    title:body.title || blog.title,
    url:body.url || blog.url,
    author:body.author || blog.author,
    likes:body.likes || blog.likes,
    user:blog.user
  }
  const savedBlog=await Blog.findOneAndUpdate(request.params.id,newBlog,{ new:true,runValidators:true })
  response.json(savedBlog)
})


module.exports=blogsRouter