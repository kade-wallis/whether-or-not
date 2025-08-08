import { useState } from 'react'
import { Display } from './Display'

function App() {
  return (
    <div>
      <img className="weathericon" src="/images/weathericon.png" alt="" />
      <h1>Weather or Not</h1>
      <h2>...to go for a walk</h2>
      <br></br>
      <br></br>
      <p>Select your Location!</p>
      <Display />
    </div>
  )
}

export default App
