import React from 'react'

  // Компонент поля ввода
  const Input = ({
    name,
    onChange,
    rolls
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

export default Input
