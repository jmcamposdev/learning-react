import { useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search }) {
  const [movies, setMovies] = useState([])
  const lastSearch = useRef(search)

  const getMovies = async () => {
    if (lastSearch.current !== search) {
      lastSearch.current = search
    } else {
      return
    }

    setMovies(await searchMovies(search))
  }

  return ({ movies, getMovies })
}
