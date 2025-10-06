function FavoriteList({favorite}){
  return(
     <>
        <div className="summary">
          <h2>Favorites</h2>
        </div>
         <ul className="list">
          {favorite.map((movie) => (
            <FavoriteMovie movie={movie} key={movie.id}/>
          ))}
        </ul>
     </>
  )
}



function FavoriteMovie({movie}){
  return(
    <li >
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
        <div>
          <p>
          <span>🌟</span>
          <span>{movie.voteAverge}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>
        </div>
    </li>
  )
}
export default FavoriteList;