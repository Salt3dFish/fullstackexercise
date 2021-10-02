import React from 'react'

const Head = (props) =>{
  return (
    <>
    <h1>{props.course}</h1>
    </>
  )
}
const Part=(props)=>{
  return (
    <>
    <p>{props.part} {props.exer}</p>
    </>
  )
}
const Content=(props)=>{
  return (
    <>
    <Part part={props.part[0]} exer={props.exer[0]} />
    <Part part={props.part[1]} exer={props.exer[1]} />
    <Part part={props.part[2]} exer={props.exer[2]} />
    </>
  )
}
const Total=(props)=>{
  return (
    <>
    <p>Number of exercises {props.exer1+props.exer2+props.exer3}</p>
    </>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Head name={course} />
      <Content part={[part1,part2,part3]} exer={[exercises1,exercises2,exercises3]} />
      <Total exer1={exercises1} exer2={exercises2} exer3={exercises3} />
    </div>
  )
}

export default App