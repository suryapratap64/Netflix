import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch poster details by movie title
const useFetchPosterDetails = (title) => {
  const [poster, setPoster] = useState(null); // Store poster details
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchPosterDetails = async () => {
      if (!title) return; // Avoid fetching if there's no title

      try {
        setError(null); // Clear previous errors
        setLoading(true); // Set loading to true

        const response = await axios.get("http://localhost:8000/api/poster/title/:movieTitle", {
          params: { title }, // Pass the movie title as a query parameter
        });

        if (response.data.Poster) {
          setPoster(response.data.Poster); // Save poster in state if it exists
        } else {
          setError("Poster not found for the given title."); // Handle case if no poster is found
        }

        setLoading(false); // Set loading to false after the fetch
      } catch (err) {
        setError("Failed to fetch poster details."); // Handle errors
        setLoading(false); // Set loading to false even on error
        console.error("Error fetching poster details:", err);
      }
    };

    fetchPosterDetails();
  }, [title]); // Re-run the fetch when the title changes

  return { poster, loading, error }; // Return state values
};

export default useFetchPosterDetails;
