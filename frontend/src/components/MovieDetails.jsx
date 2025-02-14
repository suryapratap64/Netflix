import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setMovieDetails,
  setError,
  setSelectedMovie,
} from "../redux/movieSlice";
import "./BannerHome.css";
const MovieDetails = () => {
  const [title, setTitle] = useState(""); // Movie title to search
  const dispatch = useDispatch();
  const { movieDetails, error } = useSelector((state) => state.movie);
  const [loading, setLoading] = useState(false);
  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://netflix-sk1e.onrender.com/api/movie`, {
        params: { title },
      });
      console.log("Fetched movie data:", response.data);
      dispatch(setMovieDetails(response.data)); // Set movie details to Redux
      dispatch(setError(null)); // Reset any previous errors
    } catch (err) {
      dispatch(setError("Movie not found or an error occurred.")); // Set error if any
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="moviedetail  bg-black  my-8 w-full">
      <div className=" flex justify-center  m-5  gap-2 mb-4">
        <div>
          {" "}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter movie title"
            className="border w-full bg-transparent text-white p-2 rounded-md"
          />
        </div>
        <div>
          {" "}
          <button
            onClick={fetchMovieDetails}
            className="px-4  py-2 bg-red-500 text-white  rounded-md"
          >
            {loading ? "Searching" : "Search"}
          </button>
        </div>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {movieDetails && (
        <div className=" w-full ">
          <h2 className="text-3xl text-center text-white   font-bold mb-4">
            {movieDetails.Title}
          </h2>
          <div className="flex gap-4   flex-row text-white  md:flex-row bg-black p-8 rounded-lg shadow-md">
            {/* Image Section */}
            <div className="flex-shrink-0 mb-4 md:mb-0 md:w-1/3">
              <img
                src={movieDetails.Poster}
                alt={movieDetails.Title}
                className="w-max-sm rounded-sm transition-transform duration-300 hover:scale-90"
              />
            </div>

            {/* Details Section */}
            <div className=" ">
              <div className=" mb-2">
                <span className="text-sm">Year: {movieDetails.Year}</span>
              </div>
              <p>
                <strong>Genre:</strong> {movieDetails.Genre}
              </p>
              <p>
                <strong>Director:</strong> {movieDetails.Director}
              </p>
              <p>
                <strong>Plot:</strong> {movieDetails.Plot}
              </p>
              <p>
                <strong>imdbID:</strong> {movieDetails.imdbID}
              </p>
              <p className="flex-wrap">
                <strong>Poster:</strong> {movieDetails.Poster}
              </p>
              <p className="flex-wrap">
                <strong>IMDB ratings:</strong> {movieDetails.imdbRating}
              </p>
              <p className="flex-wrap">
                <strong>IMDB Votes:</strong> {movieDetails.imdbVotes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
