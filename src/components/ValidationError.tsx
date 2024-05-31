import React from 'react'


interface ValidationProps 
{
    msg:string
}

const ValidationError = ({msg}:ValidationProps) => {
  return (
    <div>
        <p className='text-red-600 my-1'>{msg}</p>
    </div>
  )
}


export default ValidationError