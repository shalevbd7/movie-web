import React, { useState, useEffect } from "react";
import { useMoviesStore } from "../../store/moviesStore";
import { useMembersStore } from "../../store/membersStore";
import { useSubscriptionsStore } from "../../store/subscriptionsStore";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const QuickSubscription = () => {
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [watchedDate, setWatchedDate] = useState("");
  const [loading, setLoading] = useState(false);

  const { movies, loadMovies } = useMoviesStore();
  const { members, loadMembers } = useMembersStore();
  const { addSubscription } = useSubscriptionsStore();

  const [searchParams] = useSearchParams();
  const memberIdFromQuery = searchParams.get("memberId");

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([loadMovies(), loadMembers()]);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load data");
      }
    };

    loadData();
  }, [loadMovies, loadMembers]);

  useEffect(() => {
    if (memberIdFromQuery && members.length > 0) {
      setSelectedMember(memberIdFromQuery);
    }
  }, [memberIdFromQuery, members]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMember || !selectedMovie) {
      toast.error("Please select both member and movie");
      return;
    }

    setLoading(true);

    try {
      await addSubscription(
        selectedMember,
        selectedMovie,
        watchedDate || new Date().toISOString()
      );

      toast.success("Subscription added successfully!");

      setSelectedMember("");
      setSelectedMovie("");
      setWatchedDate("");
    } catch (error) {
      console.error("Error adding subscription:", error);
      toast.error(error.message || "Failed to add subscription");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Subscription
        </h2>

        <div className="space-y-6">
          {/* choose a member */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Member *
            </label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              disabled={loading}
              required
            >
              <option value="">Choose a member...</option>
              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.fullName} - {member.city}
                </option>
              ))}
            </select>
          </div>

          {/* choose a movie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Movie *
            </label>
            <select
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              disabled={loading}
              required
            >
              <option value="">Choose a movie...</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.name} ({movie.yearPremiered})
                </option>
              ))}
            </select>
          </div>

          {/* set date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Watched Date & Time
            </label>
            <input
              type="datetime-local"
              value={watchedDate}
              onChange={(e) => setWatchedDate(e.target.value)}
              defaultValue={getCurrentDateTime()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              disabled={loading}
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave empty to use current date and time
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !selectedMember || !selectedMovie}
            className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-teal-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                <span>Adding Subscription...</span>
              </div>
            ) : (
              "Add Subscription"
            )}
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Quick Info:
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Total Members: {members.length}</p>
            <p>• Total Movies: {movies.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSubscription;
