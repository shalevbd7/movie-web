import React, { useEffect, useState } from "react";
import { useMembersStore } from "../store/membersStore";
import { useMoviesStore } from "../store/moviesStore";
import MembersList from "../Components/members/MembersList";
import MemberForm from "../Components/members/MemberForm";
import MovieForm from "../Components/movies/MovieForm";

const MembersPage = ({ openAddMember = false }) => {
  const {
    members,
    loading,
    loadMembers,
    addMember,
    updateMember,
    deleteMember,
  } = useMembersStore();
  const { updateMovie, deleteMovie } = useMoviesStore();
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMemberFormOpen, setIsMemberFormOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);
  useEffect(() => {
    if (openAddMember) {
      setSelectedMember(null);
      setIsMemberFormOpen(true);
    }
  }, [openAddMember]);

  const handleSaveMember = async (memberData, isUpdate = false) => {
    try {
      if (isUpdate && selectedMember) {
        await updateMember(selectedMember._id, memberData);
      } else {
        await addMember(memberData);
      }
      setIsMemberFormOpen(false);
      setSelectedMember(null);
    } catch (err) {
      console.error("Failed to save member:", err.message);
      alert(`Failed to save member: ${err.message}`);
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm("Are you sure you want to delete the member? ")) return;

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

  const handleAddMember = () => {
    setSelectedMember(null);
    setIsMemberFormOpen(true);
  };

  const handleCloseMemberForm = () => {
    setIsMemberFormOpen(false);
    setSelectedMember(null);
  };

  // Movie handlers for the modal
  const handleSaveMovie = async (movieData, isUpdate = false) => {
    try {
      if (isUpdate && selectedMovie) {
        await updateMovie(selectedMovie._id, movieData);
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

  const handleCloseMovieForm = () => {
    setIsMovieFormOpen(false);
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading members...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Members</h1>
        <button
          onClick={handleAddMember}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
        >
          Add Member
        </button>
      </div>

      <MembersList
        members={members}
        onEdit={handleEditMember}
        onDelete={handleDeleteMember}
        onMovieEdit={handleEditMovie}
        onMovieDelete={handleDeleteMovie}
      />

      {isMemberFormOpen && (
        <MemberForm
          member={selectedMember}
          onClose={handleCloseMemberForm}
          onSave={handleSaveMember}
        />
      )}

      {isMovieFormOpen && (
        <MovieForm
          movie={selectedMovie}
          onClose={handleCloseMovieForm}
          onSave={handleSaveMovie}
        />
      )}
    </div>
  );
};

export default MembersPage;
