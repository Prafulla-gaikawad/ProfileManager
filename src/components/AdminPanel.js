import React, { useState } from "react";
import MapComponent from "./MapComponent";
import SearchBar from "./SearchBar";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [newProfile, setNewProfile] = useState({
    name: "",
    photo: null,
    description: "",
    address: "",
  });
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLatLng, setCurrentLatLng] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProfile((prev) => ({ ...prev, photo: file }));
  };

  const handleAddProfile = async () => {
    const geocodeURL = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      newProfile.address
    )}&key=124c0269c77f44108bcfd2574f090cbd`;

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

  const handleSummaryClick = (lat, lng) => {
    setCurrentLatLng({ lat, lng });
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className="search-bar-container">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="profiles-container">
        <h2>Existing Profiles</h2>
        {filteredProfiles.length === 0 ? (
          <p>No profiles found.</p>
        ) : (
          <div className="profiles-grid">
            {filteredProfiles.map((profile) => (
              <div
                key={profile.id}
                className="profile-card"
                style={{ cursor: "pointer" }}
              >
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

      {currentLatLng && (
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "20px auto",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
