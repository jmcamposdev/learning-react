function ListOfMovies ({ movies }) {
  return (
    <ul className='movie-list'>
      {
        movies.map(movie => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}

function NoMoviesResults () {
  return (
    <p>No se han encontrado peliculas</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResults />
  )
}
