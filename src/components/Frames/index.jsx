import React from 'react'

const Frames = ({
  scoreHistory
}) => {
  return (
    <div className="table-container">
    <table className="result-table">
      <thead>
          <tr>
              <th>Frame</th>
              <th>First roll</th>
              <th>Second roll</th>
              <th>Third roll</th>
              <th>Score</th>
          </tr>
      </thead>
      <tbody>
      {scoreHistory.map((frame, i) => {
        const { first, second, third, score } = frame
        return (
        <tr>
          <th>{i + 1}</th>
          <td>{first}</td>
          <td>{second}</td>
          <td>{third}</td>
          <td>{score}</td>
        </tr>)
      })}
      </tbody>
    </table>
    </div>
  )
}

export default Frames
