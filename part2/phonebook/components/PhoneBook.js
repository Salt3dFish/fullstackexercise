import React from 'react'

const Header=({text})=>
  <h2>
    {text}
  </h2>

const Person=({name,number,toggleDelete})=>
  <p>
    {name}:{number}
    <button onClick={toggleDelete}>delete</button>
  </p>



const Input=({text,inputValue,changeHandler})=>
  <div>
    {text}: <input value={inputValue} onChange={changeHandler} />
  </div>


export default Person
export {Header,Input}
