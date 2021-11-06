import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const initializeBlogs=()=>{
  return async (dispatch)=>{
    const blogs=await blogService.getAll()
    dispatch({
      type:'INIT_BLOGS',
      data:blogs,
    })
  }
}

export const handleCreateService=(newBlog)=>{
  
  return async dispatch=>{
    try{
      const returnedBlog=await blogService.create(newBlog)
      dispatch({
        type:'CREATE',
        data:returnedBlog
      })
      dispatch(setNotification(`You Create Blog: ${newBlog.title}-${newBlog.author}`,3))
    } catch(exception){
      dispatch(setNotification(`ERROR:Cant create Blog ${newBlog.title}`,3))
    }
  }
}

export const clickLikes=(blog)=>{
  return async dispatch=>{
    try{
      const newBlog={...blog,likes:blog.likes+1}
      /* console.log('------------')
      console.log(`likes: ${blog.likes} -> ${newBlog.likes}\n
      id:${blog.id}`)
      console.log('---------------') */
      await blogService.update(newBlog)
      dispatch({
        type:'CLICK_LIKES',
        data:newBlog
      })
      dispatch(setNotification(`You likes ${blog.title}-${blog.likes}`,3))
    }catch(exception){
      console.log('click likes error')
    }
  }
}

export const clickDelete=(id)=>{
  return async dispatch=>{
    try{
      await blogService.remove(id)
      dispatch({
        type:'DELETE',
        data:{id}
      })
      dispatch(setNotification('You Delete A Blog',3))
    }catch(exception){
      console.log('delete error')
    }
  }
}

export const handleCreateComment=(id,comment)=>{
  return async dispatch=>{
    try{
      const returnedBlog=await blogService.addComment(id,{comment:comment})
      dispatch({
        type:'COMMENT',
        data:returnedBlog
      })
      dispatch(setNotification(`you comment: ${returnedBlog.title}`,3))
    }catch(exception){
      dispatch(setNotification('cant comment',3))
    }
  }
}

const blogsReducer=(state=[],action)=>{
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE':
      const newBlog=action.data
      return [...state,newBlog]
    case 'CLICK_LIKES':
      const likedBlog=action.data
      return state.map(
        blog=>blog.id!==likedBlog.id?blog:likedBlog)
    case 'DELETE':
      const id=action.data.id
      return state.filter(
        blog=>blog.id!==id
      )
    case 'COMMENT':
      const commentedBlog=action.data
      return state.map(
        blog=>blog.id!==commentedBlog.id?blog:commentedBlog
      )
    default:
      return state
  }
}

export default blogsReducer