import React from "react";
import { useSelector } from "react-redux";
import useGetAllMovies from "../hooks/useGetAllMovies.js";
import "./Horizontal.css";
import { Link } from "react-router-dom";

const MoviesList = () => {
  const movies = useSelector((state) => state.movie.movies);
  
  useGetAllMovies();

  if (movies.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading Movies...</p>
          <p className="text-gray-400 text-sm mt-2">Discovering amazing content for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Netflix-style background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.05),transparent_70%)]"></div>
      
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Movie <span className="text-red-600">Collection</span>
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-400">
              <span className="text-lg">{movies.length} Movies Available</span>
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              <span className="text-lg">HD Quality</span>
            </div>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <Link
                to={`/player/${movie.imdbID}`}
                key={movie.imdbID}
                className="group cursor-pointer"
              >
                {/* Movie Card Container */}
                <div className="relative">
                  {/* Image Container with Overflow Hidden for Zoom Effect */}
                  <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-[2/3] bg-gray-900">
                    {/* Movie Poster with Hover Zoom */}
                    <img
                      src={movie.Poster !== "N/A" ? movie.Poster : "/api/placeholder/300/450"}
                      alt={movie.Title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "/api/placeholder/300/450";
                      }}
                    />
                    
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 border-2 border-white/30">
                        <svg 
                          className="w-8 h-8 text-white fill-current" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Quality Badge */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        HD
                      </span>
                    </div>
                    
                    {/* Rating Badge */}
                    {movie.imdbRating && movie.imdbRating !== "N/A" && (
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                          <svg className="w-3 h-3 text-yellow-400 fill-current mr-1" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-white text-xs font-semibold">
                            {movie.imdbRating}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Movie Information - Below Image, No Zoom Effect */}
                  <div className="pt-4 px-1">
                    {/* Movie Title */}
                    <h3 className="text-white font-bold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-red-400 transition-colors duration-300">
                      {movie.Title}
                    </h3>
                    
                    {/* Movie Year and Genre */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span className="font-medium">{movie.Year}</span>
                      {movie.Genre && (
                        <span className="truncate ml-2">
                          {movie.Genre.split(',')[0].trim()}
                        </span>
                      )}
                    </div>
                    
                    {/* Progress Bar (Placeholder) */}
                    <div className="w-full bg-gray-800 rounded-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-red-600 h-1 rounded-full" style={{width: '0%'}}></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Load More Section */}
          <div className="text-center mt-16">
            <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-full border-2 border-gray-600 hover:border-red-600 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Load More Movies
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Custom Styles for Line Clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MoviesList;
// import React from "react";
// import { useSelector } from "react-redux";
// import useGetAllMovies from "../hooks/useGetAllMovies.js";
// import "./Horizontal.css";
// import { Link } from "react-router-dom";
// const MoviesList = () => {
//   const movies = useSelector((state) => state.movie.movies); // Access movies from Redux

//   useGetAllMovies(); // Fetch movies and populate the Redux store

//   if (movies.length === 0) {
//     return <div>Loading movies...</div>;
//   }


//   return (
//     <div className="mp bg-black mx-auto px-4 my-2 ">
//       <h2 className="text-2xl font-bold text-white mt-4  text-center">All Movies</h2>

//       <div
//        className="grid my-3 grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
//         {movies.map((movie, index) => (
           
//           <Link 
//            to={`/player/${movie.imdbID}`}
//            key={movie.imdbID}
//             className=" rounded-lg shadow-lg   overflow-hidden"
//           >
//             <img
//               src={movie.Poster}
//               alt={movie.Title}
//               className="rounded-lg h-full  w-full object-cover "
//             />
//             <p className="mb-1 text-sm font-semibold text-white">
//               {movie.Title}
//             </p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MoviesList;
