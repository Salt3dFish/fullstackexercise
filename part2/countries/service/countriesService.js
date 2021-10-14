import axios from 'axios'

const countriesUrl='https://restcountries.com/v3.1/all'
const weatherUrl='http://api.weatherstack.com/current'
const apiKey='zzzz'


const getAll=()=>{
  const request=axios.get(countriesUrl)
  return request.then(response=>response.data)
}

const getWeather=countryName=>{
  const request=axios.get(`${weatherUrl}?access_key=${apiKey}&query=${countryName}`)
  return request.then(response=>response.data)
}

export default {getAll,getWeather}
