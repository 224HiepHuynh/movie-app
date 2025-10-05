import {useEffect, useState } from "react";

const tempMovieData = [
  {
    tmdbId: "1236470",
    Title: "The Lost Bus",
    Year: "2025-09-19",
    Poster:
      "https://image.tmdb.org/t/p/w500/zpygCOYY1DPBkeUsrrznLRN5js5.jpg",
  },
  {
    tmdbId: "941109",
    Title: "Play Dirty",
    Year: "2025-09-30",
    Poster:
      "https://image.tmdb.org/t/p/w500/ovZ0zq0NwRghtWI1oLaM0lWuoEw.jpg",
  }
];

const tempFavoriteData = [
  {
    tmdbId: "617126",
    Title: "The Fantastic 4: First Steps",
    Year: "2025-07-22",
    Poster:
      "https://image.tmdb.org/t/p/w500/cm8TNGBGG0aBfWj0LgrESHv8tir.jpg",
    runtime: 148,
    voteAverge: 8.8
  },
  {
    tmdbId: "1242404",
    Title: "Steve",
    Year: "2025-07-22",
    Poster:
      "https://image.tmdb.org/t/p/w500/wmLoMyofbseLfxiGgk1Iz5H97c3.jpg",
    runtime: 116,
    voteAverge: 8.5
  },
];

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [favorite, setFavorite] = useState(tempFavoriteData);

 
 
  // useEffect(() => {
  //   fetch('http://localhost:8080/tmdb/trending/movie?time_frame=week')
  //     .then(res => res.json())
  //     .then(data => {
  //       setMovies(data);
  //     })
  //     .catch(err => console.error('Error fetching movies:', err));
  // },[])


    fetch('http://localhost:8080/tmdb/trending/movie?time_frame=week')
      .then(res => res.json())
      // .then(data => {
      //   setMovies(data);
      // })
      .then(data => console.log(data))
      .catch(err => console.error('Error fetching movies:', err));
  return (
    <>
      <NavBar >
        <Logo />
        <Search />
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

function Search() {
  const [query, setQuery] = useState("");
  return(
    //  <input
    //       className="search"
    //       type="text"
    //       placeholder="Search movies..."
    //       value={query}
    //       onChange={(e) => setQuery(e.target.value)}
    //     />
    <select 
      className="search"
      
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
             <Movie movie={movie} key={movie.tmdbId}/>  
        ))}
    </>
  )
}

function Movie({movie}){
  return(
    <li >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
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
            <FavoriteMovie movie={movie} key={movie.tmdbId}/>
          ))}
        </ul>
     </>
  )
}



function FavoriteMovie({movie}){
  return(
    <li >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
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


