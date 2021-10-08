import React from 'react'

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}
const Part = ({part}) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}
const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part)=><Part part={part} key={part.id} />)}
    </div>
  )
}
const Total = ({parts}) => {
  return (
    <div>
      <strong >total of {parts.reduce((sum,part)=>sum+part.exercises,0)} exercises </strong>
    </div>
  )
}

const Course=({course})=> {

  return (
    <div>
    <Header text={course.name} key={'head'+course.id}/>
    <Content parts={course.parts} key={'content'+course.id} />
    <Total parts={course.parts} key={'total'+course.id} />
    </div>
  )

}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  const course1 = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
    <Header text='Web development curriculum' />
    {courses.map((course)=><Course course={course} key={course.id} />)}
    </div>
  )
}

export default Course
