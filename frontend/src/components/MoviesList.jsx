import React from "react";
import { useSelector } from "react-redux";
import useGetAllMovies from "../hooks/useGetAllMovies.js";
import "./Horizontal.css";
import { Link } from "react-router-dom";
const MoviesList = () => {
  const movies = useSelector((state) => state.movie.movies); // Access movies from Redux

  useGetAllMovies(); // Fetch movies and populate the Redux store

  if (movies.length === 0) {
    return <div>Loading movies...</div>;
  }


  return (
    <div className="mp bg-black container mx-auto px-4 my-2 ">
      <h2 className="text-2xl font-bold text-white mt-2 ">All Movies</h2>

      <div
       className="grid my-3 grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {movies.map((movie, index) => (
           
          <Link 
           to={`/player/${movie.imdbID}`}
           key={movie.imdbID}
            className=" rounded-lg shadow-lg   overflow-hidden"
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="rounded-lg h-full  w-full object-cover "
            />
            <p className="mb-1 text-sm font-semibold text-white">
              {movie.Title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
