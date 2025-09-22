export const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000"
    : "https://netflix-sk1e.onrender.com";
