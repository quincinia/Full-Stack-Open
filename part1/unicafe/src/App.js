import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>
        {props.text} 
      </td>
      <td>
        {props.value} {props.text === "positive" ? "%" : ""}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  let { good, neutral, bad } = props
  let all = good + neutral + bad
  if (all === 0) return (
    <>
      <h1>statistics</h1>
      <div>
        No feedback given
      </div>
    </>
  )
  return (
    <>
      <h1>statistics</h1>
      <table>
        {/* tbody to get rid of errors */}
        <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={(good - bad) / all} />
        <Statistic text="positive" value={good * 100 / all} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      {/* id not needed bc buttons stack horizontally */}
      <div id="button-container"> 
        <Button text="good" handleClick={() => setGood(good + 1)}/>
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
        <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App