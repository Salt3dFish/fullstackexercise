

const setFilter=(filter)=>{
  return ({
    type:'SET_FILTER',
    data:{filter}
  })
}




const filterReducer=(state='',action)=>{
  if (action.type==='SET_FILTER')
    return action.data.filter
  return state
}

export default filterReducer
export {setFilter}