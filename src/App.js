import React, { useState, useCallback, useEffect } from 'react'
import Form from './components/Form'
import Score from './components/Score'
import Controller from './controller'
import { JSONtoJS, JSToJSON } from './utils'
import Frames from './components/Frames'

function App() {
  // Список фреймов
  const [frames, setFrames] = useState([])
  const [frameNumber, setFrameNumber] = useState(0)
  const [scoreHistory, setScoreHistory] = useState([])
  const [score, setScore] = useState(0)
  const [controller] = useState(new Controller())

  const prepareFrames = (frames) => {
    return JSToJSON({ frames })
  }

  useEffect(() => {
    // Получение счета при изменении frames, передача frames JSON формате:
    // {
    //   "frames": [
    //   {"first": 3, "second": 4},
    //   {"first": 10, "second": 0},
    //   ...
    //   ]
    //  }
    const scoreJSON = controller.getScore(prepareFrames(frames))
    // Парсинг JSON в JS
    const score = JSONtoJS(scoreJSON).score
    // Получение номера текущего фрейма
    const frameNumber = controller.frameNumber
    // Получение результатов всех фреймов
    const results = controller.results

    setScore(score)
    setFrameNumber(frameNumber)
    setScoreHistory(results)
  }, [controller, frames])

  const handleSubmit = useCallback(values => {
    setFrames(prev => ([...prev, values]))
  }, [])

  return (
      <div className="container">
        <h1>Frame {frameNumber}</h1>
        <div className="row">
          <div className="col">
            <Form frameNumber={frameNumber} end={frames.length === 10} onSubmit={handleSubmit} />
          </div>
          <div className="col">
            <Score score={score} />
            <Frames scoreHistory={scoreHistory} />
          </div>
        </div>
      </div>
  )
}

export default App


