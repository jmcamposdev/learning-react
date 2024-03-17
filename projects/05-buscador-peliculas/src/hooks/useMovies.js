import { useCallback, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const lastSearch = useRef(search)

  const getMovies = async () => {
    if (lastSearch.current === search) return

    try {
      setLoading(true)
      setError(null)
      lastSearch.current = search
      const newMovies = await searchMovies(search)
      setMovies(newMovies)
    } catch (error) {
      setError('Error fetching movies')
    } finally {
      setLoading(false)
    }
  }

  // We use useCallback to avoid creating a new function on every render
  const sortMovie = useCallback(() => {
    sort
      ? setMovies([...movies].sort((a, b) => a.title.localeCompare(b.title)))
      : setMovies([...movies].sort((a, b) => b.title.localeCompare(a.title)))
  }
  , [sort, movies])

  return ({ movies, getMovies, loading, error })
}
