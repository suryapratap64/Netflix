import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
};

const movieSlice1= createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;  // Set the fetched movies in the state
        },
    },
});

export const { setMovies } = movieSlice1.actions;

export default movieSlice1.reducer;
