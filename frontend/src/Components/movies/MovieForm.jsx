import React, { useState, useEffect } from "react";

const MovieForm = ({ movie, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [yearPremiered, setYearPremiered] = useState("");
  const [genres, setGenres] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movie) {
      setName(movie.name || "");
      setYearPremiered(movie.yearPremiered || "");
      setGenres(movie.genres ? movie.genres.join(", ") : "");
      setImageUrl(movie.imageUrl || "");
    }
  }, [movie]);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Movie name is required";
    }

    if (!yearPremiered.trim()) {
      newErrors.yearPremiered = "Year is required";
    } else {
      const year = parseInt(yearPremiered);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1880 || year > currentYear + 5) {
        newErrors.yearPremiered = `Year must be between 1880 and ${
          currentYear + 5
        }`;
      }
    }

    if (!genres.trim()) {
      newErrors.genres = "At least one genre is required";
    }

    if (imageUrl && !isValidUrl(imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const movieData = {
      name: name.trim(),
      yearPremiered: yearPremiered.trim(),
      genres: genres
        .split(",")
        .map((g) => g.trim())
        .filter((g) => g),
      imageUrl: imageUrl.trim(),
    };

    try {
      await onSave(movieData, !!movie);
    } catch (error) {
      console.error("Error saving movie:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={handleClose}
          disabled={loading}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 disabled:opacity-50"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {movie ? "Update Movie" : "Add Movie"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loading}
              placeholder="Enter movie name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Year *
            </label>
            <input
              type="number"
              value={yearPremiered}
              onChange={(e) => {
                setYearPremiered(e.target.value);
                if (errors.yearPremiered)
                  setErrors({ ...errors, yearPremiered: "" });
              }}
              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.yearPremiered ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loading}
              placeholder="e.g. 2023"
              min="1880"
              max={new Date().getFullYear() + 5}
            />
            {errors.yearPremiered && (
              <p className="text-red-500 text-sm mt-1">
                {errors.yearPremiered}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Genres (comma separated) *
            </label>
            <input
              type="text"
              value={genres}
              onChange={(e) => {
                setGenres(e.target.value);
                if (errors.genres) setErrors({ ...errors, genres: "" });
              }}
              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.genres ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loading}
              placeholder="e.g. Action, Comedy, Drama"
            />
            {errors.genres && (
              <p className="text-red-500 text-sm mt-1">{errors.genres}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                if (errors.imageUrl) setErrors({ ...errors, imageUrl: "" });
              }}
              className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                errors.imageUrl ? "border-red-500" : "border-gray-300"
              }`}
              disabled={loading}
              placeholder="https://example.com/image.jpg"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : movie ? "Update Movie" : "Add Movie"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieForm;
