import { useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    updateSearch(event.target.value)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <h1>Buscador  Peliculas</h1>
      <header>
        <form className='form' onSubmit={handleSubmit}>
          <input type='text' name='query' id='query' onChange={handleChange} value={search} />
          <label htmlFor='order'>
            Order by name
            <input type='checkbox' name='order' id='order' onChange={handleSort} checked={sort} />
          </label>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type='submit'>Search</button>
        </form>
      </header>

      <main>
        {loading
          ? <p>Loading...</p>
          : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App
