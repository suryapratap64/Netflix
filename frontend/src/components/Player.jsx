import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaVolumeDown,
  FaExpand,
  FaCompress,
  FaForward,
  FaBackward,
  FaCog,
  FaClosedCaptioning,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useGetAllMovies from "../hooks/useGetAllMovies";

const Player = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Sample movie data - replace with your actual movie data
 
     const { imdbID } = useParams(); // Get movie ID from the route parameter
  const movies = useSelector((state) => state.movie.movies);
  useGetAllMovies(); // Access movies from Redux
  const movie = movies.find((movie) => movie.imdbID === imdbID); // Find the selected movie by ID

  if (!movie) {
    return <div className="text-white">Movie not found or loading...</div>;
  }

  // Play the video automatically when the component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadstart', () => setIsLoading(true));
      video.addEventListener('canplay', () => setIsLoading(false));
      video.addEventListener('waiting', () => setIsLoading(true));
      video.addEventListener('playing', () => setIsLoading(false));
    }

    return () => {
      if (video) {
        video.removeEventListener('loadstart', () => setIsLoading(true));
        video.removeEventListener('canplay', () => setIsLoading(false));
        video.removeEventListener('waiting', () => setIsLoading(true));
        video.removeEventListener('playing', () => setIsLoading(false));
      }
    };
  }, []);

  // Auto-hide controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', () => {
        if (isPlaying) setShowControls(false);
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', () => {
          if (isPlaying) setShowControls(false);
        });
      }
      clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!videoRef.current) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
        case 'ArrowLeft':
          videoRef.current.currentTime -= 10;
          break;
        case 'ArrowRight':
          videoRef.current.currentTime += 10;
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(prev => Math.min(1, prev + 0.1));
          videoRef.current.volume = Math.min(1, volume + 0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(prev => Math.max(0, prev - 0.1));
          videoRef.current.volume = Math.max(0, volume - 0.1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [volume]);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = pos * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const skipTime = (seconds) => {
    videoRef.current.currentTime += seconds;
    setCurrentTime(videoRef.current.currentTime);
  };

  const changePlaybackSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackRate(speed);
    setShowSpeedMenu(false);
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <FaVolumeMute />;
    if (volume < 0.5) return <FaVolumeDown />;
    return <FaVolumeUp />;
  };

  if (!movie.url) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-start p-8 md:p-16">
          <h1 className="text-3xl md:text-6xl font-bold text-red-600 mb-4 hover:text-red-500 transition-colors">
            {movie.Title}
          </h1>
          <div className="space-y-3 text-white">
            <p className="text-lg md:text-xl hover:text-red-500 transition-colors cursor-pointer">
              The selected movie does not have a playable URL.
            </p>
            <p className="text-lg md:text-xl hover:text-red-500 transition-colors cursor-pointer">
              Released Date: {movie.Year}
            </p>
            <p className="text-lg md:text-xl hover:text-red-500 transition-colors cursor-pointer">
              About Movie: {movie.Plot || "N/A"}
            </p>
            <p className="text-lg md:text-xl hover:text-red-500 transition-colors cursor-pointer">
              Genre: {movie.Genre}
            </p>
            <p className="text-lg md:text-xl hover:text-red-500 transition-colors cursor-pointer">
              IMDB Rating: {movie.imdbRating}
            </p>
            <p className="text-lg md:text-xl hover:text-red-500 transition-colors cursor-pointer">
              IMDB Votes: {movie.imdbVotes}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl mx-4 bg-black rounded-lg overflow-hidden shadow-2xl group"
        onDoubleClick={toggleFullscreen}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-auto max-h-[80vh] block"
          src={movie.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => setDuration(videoRef.current.duration)}
          onClick={togglePlayPause}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Play Button Overlay */}
        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <button
              onClick={togglePlayPause}
              className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl hover:bg-red-700 transition-colors shadow-lg"
            >
              <FaPlay className="ml-1" />
            </button>
          </div>
        )}

        {/* Controls */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          {/* Progress Bar */}
          <div className="px-4 pb-2">
            <div 
              className="w-full h-1 bg-gray-600 rounded-full cursor-pointer hover:h-2 transition-all"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-red-600 rounded-full relative"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between px-4 pb-4">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button
                onClick={togglePlayPause}
                className="text-white text-xl hover:text-red-500 transition-colors"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              {/* Skip Backward */}
              <button
                onClick={() => skipTime(-10)}
                className="text-white text-lg hover:text-red-500 transition-colors"
              >
                <FaBackward />
              </button>

              {/* Skip Forward */}
              <button
                onClick={() => skipTime(10)}
                className="text-white text-lg hover:text-red-500 transition-colors"
              >
                <FaForward />
              </button>

              {/* Volume */}
              <div className="flex items-center space-x-2 group">
                <button
                  onClick={toggleMute}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  className="text-white text-lg hover:text-red-500 transition-colors"
                >
                  {getVolumeIcon()}
                </button>
                
                {showVolumeSlider && (
                  <div 
                    className="w-20"
                    onMouseLeave={() => setShowVolumeSlider(false)}
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                )}
              </div>

              {/* Time Display */}
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Closed Captions */}
              <button className="text-white text-lg hover:text-red-500 transition-colors">
                <FaClosedCaptioning />
              </button>

              {/* Settings/Speed */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="text-white text-lg hover:text-red-500 transition-colors"
                >
                  <FaCog />
                </button>
                
                {showSpeedMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black bg-opacity-90 rounded-lg py-2 min-w-[100px]">
                    <div className="text-white text-sm px-3 py-1 border-b border-gray-600 mb-1">Speed</div>
                    {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => changePlaybackSpeed(speed)}
                        className={`block w-full text-left px-3 py-1 text-sm hover:bg-gray-700 transition-colors ${
                          playbackRate === speed ? 'text-red-500' : 'text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white text-lg hover:text-red-500 transition-colors"
              >
                {isFullscreen ? <FaCompress /> : <FaExpand />}
              </button>
            </div>
          </div>
        </div>

        {/* Skip Intro Button */}
        {currentTime > 10 && currentTime < 60 && (
          <div className="absolute bottom-20 right-4">
            <button
              onClick={() => skipTime(30)}
              className="bg-gray-800 bg-opacity-80 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Skip Intro
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: none;
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Player;
// import React, { useRef, useState, useEffect } from "react";
// import "./Player.css";
// import {
//   FaPlay,
//   FaPause,
//   FaVolumeUp,
//   FaVolumeMute,
//   FaExpand,
//   FaCompress,
// } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import useGetAllMovies from "../hooks/useGetAllMovies";
// import { useParams } from "react-router-dom";

// const Player = () => {
//   const videoRef = useRef(null);
//   const progressRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [volume, setVolume] = useState(1); // Volume is 1 by default
//   const [playbackRate, setPlaybackRate] = useState(1);

//   const { imdbID } = useParams(); // Get movie ID from the route parameter
//   const movies = useSelector((state) => state.movie.movies);
//   useGetAllMovies(); // Access movies from Redux
//   const movie = movies.find((movie) => movie.imdbID === imdbID); // Find the selected movie by ID

//   if (!movie) {
//     return <div className="text-white">Movie not found or loading...</div>;
//   }

//   // Play the video automatically when the component mounts
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play();
//       setIsPlaying(true);
//     }
//   }, []);

//   // Toggle Play/Pause
//   const togglePlayPause = () => {
//     if (videoRef.current.paused) {
//       videoRef.current.play();
//       setIsPlaying(true);
//     } else {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   // Toggle Mute
//   const toggleMute = () => {
//     videoRef.current.muted = !isMuted;
//     setIsMuted(!isMuted);
//   };

//   // Adjust Volume
//   const handleVolumeChange = (e) => {
//     const volume = e.target.value;
//     videoRef.current.volume = volume;
//     setVolume(volume);
//     setIsMuted(volume === "0");
//   };

//   // Update Current Time
//   const handleTimeUpdate = () => {
//     setCurrentTime(videoRef.current.currentTime);
//   };

//   // Seek Video
//   const handleSeek = (e) => {
//     const seekTime = (e.target.value / 100) * videoRef.current.duration;
//     videoRef.current.currentTime = seekTime;
//     setCurrentTime(seekTime);
//   };

//   // Format Time (MM:SS)
//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60).toString().padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   };

//   // Handle Fullscreen
//   const toggleFullscreen = () => {
//     if (!isFullscreen) {
//       videoRef.current.requestFullscreen();
//     } else {
//       document.exitFullscreen();
//     }
//     setIsFullscreen(!isFullscreen);
//   };

//   // Skip Intro Mock Functionality
//   const skipIntro = () => {
//     videoRef.current.currentTime += 10; // Skip 10 seconds
//     setCurrentTime(videoRef.current.currentTime);
//   };

//   // Change Playback Speed
//   const changePlaybackSpeed = (speed) => {
//     videoRef.current.playbackRate = speed;
//     setPlaybackRate(speed);
//   };

//   if (!movie.url) {
//     return (
//       <div className="relative  rounded-md items-center mb-0 w-full h-screen flex bg-black bg-opacity-50 ">
//       {/* Background Image (Maintains Aspect Ratio) */}
      
//       <img
//         src={movie.Poster}
//         alt={movie.Title}
//         className="w-full  h-full videoimg rounded-lg"
//       />
    

//       {/* Text Overlay */}
//       <div className="absolute w-full h-full  flex flex-col bg-black  bg-opacity-50   rounded-lg">
//         <h1 className="ptitle bgi text-2xl md:text-5xl font-bold text-white">
//           {movie.Title}
//         </h1>
//         <p className="vdetail bgi text-lg md:text-2x text-black ">
//           The selected movie does not have a playable URL.
//         </p>
//         <p className="vdetail bgi text-lg md:text-2x text-black ">
//          Released Date:{movie.Year}
//         </p>
//         <p className="vdetail bgi text-lg md:text-2x text-black ">
//          About Movie:{movie.Plot || "NA"}
//         </p>
//         <p className="vdetail bgi text-lg md:text-2x text-black ">
//           Genere of movie:{movie.Genre}

//         </p>
//         <p className="vdetail bgi text-lg md:text-2x text-black ">
//           IMDB Rating of movie:{movie.imdbRating}

//         </p>
//         <p className="vdetail bgi text-lg md:text-2x text-black ">
//           Votes on IMDB:{movie.imdbVotes}

//         </p>
//       </div>
//     </div>
//     );
    
//   }

//   return (
//     <div className="backv">
//       <div className="video-player w-full h-full">
//         <video
//           ref={videoRef}
//           className="video"
//           src={movie.url}
//           onTimeUpdate={handleTimeUpdate}
//           onLoadedMetadata={() => setDuration(videoRef.current.duration)}
//         ></video>

//         <div className="controls">
//           {/* Play/Pause */}
//           <button onClick={togglePlayPause} className="control-btn">
//             {isPlaying ? <FaPause /> : <FaPlay />}
//           </button>

//           {/* Mute/Volume */}
//           <button onClick={toggleMute} className="control-btn">
//             {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
//           </button>
//           <input
//             type="range"
//             className="volume-slider"
//             min="0"
//             max="1"
//             step="0.1"
//             value={volume}
//             onChange={handleVolumeChange}
//           />

//           {/* Seek Bar */}
//           <input
//             type="range"
//             ref={progressRef}
//             className="seek-bar"
//             min="0"
//             max="100"
//             value={(currentTime / duration) * 100 || 0}
//             onChange={handleSeek}
//           />

//           {/* Time Display */}
//           <span className="time">
//             {formatTime(currentTime)} / {formatTime(duration)}
//           </span>

//           {/* Playback Speed */}
//           <select
//             className="speed-control"
//             value={playbackRate}
//             onChange={(e) => changePlaybackSpeed(e.target.value)}
//           >
//             <option value="0.5">0.5x</option>
//             <option value="1">1x</option>
//             <option value="1.5">1.5x</option>
//             <option value="2">2x</option>
//           </select>

//           {/* Skip Intro */}
//           <button onClick={skipIntro} className="control-btn">
//             Skip Intro
//           </button>

//           {/* Fullscreen */}
//           <button onClick={toggleFullscreen} className="control-btn">
//             {isFullscreen ? <FaCompress /> : <FaExpand />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Player;
