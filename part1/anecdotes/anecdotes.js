import React, { useState } from "react";

const Button=({clickHandler,text})=>
<>
    <button onClick={clickHandler}>
        {text}
    </button>
</>

const Head=({text})=>
<h1>
    {text}
</h1>

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]


    const [selected, setSelected] = useState(0)
    const [votes,setVotes]=useState(new Array(anecdotes.length).fill(0))

    const generateRandomNum=()=>Math.round(Math.random()*(anecdotes.length-1))
    const nextAnecdote=()=>{
        var randomNum=generateRandomNum()
        while (randomNum===selected)
            randomNum=generateRandomNum()
        setSelected(randomNum)
    }
    const voteforAnecdote=()=>{
        const votescopy=[...votes]
        votescopy[selected]+=1
        setVotes(votescopy)
    }

    return (
        <div>
            <Head text='Anecdote of the day' />
            {anecdotes[selected]}
            <div>
                has {votes[selected]} votes
            </div>
            <Button clickHandler={voteforAnecdote} text='vote' />
            <Button clickHandler={nextAnecdote} text='next anecdote' />
            <Head text='Anecdote with most votes' />
            {anecdotes[votes.indexOf(Math.max(...votes))]}
        </div>
    )
}
export default App