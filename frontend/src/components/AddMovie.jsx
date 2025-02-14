import React, { useState } from 'react';
import axios from 'axios';
import "./BannerHome.css";

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    Title: '',
    Year: '',
    Genre: '',
    Poster: '',
    imdbID:"",
    imdbRating:'',
    Plot:'',
    imdbVotes:'',
    url:"",
    file: null, // Store the file here

  });


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   setMovieData({ ...movieData, Poster: e.target.files[0] });
  // };
 

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setMessage('');


    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('Title', movieData.Title);
      formData.append('Year', movieData.Year);
      formData.append('Genre', movieData.Genre);
      formData.append('Poster', movieData.Poster);
      formData.append('imdbID', movieData.imdbID);
      formData.append('imdbRating', movieData.imdbRating);
      formData.append('Plot', movieData.Plot);
      formData.append('imdbVotes', movieData.imdbVotes);
      formData.append('file', movieData.file); // Append the actual file object
    
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8000/api/v1/movie/addmovie', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Required for file uploads
          },
          withCredentials: true, // Matches your CORS config
        });
        setMessage(response.data.message);
        } catch (error) {
          setMessage('Failed to add movie.');
          console.error(error);
        } finally {
          setLoading(false);
        }
   
  

    // const formData = new FormData();
    // Object.keys(movieData).forEach((key) => {
    //   formData.append(key, movieData[key]);
    // });

    // try {
    //   const response = await axios.post('http://localhost:8000/api/v1/movie/addmovie', movieData, {
    //     headers: {
    //       'Content-Type': 'application/json', // Ensure JSON content type
    //     },
    //   });
      //setMessage(response.data.message);
    // } catch (error) {
    //   setMessage('Failed to add movie.');
    //   console.error(error);
    // } finally {
    //   setLoading(false);
    // }
  };
  // Handle file input changes
  const handleFileChange = (e) => {
    const { files } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      file: files[0], // Store the selected file
    }));
  };
 
   

  return (
    <>
    <div className="w-full p-6 bg-gray-800  relative shadow-lg rounded-lg">
      <h2 className="text-xl  font-semibold text-center ml-10 mb-6">Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
          <input
            type="text"
            name="Title"
            placeholder="Enter movie title"
            value={movieData.Title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Year Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Year</label>
          <input
            type="text"
            name="Year"
            placeholder="Enter movie year"
            value={movieData.Year}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Genre Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Genre</label>
          <input
            type="text"
            name="Genre"
            placeholder="Enter movie genre"
            value={movieData.Genre}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Plot</label>
          <input
            type="text"
            name="Plot"
            placeholder='Plot'
            value={movieData.Plot}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
           
           
          />
        </div>

        {/* Poster File Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Poster</label>
          <input
            type="text"
            name="Poster"
            placeholder='Poster'
            value={movieData.Poster}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
           
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">imdbID</label>
          <input
            type="text"
            name="imdbID"
            placeholder="Enter imdbId "
            value={movieData.imdbID}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          </div>
         
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">IMDB Rating</label>
          <input
            type="text"
            name="imdbRating"
            placeholder='imdbRating'
            value={movieData.imdbRating}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
           
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">IMDB Votes</label>
          <input
            type="text"
            name="imdbVotes"
            placeholder='imdbVotes'
            value={movieData.imdbVotes}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
           
           
          />
        </div>


          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Video</label>
          <input
            type="file"
            name="url"
            placeholder="Select file "
             accept="video/*"
           
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Movie'}
          </button>
        </div>
      </form>

      {/* Message */}
      {message && (
        <div className={`mt-4 text-center ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
          <p>{message}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default AddMovie;
