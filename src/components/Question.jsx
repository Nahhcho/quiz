import { useEffect, useState } from 'react'
import '../App.css'

export default function Question(props) {

    const [answers, setAnswers] = useState([])

    useEffect(() => {
        setAnswers()
    })

    return (
        <div id={props.question} className='question-container'>
            <h6>{props.question.question}</h6>
            <div className='choices'>
                {props.question.incorrect_answers.map((answer) => (
                    <button key={answer}>{answer}</button>
                ))}
            </div>
        </div>
    )
}