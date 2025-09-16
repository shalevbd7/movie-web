import React, { useState } from "react";
import { X, Save, Calendar } from "lucide-react";

const EditWatchedDateModal = ({
  currentDate,
  movieName,
  memberName,
  onSave,
  onClose,
}) => {
  const [date, setDate] = useState(() => {
    const d = new Date(currentDate);
    return d.toISOString().slice(0, 16);
  });

  const handleSave = () => {
    if (!date) {
      alert("Please select a date and time");
      return;
    }

    onSave(new Date(date));
  };

  const formatDisplayDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl max-w-md w-full relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-800">
              Edit Watched Date
            </h2>
          </div>
          <p className="text-gray-600 text-sm">
            Update when <span className="font-medium">{memberName}</span>{" "}
            watched <span className="font-medium">{movieName}</span>
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Current Date Display */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Date & Time
            </label>
            <div className="bg-gray-50 rounded-lg p-3 text-gray-700 font-mono">
              {formatDisplayDate(currentDate)}
            </div>
          </div>

          {/* New Date Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Date & Time
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Preview */}
          {date && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preview
              </label>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-800 font-mono">
                {formatDisplayDate(date)}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWatchedDateModal;
