import axios from 'axios'
import { Movie } from '@/types/movie'

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

export async function fetchPopularMovies(page: number): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log('Fetched popular movies:', data.results)
    return data.results
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    return []
  }
}

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    })
    console.log('Fetched trending movies:', response.data.results)
    return response.data.results
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    return []
  }
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        query,
        page: 1,
      },
    })
    return response.data.results
  } catch (error) {
    console.error('Error searching movies:', error)
    return []
  }
}