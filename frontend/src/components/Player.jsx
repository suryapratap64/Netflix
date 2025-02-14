import React, { useRef, useState, useEffect } from "react";
import "./Player.css";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import useGetAllMovies from "../hooks/useGetAllMovies";
import { useParams } from "react-router-dom";

const Player = () => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1); // Volume is 1 by default
  const [playbackRate, setPlaybackRate] = useState(1);

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

  // Toggle Play/Pause
  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Adjust Volume
  const handleVolumeChange = (e) => {
    const volume = e.target.value;
    videoRef.current.volume = volume;
    setVolume(volume);
    setIsMuted(volume === "0");
  };

  // Update Current Time
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // Seek Video
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Format Time (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Handle Fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      videoRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Skip Intro Mock Functionality
  const skipIntro = () => {
    videoRef.current.currentTime += 10; // Skip 10 seconds
    setCurrentTime(videoRef.current.currentTime);
  };

  // Change Playback Speed
  const changePlaybackSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackRate(speed);
  };

  if (!movie.url) {
    return (
      <div className="relative  rounded-md items-center mb-0 w-full h-screen flex bg-black bg-opacity-50 ">
      {/* Background Image (Maintains Aspect Ratio) */}
      
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full  h-full videoimg rounded-lg"
      />
    

      {/* Text Overlay */}
      <div className="absolute w-full h-full  flex flex-col bg-black  bg-opacity-50   rounded-lg">
        <h1 className="ptitle bgi text-2xl md:text-5xl font-bold text-white">
          {movie.Title}
        </h1>
        <p className="vdetail bgi text-lg md:text-2x text-black ">
          The selected movie does not have a playable URL.
        </p>
        <p className="vdetail bgi text-lg md:text-2x text-black ">
         Released Date:{movie.Year}
        </p>
        <p className="vdetail bgi text-lg md:text-2x text-black ">
         About Movie:{movie.Plot || "NA"}
        </p>
        <p className="vdetail bgi text-lg md:text-2x text-black ">
          Genere of movie:{movie.Genre}

        </p>
        <p className="vdetail bgi text-lg md:text-2x text-black ">
          IMDB Rating of movie:{movie.imdbRating}

        </p>
        <p className="vdetail bgi text-lg md:text-2x text-black ">
          Votes on IMDB:{movie.imdbVotes}

        </p>
      </div>
    </div>
    );
    
  }

  return (
    <div className="backv">
      <div className="video-player w-full h-full">
        <video
          ref={videoRef}
          className="video"
          src={movie.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => setDuration(videoRef.current.duration)}
        ></video>

        <div className="controls">
          {/* Play/Pause */}
          <button onClick={togglePlayPause} className="control-btn">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          {/* Mute/Volume */}
          <button onClick={toggleMute} className="control-btn">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            className="volume-slider"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />

          {/* Seek Bar */}
          <input
            type="range"
            ref={progressRef}
            className="seek-bar"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
          />

          {/* Time Display */}
          <span className="time">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Playback Speed */}
          <select
            className="speed-control"
            value={playbackRate}
            onChange={(e) => changePlaybackSpeed(e.target.value)}
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>

          {/* Skip Intro */}
          <button onClick={skipIntro} className="control-btn">
            Skip Intro
          </button>

          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className="control-btn">
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
