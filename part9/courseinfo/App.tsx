import React from 'react';
import CoursePart from './types';

const Header = ({ name }: { name: string }) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
}
const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <h3>{part.name} {" "} {part.exerciseCount}</h3>
          {part.description}
        </p>
      )
    case 'groupProject':
      return (
        <p>
          <h3>{part.name} {part.exerciseCount}</h3>
          project exercises {part.groupProjectCount}
        </p>
      )
    case 'submission':
      return (
        <p>
          <h3>{part.name} {part.exerciseCount}</h3>
          {part.description}
          <br></br>
          submit to {part.exerciseSubmissionLink}
        </p>
      )
    case 'special':
      return (
        <p>
          <h3>{part.name} {part.exerciseCount}</h3>
          {part.description}
          <br></br>
          required skills: {part.requirements.join(',')}
        </p>
      )
    default:
      return <p>unknown type</p>
  }
}
const Content = ({ CourseParts }: { CourseParts: Array<CoursePart> }) => {
  return (
    <div>
      {CourseParts.map(
        p => <Part part={p} key={p.name} />
      )}
    </div>
  )
}
const Total = ({ CourseParts }: { CourseParts: Array<CoursePart> }) => {
  return (
    <div>
      Number of exercises{" "}
      {CourseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  )
}



const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const CourseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
      <Content CourseParts={CourseParts} />
      <Total CourseParts={CourseParts} />
    </div>
  );
};

export default App;