
export default function MovieList({movies, onSelectMovie}){
  return(
    <ul className="list list-movies">
        
      {movies?.map((movie) => (
      <Movie movie={movie} key={movie.id} onSelectMovie={onSelectMovie}/>  
    ))}
    </ul>
  )
}

function Movie({movie, onSelectMovie}){
  return(
    <li  onClick={() => onSelectMovie(movie.id)}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
        <h3>{movie.title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.release_date}</span>
          </p>
        </div>
    </li> 
  )
}
