import {useEffect, useState } from "react";

const tempMovieData = [
  // {
  //   id: "1236470",
  //   title: "The Lost Bus",
  //   release_date: "2025-09-19",
  //   poster:
  //     "https://image.tmdb.org/t/p/w500/zpygCOYY1DPBkeUsrrznLRN5js5.jpg",
  // },
  // {
  //   id: "941109",
  //   title: "Play Dirty",
  //   release_date: "2025-09-30",
  //   poster:
  //     "https://image.tmdb.org/t/p/w500/ovZ0zq0NwRghtWI1oLaM0lWuoEw.jpg",
  // }
];

const tempFavoriteData = [
  // {
  //   id: "617126",
  //   title: "The Fantastic 4: First Steps",
  //   release_date: "2025-07-22",
  //   poster:
  //     "https://image.tmdb.org/t/p/w500/cm8TNGBGG0aBfWj0LgrESHv8tir.jpg",
  //   runtime: 148,
  //   voteAverge: 8.8
  // },
  // {
  //   id: "1242404",
  //   title: "Steve",
  //   release_date: "2025-07-22",
  //   poster:
  //     "https://image.tmdb.org/t/p/w500/wmLoMyofbseLfxiGgk1Iz5H97c3.jpg",
  //   runtime: 116,
  //   voteAverge: 8.5
  // },
];

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [favorite, setFavorite] = useState(() => {
    const storedFav= localStorage.getItem('favorite');
    return storedFav ? JSON.parse(storedFav) : tempFavoriteData;
  });
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  function handleSelectMovie(id) {
    setSelectedId((id)==selectedId?null:id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddFavorite(movie) {
    setFavorite((fav) => [...fav, movie]);
  }

  useEffect(()=>{
    localStorage.setItem('favorite', JSON.stringify(favorite)); 
  },[favorite]);

  useEffect(function() {
   async function fetchMovies() {
     if (!query) return; // do nothing if no selection

     //check cache before fetching
     const cache= localStorage.getItem(`movies-${query}`);
     if(cache){
      setMovies(JSON.parse(cache));
      return;
     }

     await fetch(`http://localhost:8080/tmdb/trending/movie?time_frame=${query}`)
     .then(res => res.json())
     .then(data => {
       const updatedMovies = data.map(movie => ({
         ...movie,
         poster: imageBaseUrl + movie.poster_path,
        }));
        setMovies(updatedMovies);

        //cache API calls
         localStorage.setItem(`movies-${query}`, JSON.stringify(updatedMovies));
      })
      .catch(err => console.error('Error fetching movies:', err));
    }
    fetchMovies();
  },[query])


  return (
    <>
      <NavBar >
        <Logo />
        <Search query={query} setQuery={setQuery}/>
      </NavBar>
      
      <Main >
        <ListBox >
          <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>
        </ListBox>
        <ListBox>
          {
            selectedId ? (<MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} 
            onAddFavorite={handleAddFavorite}
            imageBaseUrl={imageBaseUrl}
            favorite={favorite}
            />) :
            <FavoriteList favorite={favorite}/>
          }
        </ListBox>
      </Main>
    </>
  );
}




function NavBar({children}) {
  return (
    <nav className="nav-bar">
       {children}
    </nav>
  )
}

function Search({query, setQuery}) {
  return(
    <select 
      className="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    >
      <option value="">Select a trending time frame</option>
      <option value="day">Today</option>
      <option value="week">This Week</option>
    </select>
  )
}

function Logo(){
  return(
    <div className="logo">
      <span role="img">🥤</span>
      <h1>Popcorn Soda</h1>
    </div>
  )
}

function ListBox({children}){
  return(
    <div className="box">
      {children}
    </div>
  )
}

function MovieList({movies, onSelectMovie}){
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



function MovieDetails({selectedId, onCloseMovie,imageBaseUrl, onAddFavorite, favorite}) {
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
        console.log(updatedMovie);
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

function Main({children}) {
  return(
    <main className="main">
      {children}
    </main>
  )
}


