import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  /*
  console.log('creating ...')
  console.log('token is ----',token)
  */
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('-----------')
  console.log(`blog to post :\n
  id:${blog.id} likes:${blog.likes}`)
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  axios.delete(`${baseUrl}/${blogId}`,config)
}

export default { getAll, create, setToken, update,remove }