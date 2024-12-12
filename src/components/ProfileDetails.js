const ProfileDetails = ({ profile }) => (
  <div>
    <h2>{profile.name}</h2>
    <p>{profile.description}</p>
    <p>{profile.contact}</p>
    <p>{profile.interests}</p>
  </div>
);

export default ProfileDetails;
