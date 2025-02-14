import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",

    initialState: {
      movies: [],
      movieDetails: null,
      selectedMovie: null,
      error: null,
      posterDetails: [], // Store banner data
      imageURL: "", // Base URL for images
    },

  reducers: {
    // Actions to set movie details
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPosterDetails: (state,action)=>{
      state.posterDetails = action.payload
  },
  setImageURL : (state,action) =>{
      state.imageURL = action.payload
  },
  setMovies: (state, action) => {
    state.movies = action.payload;  // Set the fetched movies in the state
},
  },
});

export const {setPosterDetails,setMovies, setImageURL, setMovieDetails, setSelectedMovie, setError } = movieSlice.actions;

export default movieSlice.reducer;
