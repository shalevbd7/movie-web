import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  yearPremiered: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    // required: true,
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
