import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetAllMovies from "../hooks/useGetAllMovies.js";

const BannerHome = () => {
  const movies = useSelector((state) => state.movie.movies); // Access movies from Redux
  useGetAllMovies(); // Fetch movies and populate the Redux store
  const handleIncrease = () => {
    setCounter(counter + 1);
  };

  // Function to handle decrementing the counter
  const handleDecrease = () => {
    if (counter > 0) setCounter(counter - 1); // Prevent negative counter values
  };
  // Safely access a single movie (e.g., the 6th movie in the array)

  const [counter, setCounter] = useState(0); // Counter state
  const movie = movies[counter];
  if (!movie) {
    return (
      <div className="text-white text-center">Loading movie details...</div>
    );
  }

  return (
    <div className="mpage">
      <div className="bg-black text-white flex flex-row">
        {/* Movie Details Section */}
        <div className="dpage">
          <div className="ppage">
            <div className="pw"></div>
            <h2 className="pdetail font-bold text-6xl">{movie.Title}</h2>
            
          </div>

          <div className="imdbf flex items-center text-lg ">
            <div className="imdb text-white text-center px-4 py-2 bg-yellow-600 rounded-lg">
              IMDb
            </div>
            <p className="ml-2">{movie.imdbRating || "7"}/10</p>
          </div>

          <div className="rating">
            <p className="text-sm my-4">Votes: {movie.imdbVotes || "N/A"}</p>
          </div>

          {/* Play Now Buttons */}
          <Link
            to={`/player/${movie.imdbID}`}
            className="flex flex-row gap-4 my-4"
          >
            <button className="p-4 bg-red-600 text-white px-4 py-3 rounded-xl">
              Play Now
            </button>
            <button className="p-4 bg-white text-red-600 px-4 py-3 rounded-xl">
              Watch Trailer
            </button>
          </Link>
        </div>

        {/* Movie Poster Section */}
        <div className="ipage relative overflow-hidden">
          {/* Movie Poster */}
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="shadow-lg ipage "
          />

          {/* Navigation Buttons (Left & Right) */}
          <div className="absolute w-full top-1/2 left-0 right-0 flex justify-between items-center px-4 transform -translate-y-1/2">
            {/* Left Button */}
            <button
              onClick={handleDecrease}
              className="bg-black bg-opacity-50 text-white px-4 py-3 rounded-full hover:bg-opacity-80 transition"
            >
              ◀
            </button>

            {/* Right Button */}
            <button
              onClick={handleIncrease}
              className="bg-black bg-opacity-50 ml-0 text-white px-4 py-3 rounded-full hover:bg-opacity-80 transition"
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHome;
