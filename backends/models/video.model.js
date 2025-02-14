import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  imdbID: { type: String, unique: true, required: true },
  url: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});
export const Video = mongoose.model('Video',videoSchema);

