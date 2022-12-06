import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Home from "./pages/Home";
import Navi from "./components/Navi";

// import { Routes, Route } from "react-router-dom";

const API_POPULAR =
  "https://api.themoviedb.org/3/movie/popular?api_key=dcbcfe9ab6d2818e853036429ecb24e7";
const API_TRENDING =
  "https://api.themoviedb.org/3/trending/all/day?api_key=dcbcfe9ab6d2818e853036429ecb24e7";
const API_GENRE_LIST =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=dcbcfe9ab6d2818e853036429ecb24e7";
const API_GENRE =
  "https://api.themoviedb.org/3/discover/movie?api_key=dcbcfe9ab6d2818e853036429ecb24e7&with_genres=";
const API_SEARCH =
  "https://api.themoviedb.org/3/search/movie?api_key=dcbcfe9ab6d2818e853036429ecb24e7&query";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(API_POPULAR)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  useEffect(() => {
    fetch(API_GENRE_LIST)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGenres(data.genres);
      });
  }, []);

  const successAlert = () => {
    toast.success("Movies Fetched", {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const searchGenre = (genreId) => {
    fetch(genreId)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
        successAlert();
      });
  };

  const getTrending = async (e) => {
    e.preventDefault();
    try {
      const trending_url = API_TRENDING;
      const res = await fetch(trending_url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
      successAlert();
    } catch (e) {
      console.log(e);
    }
  };

  const getPopular = async (e) => {
    e.preventDefault();
    try {
      const popular_url = API_POPULAR;
      const res = await fetch(popular_url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
      successAlert();
    } catch (e) {
      console.log(e);
    }
  };

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    if (query !== "") {
      try {
        const url = API_SEARCH + `=${query}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setMovies(data.results);
        successAlert();
      } catch (e) {
        console.log(e);
      }
    } else {
      toast.warn("Please enter a movie name!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  const genreChangeHandler = (e) => {
    searchGenre(API_GENRE + e);
  };

  return (
    <>
      <Navi
        getPopular={getPopular}
        getTrending={getTrending}
        searchMovie={searchMovie}
        changeHandler={changeHandler}
        query={query}
      ></Navi>

      <Home
        movies={movies}
        genres={genres}
        genreChangeHandler={genreChangeHandler}
      ></Home>

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
