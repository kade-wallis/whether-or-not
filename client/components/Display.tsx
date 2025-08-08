import {
  getWeatherWellington,
  getWeatherAuckland,
  getWeatherChristchurch,
} from '../apiClient'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { WeatherData } from '../../models/weather'

export function Display() {
  // Set up state to track selected city and display message
  const [city, setCity] = useState('')
  const [tempMessage, setWeatherMessage] = useState('')
  const [rainMessage, setRainMessage] = useState('')
  const [windMessage, setWindMessage] = useState('')
  const [verdict, setVerdict] = useState('Choose a city to see the verdict!')

  const walkThreshold = 15 // Minimum temperature for walking
  const windThreshold = 20 // Maximum wind allowed for walking

  // Fetch weather data when a city is selected
  const { data, isSuccess, isLoading, isError } = useQuery<
    WeatherData | undefined
  >({
    queryKey: ['weather', city], // Track query by city
    queryFn: async () => {
      // Return the correct weather function based on the selected city
      if (city === 'Wellington') return getWeatherWellington()
      if (city === 'Auckland') return getWeatherAuckland()
      if (city === 'Christchurch') return getWeatherChristchurch()
    },
    enabled: !!city, // Only run query if city is selected
  })

  // Update the message when new data arrives
  useEffect(() => {
    if (isSuccess && data) {
      const temperature = data.current.temperature_2m
      const rain = data.current.precipitation
      const rainUnit = data.current_units.precipitation
      const windSpeed = data.current.wind_speed_10m

      // Check temperature and set appropriate message
      if (temperature >= walkThreshold && windSpeed <= windThreshold) {
        setWeatherMessage(`The temperature in ${city} is ${temperature}°C`)
        setRainMessage(`Rain level: ${rain}${rainUnit}`)
        setWindMessage(`Wind (km/h): ${windSpeed}`)
        setVerdict(`Its a good day for a walk! 🌞`)
      } else if (temperature < walkThreshold || windSpeed > windThreshold) {
        setWeatherMessage(`The temperature in ${city} is ${temperature}°C`)
        setRainMessage(`Rain level: ${rain}${rainUnit}`)
        setWindMessage(`Wind (km/h): ${windSpeed}`)
        setVerdict('You should probably stay inside! 🥶')
      }
    }
  }, [isSuccess, data, city])

  return (
    <div>
      {/* Buttons to choose a city */}
      <button onClick={() => setCity('Wellington')}>Wellington</button>
      <button onClick={() => setCity('Auckland')}>Auckland</button>
      <button onClick={() => setCity('Christchurch')}>Christchurch</button>

      {/* Display loading, error, or the weather message */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong. Try again.</p>}
      <h2>{verdict}</h2>
      <h4>{tempMessage}</h4>
      <h4>{rainMessage}</h4>
      <h4>{windMessage}</h4>
    </div>
  )
}
