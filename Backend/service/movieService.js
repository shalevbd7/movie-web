// This file contains the service layer logic for managing movies data.
import * as movieRepository from "../repository/movie.repository.js";

export const getAllMovies = async () => {
  const movies = await movieRepository.getAllMovies();
  return {
    success: true,
    count: movies.length,
    movies: movies,
    message: "Movies retrived successfully",
  };
};

export const getMovieById = async (id) => {
  if (!movieRepository.isValidObjectId(id)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid movie ID format",
    };
  }
  const movie = await movieRepository.getMovieById(id);

  if (!movie) {
    return {
      success: false,
      statusCode: 404,
      message: "Movie not found",
    };
  }
  return {
    success: true,
    movie: movie,
    message: "Movie retrived successfully",
  };
};

export const searchMovieByName = async (name) => {
  if (!name) {
    return {
      success: false,
      statusCode: 400,
      message: "Movie name is required",
    };
  }

  const movies = await movieRepository.findMovieByName(name);

  return {
    success: true,
    count: movies.length,
    movies: movies,
    message:
      movies.length > 0
        ? `${movies.length} Movies found successfully`
        : "No movies found",
  };
};

export const searchMovieByGenres = async (genre) => {
  if (!genre) {
    return {
      success: false,
      statusCode: 400,
      message: "Movie genre is required",
    };
  }
  const movies = await movieRepository.findMovieByGenre(genre);

  return {
    success: true,
    count: movies.length,
    movies: movies,
    message:
      movies.length > 0
        ? `${movies.length} Movies found successfully`
        : "No movies found",
  };
};

export const createMovie = async (movieData) => {
  const { name, yearPremiered, genres, imageUrl } = movieData;

  if (!name || !yearPremiered || !genres || !imageUrl) {
    return {
      success: false,
      statusCode: 400,
      message: "All fields are required",
    };
  }

  const existingMovie = await movieRepository.findMovieByExactName(name);
  if (existingMovie) {
    return {
      success: false,
      statusCode: 400,
      message: "Movie name already exists",
    };
  }

  const newMovie = await movieRepository.createMovie({
    name,
    yearPremiered,
    genres,
    imageUrl,
  });

  return {
    success: true,
    statusCode: 201,
    movie: newMovie,
    message: "Movie created successfully",
  };
};

export const updateMovie = async (id, movieData) => {
  if (!movieRepository.isValidObjectId(id)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid movie ID format",
    };
  }

  const { name, yearPremiered, genres, imageUrl } = movieData;
  const updateData = {};

  if (name) updateData.name = name;
  if (yearPremiered) updateData.yearPremiered = yearPremiered;
  if (genres) updateData.genres = genres;
  if (imageUrl) updateData.imageUrl = imageUrl;

  const updatedMovie = await movieRepository.updateMovieById(id, updateData);
  if (!updatedMovie) {
    return {
      success: false,
      statusCode: 404,
      message: "Movie not found",
    };
  }

  return {
    success: true,
    movie: updatedMovie,
    message: "Movie updated successfully",
  };
};

export const deleteMovie = async (id) => {
  if (!movieRepository.isValidObjectId(id)) {
    return {
      success: false,
      statusCode: 400,
      message: "Invalid movie ID format",
    };
  }

  const deletedMovie = await movieRepository.deleteMovie(id);

  if (!deletedMovie) {
    return {
      success: false,
      statusCode: 404,
      message: "Movie not found",
    };
  }

  return {
    success: true,
    message: "Movie deleted successfully",
    movie: deletedMovie,
  };
};
