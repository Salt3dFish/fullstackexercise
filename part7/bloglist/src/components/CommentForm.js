import React from "react"
import { handleCreateComment } from "../reducers/blogsReducer"
import { useDispatch } from "react-redux"

const CommentForm=({id,hide})=>{
  const dispatch=useDispatch()
  const handleClick=e=>{
    e.preventDefault()
    hide.current.toggleVisibility()
    dispatch(handleCreateComment(id,e.target.comment.value))
    e.target.comment.value=''
  }
  return (
    <form onSubmit={handleClick}>
      <input name="comment"/>
      <button type='submit'>create</button>
    </form>
  )
}

export default CommentForm