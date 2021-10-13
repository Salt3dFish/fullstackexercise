import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Header=({text})=>
  <div>
    <h2>
      {text}
    </h2>
  </div>

const Button=({text,clickHandler})=>
  <div>
    <button onClick={clickHandler}>{text}</button>
  </div>

const ShowButton=({text,clickHandler,country})=>
  <div>
    <button onClick={clickHandler} forcountry={country} >{text}</button>
  </div>

const Input=({text,inputState,changeHandler})=>
  <div>
  {text}<input value={inputState} onChange={changeHandler} />
  </div>

const Filter=({text,filterValue,filterHandler})=>
  <div>
  {text} <input value={filterValue} onChange={filterHandler} />
  </div>

const Country=({name})=>
  <p>
  {name}
  </p>

const Language=({language})=>
  <p>* {language}</p>

const LanguagesTable=({languages})=>{
    var lans=new Array()
    console.log(languages)
    for (const prop in languages){
      if (languages.hasOwnProperty(prop))
        lans.push(languages[prop])
    }
    console.log(lans)
    return lans.map(
      (lan)=>
      <Language language={lan} key={lan} />
    )
}

const SingleCountry=({country})=>(
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
      <LanguagesTable languages={country.languages} />
    </div>
    <div>
      <img src={country.flags.png} alt='flag' />
    </div>
  </div>
  </div>
)

const Countries=({countriesToShow,buttonProperty})=>{


  if (countriesToShow==undefined)
    return
  if (countriesToShow.length===1)
    return (
      <SingleCountry country={countriesToShow[0]} />)
  else if (countriesToShow.length>10){
    return (
      <div>
      Too many matches,specify another filter
      </div>
    )
  }
  else{
    return (
      countriesToShow.map(
        (country)=>
          <Country name={country.name.common} key={country.name.common} />
      )
    )
  }
}




const App=()=>{
const [filterValue,setFilterValue]=useState('')
const [allCountries,setAllCountries]=useState([])


useEffect(
  ()=>{
    axios.get('https://restcountries.com/v3.1/all')
    .then(
      response=>{
        setAllCountries(response.data)
      }
    )
  }
,[])

var filteredCountries=new Array()
filteredCountries=allCountries.filter(
  (country)=>{
    var filter=new RegExp(filterValue,'i')
    return country.name.common.match(filter)!=null
  }
)


const filterHandler=(event)=>{
  setFilterValue(event.target.value)
}

  return (
    <div>
    <Filter text='find countries' filterValue={filterValue} filterHandler={filterHandler} />
    <Countries
    countriesToShow={filteredCountries}
    filterValue={filterValue}
    />
    </div>
  )
}

export default App
