import { useState } from "react";

const Feedback = ({makeFeedback}) => {
    return (
        <div>
            <h2>Give Feedback</h2>
            <Button content={"Good"} onClick={() => makeFeedback("good")}/>
            <Button content={"Neutral"} onClick={() => makeFeedback("neutral")}/>
            <Button content={"Bad"} onClick={() => makeFeedback("bad")}/>
        </div>
    )
}

const Button = ({content, onClick}) => {
    return <button onClick={onClick}>{content}</button>;
}

const Statistics = ({counts}) => {
    const {good, neutral, bad} = counts;
    const sum = good + neutral + bad;

    if (sum === 0){
        return (
            <div>
                <h2>Statistics</h2>
                <p>No feedback given</p>
            </div>
        )
    }

    const average = (good - bad) / sum;
    const positive = good * 100 / sum;

    return (
        <div>
            <h2>Statistics</h2>
            <table>
                <tbody>
                    <StatisticLine text={"Good"} value={good}/>
                    <StatisticLine text={"Neutral"} value={neutral}/>
                    <StatisticLine text={"Bad"} value={bad}/>
                    <StatisticLine text={"All"} value={sum}/>
                    <StatisticLine text={"Average"} value={average}/>
                    <StatisticLine text={"Positive"} value={positive} symbol={"%"}/>
                </tbody>
            </table>
        </div>
    )
}

const StatisticLine = ({text, value, symbol}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value} {symbol && ` ${symbol}`}</td>
        </tr>
    )
}


const App = () => {
    const [counts, setCounts] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    });

    function makeFeedback(type) {
        setCounts(prev => ({
            ...prev,
            [type]: prev[type] + 1
        }));
    }

    return (
        <>
            <Feedback makeFeedback={makeFeedback}/>
            <Statistics counts={counts}/>
        </>
    )
}

export default App