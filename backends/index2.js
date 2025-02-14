import express, { urlencoded } from "express"
import bodyParser from 'body-parser';

import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from "./utils/mdb.js";
import userRoute from "./routes/user.route.js"
import movieRoute from "./routes/movie.route.js"
import videoRoute from "./routes/video.route.js"
import {dirname} from 'path'
import {createReadStream, statSync} from "fs"
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import axios from 'axios';
import dotenv from "dotenv";``
dotenv.config();
const PORT=process.env.port ||3000;
const app=express();
app.get(("/"),(req,res)=>{
    return(res.status(200).json)({
        message:"i am coming from backend",
        success:true
})
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

 })
 app.use(cors())
 app.use(cookieParser());
 // OMDB API Request (Testing Axios)
 // API endpoint to fetch movie details
app.get("/api/movie", async (req, res) => {
  const OMDB_API_KEY = process.env.OMDB_API_KEY;
  const { title } = req.query; // e.g., /api/movie?title=Inception
  const url = `https://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`;

  try {
    const response = await axios.get(url); // Fetch from OMDB API
    res.status(200).json(response.data);
      // Send data to frontend
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});
// Mock Movie Data
// const movies = [
//   {
//     Title: "Interstellar",
//     Poster: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SY679_.jpg",
//     imdbRating: "8.6",
//     Released: "2014-11-07",
//     imdbID: "tt0816692",
//   },
//   {
//     Title: "The Matrix",
//     Poster: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY679_.jpg",
//     imdbRating: "8.7",
//     Released: "1999-03-31",
//     imdbID: "tt0133093",
//   },
//   {
//     Title: "The Lord of the Rings: The Return of the King",
//     Poster: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_.jpg",
//     imdbRating: "9.0",
//     Released: "2003-12-17",
//     imdbID: "tt0167260",
//   },
//   {
//     Title: "Forrest Gump",
//     Poster: "https://m.media-amazon.com/images/M/MV5BNzJjZTg0ZmMtMTg0Ny00NzYxLWFjMWMtMWFiYmNkMTNjZGMyXkEyXkFqcGc@._V1_SX300.jpg",
//     imdbRating: "8.8",
//     Released: "1994-07-06",
//     imdbID: "tt0109830",
//   },
//   {
//     Title: "Kantara",
//     Poster: "	https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg",
//     imdbRating: "8.2",
//     Released: "2022-09-30",
//     imdbID: "tt15458984",
//   },
//   {
//     Title: "RRR",
//     Poster: "https://m.media-amazon.com/images/M/MV5BY2NiNWU3OTktODVlYi00NmRiLWIzYTYtMzZjYzlkYmFkNTI1XkEyXkFqcGdeQXVyMjM2OTAxNg@@._V1_SX300.jpg",
//     imdbRating: "8.0",
//     Released: "2022-03-25",
//     imdbID: "tt8178634",
//   },
//   {
//     Title: "KGF: Chapter 2",
//     Poster: "https://m.media-amazon.com/images/M/MV5BZGQzZjY1MGItYmVjZS00ZmFkLWIwYzYtZDg4ODBjYzE5NzU2XkEyXkFqcGc@._V1_SX300.jpg",
//     imdbRating: "8.4",
//     Released: "2022-04-14",
//     imdbID: "tt9815322",
//   },
//   {
//     Title: "Master",
//     Poster: "https://m.media-amazon.com/images/M/MV5BMjFhM2JhM2MtYmMwNC00M2M1LWExMzUtOGI3MmQxNWRiZGI3XkEyXkFqcGc@._V1_SX300.jpg",
//     imdbRating: "7.8",
//     Released: "2021-01-13",
//     imdbID: "tt8772246",
//   },
//   {
//     Title: "Vikram",
//     Poster: "https://m.media-amazon.com/images/M/MV5BMTYxMjk0NDg4Ml5BMl5BanBnXkFtZTgwODcyNjA5OTE@._V1_SX300.jpg",
//     imdbRating: "8.4",
//     Released: "2022-06-03",
//     imdbID: "tt1365154",
//   },
//   {
//     Title: "Drishyam 2",
//     Poster: "https://m.media-amazon.com/images/M/MV5BMTg5N2U4ZTItMjc2NC00NDg2LWIzODYtOWZmNzY5Yzc5MzUxXkEyXkFqcGc@._V1_SX300.jpg",
//     imdbRating: "8.3",
//     Released: "2021-11-19",
//     imdbID: "tt12609972",
//   },

// ];


app.get('/api/poster', (req, res) => {
  res.json(movies);
});

// app.get("/api/movie", async (req, res) => {
//   const OMDB_API_KEY = process.env.OMDB_API_KEY;
//   const { title } = req.query; // e.g., /api/movie?title=Inception
//   const url = `https://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`;

//   try {
//     const response = await axios.get(url); // Fetch from OMDB API

//     if (response.data.Response === "True") {
//       // Return detailed movie data to frontend
//       const movie = {
//         title: response.data.Title,
//         plot: response.data.Plot,
//         actors: response.data.Actors,
//         awards: response.data.Awards,
//         boxOffice: response.data.BoxOffice,
//         country: response.data.Country,
//         dvd: response.data.DVD,
//         director: response.data.Director,
//         genre: response.data.Genre,
//         language: response.data.Language,
//         metascore: response.data.Metascore,
//         poster: response.data.Poster,
//         production: response.data.Production,
//         rated: response.data.Rated,
//         released: response.data.Released,
//         runtime: response.data.Runtime,
//         imdbRating: response.data.imdbRating,
//         imdbVotes: response.data.imdbVotes,
//         imdbID: response.data.imdbID,
//         website: response.data.Website,
//         writer: response.data.Writer,
//         year: response.data.Year,
//         type: response.data.Type
//       };

//       return res.status(200).json(movie);
//     } else {
//       return res.status(404).json({ error: "Movie not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching movie details:", error.message);
//     return res.status(500).json({ error: "Failed to fetch movie details" });
//   }
// });


//console.log(`api key is:${OMDB_API_KEY}`)
// Route to fetch movie details
// const fetchMovieDetails = async (imdbID) => {
//   const apiKey = process.env.OMDB_API_KEY; // Access the API key from .env
//   const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

//   try {

//     const response = await axios.get(url);
    
//     console.log("Movie Details:", response.data); // Log the movie details
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching movie details:", error.message);
//   }
// };
//fetchMovieDetails("tt3896196");
// const fetchMoviePoster = async (imdbID) => {
//   const apiKey = process.env.OMDB_API_KEY; // Access the API key from .env
//   const url = `http://img.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

//   try {
//     const response = await axios.get(url, { responseType: "arraybuffer" }); // Fetch binary data
//     const base64Image = Buffer.from(response.data, "binary").toString("base64"); // Convert to base64
//     const poster = `data:image/jpeg;base64,${base64Image}`; // Format as base64 image
//     console.log("Poster (Base64):", poster);
//     return poster;
//   } catch (error) {
//     console.error("Error fetching movie poster:", error.message);
//   }
// };
// Endpoint to fetch movie poster based on imdbID
// app.get('/api/poster/title/:movieTitle', async (req, res) => {
//   const { movieTitle } = req.params;
//   const OMDB_API_KEY = process.env.OMDB_API_KEY;
//  // Get the API key from environment variables

//   try {
//     // Fetch the movie details from OMDB API by movie title
//     const url = `http://www.omdbapi.com/?t=${movieTitle}&apikey=${OMDB_API_KEY}`;
//     const response = await axios.get(url);

//     // Check if the movie was found
//     if (response.data.Response === "True") {
//       const poster = response.data.Poster; // Get the poster URL
//       res.json({ poster });
//     } else {
//       res.status(404).json({ error: "Movie not found" });
//     }
//   } catch (error) {
//     console.error('Error fetching movie poster:', error.message);
//     res.status(500).json({ error: 'Failed to fetch movie poster' });
//   }
// });

// Random movie titles for testing
//const movieTitles = ["Inception", "The Dark Knight", "Interstellar", "Titanic", "Avatar"];

// app.get("/api/poster/random", async (req, res) => {
//   const OMDB_API_KEY = process.env.OMDB_API_KEY;
//   const randomTitle = movieTitles[Math.floor(Math.random() * movieTitles.length)]; // Get a random movie title from the list

//   try {
//     // Fetch movie details from OMDB API by movie title
//     const url = `http://www.omdbapi.com/?t=${randomTitle}&apikey=${OMDB_API_KEY}`;
//     const response = await axios.get(url);

//     // Check if the movie was found
//     if (response.data.Response === "True") {
//       const poster = response.data.Poster; // Get the poster URL
//       const title = response.data.Title;
//       const plot = response.data.Plot;
//       const imdbRating = response.data.imdbRating;
//       const imdbVotes = response.data.imdbVotes;
//       const imdbID = response.data.imdbID;
//       const type = response.data.Type;

//       res.json({ poster, title, plot, imdbRating, imdbVotes, imdbID, type });
//     } else {
//       res.status(404).json({ error: "Movie not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching movie poster:", error.message);
//     res.status(500).json({ error: "Failed to fetch movie poster" });
//   }
// });
const imdbIDs = [
  "tt1375666", // Inception
  "tt0468569", // The Dark Knight
  "tt0068646", // The Godfather
  "tt0071562", // The Godfather Part II
  "tt0050083", // 12 Angry Men
  "tt0034583", // Casablanca
  "tt0047478", // Seven Samurai
  "tt0082971", // Raiders of the Lost Ark
  "tt0114709", // Toy Story
  "tt0110357", // The Lion King
  "tt0060196", // The Good, the Bad and the Ugly
  "tt0172495", // Gladiator
  "tt0130414", // American Beauty
  "tt0169547", // American History X
  "tt0080684", // Star Wars: Episode V - The Empire Strikes Back
  "tt0054215", // Psycho
  "tt0047396", // Rear Window
  "tt0090605", // Aliens
  "tt0083658", // Blade Runner
  "tt0120737", // The Lord of the Rings: The Fellowship of the Ring
  "tt0154538", // Nosferatu (2024) - Latest gothic film directed by Robert Eggers
  "tt1332648", // Juror #2 (2024) - Clint Eastwood's latest film
  "tt0068500", // Mufasa: The Lion King (2024) - Prequel to The Lion King
  "tt0157453", // Carry-On (2024) - New action film directed by Jaume Collet-Serra
  "tt0158303", // Babygirl (2024) - A film directed by Halina Reijn starring Nicole Kidman
  "tt0136390", // A Beautiful Mind (2025) - A new installment in the Beautiful Mind series
  "tt0152108", // Barbarian (2024) - New horror thriller movie
  "tt0175365", // The Flashpoint (2025) - DC superhero movie continuation
  "tt0148587", // Deadpool 3 (2025) - Latest film in the Deadpool franchise
  "tt0174284", // Shazam! Fury of the Gods (2025) - DC superhero sequel
];

app.get("/api/poster/random", async (req, res) => {
  const OMDB_API_KEY = process.env.OMDB_API_KEY;
  const randomID = imdbIDs[Math.floor(Math.random() * imdbIDs.length)]; // Select a random IMDb ID

  try {
    // Fetch movie details from OMDB API
    const url = `http://www.omdbapi.com/?i=${randomID}&apikey=${OMDB_API_KEY}`;
    const response = await axios.get(url);

    if (response.data.Response === "True") {
      res.json({
        id: response.data.imdbID,
        title: response.data.Title,
        poster: response.data.Poster,
        overview: response.data.Plot,
        rating: response.data.imdbRating,
        votes: response.data.imdbVotes,
        type: response.data.Type,
      });
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});


// Example call
//fetchMoviePoster("tt3896198"); // Fetch poster for Guardians of the Galaxy Vol. 2
 
 app.use(urlencoded({extended:true}))
 
 app.use(express.json()); 
 const corsOptions={
    origin:'http://localhost:5173',
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
 }
// Apply CORS middleware globally
// app.use(cors(corsOptions));
app.use(cors({
  origin: "http://localhost:5173", // Set your frontend origin explicitly
  credentials: true, // Allow credentials (cookies, auth headers)
}));

 app.use("/api/v1/user",userRoute)
 app.use("/api/v1/movie",movieRoute)
// app.use("/api/v1/video",videoRoute)

//  const __filename=fileURLToPath(import.meta.url);
//  const __dirname=dirname(__filename);
 
 


//  app.get("/video", (req, res) => {
//   const filepath = `${__dirname}/public/video.mp4`;
//      const stat = statSync(filepath);
//      const fileSize = stat.size;
 
//      const range = req.headers.range;
//      if (!range) {
//          // Handle missing Range header with a full content response or an appropriate error
//          res.status(400).send("Range header is required");
//          return;
//      }
 
//      const chunkSize = 10 ** 6; // 1MB
//      const start = Number(range.replace(/\D/g, ""));
//      const end = Math.min(start + chunkSize, fileSize - 1); // Ensure end does not exceed file size
 
//      const contentLength = end - start + 1;
 
//      const fileStream = createReadStream(filepath, {
//          start,
//          end,
//      });
 
//      const headers = {
//          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//          "Accept-Ranges": "bytes",
//          "Content-Length": contentLength,
//          "Content-Type": "video/mp4",
//      };
 
//      res.writeHead(206, headers);
//      fileStream.pipe(res);
//  });


 
 
 
 
 
 
 
 // Cloudinary configuration
//  cloudinary.v2.config({
//    cloud_name: "dzvtmt1im", // Replace with your Cloudinary cloud name
//    api_key: "316277894717156",       // Replace with your Cloudinary API key
//    api_secret: "IPkIcl_MRNunRKGBQcs72q7T07E", // Replace with your Cloudinary API secret
//  });
 

 // uploadVideo();

 app.listen(PORT,()=>{
   connectDB();
  console.log(`server running at port ${PORT}`)
 })
