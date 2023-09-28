import React from 'react'
import './App.css'
import Quiz from './components/Quiz'


const API_URL = "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple"

function App() {

  const [questions, setQuestions] = React.useState([])

  const updateQuestions = () => {
    fetch(`${API_URL}`)
    .then(response => response.json())
    .then(questions=> {
      console.log(questions.results)
      setQuestions(questions.results)
    })
  }

  React.useEffect(() => {
    updateQuestions()
  }, [])


  return (
    <>
    {questions?.length > 0 ? (<Quiz questions={questions} />) : (null)}
    </>
  );
}

export default App;
