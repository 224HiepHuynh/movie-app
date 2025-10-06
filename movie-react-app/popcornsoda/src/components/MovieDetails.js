import { useEffect, useState } from "react";

export default  function MovieDetails({selectedId, onCloseMovie,imageBaseUrl, onAddFavorite, favorite}) {
    const [movieDetails, setMovieDetails] = useState({});
    const isFavorite = favorite.map((movie) => movie.id).includes(selectedId);

    const {
      id,
      title,
      release_date:release,
      overview,
      genres,
      runtime,
      vote_average:rating, 
      poster
    }=movieDetails;


  function handleAdd(){
    const favMovie={
      id,
      title,
      rating,
      runtime,
      poster
    };
    onAddFavorite(favMovie);
    localStorage.setItem('favorite', JSON.stringify(favorite));
    onCloseMovie(id);
  }

    useEffect(function(){
    async function fetchMovieDetails() {
      try{

        const res=await fetch(`http://localhost:8080/tmdb/trending/movie/${selectedId}`)
        const data= await res.json();
        const updatedMovie={...data,
        poster: imageBaseUrl + data.poster_path,};
        // console.log(updatedMovie);
        setMovieDetails(updatedMovie);
      }
      catch(err){
        console.error('Error fetching movie details:', err);
      }
    }
   fetchMovieDetails();
  },[selectedId]);

  return(
    <div className="details">
      <header>
        
        <button className="btn-back" onClick={onCloseMovie}> &larr;</button>
        <img src={poster} alt={`poster of ${movieDetails} movie`} />
        <div className="details-overview">
          <h2>{title} </h2>
          <p>{release}&bull;{runtime} min</p>
          <p>⭐{rating}</p>
          <p>{genres?.map((g) => g.name).join(", ")}</p>
        </div>
      </header>

      <section>
        {!isFavorite &&
          <>
            <button className="btn-add" 
            onClick={handleAdd}
            >Add to favorites</button>
          </>
        }
            <p>{overview}</p>
      </section>
    </div>
  )
}