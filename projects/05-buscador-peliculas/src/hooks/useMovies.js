import withResults from '../mocks/with-results.json'
import withoutResults from '../mocks/no-results.json'
import { useRef, useState } from 'react'

export function useMovies ({ search }) {
  const [responseMovies, setResponseMovies] = useState([])
  const lastSearch = useRef(search)

  const movies = responseMovies.Search

  const mappedMovies = movies?.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  const getMovies = () => {
    if (lastSearch.current !== search) {
      lastSearch.current = search
    } else {
      return
    }
    if (search) {
      // setResponseMovies(withResults)
      fetch(`http://www.omdbapi.com/?s=${search}&apikey=${import.meta.env.VITE_API_KEY}`)
        .then(response => response.json())
        .then(data => setResponseMovies(data))
    } else {
      setResponseMovies(withoutResults)
    }
  }

  return ({ movies: mappedMovies, getMovies })
}
