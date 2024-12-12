import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import "./Home.css"; // Make sure to create some styling for the home page

const Home = () => {
  const { profiles } = useContext(ProfileContext);

  return (
    <div className="home-page">
      <h1>Welcome to the Profile Page</h1>

      <div className="profiles-container">
        <h2>Existing Profiles</h2>
        {profiles.length === 0 ? (
          <p>No profiles available.</p>
        ) : (
          <div className="profiles-grid">
            {profiles.map((profile) => (
              <div key={profile.id} className="profile-card">
                <img
                  src={URL.createObjectURL(profile.photo)}
                  alt="Profile"
                  className="profile-photo"
                />
                <div className="profile-details">
                  <h3>{profile.name}</h3>
                  <p>{profile.description}</p>
                  <p>
                    <strong>Address:</strong> {profile.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="create-profile-container">
        <Link to="/admin">
          <button className="create-profile-btn">Create New Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
