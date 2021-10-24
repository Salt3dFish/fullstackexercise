const usersRouter=require('express').Router()
const User=require('../models/user')
const bcrypt=require('bcrypt')



usersRouter.get('/',async (request,response) => {
  const users=await User.find({}).populate('blogs',{ title:true,author:true,url:true })
  response.json(users)
})

usersRouter.post('/',async(request,response) => {
  const body=request.body
  if (!body.password || !body.username)
    response.status(400).send({ error:'username or password missing!' })
  const saltRounds=10
  const passwordHash=await bcrypt.hash(body.password,saltRounds)
  const newUser=new User({
    username:body.username,
    name:body.name,
    passwordHash
  })

  const savedUser=await newUser.save()
  response.json(savedUser.toJSON())
})

module.exports=usersRouter