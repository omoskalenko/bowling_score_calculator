import React, { useState, useCallback, useEffect } from 'react'
import Form from './components/Form'
import Score from './components/Score'
import Controller from './controller'
import { JSONtoJS, JSToJSON } from './utils'
import Frames from './components/Frames'
import Log from './components/Log'

function App() {
  // Список фреймов
  const [frames, setFrames] = useState([])
  // Номер фрейма
  const [frameNumber, setFrameNumber] = useState(0)
  // Результаты - броски + счет
  const [scoreHistory, setScoreHistory] = useState([])
  // Текущий счет
  const [score, setScore] = useState(0)
  // Контроллер подсчета баллов
  const [controller] = useState(new Controller())
  const [error, setError] = useState(null)
  const [IOData, setIOData ]= useState([])

  // По обмену данными между контроллером и компонентом для вычисления счета
  const calculateScore = useCallback((frames) => {
    try {
           /**
    * Поготовка данных для отправки в контроллер в виде JSON
    * {
    *  "frames": [
    *    {"first": 3, "second": 4},
    *    {"first": 10, "second": 0},
    *    ...
    *  ]
    * }
    */
   const outputJSONFrames = JSToJSON({ frames })
   // Получение результата подсчета очков
   const inputJSONScore = controller.getScore(outputJSONFrames)
   // Парсинг JSON в JS
   const score = JSONtoJS(inputJSONScore).score
   setIOData(prev => ([...prev, [outputJSONFrames, inputJSONScore]]))
   return score
    } catch(error) {
     setError(`Сalculation error ${error?.message}, try again`)
   }
 }, [controller])

  // Получение состояния игры
  const getGameInfo = useCallback((frames) => {
    try {
      const score = calculateScore(frames)
      // Получение состояния игры у контроллера - номер счета, список результатов всех сыгранных фреймов
      const { frameNumber, results } = controller.gameState

      return {
        score,
        frameNumber,
        results,
      }
    } catch(error) {
      setError(`Error getting game data ${error?.message}, try again`)
    }
  }, [controller, calculateScore])

  useEffect(() => {
    // Получение состояния игры по результатам сыгранного фрейма
    const { score, frameNumber, results } = getGameInfo(frames)

    setScore(score)
    setFrameNumber(frameNumber)
    setScoreHistory(results)
  }, [controller, frames, getGameInfo])

  // Обработчкик для получения данных из формы и сохранение в стэйт
  const handleSubmit = useCallback(values => {
    setFrames(prev => ([...prev, values]))
  }, [])

  return (
      <div className="container">
        <h1>Frame {frameNumber}</h1>
        <div className="row">
          <div className="col">
            <Form frameNumber={frameNumber} end={frames.length === 10} onSubmit={handleSubmit} error={error} />
            <Log data={IOData} />
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


