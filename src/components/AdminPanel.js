import React, { useState } from "react";
import MapComponent from "./MapComponent"; // Import MapComponent
import "./AdminPanel.css";

const AdminPanel = () => {
  const [newProfile, setNewProfile] = useState({
    name: "",
    photo: null,
    description: "",
    address: "",
  });
  const [profiles, setProfiles] = useState([]);
  const [currentLatLng, setCurrentLatLng] = useState(null); // Store selected lat/lng

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle photo file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProfile((prev) => ({ ...prev, photo: file }));
  };

  // Function to add a new profile
  const handleAddProfile = async () => {
    const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      newProfile.address
    )}&key=124c0269c77f44108bcfd2574f090cbd`; // Use your OpenCage API Key

    try {
      const response = await fetch(geocodeURL);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;

        const profileToAdd = {
          id: Date.now(),
          name: newProfile.name,
          photo: newProfile.photo,
          description: newProfile.description,
          address: newProfile.address,
          lat: lat,
          lng: lng,
        };

        setProfiles((prevProfiles) => [...prevProfiles, profileToAdd]);

        setNewProfile({
          name: "",
          photo: null,
          description: "",
          address: "",
        });
      } else {
        alert("Unable to find location. Please enter a valid address.");
      }
    } catch (error) {
      console.error("Error during geocoding:", error);
      alert("There was an issue with geocoding. Please try again.");
    }
  };

  // Function to handle the summary button click and show map
  const handleSummaryClick = (lat, lng) => {
    setCurrentLatLng({ lat, lng }); // Set selected lat/lng
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="form-container">
        <h2>Add New Profile</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProfile.name}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
        />
        {newProfile.photo && (
          <img
            src={URL.createObjectURL(newProfile.photo)}
            alt="Profile"
            className="preview-img"
          />
        )}
        <textarea
          name="description"
          placeholder="Description"
          value={newProfile.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newProfile.address}
          onChange={handleInputChange}
        />
        <button onClick={handleAddProfile}>Add Profile</button>
      </div>

      {/* Existing Profiles */}
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
                  <button
                    onClick={() => handleSummaryClick(profile.lat, profile.lng)}
                  >
                    Summary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Show map if a profile is clicked */}
      {currentLatLng && (
        <div
          style={{
            width: "100%", // Adjust the width to fit the parent container
            maxWidth: "600px", // Limit the max width for better layout
            margin: "20px auto", // Center the box horizontally with margin
            padding: "10px", // Add some padding inside the container
            border: "1px solid #ccc", // Optional: Add a border for the container
            borderRadius: "8px", // Optional: Rounded corners for aesthetics
            backgroundColor: "#f9f9f9", // Optional: Background color for contrast
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Add a subtle shadow
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Geographical Location
          </h3>
          <MapComponent lat={currentLatLng.lat} lng={currentLatLng.lng} />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
