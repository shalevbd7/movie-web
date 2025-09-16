// This file contains a service layer for handling Movies-related database operations.
import { Movie } from "../models/movie.model.js";

export const getAllMovies = async () => {
  return await Movie.find({});
};

export const getMovieById = async (id) => {
  return await Movie.findById(id);
};

export const findMovieByName = async (name) => {
  return await Movie.find({
    name: { $regex: name, $options: "i" },
  });
};

export const findMovieByGenre = async (genre) => {
  return await Movie.find({
    genres: { $regex: genre, $options: "i" },
  });
};

export const findMovieByExactName = async (name) => {
  return await Movie.findOne({ name: name });
};

export const createMovie = async (movieData) => {
  const newMovie = new Movie(movieData);
  return await newMovie.save();
};

export const updateMovieById = async (id, updateData) => {
  return await Movie.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteMovie = async (id) => {
  return await Movie.findByIdAndDelete(id);
};

export const isValidObjectId = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/);
};
