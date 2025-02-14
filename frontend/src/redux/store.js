import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './movieSlice'
import movieReducer1 from './movieSlice1'
import authReducer from "./authSlice"; // Import reducer, not slice
export const store = configureStore({
  reducer: {
    movie: movieReducer, 
    auth: authReducer,// Use the correct slice name (e.g., 'movie' if that's the slice name)
  },
})
