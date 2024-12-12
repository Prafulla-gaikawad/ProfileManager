import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the ProfileContext
const ProfileContext = createContext();

// ProfileProvider component
const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profiles from API or local source
  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/profiles"); // Replace with your API endpoint
        setProfiles(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch profiles");
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  // Add a new profile
  const addProfile = (newProfile) => {
    setProfiles([...profiles, newProfile]);
  };

  // Update an existing profile
  const updateProfile = (id, updatedProfile) => {
    setProfiles(
      profiles.map((profile) => (profile.id === id ? updatedProfile : profile))
    );
  };

  // Delete a profile
  const deleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        loading,
        error,
        addProfile,
        updateProfile,
        deleteProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// Export the context and provider
export { ProfileContext, ProfileProvider };
