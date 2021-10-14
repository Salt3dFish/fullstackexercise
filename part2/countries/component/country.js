import React,{useState} from 'react'
import {getWeather} from '../service/countriesService.js'

const [weather,setWeather]=useState({})
const Languages=({languages})=>{
    var lans=new Array()
    for (const prop in languages){
      if (languages.hasOwnProperty(prop))
        lans.push(languages[prop])
    }
    return (
      <ul>
      {lans.map(
        (language)=><li key={language}>{language}</li>
      )}
      </ul>
    )
}

const Weather=countryName=>{
  getWeather(countryName)
  .then(
    weatherData=>setWeather(weatherData.current)
  )
  return (
    <div>
      <div>
        <h4>temperature:</h4>
        <p>weather.temperatre</p>
      </div>
      <div>
        <img src={weather.icons[0]} alt='weather_icon' />
      </div>
      <div>
        <h4>wind:</h4>
        <p>{weather.wind_speed} mph direction {weather.wind_dir} SSW</p>
      </div>
    </div>
  )
}

const Country=({country,temperature,weatherIconUrl,wind})=>
  <div>
    <h1>{country.name.common}</h1>
    <div>
      <div>
      capital: {country.capital}
      </div>
      <div>
      population: {country.population}
      </div>
    </div>
    <div>
      <h2>languages</h2>
      <div>
        <Languages languages={country.languages} />
      </div>
      <div>
        <img src={country.flags.png} alt='flag' />
      </div>
      <div>
      <h2>Weather in {country.name.common}</h2>
      <Weather countryName={country.name.common} />
      </div>
    </div>
  </div>

const CountrySimple=({name,country,clickHandler})=>
  <li>
    {name}
    <button value={name} onClick={clickHandler}>
    show
    </button>
  </li>
const Language=({language})=>
  <p>* {language}</p>

const Filter=({text,filterValue,filterHandler})=>
  <div>
  {text} <input value={filterValue} onChange={filterHandler} />
  </div>
export default CountrySimple
export {Country,Filter}
