import { User } from "../models/user.model.js";

import { Movie } from "../models/movie.model.js";

import axios from "axios";
// const cloudinary = require("cloudinary").v2;
//import cloudinary from "cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dzvtmt1im", // Replace with your Cloudinary cloud name
  api_key: "316277894717156", // Replace with your Cloudinary API key
  api_secret: "IPkIcl_MRNunRKGBQcs72q7T07E", // Replace with your Cloudinary API secret
});

// Add a new movie
// export const addNewMovie = async (req, res) => {
//   try {
//     const {
//       Title,
//       Year,
//       // Rated,
//       //Released,
//       // Runtime,
//       Genre,
//       // Director,
//       // Writer,
//       // Actors,
//       // Plot,
//       // Language,
//       // Country,
//       // Awards,
//       Poster,
//       // Ratings,
//       // Metascore,
//       //imdbRating,
//       //imdbVotes,
//       imdbID,
//       //Type,
//       // DVD,
//       // BoxOffice,
//       // Production,
//       // Website,
//       url,
//       //Response
//     } = req.body;

//     // Validate required fields
//     if (!Title || !imdbID) {
//       return res
//         .status(400)
//         .json({ message: "Title ,imdbID must be  required" });
//     }

//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Convert the file buffer to a base64 string
//     const base64Data = `data:${file.mimetype};base64,${file.buffer.toString(
//       "base64"
//     )}`;

//     // Upload the video to Cloudinary
//     const result = await cloudinary.uploader.upload(base64Data, {
//       resource_type: "video",
//       folder: "my_videos",
//       timeout: 60000,
//     });

//     // Log the file for debugging
//     console.log("Uploaded file:", file);
//     console.log("File size:", file.size); // in bytes
//     // Save video metadata to MongoDB

//     // Create a new movie document
//     const newMovie = new Movie({
//       Title,
//       Year,
//       Genre,
//       Poster,
//       imdbID,
//       url: result.secure_url,
//     });
//     const savedMovie = await newMovie.save(); // Save the movie to the database

//     return res.status(201).json({
//       message: "New movie added successfully",
//       movie: savedMovie,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: "Something went wrong", success: false });
//   }
// };
export const addNewMovie = async (req, res) => {
    try {
      const {
        Title,
        Year,
        Genre,
        Plot,
        Poster,
        imdbRating,
        imdbVotes,
        imdbID,

        url, // Optional: Directly provided URL
      } = req.body;
  
      // Validate required fields
      if (!Title || !imdbID) {
        return res
          .status(400)
          .json({ message: "Title and imdbID are required" });
      }
  
      let videoUrl = url; // Default to the provided URL if no file is uploaded
  
      if (req.file) {
        // File is provided; upload to Cloudinary
        const file = req.file;
  
        // Convert the file buffer to a base64 string
        const base64Data = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64"
        )}`;
  
        // Upload the video to Cloudinary
        const result = await cloudinary.uploader.upload(base64Data, {
          resource_type: "video",
          folder: "my_videos",
          timeout: 600000,
        });
  
        videoUrl = result.secure_url; // Use the uploaded video URL
      }
  
      // Create a new movie document
      const newMovie = new Movie({
        Title,
        Year,
        Genre,
        Plot,
        Poster,
        imdbRating,
        imdbVotes,
        imdbID,
        url: videoUrl, // Use the uploaded video URL or the provided URL
      });
  
      // Save the movie to the database
      const savedMovie = await newMovie.save();
  
      return res.status(201).json({
        message: "New movie added successfully",
        movie: savedMovie,
        success: true,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Something went wrong", success: false });
    }
  };
  
// Get all movies with title and poster
// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find() // Fetch all movies
      .sort({ Year: -1 }); // Sort by the Year field in descending order

    return res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    console.error("Error fetching all movies:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching movies.",
    });
  }
};
