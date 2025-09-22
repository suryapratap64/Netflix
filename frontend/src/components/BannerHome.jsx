import React, { useState, useEffect } from "react";
import { FaPlay, FaInfoCircle, FaChevronLeft, FaChevronRight, FaStar, FaCalendar, FaClock, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const BannerHome = () => {
  // Sample movies data - replace with your Redux movies
  const movies = [
    {
      Title: "Stranger Things",
      Year: "2023",
      imdbRating: "8.7",
      imdbVotes: "1,234,567",
      imdbID: "movie1",
      Poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=1200&fit=crop",
      Genre: "Sci-Fi, Drama, Horror",
      Runtime: "51 min",
      Plot: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
      Maturity: "16+"
    },
    {
      Title: "The Crown",
      Year: "2024",
      imdbRating: "8.9",
      imdbVotes: "987,654",
      imdbID: "movie2",
      Poster: "https://images.unsplash.com/photo-1489599904838-b133c1b0a39a?w=800&h=1200&fit=crop",
      Genre: "Biography, Drama, History",
      Runtime: "58 min", 
      Plot: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
      Maturity: "12+"
    },
    {
      Title: "Wednesday",
      Year: "2023",
      imdbRating: "8.1",
      imdbVotes: "756,432",
      imdbID: "movie3",
      Poster: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800&h=1200&fit=crop",
      Genre: "Comedy, Horror, Mystery",
      Runtime: "45 min",
      Plot: "A coming-of-age supernatural mystery comedy horror series that follows Wednesday Addams as a student at Nevermore Academy.",
      Maturity: "16+"
    },
    {
      Title: "The Witcher",
      Year: "2024",
      imdbRating: "8.2",
      imdbVotes: "654,321",
      imdbID: "movie4",
      Poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1200&fit=crop",
      Genre: "Action, Adventure, Fantasy",
      Runtime: "60 min",
      Plot: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
      Maturity: "18+"
    }
  ];

  const [counter, setCounter] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  
  const movie = movies[counter];

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCounter((prev) => (prev + 1) % movies.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [movies.length, isAutoPlay]);

  const handleIncrease = () => {
    setCounter((prev) => (prev + 1) % movies.length);
    setIsAutoPlay(false); // Pause auto-play when user interacts
    setTimeout(() => setIsAutoPlay(true), 10000); // Resume after 10 seconds
  };

  const handleDecrease = () => {
    setCounter((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-white text-xl">Loading movie details...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 transition-all duration-1000 ease-out">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-full object-cover scale-110 transition-transform duration-1000"
          key={movie.imdbID}
        />
        {/* Multi-layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-2xl">
            {/* Netflix Series Badge */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-red-600 text-white px-3 py-1 text-xs font-bold rounded tracking-wide">
                SETFLIX SERIES
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">TRENDING NOW</span>
              </div>
            </div>

            {/* Movie Title with Animation */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tight">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
                {movie.Title}
              </span>
            </h1>

            {/* Movie Metadata Bar */}
            <div className="flex items-center space-x-6 mb-6">
              {/* IMDB Rating */}
              <div className="flex items-center bg-yellow-500 text-black px-3 py-2 rounded-lg font-bold shadow-lg">
                <FaStar className="mr-1 text-sm" />
                <span className="text-sm">IMDb {movie.imdbRating}</span>
              </div>
              
              {/* Year */}
              <div className="flex items-center text-gray-300">
                <FaCalendar className="mr-2 text-sm" />
                <span className="font-semibold">{movie.Year}</span>
              </div>
              
              {/* Runtime */}
              <div className="flex items-center text-gray-300">
                <FaClock className="mr-2 text-sm" />
                <span>{movie.Runtime}</span>
              </div>
              
              {/* Maturity Rating */}
              <div className="border border-gray-400 text-gray-300 px-2 py-1 text-xs font-semibold rounded">
                {movie.Maturity}
              </div>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.Genre.split(', ').map((genre, index) => (
                <span 
                  key={index}
                  className="bg-gray-800 bg-opacity-70 text-gray-300 px-3 py-1 text-sm rounded-full backdrop-blur-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Plot Description */}
            <p className="text-white text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
              {showDetails ? movie.Plot : `${movie.Plot.substring(0, 120)}...`}
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="text-gray-300 hover:text-white ml-2 underline transition-colors"
              >
                {showDetails ? 'Show less' : 'Read more'}
              </button>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={`/player/${movie.imdbID}`}
                className="group flex items-center justify-center bg-white text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 shadow-xl"
              >
                <FaPlay className="mr-3 group-hover:scale-110 transition-transform" />
                Play
              </a>
              <button className="flex items-center justify-center bg-gray-600 bg-opacity-70 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-500 transition-all duration-200 backdrop-blur-md border border-gray-500">
                <FaInfoCircle className="mr-3" />
                More Info
              </button>
            </div>

            {/* Additional Stats */}
            <div className="flex items-center space-x-8 text-gray-400 text-sm">
              <div>
                <span className="text-gray-500">IMDb Votes:</span>
                <span className="ml-2 text-white font-semibold">{movie.imdbVotes}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 ">Audio:</span>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="ml-2 text-white hover:text-red-500 transition-colors"
                >
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Controls */}
      <button
        onClick={handleDecrease}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 group"
      >
        <div className="bg-black ml-9 bg-opacity-40 text-white p-4 rounded-full hover:bg-opacity-80 transition-all duration-300 backdrop-blur-md border hidden sm:block border-gray-700 group-hover:scale-110">
          <FaChevronLeft className="text-2xl" />
        </div>
      </button>

      <button
        onClick={handleIncrease}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 group"
      >
        <div className="bg-black bg-opacity-40 text-white p-4 rounded-full hover:bg-opacity-80 transition-all duration-300 backdrop-blur-md border hidden sm:block border-gray-700 group-hover:scale-110">
          <FaChevronRight className="text-2xl" />
        </div>
      </button>

      {/* Enhanced Progress Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCounter(index)}
              className="relative group"
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === counter ? 'bg-red-500 scale-125' : 'bg-gray-500 hover:bg-gray-400'
              }`}>
                {index === counter && isAutoPlay && (
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Auto-play Progress Bar */}
      {isAutoPlay && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800 z-20">
          <div
            className="h-full bg-red-600 transition-all duration-100 ease-linear"
            style={{
              width: `${((Date.now() % 5000) / 5000) * 100}%`,
              animation: 'progress 5s linear infinite'
            }}
          />
        </div>
      )}

      {/* Auto-play Control */}
      <div className="absolute top-8 right-8 z-20">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-80 transition-all duration-200 backdrop-blur-md border hidden sm:block border-gray-600"
        >
          {isAutoPlay ? 'Pause Auto' : 'Resume Auto'}
        </button>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default BannerHome;