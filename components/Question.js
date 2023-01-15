import Button from "./Button"
import React from "react"
const he = require("he");

export default function Question(props) {

    const listAnswers = props.answers.map(item => (
        <Button
            isHeld={item.isHeld}
            value={he.decode(item.value)}
            item={item}
            questionBlock={props.questionBlock}
            setQuestionBlock={props.setQuestionBlock}
            questionId={props.questionId}
            heldAnswer={props.heldAnswer}
            score={props.score}
            setScore={props.setScore}
        />
        )
    )
    return (
        <div className="question--box">
            <h3 className="question--question">{he.decode(props.question)}</h3>
            {listAnswers}
            <div className="border"></div>
        </div>
    )
}