import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const url = `https://restcountries.com/v3.1/name/${name}`
  // console.log('name:',name,'url:',url)
  useEffect(() => {
    axios.get(url)
      .then(response => response.data)
      .then(returnedCountry=>{
        // console.log('data:', returnedCountry)
        const foundCountry={
          data:{
            name:returnedCountry[0].name.common,
            capital:returnedCountry[0].capital[0],
            population:returnedCountry[0].population,
            flag:returnedCountry[0].flags.png
          },
          found:true
        }
        // console.log('processed Country: ',foundCountry)
        setCountry(foundCountry)
      })

      .catch(()=>{
        setCountry({
          data:null,
          found:false
        })
      })
  },[url])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }
  // console.log('passedcountry:',country,'\ncountry.found:',country.found)
  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  /*
    只有在提交表单之后才会改变name的状态，然后在useCountry内部由于name改变，对应的url也改变
    就会执行effect，否则只改变表单内容不提交，name的值不改变，也就不会执行effect 
   */

  const find = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={find}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
