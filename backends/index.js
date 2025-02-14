import express from "express";
import { urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/mdb.js";
import userRoute from "./routes/user.route.js";
import movieRoute from "./routes/movie.route.js";
import videoRoute from "./routes/video.route.js";
import path, { dirname } from "path";
import { createReadStream, statSync } from "fs";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();




const app = express();

// netstat -ano | findstr :5000
const PORT=process.env.PORT || 8000;
const __dirname=path.resolve();


// app.get("/",(req,res)=>{
//     return res.status(200).json({
//         message:"i,m coming from backend",
//         success:true
//     })
// })
// middlewares
app.use(express.json())
app.use(cookieParser());


app.use(urlencoded({extended:true}))
const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))
// OMDB API Request
app.get("/api/movie", async (req, res) => {
  const OMDB_API_KEY = process.env.OMDB_API_KEY;
  const { title } = req.query; // e.g., /api/movie?title=Inception
  const url = `https://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`;

  try {
  
    const response = await axios.get(url); // Fetch from OMDB API
    res.status(200).json(response.data); // Send data to frontend
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});


// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/movie", movieRoute);
app.use("/api/v1/video", videoRoute);


app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
})


// Start the server


app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});

// import express, { urlencoded } from "express"
// import bodyParser from 'body-parser';

// import cookieParser from "cookie-parser";
// import cors from "cors"
// import connectDB from "./utils/mdb.js";
// import userRoute from "./routes/user.route.js"
// import movieRoute from "./routes/movie.route.js"
// import videoRoute from "./routes/video.route.js"
// import {dirname} from 'path'
// import {createReadStream, statSync} from "fs"
// import { fileURLToPath } from "url";
// import cloudinary from "cloudinary";
// import axios from 'axios';
// import dotenv from "dotenv";``
// dotenv.config();
// const PORT=process.env.port ||3000;
// const app=express();
// app.get(("/"),(req,res)=>{
//     return(res.status(200).json)({
//         message:"i am coming from backend",
//         success:true
// })
// app.use(bodyParser.json({ limit: '100mb' }));
// app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

//  })
//  app.use(cors())
//  app.use(cookieParser());
//  // OMDB API Request (Testing Axios)
//  // API endpoint to fetch movie details
// app.get("/api/movie", async (req, res) => {
//   const OMDB_API_KEY = process.env.OMDB_API_KEY;
//   const { title } = req.query; // e.g., /api/movie?title=Inception
//   const url = `https://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`;

//   try {
//     const response = await axios.get(url); // Fetch from OMDB API
//     res.status(200).json(response.data);
//       // Send data to frontend
//   } catch (error) {
//     console.error("Error fetching movie details:", error.message);
//     res.status(500).json({ error: "Failed to fetch movie details" });
//   }
// });

// //  app.use(urlencoded({extended:true}))
 
//  app.use(express.json()); 


// app.use(cors({
//   origin: "http://localhost:5173", // Set your frontend origin explicitly
//   credentials: true, // Allow credentials (cookies, auth headers)
// }));

//  app.use("/api/v1/user",userRoute)
//  app.use("/api/v1/movie",movieRoute)

//  app.listen(PORT,()=>{
//    connectDB();
//   console.log(`server running at port ${PORT}`)
//  })
