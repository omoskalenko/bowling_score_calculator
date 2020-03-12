import React, { useState } from 'react'
import Input from '../Input'

const Form = ({
  onSubmit,
  frameNumber,
  end
}) => {
  const [rolls, setRolls] = useState({})

  // Обработчик отправки данных формы
  const handleSubmit = e => {
    e.preventDefault()
    // Предупреждение если заполнены не все поля
    if (Object.values(rolls).length < 2) {
      alert('Not all rolls entered')
      return
    }
    // Предупреждение если все фреймы сыграны
    if (end) {
      alert('This was the last frame')
      return
    }
    if (frameNumber !== 10 && (rolls.first + rolls.second) > 10) {
      alert('The amount of pins knocked down must not exceed 10')
      return
    } else if (frameNumber === 10 && (rolls.first + rolls.second +rolls.third) > 30) {
      alert('The amount of pins knocked down must not exceed 30')
    }
    onSubmit(rolls)
  }

  // Обработчких изменения данных полей формы
  const handleChange = e => {
    const { id, value } = e.target
    setRolls({
      ...rolls,
      [id]: +value
    })
  }

  const form = () => (
    <form className="main-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <h2>Rolls</h2>
        <Input name="First" onChange={handleChange} rolls={rolls}/>
        <Input name="Second" onChange={handleChange} rolls={rolls}/>
        {/* Если это последний фрейм и выбит страйк или спэа то отображается инпут для ввода третьего броска */}
        {(((rolls.first === 10) || (rolls.second === 10)) && (frameNumber === 10)) && (
          <Input name="Third" onChange={handleChange} rolls={rolls}/>
        )}
      </div>
      <div className="row">
        <button className="btn" type="submit" name="action" disabled={end}>Submit
      </button>
      </div>
    </form>
  )

  const endScreen = () => <h1>Game Over</h1>

  return (
    <div className="form-container">
      {end ? endScreen() : form()}
    </div>
  )
}

export default Form
