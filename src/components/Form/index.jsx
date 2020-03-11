import React, { useState } from 'react'

const Form = ({
  onSubmit,
  frameNumber,
  end
}) => {
  const [rolls, setRolls] = useState({})

  const handleSubmit = e => {
    e.preventDefault()

    if (Object.values(rolls).length < 2) {
      alert('Not all rolls entered')
      return
    }
    if (end) {
      alert('This was the last frame')
      return
    }
    onSubmit(rolls)
  }

  const handleChange = e => {
    const { id, value } = e.target
    setRolls({
      ...rolls,
      [id]: +value
    })
  }

  const Input = ({
    name,
    onChange,
  }) => {
    const id = name.toLowerCase()
    return (
      <div className="input-group__field input-field">
        <label htmlFor={id}>{name}</label>
        <input
          placeholder="Number of pins"
          id={id}
          type="number"
          className="validate"
          value={rolls[id]}
          min={0}
          max={10}
          onChange={onChange}
        />
      </div>
    )
  }

  const form = () => (
    <form className="main-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <h2>Rolls</h2>
        <Input name="First" onChange={handleChange} />
        <Input name="Second" onChange={handleChange} />
        {(((rolls.first === 10) || (rolls.second === 10)) && (frameNumber === 10)) && (
          <Input name="Third" onChange={handleChange} />
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
