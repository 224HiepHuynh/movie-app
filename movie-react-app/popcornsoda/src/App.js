import {useEffect, useState } from "react";

const tempMovieData = [
  // {
  //   id: "1236470",
  //   title: "The Lost Bus",
  //   release_date: "2025-09-19",
  //   Poster:
  //     "https://image.tmdb.org/t/p/w500/zpygCOYY1DPBkeUsrrznLRN5js5.jpg",
  // },
  // {
  //   id: "941109",
  //   title: "Play Dirty",
  //   release_date: "2025-09-30",
  //   Poster:
  //     "https://image.tmdb.org/t/p/w500/ovZ0zq0NwRghtWI1oLaM0lWuoEw.jpg",
  // }
];

const tempFavoriteData = [
  {
    id: "617126",
    title: "The Fantastic 4: First Steps",
    release_date: "2025-07-22",
    Poster:
      "https://image.tmdb.org/t/p/w500/cm8TNGBGG0aBfWj0LgrESHv8tir.jpg",
    runtime: 148,
    voteAverge: 8.8
  },
  {
    id: "1242404",
    title: "Steve",
    release_date: "2025-07-22",
    Poster:
      "https://image.tmdb.org/t/p/w500/wmLoMyofbseLfxiGgk1Iz5H97c3.jpg",
    runtime: 116,
    voteAverge: 8.5
  },
];

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [favorite, setFavorite] = useState(tempFavoriteData);
  const [query, setQuery] = useState("");
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(function() {
   async function fetchMovies() {
     if (!query) return; // do nothing if no selection
     await fetch(`http://localhost:8080/tmdb/trending/movie?time_frame=${query}`)
     .then(res => res.json())
     .then(data => {
       const updatedMovies = data.map(movie => ({
         ...movie,
         Poster: imageBaseUrl + movie.poster_path,
        }));
        setMovies(updatedMovies);
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
          <MovieList movies={movies}/>
        </ListBox>
        <ListBox>
          <FavoriteList favorite={favorite}/>
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
      <option value="">Select a time frame</option>
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
      <ul className="list">
        {children}
      </ul>
    </div>
  )
}

function MovieList({movies}){
  return(
    <>
    {movies?.map((movie) => (
             <Movie movie={movie} key={movie.id}/>  
        ))}
    </>
  )
}

function Movie({movie}){
  return(
    <li >
      <img src={movie.Poster} alt={`${movie.title} poster`} />
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
      <img src={movie.Poster} alt={`${movie.title} poster`} />
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


