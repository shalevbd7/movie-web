import React, { useState } from "react";
import { X, Calendar, Edit3, Trash2 } from "lucide-react";
import EditWatchedDateModal from "./EditWatchedDateModal";

const SubscriptionModal = ({
  subscription,
  onClose,
  onUpdateWatchedDate,
  onDeleteSubscription,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleUpdateDate = async (newDate) => {
    try {
      await onUpdateWatchedDate(
        subscription.memberId._id,
        subscription.movieId._id,
        newDate
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update date:", error);
      alert("Failed to update watched date");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this subscription?")) {
      try {
        await onDeleteSubscription(
          subscription.memberId._id,
          subscription.movieId._id
        );
        onClose();
      } catch (error) {
        console.error("Failed to delete subscription:", error);
        alert("Failed to delete subscription");
      }
    }
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-lg w-full relative shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>

          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Subscription Details
            </h2>
            <p className="text-gray-600">Manage viewing information</p>
          </div>

          {/* Movie Info */}
          <div className="p-6">
            <div className="flex items-start space-x-4 mb-6">
              <img
                src={subscription.movieId.imageUrl}
                alt={subscription.movieId.name}
                className="w-24 h-36 rounded-lg object-cover shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {subscription.movieId.name}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Year:</span>{" "}
                  {subscription.movieId.yearPremiered}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Genres:</span>{" "}
                  {subscription.movieId.genres?.join(", ") || "No genres"}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Viewer:</span>{" "}
                  {subscription.memberId.fullName}
                </p>
              </div>
            </div>

            {/* Watched Date */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-700">
                  Watched Date & Time
                </span>
              </div>
              <p className="text-lg text-gray-800 font-mono">
                {formatDateTime(subscription.watchedDate)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEditModal(true)}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Date</span>
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Subscription</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Date Modal */}
      {showEditModal && (
        <EditWatchedDateModal
          currentDate={subscription.watchedDate}
          movieName={subscription.movieId.name}
          memberName={subscription.memberId.fullName}
          onSave={handleUpdateDate}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default SubscriptionModal;
