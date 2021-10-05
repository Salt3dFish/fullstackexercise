import React, { useState } from 'react'

const Button = ({ text, clickHandler }) =>
    <button onClick={clickHandler}>{text}</button>


const StatisticLine = ({ content, value }) =>
    <tr>
        <td>{content}</td>
        <td>{value}</td>
    </tr>
const Head = ({ content }) =>
    <h1>{content}</h1>

const StatisticLine2 = ({ content1, value, content2 }) =>
    <tr>
        <td>{content1}</td>
        <td>{value}</td>
        <td>{content2}</td>
    </tr>

const Statistic = ({ good, neutral, bad }) => {
    const getAverage = (good, neutral, bad) => {
        const sum = good + neutral + bad
        if (sum === 0)
            return 0
        return (good - bad) / sum
    }
    const getPositive = (good, neutral, bad) => {
        const sum = good + neutral + bad
        if (sum === 0)
            return 0
        return (good / sum * 100)
    }
    if (good+neutral+bad===0)
        return <div>No feedback gives</div>
    return (
    <table>
        <tbody>
        <StatisticLine content='good' value={good} />
        <StatisticLine content='neutral' value={neutral} />
        <StatisticLine content='bad' value={bad} />
        <StatisticLine content='all' value={good + neutral + bad} />
        <StatisticLine content='average' value={getAverage(good, neutral, bad)} />
        <StatisticLine2 content1='positive' value={getPositive(good, neutral, bad)} content2='%' />
        </tbody>
    </table>
    )
}






const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const setIncreaseByOne = (state, stateHandler) => {
        return () => stateHandler(state + 1)
    }


    return (
        <div>
            <Head content='give feedback' />
            <Button text='good' clickHandler={setIncreaseByOne(good, setGood)} />
            <Button text='neutral' clickHandler={setIncreaseByOne(neutral, setNeutral)} />
            <Button text='bad' clickHandler={setIncreaseByOne(bad, setBad)} />
            <Head content='statistics' />
            <Statistic good={good} neutral={neutral} bad={bad} />
        </div>
    )





}
export default App