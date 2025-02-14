import express from "express"


import isAuthenticated from "../middlewares/isAuthenticated.js"

import upload from "../middlewares/multer.js"
import {
    addNewMovie,
    getAllMovies,
   
}from "../controllers/movie.controller.js"

const router = express.Router();

// Route to add a new movie
router.route('/addmovie').post(upload.single('file'),addNewMovie);

// Route to get all movies
router.route('/all').get(getAllMovies);

// // Route to get a movie by ID
// router.get('/:id', isAuthenticated, getMovieById);

// // Route to update a movie
// router.put('/update/:id', isAuthenticated, upload.single('poster'), updateMovie);

// // Route to delete a movie
// router.delete('/delete/:id', isAuthenticated, deleteMovie);

export default router
