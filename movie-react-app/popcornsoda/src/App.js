import {useEffect, useState } from "react";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import NavBar from "./components/NavBar";
import FavoriteList from "./components/FavoriteList";
import { Search } from "./components/Search";
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




function ListBox({children}){
  return(
    <div className="box">
      {children}
    </div>
  )
}


function Main({children}) {
  return(
    <main className="main">
      {children}
    </main>
  )
}


