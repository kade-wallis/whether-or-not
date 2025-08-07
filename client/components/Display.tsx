import {
  getWeatherWellington,
  getWeatherAuckland,
  getWeatherChristchurch,
} from '../apiClient'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export function Display() {
  const [city, setCity] = useState('')
  const [message, setMessage] = useState('Waiting for input...')

  const dataWLG = useQuery({ queryKey: [city], queryFn: getWeatherWellington })
  console.log(dataWLG)

  function handleClick(city: string) {
    setCity(city)
  }

  const walkThreshold = 15 //check with Kade

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
      <button onClick={() => handleClick('Wellington')}>Wellington</button>
      <button onClick={() => handleClick('Auckland')}>Auckland</button>
      <button onClick={() => handleClick('Christchurch')}>Christchurch</button>
      <h4>{message}</h4>
    </div>
  )
}
