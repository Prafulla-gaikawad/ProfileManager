import React from "react";

const ProfileCard = ({ profile, onDelete }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        margin: "10px",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3>{profile.name}</h3>
      <img
        src={profile.photo}
        alt={`${profile.name}'s photo`}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <p>{profile.description}</p>
      <p>
        <strong>Location:</strong> {profile.address}
      </p>
      <button onClick={() => onDelete(profile.id)}>Delete</button>
    </div>
  );
};

export default ProfileCard;
