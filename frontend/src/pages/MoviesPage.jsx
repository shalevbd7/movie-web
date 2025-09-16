import React, { useEffect, useState, useMemo } from "react";
import { useMoviesStore } from "../store/moviesStore";
import { useMembersStore } from "../store/membersStore";
import MoviesList from "../Components/movies/MoviesList";
import MovieForm from "../Components/movies/MovieForm";
import MemberForm from "../Components/members/MemberForm";

const MoviesPage = ({ openAddMovie = false }) => {
  const { movies, loading, loadMovies, addMovie, updateMovie, deleteMovie } =
    useMoviesStore();
  const { updateMember, deleteMember } = useMembersStore();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    if (openAddMovie) {
      setSelectedMovie(null);
      setIsMovieFormOpen(true);
    }
  }, [openAddMovie]);

  // Get unique genres from all movies
  const availableGenres = useMemo(() => {
    if (!movies || !Array.isArray(movies)) return [];

    const genres = new Set();
    movies.forEach((movie) => {
      if (movie.genres && Array.isArray(movie.genres)) {
        movie.genres.forEach((genre) => {
          if (genre && genre.trim()) {
            genres.add(genre.trim());
          }
        });
      }
    });

    return Array.from(genres).sort();
  }, [movies]);

  // Filter movies based on search term and selected genre
  const filteredMovies = useMemo(() => {
    if (!movies || !Array.isArray(movies)) return [];

    return movies.filter((movie) => {
      // Search by movie name
      const matchesSearch =
        !searchTerm ||
        (movie.name &&
          movie.name.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter by genre
      const matchesGenre =
        !selectedGenre ||
        (movie.genres &&
          Array.isArray(movie.genres) &&
          movie.genres.some(
            (genre) => genre.toLowerCase() === selectedGenre.toLowerCase()
          ));

      return matchesSearch && matchesGenre;
    });
  }, [movies, searchTerm, selectedGenre]);

  const handleSaveMovie = async (movieData, isUpdate = false) => {
    try {
      if (isUpdate && selectedMovie) {
        await updateMovie(selectedMovie._id, movieData);
      } else {
        await addMovie(movieData);
      }
      setIsMovieFormOpen(false);
      setSelectedMovie(null);
    } catch (err) {
      console.error("Failed to save movie:", err.message);
      alert(`Failed to save movie: ${err.message}`);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      await deleteMovie(movieId);
    } catch (err) {
      console.error("Failed to delete movie:", err.message);
      alert(`Failed to delete movie: ${err.message}`);
    }
  };

  const handleEditMovie = (movie) => {
    setSelectedMovie(movie);
    setIsMovieFormOpen(true);
  };

  const handleAddMovie = () => {
    setSelectedMovie(null);
    setIsMovieFormOpen(true);
  };

  const handleCloseMovieForm = () => {
    setIsMovieFormOpen(false);
    setSelectedMovie(null);
  };

  // Member handlers for the modal
  const handleSaveMember = async (memberData, isUpdate = false) => {
    try {
      if (isUpdate && selectedMember) {
        await updateMember(selectedMember._id, memberData);
      }
      setIsMemberFormOpen(false);
      setSelectedMember(null);
    } catch (err) {
      console.error("Failed to save member:", err.message);
      alert(`Failed to save member: ${err.message}`);
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      await deleteMember(memberId);
    } catch (err) {
      console.error("Failed to delete member:", err.message);
      alert(`Failed to delete member: ${err.message}`);
    }
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setIsMemberFormOpen(true);
  };

  const handleCloseMemberForm = () => {
    setIsMemberFormOpen(false);
    setSelectedMember(null);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedGenre("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Movies</h1>
        <button
          onClick={handleAddMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
        >
          Add Movie
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search by name */}
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search by movie name
            </label>
            <input
              id="search"
              type="text"
              placeholder="Enter movie name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Filter by genre */}
          <div className="flex-1">
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filter by genre
            </label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All genres</option>
              {availableGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Clear filters button */}
          <div className="flex items-end">
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results info */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredMovies.length} of {movies?.length || 0} movies
          {(searchTerm || selectedGenre) && (
            <span className="ml-2">
              {searchTerm && `• Search: "${searchTerm}"`}
              {selectedGenre && `• Genre: "${selectedGenre}"`}
            </span>
          )}
        </div>
      </div>

      {/* Movies List */}
      <MoviesList
        movies={filteredMovies}
        onEdit={handleEditMovie}
        onDelete={handleDeleteMovie}
        onMemberEdit={handleEditMember}
        onMemberDelete={handleDeleteMember}
        isFiltered={!!(searchTerm || selectedGenre)}
      />

      {/* Modals */}
      {isMovieFormOpen && (
        <MovieForm
          movie={selectedMovie}
          onClose={handleCloseMovieForm}
          onSave={handleSaveMovie}
        />
      )}

      {isMemberFormOpen && (
        <MemberForm
          member={selectedMember}
          onClose={handleCloseMemberForm}
          onSave={handleSaveMember}
        />
      )}
    </div>
  );
};

export default MoviesPage;
