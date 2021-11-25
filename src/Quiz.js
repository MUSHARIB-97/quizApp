import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const QuizView = () => {

    // state for the quiz api call
    const [data, setData] = useState([]);

    // state for the quiz question
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    // function to get the api data
    const getApiData = async () => {
        await Axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
            .then(res => {
                setData(res.data.results);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getApiData();
    }, [])

    // merge the incorrect_ansert and the correct_answer
    const inctOpt = data[currentQuestion]?.incorrect_answers;
    let correctAnswer = data[currentQuestion]?.correct_answer;
    inctOpt?.push(correctAnswer);


    //  Shuffle the array
    inctOpt?.sort(() => Math.random() - 0.5);

    const handleAnswerButtonClick = (e) => {
        console.log(e.target.value);
        if (correctAnswer === e.target.value) {
            setScore(score + 1)
        }
    }

    const nextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < data.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            alert("You have reached the end of the quiz!");
            setShowScore(true);
        }
    }

    return (
        <>
            <div className="wrapper d-flex justify-content-center align-items-center">
                {showScore ? (
                    <div className="container d-flex justify-content-center align-items-center">
                        <div className=" bg-light p-5 text-dark shadow rounded d-flex flex-column justify-content-center align-items-center">
                            <h1 className="text-info">Your Score</h1>
                            <p className="fs-2">{score} out of {data.length}</p>
                            <p className="fs-4">Percentage</p>
                        </div>
                    </div>
                ) : (
                    <div className="quiz container d-flex flex-column bg-light shadow-lg col-7">
                        <div className="row py-2 px-3 bg-light text-dark shadow rounded align-items-start">
                            <div className="quiz-header">
                                <div className="col d-flex justify-content-between">
                                    <h2 className="m-0">Welcome!</h2>
                                    <p className="m-0 fs-4 fw-bold font-monospace">60</p>
                                </div>
                            </div>
                        </div>
                        <div className="quiz-body row px-3 mt-3 mb-auto text-dark">
                            <div className="question-count">
                                <p className="text-end fs-5 m-0 fw-bold font-monospace">{currentQuestion + 1} of {data.length} Questions</p>
                            </div>
                            <div className="question mt-4">
                                <h2>{data[currentQuestion]?.question}</h2>
                            </div>
                            <div className="question-option">
                                <div className="d-grid mt-4 col-6 gap-3">
                                    {
                                        inctOpt?.map((e, i) => <button className="btn btn-outline-primary btn-lg rounded-pill" onClick={(e) => handleAnswerButtonClick(e)} key={i} type="button" value={e}>{e}</button>)
                                    }
                                </div>
                            </div>

                            {/* <p>{data[currentQuestion]?.correct_answer}</p> */}
                        </div>
                        <div className="quiz-footer row mt-4 py-2">
                            <div className="col d-flex justify-content-end">
                                <button className="btn btn-outline-primary px-4" onClick={nextQuestion}>Next</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default QuizView;