import React from "react"

export default function Start(props) {
    return(
        <div className="start">
            <img className="yellow" src="./images/yellow-start.png" />
            <div className="start--text">
                <h2>Quizzical</h2>
                <p>Let's test your knowledge!</p>
                <button className="start--quiz" onClick={props.handleClick}>Start quiz</button>
            </div>
            <img className="blue" src="./images/blue-start.png" />
        </div>
    )
}