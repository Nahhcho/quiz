import '../App.css'
import Question from './Question'

export default function Quiz(props) {
    return (
        <div className='title-page'>
            {props.questions.map((question) => (
                <Question question = {question} />
            ))}
        </div>
    )
}