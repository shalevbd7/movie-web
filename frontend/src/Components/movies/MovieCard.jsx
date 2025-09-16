import React, { useState } from "react";
import { Users, X } from "lucide-react";
import { useSubscriptionsStore } from "../../store/subscriptionsStore";
import MemberCard from "../members/MemberCard";

const MovieCard = ({
  movie,
  onEdit,
  onDelete,
  onMemberEdit,
  onMemberDelete,
}) => {
  const [showMembers, setShowMembers] = useState(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberModal, setShowMemberModal] = useState(false);

  const { getMembersByMovie } = useSubscriptionsStore();

  const handleShowMembers = async () => {
    if (showMembers) {
      setShowMembers(false);
      setMembers([]);
      return;
    }

    setLoading(true);
    try {
      const data = await getMembersByMovie(movie._id);
      console.log("API Response:", data);
      const membersList = Array.isArray(data.members) ? data.members : [];

      setMembers(membersList);
      setShowMembers(true);
    } catch (err) {
      console.error("Failed to load members:", err);
      alert("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member.memberId);
    setShowMemberModal(true);
  };

  const closeMemberModal = () => {
    setShowMemberModal(false);
    setSelectedMember(null);
  };

  const handleMemberEdit = (member) => {
    closeMemberModal();
    if (onMemberEdit) {
      onMemberEdit(member);
    }
  };

  const handleMemberDelete = (memberId) => {
    closeMemberModal();
    if (onMemberDelete) {
      onMemberDelete(memberId);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col">
        <img
          src={movie.imageUrl || "https://via.placeholder.com/300x400"}
          alt={movie.name}
          className="rounded-lg object-cover mb-3 h-60 w-full"
        />
        <h2 className="text-lg font-semibold text-gray-800">{movie.name}</h2>
        <p className="text-gray-600 text-sm mb-2">
          Year: {movie.yearPremiered}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          Genres: {movie.genres?.join(", ") || "No genres"}
        </p>

        <div className="flex justify-between mt-auto space-x-2">
          <button
            onClick={handleShowMembers}
            disabled={loading}
            className="flex items-center space-x-1 py-1 px-2 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600 transition disabled:opacity-50"
          >
            <Users className="h-4 w-4" />
            <span>{loading ? "Loading..." : "More Info"}</span>
          </button>

          <button
            onClick={() => onEdit(movie)}
            className="py-1 px-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(movie._id)}
            className="py-1 px-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>

        {showMembers && (
          <div className="mt-3 border-t border-gray-200 pt-2 text-sm text-gray-700">
            {members.length > 0 ? (
              <>
                <h3 className="font-semibold mb-1">
                  Members who watched the movie:
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {members.map((member) => (
                    <li key={`${member._id}-${member.memberId._id}`}>
                      <button
                        onClick={() => handleMemberClick(member)}
                        className="text-blue-500 hover:underline cursor-pointer bg-none border-none p-0 font-inherit"
                      >
                        {member.memberId.fullName}
                      </button>{" "}
                      watched on{" "}
                      {new Date(member.watchedDate).toLocaleDateString("en-GB")}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No one watched this movie yet</p>
            )}
          </div>
        )}
      </div>

      {/* Member Modal */}
      {showMemberModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeMemberModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>

            <div className="p-4">
              <MemberCard
                member={selectedMember}
                onEdit={handleMemberEdit}
                onDelete={handleMemberDelete}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
