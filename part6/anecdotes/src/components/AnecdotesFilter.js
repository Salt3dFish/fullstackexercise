import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const changeFilter = (event) => {
    dispatch(setFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter <input value={filter} onChange={changeFilter} />
    </div>
  )
}

export default AnecdoteFilter