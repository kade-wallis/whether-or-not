import request from 'superagent'
import { WeatherData } from '../models/weather'

export async function getWeatherWellington() {
  const response = await request.get(
    `https://api.open-meteo.com/v1/forecast?latitude=-41.2968672&longitude=174.7741143&current=temperature_2m`,
  )
  return response.body as WeatherData
}

export async function getWeatherAuckland() {
  const response = await request.get(
    `https://api.open-meteo.com/v1/forecast?latitude=-36.864486&longitude=174.776725&current=temperature_2m`,
  )
  return response.body as WeatherData
}

export async function getWeatherChristchurch() {
  const response = await request.get(
    `https://api.open-meteo.com/v1/forecast?latitude=-43.532055&longitude=172.63623&current=temperature_2m`,
  )
  return response.body as WeatherData
}
