import React from 'react'

function Home () {
  return (
    <div className='Places'>
      <h1>Spots Home</h1>
      <h1>{window.location.origin.toString()}</h1>
    </div>
  )
}

export default Home
