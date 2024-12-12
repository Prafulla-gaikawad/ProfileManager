import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import ProfileDetails from "../components/ProfileDetails";

const ProfileDetailPage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/profiles/${id}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };
    fetchProfile();
  }, [id]);

  return profile ? <ProfileDetails profile={profile} /> : <div>Loading...</div>;
};

export default ProfileDetailPage;
