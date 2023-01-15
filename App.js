import React from "react"
import {nanoid} from "nanoid"

import Start from "./components/Start"
import Trivia from "./components/Trivia"
import shuffleArray from "./shuffle";

export default function App() {
    const [questionBlock, setQuestionBlock] = React.useState([])
    const [gameStatus, setGameStatus] = React.useState(false)
    const [hasChecked, setHasChecked] = React.useState(false)
    const [score, setScore] = React.useState(0)
    
    React.useEffect(function() {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium")
            .then(res => res.json())
            .then(data => setQuestionBlock(formatQuizData(data.results)));
    }, [gameStatus])
  
    function playAnotherGame() {
        setGameStatus(prevState => !prevState)
        setTimeout(() => newGame(), 0);
    }
    
    function newGame() {
        setGameStatus(prevState => !prevState)
        setScore(0)
        setHasChecked(false)
    }
    
    function checkQuestions() {
        setScore(0);
        setQuestionBlock((prevData) =>
            prevData.map((item) => {
                let checkedAnswers = item.answers.map((answer) => {
                    if (answer.isHeld && item.correctAnswer === answer.value) {
                        setScore((prevScore) => prevScore + 1);
                        return ({
                        ...answer,
                        isCheckedCorrect: true,
                        });
                    } else if (answer.isHeld && item.correctAnswer !== answer.value) {
                        return ({
                        ...answer,
                        isCheckedWrong: true,
                        });
                    } else if (!answer.isHeld && item.correctAnswer === answer.value) {
                        return ({
                        ...answer,
                        isCheckedCorrect: true,
                        });
                    } else {
                        return ({
                        ...answer,
                        isFaded: true,
                        });
                    }
                    });
                return {
                ...item,
                answers: checkedAnswers,
                };
            })
            );
        setHasChecked(true);
    }
    
    function heldAnswer(answerId, questionId) {
        setQuestionBlock((prevQuestions) =>
            prevQuestions.map((item) => {
                if (item.id === questionId) {
                let newAnswersArray = item.answers.map((answer) => {
                    if (answer.id === answerId) {
                    return {
                        ...answer,
                        isHeld: true,
                    };
                    } else {
                    return {
                        ...answer,
                        isHeld: false,
                    };
                    }
                });
                return {
                    ...item,
                    answers: newAnswersArray,
                };
                } else {
                return item;
                }
            })
        );
    }
    
    function formatQuizData(questionsArray) {
        let formattedData = questionsArray.map((item) => {
            return {
                id: nanoid(),
                question: item.question,
                correctAnswer: item.correct_answer,
                answers: shuffleArray([...item.incorrect_answers, item.correct_answer]),
                score: 0,
            };
            });

        return formattedData;
  }


    
    return (
        <div>
            {!gameStatus && <Start handleClick={newGame} />}
            {gameStatus && <div className="question-answer-container">
                <Trivia
                    questionBlock={questionBlock}
                    setQuestionBlock={setQuestionBlock}
                    key={nanoid()}
                    hasChecked={hasChecked}
                    setHasChecked={setHasChecked}
                    heldAnswer={heldAnswer}
                    checkQuestions={checkQuestions}
                    score={score}
                    setScore={setScore}
                    playAnotherGame={playAnotherGame}
                />
                <br />
            </div>}
        </div>
    )
}
