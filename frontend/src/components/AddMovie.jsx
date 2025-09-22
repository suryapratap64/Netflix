import React, { useState } from "react";
import axios from "axios";
import "./BannerHome.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const AddMovie = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    Title: "",
    Year: "",
    Genre: "",
    Poster: "",
    imdbID: "",
    imdbRating: "",
    Plot: "",
    imdbVotes: "",
    url: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user exists and has the correct role
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (user.role === "admin") {
      toast.error("Only admin users can add movies");
      navigate("/");
      return;
    }

    const formData = new FormData();
    formData.append("Title", movieData.Title);
    formData.append("Year", movieData.Year);
    formData.append("Genre", movieData.Genre);
    formData.append("Poster", movieData.Poster);
    formData.append("imdbID", movieData.imdbID);
    formData.append("imdbRating", movieData.imdbRating);
    formData.append("Plot", movieData.Plot);
    formData.append("imdbVotes", movieData.imdbVotes);
    formData.append("file", movieData.file);

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/api/v1/movie/addmovie`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
      toast.success("Movie added successfully!");

      // Reset form on success
      setMovieData({
        Title: "",
        Year: "",
        Genre: "",
        Poster: "",
        imdbID: "",
        imdbRating: "",
        Plot: "",
        imdbVotes: "",
        url: "",
        file: null,
      });
      if (response.success) {
        navigate("/"); // ✅ use directly
      }
    } catch (error) {
      setMessage("Failed to add movie.");
      toast.error("Failed to add movie. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      file: files[0],
    }));
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Netflix-style background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(220,38,38,0.1),transparent_50%)]"></div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Add New <span className="text-red-600">Movie</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Expand the collection with amazing content
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-black/60 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title & Year Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-white font-bold text-sm uppercase tracking-wide">
                    Movie Title
                  </label>
                  <input
                    type="text"
                    name="Title"
                    placeholder="Enter movie title"
                    value={movieData.Title}
                    onChange={handleChange}
                    className="w-full bg-gray-900/70 backdrop-blur-sm text-white text-lg px-6 py-4 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-300 placeholder-gray-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-white font-bold text-sm uppercase tracking-wide">
                    Release Year
                  </label>
                  <input
                    type="number"
                    name="Year"
                    placeholder="2024"
                    value={movieData.Year}
                    onChange={handleChange}
                    className="w-full bg-gray-900/70 backdrop-blur-sm text-white text-lg px-6 py-4 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-300 placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              {/* Genre & IMDb ID Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-white font-bold text-sm uppercase tracking-wide">
                    Genre
                  </label>
                  <input
                    type="text"
                    name="Genre"
                    placeholder="Action, Drama, Thriller"
                    value={movieData.Genre}
                    onChange={handleChange}
                    className="w-full bg-gray-900/70 backdrop-blur-sm text-white text-lg px-6 py-4 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-300 placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-white font-bold text-sm uppercase tracking-wide">
                    IMDb ID
                  </label>
                  <input
                    type="text"
                    name="imdbID"
                    placeholder="tt1234567"
                    value={movieData.imdbID}
                    onChange={handleChange}
                    className="w-full bg-gray-900/70 backdrop-blur-sm text-white text-lg px-6 py-4 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-300 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Rating & Votes Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-white font-bold text-sm uppercase tracking-wide">
                    IMDb Rating
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      name="imdbRating"
                      placeholder="8.5"
                      value={movieData.imdbRating}
                      onChange={handleChange}
                      className="w-full bg-gray-900/70 backdrop-blur-sm text-white text-lg px-6 py-4 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-300 placeholder-gray-400"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-white font-bold text-sm uppercase tracking-wide">
                    IMDb Votes
                  </label>
                  <input
                    type="text"
                    name="imdbVotes"
                    placeholder="1,234,567"
                    value={movieData.imdbVotes}
                    onChange={handleChange}
                    className="w-full bg-gray-900/70 backdrop-blur-sm text-white text-lg px-6 py-4 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-300 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Poster URL */}
              <div className="space-y-2">
                <label className="block text-white font-bold text-sm uppercase tracking-wide">
                  Poster URL
                </label>
                <input
                  type="url"
                  name="Poster"
                  placeholder="https://example.com/poster.jpg"
                  value={movieData.Poster}
                  onChange={handleChange}
                  className="w-full bg-gray-900/70 backdrop-blur-sm text-white text-lg px-6 py-4 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-300 placeholder-gray-400"
                  required
                />
              </div>

              {/* Plot */}
              <div className="space-y-2">
                <label className="block text-white font-bold text-sm uppercase tracking-wide">
                  Plot Summary
                </label>
                <textarea
                  name="Plot"
                  rows="4"
                  placeholder="Enter the movie plot summary..."
                  value={movieData.Plot}
                  onChange={handleChange}
                  className="w-full bg-gray-900/70 backdrop-blur-sm text-white text-lg px-6 py-4 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-300 placeholder-gray-400 resize-none"
                />
              </div>

              {/* Video File Upload */}
              <div className="space-y-2">
                <label className="block text-white font-bold text-sm uppercase tracking-wide">
                  Movie Video File
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="url"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="w-full bg-gray-900/70 backdrop-blur-sm text-white text-lg px-6 py-4 rounded-xl border border-gray-700 focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700"
                  />
                </div>
                {movieData.file && (
                  <p className="text-green-400 text-sm mt-2">
                    ✓ Selected: {movieData.file.name}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white text-xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-red-600/25"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Adding Movie...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Movie to Collection
                    </div>
                  )}
                </button>
              </div>
            </form>

            {/* Success/Error Message */}
            {message && (
              <div className="mt-8">
                <div
                  className={`p-6 rounded-2xl border text-center font-semibold text-lg ${
                    message.includes("Failed")
                      ? "bg-red-900/30 border-red-600/50 text-red-200"
                      : "bg-green-900/30 border-green-600/50 text-green-200"
                  }`}
                >
                  {message.includes("Failed") ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      {message}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {message}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Admin Notice */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              🎬 Admin Panel - Only administrators can add new movies to the
              collection
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
// import React, { useState } from "react";
// import axios from "axios";
// import "./BannerHome.css";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const AddMovie = () => {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [movieData, setMovieData] = useState({
//     Title: "",
//     Year: "",
//     Genre: "",
//     Poster: "",
//     imdbID: "",
//     imdbRating: "",
//     Plot: "",
//     imdbVotes: "",
//     url: "",
//     file: null, // Store the file here
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMovieData({ ...movieData, [name]: value });
//   };
//   // ...movieData is the spread operator. It creates a shallow copy of the object’s properties (or array elements) into a new object/array. It’s commonly used for immutability in React state updates.

//   // const handleFileChange = (e) => {
//   //   setMovieData({ ...movieData, Poster: e.target.files[0] });
//   // };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setMessage('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if user exists and has the correct role
//     if (!user) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     if (user.role !== "admin") {
//       toast.error("Only admin users can add movies");
//       navigate("/");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("Title", movieData.Title);
//     formData.append("Year", movieData.Year);
//     formData.append("Genre", movieData.Genre);
//     formData.append("Poster", movieData.Poster);
//     formData.append("imdbID", movieData.imdbID);
//     formData.append("imdbRating", movieData.imdbRating);
//     formData.append("Plot", movieData.Plot);
//     formData.append("imdbVotes", movieData.imdbVotes);
//     formData.append("file", movieData.file);

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "https://netflix-sk1e.onrender.com/api/v1/movie/addmovie",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Required for file uploads
//           },
//           withCredentials: true, // Matches your CORS config
//         }
//       );
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage("Failed to add movie.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }

//     // const formData = new FormData();
//     // Object.keys(movieData).forEach((key) => {
//     //   formData.append(key, movieData[key]);
//     // });

//     // try {
//     //   const response = await axios.post('http://localhost:8000/api/v1/movie/addmovie', movieData, {
//     //     headers: {
//     //       'Content-Type': 'application/json', // Ensure JSON content type
//     //     },
//     //   });
//     //setMessage(response.data.message);
//     // } catch (error) {
//     //   setMessage('Failed to add movie.');
//     //   console.error(error);
//     // } finally {
//     //   setLoading(false);
//     // }
//   };
//   // Handle file input changes
//   const handleFileChange = (e) => {
//     const { files } = e.target;
//     setMovieData((prevData) => ({
//       ...prevData,
//       file: files[0],
//       // Store the selected file
//     }));
//   };

//   return (
//     <>
//       <div className="w-full p-6 bg-gray-800  relative shadow-lg rounded-lg">
//         <h2 className="text-xl  font-semibold text-center ml-10 mb-6">
//           Add New Movie
//         </h2>
//         <form onSubmit={handleSubmit}>
//           {/* Title Input */}

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">
//               Title
//             </label>
//             <input
//               type="text"
//               name="Title"
//               placeholder="Enter movie title"
//               value={movieData.Title}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           {/* Year Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">
//               Year
//             </label>
//             <input
//               type="text"
//               name="Year"
//               placeholder="Enter movie year"
//               value={movieData.Year}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//           </div>

//           {/* Genre Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">
//               Genre
//             </label>
//             <input
//               type="text"
//               name="Genre"
//               placeholder="Enter movie genre"
//               value={movieData.Genre}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">
//               Plot
//             </label>
//             <input
//               type="text"
//               name="Plot"
//               placeholder="Plot"
//               value={movieData.Plot}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Poster File Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">
//               Poster
//             </label>
//             <input
//               type="text"
//               name="Poster"
//               placeholder="Poster"
//               value={movieData.Poster}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">
//               imdbID
//             </label>
//             <input
//               type="text"
//               name="imdbID"
//               placeholder="Enter imdbId "
//               value={movieData.imdbID}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">
//               IMDB Rating
//             </label>
//             <input
//               type="text"
//               name="imdbRating"
//               placeholder="imdbRating"
//               value={movieData.imdbRating}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">
//               IMDB Votes
//             </label>
//             <input
//               type="text"
//               name="imdbVotes"
//               placeholder="imdbVotes"
//               value={movieData.imdbVotes}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">
//               Video
//             </label>
//             <input
//               type="file"
//               name="url"
//               placeholder="Select file "
//               accept="video/*"
//               onChange={handleFileChange}
//               className="w-full p-3 border border-gray-300 rounded-md"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="mb-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:opacity-50"
//             >
//               {loading ? "Adding..." : "Add Movie"}
//             </button>
//           </div>
//         </form>

//         {/* Message */}
//         {message && (
//           <div
//             className={`mt-4 text-center ${
//               message.includes("Failed") ? "text-red-500" : "text-green-500"
//             }`}
//           >
//             <p>{message}</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AddMovie;
