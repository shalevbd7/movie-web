import React from "react";
import MovieCard from "./MovieCard";

const MoviesList = ({
  movies,
  onEdit,
  onDelete,
  onMemberEdit,
  onMemberDelete,
  isFiltered = false,
}) => {
  if (!Array.isArray(movies)) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-500">Invalid movies data</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-6xl mb-4">{isFiltered ? "🔍" : "🎬"}</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {isFiltered ? "No Movies Match Your Filters" : "No Movies Found"}
        </h3>
        <p className="text-gray-500 mb-4">
          {isFiltered
            ? "Try adjusting your search criteria or clear the filters"
            : "Start by adding your first movie to the collection"}
        </p>
        {isFiltered && (
          <p className="text-sm text-gray-400">
            Use the "Clear Filters" button to see all movies
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => {
        if (!movie || !movie._id) {
          console.warn("Invalid movie object:", movie);
          return null;
        }

        return (
          <MovieCard
            key={movie._id}
            movie={movie}
            onEdit={onEdit}
            onDelete={onDelete}
            onMemberEdit={onMemberEdit}
            onMemberDelete={onMemberDelete}
          />
        );
      })}
    </div>
  );
};

export default MoviesList;
