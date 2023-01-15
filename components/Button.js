import React from "react"
const he = require("he");

export default function Button(props) {
    function buttonStyle(item) {
        let myStyle = {};

        if (item.isCheckedWrong) {
        myStyle = {
            backgroundColor: "#F8BCBC",
            border: "none",
            opacity: 0.5,
        };
        return myStyle;
        } else if (item.isCheckedCorrect) {
        myStyle = {
            backgroundColor: "#94D7A2",
            border: "none",
        };
        return myStyle;
        } else if (item.isFaded) {
        myStyle = {
            opacity: 0.5,
        };
        return myStyle;
        } else {
        myStyle = {
            backgroundColor: item.isHeld ? "#D6DBF5" : "#f5f7fb",
        };
        return myStyle;
        }
    }
    
    return (
        <button
            onClick={(e) => props.heldAnswer(props.item.id, props.questionId)}
            className="question--answers"
            id={props.item.id}
            isHeld={props.item.isHeld}
            value={props.value}
            style={buttonStyle(props.item)}
            >
            {`   ${he.decode(props.value)}   `}   
        </button>
    )
}