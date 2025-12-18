import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mt-4">
        <h2>You are not logged in</h2>
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Welcome, {user.username || user.email}!</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>User ID:</strong> {user.id}
      </p>
    </div>
  );
}

export default Profile;
