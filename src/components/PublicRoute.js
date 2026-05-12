import { Navigate } from "react-router-dom";

// Only redirect away from login/register if already logged in.
// Landing page (/) is accessible to everyone.
function PublicRoute({ children, redirectIfAuth = true }) {
  const user = localStorage.getItem("currentUser");
  if (redirectIfAuth && user) return <Navigate to="/home" />;
  return children;
}

export default PublicRoute;
