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
  const [message, setMessage] = useState('Waiting for input...')


  const walkThreshold = 15 // Minimum temperature for walking

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

      // Check temperature and set appropriate message
      if (temperature >= walkThreshold) {
        setMessage(
          `The temperature in ${city} is ${temperature}°C — you can go for a walk!`,
        )
      } else {
        setMessage(
          `The temperature in ${city} is ${temperature}°C — better stay inside!`,
        )
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
      <h4>{message}</h4>
    </div>
  )
}
