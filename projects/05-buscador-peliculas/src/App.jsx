import './App.css'
import withResults from './mocks/with-results.json'
import withoutResults from './mocks/no-results.json'
import { Movies } from './components/Movies'

function App () {
  const movies = withResults.Search
  const mappedMovies = movies.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  return (
    <div className='page'>
      <h1>Buscador  Peliculas</h1>
      <header>
        <form className='form'>
          <input type='text' name='search' id='search' />
          <button type='submit'>Search</button>
        </form>
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  )
}

export default App
