import { useAuth } from "../auth/AuthContext";
export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name || user?.email}</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}