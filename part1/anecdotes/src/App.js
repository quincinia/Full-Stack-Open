import React, { useState } from 'react'

const Display = (props) => {
  let { title, content, votes } = props
  return (
    <>
      <h1>{title}</h1>
      <div>{content}</div>
      <div>has {votes} votes</div>
    </>
  )
}

// generates an int from [min, max]
function genInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // so that a different quote is displayed every time
  const genExcept = (i) => {
    let newIndex = genInt(0, anecdotes.length-1)
    while (newIndex === selected)
      newIndex = genInt(0, anecdotes.length-1)
    return newIndex
  }

  const voteFor = (i) => {
    const copy = [...votes]
    copy[i]++
    setVotes(copy)
  }

  // index of anecdote with most votes
  let mostVotes = votes.reduce((acc, item, index) => (votes[index] > votes[acc]) ? index : acc, 0)


  return (
    <div>
      <Display 
        title="Anecdote of the day" 
        content={anecdotes[selected]}
        votes={votes[selected]}
      />
      <div>
        <button onClick={() => voteFor(selected)}>
          vote
        </button>
        <button onClick={() => setSelected(genExcept(selected))}>
          next anecdote
        </button>
      </div>
      <Display
        title="Anecdote with the most votes"
        content={anecdotes[mostVotes]}
        votes={votes[mostVotes]}
      />
    </div>

  )
}

export default App