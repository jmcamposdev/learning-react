import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch()

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  return (
    <div className='page'>
      <h1>Buscador  Peliculas</h1>
      <header>
        <form className='form' onSubmit={handleSubmit}>
          <input type='text' name='query' id='query' onChange={handleChange} value={search} />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type='submit'>Search</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
