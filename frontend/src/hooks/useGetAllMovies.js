// useGetAllMovie.js (or the correct file name)
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../config";
import { setMovies } from "../redux/movieSlice.js"; // Adjust the path if needed

const useGetAllMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/v1/movie/all`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setMovies(res.data.movies));
        } else {
          console.error("Failed to fetch movies:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    };

    fetchAllMovies();
  }, [dispatch]);
};

export default useGetAllMovies; // Ensure this default export is present

// import { setMovies } from "../redux/movieSlice1"; // Assuming you have a movieSlice similar to postSlice
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const useGetAllMovies = () => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchAllMovies = async () => {
//             try {
//                 const res = await axios.get('http://localhost:8000/api/v1/movie/all', { withCredentials: true });

//                 if (res.data.success) {
//                     // Dispatch the movie data to the Redux store
//                     dispatch(setMovies(res.data.movie));
//                 }
//             } catch (error) {
//                 console.error('Error fetching movies:', error);
//             }
//         };

//         fetchAllMovies();
//     }, [dispatch]); // The effect runs once when the component mounts

// };

// export default useGetAllMovies;

// // import { useState, useEffect } from 'react';

// // // Custom hook to fetch movies by category
// // const useGetAllMovie = () => {
// //     const [movies, setMovies] = useState({
// //         trending: [],
// //         horror: [],
// //         action: [],
// //     });
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const fetchMovies = async () => {
// //             try {
// //                 setLoading(true);
// //                 const response = await fetch('/api/movies/category');  // Replace with your actual API endpoint
// //                 if (!response.ok) {
// //                     throw new Error('Failed to fetch movies');
// //                 }
// //                 const data = await response.json();
// //                 if (data.success) {
// //                     setMovies({
// //                         trending: data.trending,
// //                         horror: data.horror,
// //                         action: data.action,
// //                     });
// //                 } else {
// //                     setError(data.message);
// //                 }
// //             } catch (err) {
// //                 setError(err.message || 'Something went wrong');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchMovies();
// //     }, []); // Run once when the component mounts

// //     return { movies, loading, error };
// // };

// // export default useGetAllMovie;
