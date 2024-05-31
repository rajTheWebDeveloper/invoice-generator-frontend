import React from 'react'
import { Audio } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='w-[100vw] min-h-[100vh] absolute top-0 left-0 flex justify-center items-center'>
    <Audio
        height="80"
        width="80"
        color="blue"
        ariaLabel="loading"
        />
    </div>
  )
}

export default Loading