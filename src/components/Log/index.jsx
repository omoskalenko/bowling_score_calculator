import React from 'react'

const Log = ({data}) => {
  return (
    <div>
      {data.map(iodata => (
        <>
         <p>{iodata[0]}</p>
         <p>{iodata[1]}</p>
        </>
      ))}

    </div>
  )
}

export default Log
