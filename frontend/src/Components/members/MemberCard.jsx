import React, { useState } from "react";
import { Film } from "lucide-react";
import { useSubscriptionsStore } from "../../store/subscriptionsStore";
import { useNavigate } from "react-router-dom";
import SubscriptionModal from "../../components/subscriptions/SubscriptionModal";

const MemberCard = ({ member, onEdit, onDelete }) => {
  const [showMovies, setShowMovies] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { getMoviesByMember, updateWatchedDate, removeSubscription } =
    useSubscriptionsStore();

  const handleShowMovies = async () => {
    if (showMovies) {
      setShowMovies(false);
      setMovies([]);
      return;
    }

    setLoading(true);
    try {
      const data = await getMoviesByMember(member._id);
      const movieList = Array.isArray(data.movies) ? data.movies : [];
      setMovies(movieList);
      setShowMovies(true);
    } catch (error) {
      console.error("Failed to load movies:", error);
      alert("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    const subscription = {
      memberId: {
        _id: member._id,
        fullName: member.fullName,
      },
      movieId: movie.movieId,
      watchedDate: movie.watchedDate,
      _id: movie._id,
    };

    setSelectedSubscription(subscription);
    setShowSubscriptionModal(true);
  };

  const closeSubscriptionModal = () => {
    setShowSubscriptionModal(false);
    setSelectedSubscription(null);
  };

  const handleUpdateWatchedDate = async (memberId, movieId, newDate) => {
    try {
      await updateWatchedDate(memberId, movieId, newDate);
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.movieId._id === movieId
            ? { ...movie, watchedDate: newDate }
            : movie
        )
      );

      if (
        selectedSubscription &&
        selectedSubscription.movieId._id === movieId
      ) {
        setSelectedSubscription((prev) => ({
          ...prev,
          watchedDate: newDate,
        }));
      }
    } catch (error) {
      console.error("Failed to update watched date:", error);
      throw error;
    }
  };

  const handleDeleteSubscription = async (memberId, movieId) => {
    try {
      await removeSubscription(memberId, movieId);
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.movieId._id !== movieId)
      );
    } catch (error) {
      console.error("Failed to delete subscription:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800">
          {member.fullName}
        </h2>
        <p className="text-gray-600 text-sm">Email: {member.email}</p>
        <p className="text-gray-600 text-sm">City: {member.city}</p>

        <div className="flex flex-wrap gap-2 mt-auto">
          <button
            onClick={handleShowMovies}
            disabled={loading}
            className="flex items-center space-x-1 py-1 px-2 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600 transition disabled:opacity-50"
          >
            <Film className="h-4 w-4" />
            <span>{loading ? "Loading..." : "More Info"}</span>
          </button>

          <button
            onClick={() => onEdit(member)}
            className="py-1 px-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(member._id)}
            className="py-1 px-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
          >
            Delete
          </button>

          <button
            onClick={() => navigate(`/subscriptions?memberId=${member._id}`)}
            className="py-1 px-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition"
          >
            Add Subscription
          </button>
        </div>

        {showMovies && (
          <div className="mt-3 border-t border-gray-200 pt-2 text-sm text-gray-700">
            {movies.length > 0 ? (
              <>
                <h3 className="font-semibold mb-1">Movies watched:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {movies.map((movie) => (
                    <li key={`${movie._id}-${movie.movieId._id}`}>
                      <button
                        onClick={() => handleMovieClick(movie)}
                        className="text-blue-500 hover:underline cursor-pointer bg-none border-none p-0 font-inherit"
                      >
                        {movie.movieId.name}
                      </button>{" "}
                      on{" "}
                      {new Date(movie.watchedDate).toLocaleDateString("en-GB")}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No movies watched</p>
            )}
          </div>
        )}
      </div>

      {showSubscriptionModal && selectedSubscription && (
        <SubscriptionModal
          subscription={selectedSubscription}
          onClose={closeSubscriptionModal}
          onUpdateWatchedDate={handleUpdateWatchedDate}
          onDeleteSubscription={handleDeleteSubscription}
        />
      )}
    </>
  );
};

export default MemberCard;
