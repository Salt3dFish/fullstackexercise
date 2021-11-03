import { useState,useEffect } from "react"
import axios from "axios"


export const useField=(type)=>{
  const [value,setValue]=useState('')

  const onChange=(e)=>{
    setValue(e.target.value)
  }
  return {
    type,
    value,
    onChange
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...

  useEffect(()=>{
    axios.get(baseUrl)
      .then(response=>response.data)
      .then(resources=>{
        setResources(resources)
      })
      .catch(()=>{
        setResources([])
      })
  },[baseUrl])

  const create = async (object) => {
    // ...
    axios.post(baseUrl,object)
      .then(response=>response.data)
      .then(addedResource=>{
        setResources(resources.concat(addedResource))
      })
      .catch(error=>console.log('ERROR:Cant Create'))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}