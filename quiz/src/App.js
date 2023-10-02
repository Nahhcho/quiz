import './App.css'
import React, { useEffect, useRef, useState } from 'react'

const API_URL = 'https://opentdb.com/api.php?amount=4'

function Questions(props) {
  const [gameState, setGameState] = useState({
    questions: [],
    choices: [],
    correct_answers: []
  });
  const isInitialMount = useRef(true);

  useEffect(() => {
      if(isInitialMount.current) {
        isInitialMount.current = false;
      }
      else {
        updateQuestions();
      }
    }
    , [])

    useEffect(() => {
      console.log(gameState.choices);
    }, [gameState.choices])

    const updateQuestions = () => {
      fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        const resultQuestions = result.results;
        const answers = []
        resultQuestions.forEach(question => {
          question.incorrect_answers.push(question.correct_answer);
          shuffleAnswers(question.incorrect_answers);
          answers.push(question.correct_answer);
        })
        setGameState({
          ...gameState,
          questions: resultQuestions,
          correct_answers: answers
        })
        console.log(resultQuestions)
      })
    }

  const updateChoices = (question, answer) => {
    let oldChoices = [...gameState.choices]
    let noChoice = true
    let oldChoice = null

    oldChoices.map((choice) => {
      if(question.incorrect_answers.indexOf(choice) !== -1) {
        oldChoice = choice;
        noChoice = false;
      }
    })

    if(noChoice) {
      oldChoices.push(answer)
      setGameState({...gameState, choices: oldChoices})
    }
    else if (!noChoice && oldChoice != answer) {
      const newChoices = oldChoices.filter(choice => choice !== oldChoice)
      newChoices.push(answer)
      setGameState({...gameState, choices: newChoices})
    }
  }
  

  function shuffleAnswers(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i
      const randomIndex = Math.floor(Math.random() * (i + 1));
  
      // Swap elements array[i] and array[randomIndex]
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  }

  return (
    <div className='question-screen'>
      {
        gameState.questions?.length > 0 ? (gameState.questions.map(question => (
          <div className='question-container' key={question.question}>
            <header className='question-text'>{question.question}</header>
            <section className='answer-container'>
              {
                (question.incorrect_answers.map((answer) => (
                  <button className={'answer'} key={answer} onClick={() => updateChoices(question, answer)}>{answer}</button>
                )))
              }
              <br />
              <hr className='line'/>
            </section>
          </div>
        ))) : (null)
      }
      <button>Submit Questions</button>
    </div>
  )
}


function Intro(props) {

  return (
      <div className='screen'>
          <header className='intro-header'>Quizzical</header>
          <br />
          <section className='intro-description'>Some description if needed</section>
          <br />
          <button onClick={props.onClick} className='intro-button'>Start Quiz</button>
      </div>
  )
}

function App() {
  const [display, setDisplay] = useState({
    introDipslay: true,
    questionsDisplay: false
  })

  const renderQuestions = () => {
    setDisplay({
      introDipslay: false,
      questionsDisplay: true
    })
  }

  const renderIntro = () => {
    setDisplay({
      introDipslay: true,
      questionsDisplay: false
    })
  }

  return (
    <>
    {
      display.introDipslay ? (<Intro onClick={renderQuestions}/>) : (<Questions />)
    }
    </>
  );
}

export default App;
