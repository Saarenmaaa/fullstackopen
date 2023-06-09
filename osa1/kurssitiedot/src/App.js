const App = () => {
  const course = {
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
  const Header = (props) => {
    return (
    <div>
      <h1>{props.course}</h1>
    </div>
    )
  }

  const Part = (props) => {
    return (
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }

  const Content = (props) => {
    const part = props.parts
    return (
    <div>
      <Part part={part[0]}/>
      <Part part={part[1]}/>
      <Part part={part[2]}/>
    </div>
    )
  }

  const Total = (props) => {
    const exercises = props.parts.map(x => x.exercises)
    return (
    <div>
      <p>Number of courses {exercises[0] + exercises[1] + exercises[2]}</p>
    </div>
    )
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App