import React,{useState,useEffect} from 'react'
import CountrySimple,{Country,Filter} from './components/country.js'
import ctservice from './service/countriesService.js'

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


const Input=({text,inputState,changeHandler})=>
  <div>
  {text}<input value={inputState} onChange={changeHandler} />
  </div>


const Countries=({countriesToShow,showHandler})=>{
  const [showCountry,setShowCountry]=useState()
  const toggleShow=event=>{
    const countryToShow = countriesToShow.filter(country =>
     country.name.common.includes(event.target.value)
   )[0]
   setShowCountry(countryToShow);
  }

  if (showCountry!==undefined){
    return <Country country={showCountry} />
  }

  if (countriesToShow.length===1){
    ctservice.getWeather(countriesToShow[0].name.common)
    .then(
      weatherInfo=>{
        console.log('fulfilled')
      }
    )
    return (
      <Country
      country={countriesToShow[0]}
       />)
    }
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
          <CountrySimple
          name={country.name.common}
          country={country}
          clickHandler={toggleShow}
          key={country.name.common} />
      )
    )
  }
}




const App=()=>{
const [filterValue,setFilterValue]=useState('')
const [allCountries,setAllCountries]=useState([])


useEffect(
  ()=>{
    ctservice.getAll()
    .then(
      initialCountries=>{
        setAllCountries(initialCountries)
      }
    )
  }
,[])

const filterHandler=(event)=>{
  setFilterValue(event.target.value)
}

const filteredCountries=allCountries.filter(
  (country)=>{
    var filter=new RegExp(filterValue,'i')
    return country.name.common.match(filter)!=null
  }
)







  return (
    <div>
    <Filter text='find countries' filterValue={filterValue} filterHandler={filterHandler} />
    <Countries
    countriesToShow={filteredCountries}
    />
    </div>
  )
}

export default App
