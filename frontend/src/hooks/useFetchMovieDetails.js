import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch movie details
const useFetchMovieDetails = (title) => {
  const [movie, setMovie] = useState(null); // Store movie details
  const [error, setError] = useState(null); // Store error messages

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!title) return; // Avoid fetching if there's no title

      try {
        setError(null); // Clear previous errors
        const response = await axios.get("http://localhost:8000/api/movie", {
          params: { title }, // Pass the movie title as a query parameter
        });
        setMovie(response.data); // Save movie details in state
      } catch (err) {
        setError("Movie not found or an error occurred."); // Handle errors
      }
    };

    fetchMovieDetails();
  }, [title]); // Re-run when title changes

  return { movie, error };
};

export default useFetchMovieDetails;
