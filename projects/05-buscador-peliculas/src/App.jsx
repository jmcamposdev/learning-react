import './App.css'
import withResults from './mocks/with-results.json'
import withoutResults from './mocks/no-results.json'
import { Movies } from './components/Movies'

function App () {
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
        <Movies movies={withResults.Search} />
      </main>
    </div>
  )
}

export default App
