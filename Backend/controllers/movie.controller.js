// This file contains controller functions for handling movie-related API requests.
import * as movieService from "../service/movieService.js";

// Controller to retrieve all movies from the database.
export async function getAllMovies(req, res) {
  try {
    const result = await movieService.getAllMovies();
    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getAllMovies controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
// Controller to retrieve a single movie by its ID.
export async function getMovieById(req, res) {
  try {
    const { id } = req.params;
    const result = await movieService.getMovieById(id);

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in getMovieById controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
// Controller to search for movies by their name.
export async function searchMovieByName(req, res) {
  try {
    const { name } = req.query;
    const result = await movieService.searchMovieByName(name);

    if (!result.success && result.statusCode) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log("Error in searchMovieByName controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
// Controller to search for movies by their genre.
export async function searchMovieByGenres(req, res) {
  try {
    const { genre } = req.query;
    const result = await movieService.searchMovieByGenres(genre);

    if (!result.success && result.statusCode) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in searchMovieByGenres controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

// CREATE, UPDATE, DELETE OPERATIONS:

export async function createMovie(req, res) {
  try {
    const result = await movieService.createMovie(req.body);

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }
    res.status(result.statusCode).json(result);
  } catch (error) {
    console.log("Error in createMovie controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function updateMovie(req, res) {
  try {
    const { id } = req.params;
    const result = await movieService.updateMovie(id, req.body);

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in updateMovie controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function deleteMovie(req, res) {
  try {
    const { id } = req.params;
    const result = await movieService.deleteMovie(id);

    if (!result.success) {
      return res.status(result.statusCode).json({
        success: result.success,
        message: result.message,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log("Error in deleteMovie controller", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
