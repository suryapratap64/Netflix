import  mongoose from 'mongoose';

// Define the schema for a movie
const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  // Rated: { type: String },
  // Released: { type: String },
  // Runtime: { type: String },
  Genre: { type: String },
  // Director: { type: String },
  // Writer: { type: String },
  // Actors: { type: String },
  Plot: { type: String },
  // Language: { type: String },
  // Country: { type: String },
  // Awards: { type: String },
  Poster: { type: String ,required: true},
  // Ratings: [
  //   {
  //     Source: { type: String },
  //     Value: { type: String }
  //   }
  // ],
  // Metascore: { type: String },
  imdbRating: { type: String },
  imdbVotes: { type: String },
  imdbID: { type: String, unique: true, required: true },
  // Type: { type: String },
  // DVD: { type: String },
  // BoxOffice: { type: String },
  // Production: { type: String },
  // Website: { type: String },
  // Response: { type: String },
  url: { type: String },
});


 export const Movie = mongoose.model('Movie', movieSchema);