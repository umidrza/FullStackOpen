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
    const average = sum === 0 ? 0 : (good - bad) / sum;
    const positive = sum === 0 ? 0 : good * 100 / sum;

    return (
        <div>
            <h2>Statistics</h2>
            <p>Good {good}</p>
            <p>Neutral {neutral}</p>
            <p>Bad {bad}</p>
            <p>All {sum}</p>
            <p>Average {average}</p>
            <p>Positive {positive} %</p>
        </div>
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