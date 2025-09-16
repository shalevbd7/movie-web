import React from "react";
import MemberCard from "./MemberCard";

const MembersList = ({
  members,
  onEdit,
  onDelete,
  onMovieEdit,
  onMovieDelete,
}) => {
  if (!Array.isArray(members)) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-500">Invalid members data</div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-6xl mb-4">👥</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Members Found
        </h3>
        <p className="text-gray-500 mb-4">
          Start by adding your first member to the system
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {members.map((member) => {
        if (!member || !member._id) {
          console.warn("Invalid member object:", member);
          return null;
        }

        return (
          <MemberCard
            key={member._id}
            member={member}
            onEdit={onEdit}
            onDelete={onDelete}
            onMovieEdit={onMovieEdit}
            onMovieDelete={onMovieDelete}
          />
        );
      })}
    </div>
  );
};

export default MembersList;
