import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setMovieDetails,
  setError,
  setSelectedMovie,
} from "../redux/movieSlice";
import "./BannerHome.css";
import { API_URL } from "../config";

const MovieDetails = () => {
  const [title, setTitle] = useState(""); // Movie title to search
  const dispatch = useDispatch();
  const { movieDetails, error } = useSelector((state) => state.movie);
  const [loading, setLoading] = useState(false);

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/movie`, {
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchMovieDetails();
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Netflix-style background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.1),transparent_70%)]"></div>

      <div className="relative z-10 py-8 px-4">
        {/* Search Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Netflix-style logo */}
            <h1 className="text-6xl md:text-7xl font-black text-red-600 mb-2 tracking-tighter">
              MOVIE<span className="text-white">FLIX</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Discover movies like never before
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
              <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for any movie..."
                  className="w-full bg-gray-900/80 backdrop-blur-sm text-white text-lg pl-12 pr-6 py-4 rounded-full border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-300 placeholder-gray-400"
                />
              </div>
              <button
                onClick={fetchMovieDetails}
                disabled={loading || !title.trim()}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed min-w-[140px] shadow-lg hover:shadow-red-600/25"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-red-900/30 backdrop-blur-sm border border-red-600/50 text-red-200 px-6 py-4 rounded-2xl text-center shadow-lg">
                <p className="text-lg font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Movie Details */}
          {movieDetails && (
            <div className="max-w-7xl mx-auto">
              {/* Movie Title */}
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                  {movieDetails.Title}
                </h2>
                <div className="flex items-center justify-center gap-6 text-gray-300 text-lg">
                  <span className="bg-red-600 text-white px-3 py-1 rounded font-bold">
                    {movieDetails.Year}
                  </span>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xl font-bold">
                      {movieDetails.imdbRating}
                    </span>
                    <span className="text-gray-400">
                      ({movieDetails.imdbVotes} votes)
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="bg-black/60 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                <div className="flex flex-col xl:flex-row">
                  {/* Movie Poster */}
                  <div className="xl:w-1/3 p-8 flex justify-center xl:justify-start">
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                      <img
                        src={
                          movieDetails.Poster !== "N/A"
                            ? movieDetails.Poster
                            : "/api/placeholder/400/600"
                        }
                        alt={movieDetails.Title}
                        className="relative w-full max-w-sm xl:max-w-none xl:w-80 rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/400/600";
                        }}
                      />
                    </div>
                  </div>

                  {/* Movie Information */}
                  <div className="xl:w-2/3 p-8 xl:p-12 text-white">
                    {/* Genre Tags */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {movieDetails.Genre &&
                        movieDetails.Genre.split(", ").map((genre, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-red-600/20 text-red-300 text-sm font-bold rounded-full border border-red-600/40 backdrop-blur-sm"
                          >
                            {genre}
                          </span>
                        ))}
                    </div>

                    {/* Plot */}
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold mb-4 text-white">
                        Plot
                      </h3>
                      <p className="text-xl text-gray-300 leading-relaxed">
                        {movieDetails.Plot}
                      </p>
                    </div>

                    {/* Movie Details Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-6">
                        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                          <span className="text-gray-400 font-bold text-sm uppercase tracking-wide block mb-1">
                            Director
                          </span>
                          <span className="text-white text-lg font-semibold">
                            {movieDetails.Director}
                          </span>
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                          <span className="text-gray-400 font-bold text-sm uppercase tracking-wide block mb-1">
                            Year
                          </span>
                          <span className="text-white text-lg font-semibold">
                            {movieDetails.Year}
                          </span>
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                          <span className="text-gray-400 font-bold text-sm uppercase tracking-wide block mb-1">
                            IMDb ID
                          </span>
                          <a
                            href={`https://www.imdb.com/title/${movieDetails.imdbID}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:text-red-300 text-lg font-semibold hover:underline transition-colors duration-200"
                          >
                            {movieDetails.imdbID}
                          </a>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                          <span className="text-gray-400 font-bold text-sm uppercase tracking-wide block mb-1">
                            Rating
                          </span>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-6 h-6 text-yellow-400 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-white font-bold text-lg">
                              {movieDetails.imdbRating}/10
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                          <span className="text-gray-400 font-bold text-sm uppercase tracking-wide block mb-1">
                            Votes
                          </span>
                          <span className="text-white text-lg font-semibold">
                            {movieDetails.imdbVotes}
                          </span>
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
                          <span className="text-gray-400 font-bold text-sm uppercase tracking-wide block mb-1">
                            Poster URL
                          </span>
                          <a
                            href={movieDetails.Poster}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:text-red-300 text-sm hover:underline transition-colors duration-200 break-all"
                          >
                            {movieDetails.Poster}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-700">
                      <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-200 transform hover:scale-105">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 5v10l7-5z" />
                        </svg>
                        Watch Trailer
                      </button>
                      <button className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full border-2 border-gray-600 hover:border-gray-500 transition-all duration-200 transform hover:scale-105">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add to Watchlist
                      </button>
                      <button className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent hover:bg-gray-800 text-white font-bold rounded-full border-2 border-gray-600 hover:border-red-600 transition-all duration-200 transform hover:scale-105">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Like
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setMovieDetails,
//   setError,
//   setSelectedMovie,
// } from "../redux/movieSlice";
// import "./BannerHome.css";
// const MovieDetails = () => {
//   const [title, setTitle] = useState(""); // Movie title to search
//   const dispatch = useDispatch();
//   const { movieDetails, error } = useSelector((state) => state.movie);
//   const [loading, setLoading] = useState(false);
//   const fetchMovieDetails = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:8000/api/movie`, {
//         params: { title },
//       });
//       console.log("Fetched movie data:", response.data);
//       dispatch(setMovieDetails(response.data)); // Set movie details to Redux
//       dispatch(setError(null)); // Reset any previous errors
//     } catch (err) {
//       dispatch(setError("Movie not found or an error occurred.")); // Set error if any
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="moviedetail  bg-black  my-8 w-full">
//       <div className=" flex justify-center  m-5  gap-2 mb-4">
//         <div>
//           {" "}
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter movie title"
//             className="border w-full bg-transparent text-white p-2 rounded-md"
//           />
//         </div>
//         <div>
//           {" "}
//           <button
//             onClick={fetchMovieDetails}
//             className="px-4  py-2 bg-red-500 text-white  rounded-md"
//           >
//             {loading ? "Searching" : "Search"}
//           </button>
//         </div>
//       </div>

//       {error && <p className="text-red-600">{error}</p>}

//       {movieDetails && (
//         <div className=" w-full ">
//           <h2 className="text-3xl text-center text-white   font-bold mb-4">
//             {movieDetails.Title}
//           </h2>
//           <div className="flex gap-4   flex-row text-white  md:flex-row bg-black p-8 rounded-lg shadow-md">
//             {/* Image Section */}
//             <div className="flex-shrink-0 mb-4 md:mb-0 md:w-1/3">
//               <img
//                 src={movieDetails.Poster}
//                 alt={movieDetails.Title}
//                 className="w-max-sm rounded-sm transition-transform duration-300 hover:scale-90"
//               />
//             </div>

//             {/* Details Section */}
//             <div className=" ">
//               <div className=" mb-2">
//                 <span className="text-sm">Year: {movieDetails.Year}</span>
//               </div>
//               <p>
//                 <strong>Genre:</strong> {movieDetails.Genre}
//               </p>
//               <p>
//                 <strong>Director:</strong> {movieDetails.Director}
//               </p>
//               <p>
//                 <strong>Plot:</strong> {movieDetails.Plot}
//               </p>
//               <p>
//                 <strong>imdbID:</strong> {movieDetails.imdbID}
//               </p>
//               <p className="flex-wrap">
//                 <strong>Poster:</strong> {movieDetails.Poster}
//               </p>
//               <p className="flex-wrap">
//                 <strong>IMDB ratings:</strong> {movieDetails.imdbRating}
//               </p>
//               <p className="flex-wrap">
//                 <strong>IMDB Votes:</strong> {movieDetails.imdbVotes}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieDetails;
