import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const generateStats = () => {
    let all = good + neutral + bad
    return {
      all: all,
      average: (good - bad) / all,
      positive: good * 100 / all 
    }
  }

  const stats = generateStats()

  return (
    <div>
      <h1>give feedback</h1>
      {/* actually not needed bc buttons stack horizontally */}
      <div id="button-container"> 
        <Button text="good" handleClick={() => setGood(good + 1)}/>
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
        <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      </div>
      <h1>statistics</h1>
      <div>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        all {stats.all}
        <br />
        average {stats.average}
        <br />
        positive {stats.positive} %
      </div>
    </div>
  )
}

export default App