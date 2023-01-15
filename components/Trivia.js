import React from "react"
import Question from "./Question"
import {nanoid} from "nanoid"

export default function Trivia(props) {
  let displayQuestions = props.questionBlock.map((item) => (
    <Question
        key={item.id}
        questionId={item.id}
        correctAnswer={item.correctAnswer}
        question={item.question}
        answers={item.answers}
        questionBlock={props.questionBlock}
        setQuestionBlock={props.setQuestionBlock}
        heldAnswer={props.heldAnswer}
        score={props.score}
        setScore={props.setScore}
    />
  ));

  return (
    <div className="trivia--game">
        <img className="yellow" src="./images/yellow-start.png" />
        <h2>Test your knowledge!</h2>
        {displayQuestions}
        {!props.hasChecked ? (
            <button
                className="trivia--check-answers"
                onClick={() => props.checkQuestions()}
            >
            Check Answers
            </button>
        ) : (
            <div className="results--container">
                <h2> You scored {props.score}/5 correct answers</h2>
                <button
                    className="game--check-answers"
                    onClick={() => props.playAnotherGame()}
                >
                    Play again
                </button>
            </div>
        )}
        <img className="blue" src="./images/blue-start.png" />
    </div>
  );
}