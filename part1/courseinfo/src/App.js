import React from 'react'

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
      <Header course={course} />
      <Content parts={[
        {name: part1, exercises: exercises1},
        {name: part2, exercises: exercises2},
        {name: part3, exercises: exercises3}
      ]} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <div>
    {
      props.parts.map((item, index) => (
        <Part 
          name={item.name} 
          exercises={item.exercises} 
          key={index}
        />
      ))
    }
  </div>
)

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Total = (props) => (
  <p>Number of exercises {props.exercises.reduce((acc, item) => acc + item, 0)}</p>
)
export default App