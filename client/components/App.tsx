import { useState } from 'react'
import { Display } from './Display'

function App() {
  // const [message, setMessage] = useState('')
  // const [temp, setTemp] = useState<number | null>(null)
  // const [city, setCity] = useState('')

  // async function handleClick(city: string) {
  //   let data

  //   if (city === 'Wellington') {
  //     data = await getWeatherWellington()
  //   } else if (city === 'Auckland') {
  //     data = await getWeatherAuckland()
  //   } else if (city === 'Christchurch') {
  //     data = await getWeatherChristchurch()
  //   }

  // const temperature = data.current.temperature_2m
  // setTemp(temperature)

  // const walkThreshold = 15 //check with Kade

  // if (temperature > walkThreshold) {
  //   setMessage(
  //     `The temperature right now is ${temperature}°C, you can go for a walk!`,
  //   )
  // } else {
  //   setMessage(
  //     `The temperature right now is ${temperature}°C, you must stay inside!`,
  //   )
  // }

  return (
    <div>
      <h1>Weather or Not (to go for a walk)</h1>

      <p>Select Location</p>
      <Display />
    </div>
  )
}

export default App
