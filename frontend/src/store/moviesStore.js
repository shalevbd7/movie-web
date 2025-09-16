import { create } from "zustand";
import { moviesAPI, apiHelper } from "../services/api";

export const useMoviesStore = create((set, get) => ({
  movies: [],
  loading: false,
  error: null,

  // Helper to set error state
  setError: (error) => set({ error, loading: false }),

  // Helper to clear error
  clearError: () => set({ error: null }),

  loadMovies: async () => {
    set({ loading: true, error: null });
    try {
      const data = await moviesAPI.getAllMovies();
      set({
        movies: Array.isArray(data) ? data : data.movies || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = apiHelper.handleError(err);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  addMovie: async (movieData) => {
    set({ loading: true, error: null });
    try {
      const newMovie = await moviesAPI.createMovie(movieData);

      const currentMovies = get().movies;
      set({
        movies: [...currentMovies, newMovie],
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = apiHelper.handleError(err);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  updateMovie: async (id, movieData) => {
    set({ loading: true, error: null });
    try {
      const updatedMovie = await moviesAPI.updateMovie(id, movieData);

      // Update local state immediately
      const currentMovies = get().movies;
      const updatedMovies = currentMovies.map((movie) =>
        movie._id === id ? { ...movie, ...movieData, _id: id } : movie
      );

      set({
        movies: updatedMovies,
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = apiHelper.handleError(err);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  deleteMovie: async (id) => {
    set({ loading: true, error: null });
    try {
      await moviesAPI.deleteMovie(id);

      // Remove from local state immediately
      const currentMovies = get().movies;
      const filteredMovies = currentMovies.filter((movie) => movie._id !== id);

      set({
        movies: filteredMovies,
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = apiHelper.handleError(err);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  // Additional utility methods
  getMovieById: (id) => {
    return get().movies.find((movie) => movie._id === id);
  },

  searchMovies: (searchTerm) => {
    const movies = get().movies;
    if (!searchTerm) return movies;

    return movies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genres.some((genre) =>
          genre.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  },
}));
