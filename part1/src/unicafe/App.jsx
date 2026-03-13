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

    return (
        <div>
            <h2>Statistics</h2>
            <p>Good {counts.good}</p>
            <p>Neutral {counts.neutral}</p>
            <p>Bad {counts.bad}</p>
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