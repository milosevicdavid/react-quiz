import React, { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import "./App.css";
import results from "./results.json";
import _ from "lodash";

function App() {
    const [number, setNumber] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [answers, setAnswers] = useState([[]]);
    const [quizing, setQuizing] = useState(true);

    useEffect(() => {
        const newanswers = results.map((item) => {
            return _.shuffle([...item.incorrect_answers, item.correct_answer]);
        });
        setAnswers(newanswers);
    }, []);

    const data = [
        { title: "One", key: 'Correct', value: correct, color: "lightblue" },
        { title: "Two", value: (10 - correct) , color: "yellow" },
    ];

    const nextNumber = () => {
        if (number < 9) {
            setNumber(number + 1);
        } else {
            setQuizing(false);
        }
    };

    const compareIfTrue = (someItem) => {
        if (someItem === results[number].correct_answer) {
            setCorrect((num) => num + 1);
        }
        nextNumber();
    };

    console.log(correct);

    return (
        <div className="quiz-container">
            {quizing ? (
                <div className="quiz-wrapper">
                    <ul>
                        <li>
                            <p className="quiz-question">
                                {results[number].question}
                            </p>
                        </li>
                        {answers[number].map((item, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => compareIfTrue(item)}
                                    className="selected"
                                >
                                    <span className="item">{item}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
            <div className="piechart">
                <PieChart data={data} />
            </div>
            )}
            {quizing && (
                <div className="button-wrapper">
                    <button onClick={nextNumber}>Skip >></button>
                </div>
            )}
        </div>
    );
}

export default App;
