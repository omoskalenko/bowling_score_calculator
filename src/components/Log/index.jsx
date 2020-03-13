import React from 'react'

const Log = ({data}) => {
  return (
    <div className="log log-container">

    <ul className="log__list">
      {data.map(iodata => (
        <li key={iodata[1]}>
         <p>{iodata[0]}</p>
         <p>{iodata[1]}</p>
        </li>
      ))}
    </ul>
</div>
  )
}

export default Log
