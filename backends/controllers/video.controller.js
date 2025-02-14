import path from 'path';
import { statSync, createReadStream } from "fs";
import { fileURLToPath } from "url";
import {dirname} from 'path'
import {Video}  from'../models/video.model.js';
import axios from 'axios';
// const cloudinary = require("cloudinary").v2;
//import cloudinary from "cloudinary";
import { v2 as cloudinary } from 'cloudinary';

 // Cloudinary configuration
 cloudinary.config({
   cloud_name: "dzvtmt1im", // Replace with your Cloudinary cloud name
   api_key: "316277894717156",       // Replace with your Cloudinary API key
   api_secret: "IPkIcl_MRNunRKGBQcs72q7T07E", // Replace with your Cloudinary API secret
 });

// POST route to upload video
// export const uploadVideo = async (req, res) => {
//   try {
//     const file = req.file;

//      // Assumes you're using multer for file uploads
//   //const __filename=fileURLToPath(import.meta.url);
//   //const __dirname=dirname(__filename);
//     // Upload the video to Cloudinary
//     const result = await cloudinary.uploader.upload(file.path, {
//       resource_type: "video",
//       folder: "my_videos",
//     });

//     // Save metadata in MongoDB
//     const newVideo = new Video({
//       Title: req.body.Title,
//       url: result.secure_url,
//     });

//     await newVideo.save();

//     res.status(201).json({
//       message: "Video uploaded successfully",
//       video: newVideo,
//     });
//   } catch (error) {
//     console.error("Error uploading video:", error);
//     res.status(500).json({ error: "Failed to upload video" });
//   }
// };
export const uploadVideo = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Convert the file buffer to a base64 string
        const base64Data = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

        // Upload the video to Cloudinary
        const result = await cloudinary.uploader.upload(base64Data, {
            resource_type: "video",
            folder: "my_videos",
            timeout: 60000,
        });

        // Log the file for debugging
        console.log("Uploaded file:", file);
        console.log('File size:', file.size); // in bytes
        // Save video metadata to MongoDB
        const newVideo = new Video({
            Title: req.body.Title,
            url: result.secure_url,
        });

        await newVideo.save();

        res.status(201).json({
            message: "Video uploaded successfully",
            video: newVideo,
        });
    } catch (error) {
        console.error("Error uploading video:", error);
        res.status(500).json({ error: "Failed to upload video" });
    }
};
//  Upload a video
// export const uploadVideo = async (req,res) => {
//     try {
//         const file = req.file;
//       const result = await cloudinary.uploader.upload(file.path, {
//         resource_type: "video", // Specify that the resource is a video
//         folder: "my_videos",    // Optional: Specify folder name in Cloudinary
//       });
//       console.log("Video uploaded successfully:", result);
//     } catch (error) {
//       console.error("Error uploading video:", error);
//     }
//   };



// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

//export const streamVideo = (req, res) => {
//   try {
//     const filepath = `${__dirname}../public/video.mp4`; // Path to the video file
//     const stat = statSync(filepath); // Get file stats
//     const fileSize = stat.size; // Total size of the file

//     const range = req.headers.range; // Get the Range header from the request

//     if (!range) {
//       // Handle missing Range header
//       return res.status(400).send("Range header is required");
//     }

//     const chunkSize = 10 ** 6; // 1MB chunk size
//     const start = Number(range.replace(/\D/g, "")); // Extract the start byte from the Range header
//     const end = Math.min(start + chunkSize, fileSize - 1); // Calculate the end byte

//     const contentLength = end - start + 1; // Length of the content to be sent

//     // Create a readable stream for the video file
//     const fileStream = createReadStream(filepath, { start, end });

//     // Set response headers for video streaming
//     const headers = {
//       "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": contentLength,
//       "Content-Type": "video/mp4",
//     };

//     res.writeHead(206, headers); // Send partial content response
//     fileStream.pipe(res); // Stream the video file to the client
//   } catch (error) {
//     console.error("Error streaming video:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };


export const streamVideo = async (req, res) => {
  try {
    const imdbId = req.params.id; // Assuming you're passing the video ID in the URL
    const video = await Video.findById(imdbId); // Find video by ID in MongoDB

    if (!video) {
      return res.status(404).send("Video not found");
    }

    const videoUrl = video.url; // Get the Cloudinary URL or other video URL from MongoDB

    // If you want to stream from Cloudinary, we can handle range requests
    const range = req.headers.range; // Get the Range header from the request

    if (!range) {
      return res.status(400).send("Range header is required");
    }

    const response = await axios.head(videoUrl); // Get the file details from Cloudinary (e.g., file size)
    const fileSize = response.headers["content-length"];
    
    const chunkSize = 10 ** 6; // 1MB chunk size
    const start = Number(range.replace(/\D/g, "")); // Extract the start byte from the Range header
    const end = Math.min(start + chunkSize, fileSize - 1); // Calculate the end byte

    const contentLength = end - start + 1; // Length of the content to be sent

    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    // Stream the video file using the range of bytes
    const fileStream = axios({
      method: "get",
      url: videoUrl,
      responseType: "stream",
      headers: {
        Range: `bytes=${start}-${end}`, // Send the range request to Cloudinary or external server
      },
    });

    res.writeHead(206, headers); // Send partial content response
    fileStream.data.pipe(res); // Stream the video content to the client

  } catch (error) {
    console.error("Error streaming video:", error);
    res.status(500).send("Internal Server Error");
  }
};





