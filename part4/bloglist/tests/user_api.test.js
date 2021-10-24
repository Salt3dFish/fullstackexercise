const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const api=supertest(app)
const User=require('../models/user')


const usersInDb=async() => {
  const users=await User.find({})
  return users.map(
    user => user.toJSON()
  )
}

describe('at first only root',() => {
  beforeEach(async() => {
    await User.deleteMany()
    const rootUser=new User({
      username:'root',
      name:'i am root',
      password:'123456',
    })
    await rootUser.save()
  })
  test('invalid user cant be added',async() => {
    const usersAtStart=await usersInDb()
    const user=new User({
      username:'i am invalid',
      name:'i am invalid!',
    })
    const response=await api.post('/api/users').send(user).expect(400)
    expect(response.body.error).toContain('username or password missing!')
    const usersAtEnd=await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('user fuckyou can be added',async() => {
    const usersAtStart=await usersInDb()
    const user={
      username:'fuckyou',
      name:'i fuck you!',
      password:'123456'
    }
    await api.post('/api/users').send(user).expect(200)
    const usersAtEnd=await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
  })
  test('username must be unique!',async() => {
    const uAtF=await usersInDb()
    const user={ username:'root',name:'i cant be added!',password:'123456' }
    const response=await api.post('/api/users').send(user)
      .expect(400)
    expect(response.body.error).toContain('username must be unique!')
    const uAtE=await usersInDb()
    expect(uAtE).toHaveLength(uAtF.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})