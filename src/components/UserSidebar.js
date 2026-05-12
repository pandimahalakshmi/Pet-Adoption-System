import { Link, useLocation } from "react-router-dom";
import { getAllPets } from "../utils/petHelpers";

function UserSidebar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const allPets = getAllPets();
  const adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];
  const favorites = JSON.parse(localStorage.getItem("fav")) || [];
  const myRequests = (JSON.parse(localStorage.getItem("adoptionRequests")) || [])
    .filter(r => r.username === user.username);
  const pendingRequests = myRequests.filter(r => r.status === "pending" || r.status === "accepted");

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="user-sidebar">

      {/* Profile */}
      <div className="sidebar-profile">
        <div className="sidebar-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <div className="sidebar-name">{user.name || user.username}</div>
          <div className="sidebar-role">Member</div>
        </div>
      </div>

      {/* Main */}
      <div className="sidebar-section">
        <ul className="sidebar-nav">
          <li>
            <Link to="/dashboard" className={`sidebar-link ${isActive("/dashboard") ? "active" : ""}`}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/pets" className={`sidebar-link ${isActive("/pets") ? "active" : ""}`}>
              Browse Pets
              <span className="sidebar-link-badge">{allPets.length}</span>
            </Link>
          </li>
          <li>
            <Link to="/shelters" className={`sidebar-link ${isActive("/shelters") ? "active" : ""}`}>
              Nearby Shelters
            </Link>
          </li>
        </ul>
      </div>

      {/* My Activity */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">My Activity</div>
        <ul className="sidebar-nav">
          <li>
            <Link to="/my-adoptions" className={`sidebar-link ${isActive("/my-adoptions") ? "active" : ""}`}>
              My Adoptions
              <span className="sidebar-link-badge">{adoptions.length}</span>
            </Link>
          </li>
          <li>
            <Link to="/my-favorites" className={`sidebar-link ${isActive("/my-favorites") ? "active" : ""}`}>
              Favorites
              <span className="sidebar-link-badge">{favorites.length}</span>
            </Link>
          </li>
          <li>
            <Link to="/adoption-requests" className={`sidebar-link ${isActive("/adoption-requests") ? "active" : ""}`}>
              Adoption Requests
              {pendingRequests.length > 0 && (
                <span className="sidebar-link-badge" style={{ background: "#fbbf24", color: "#1e293b" }}>{pendingRequests.length}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>

      {/* Account */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Account</div>
        <ul className="sidebar-nav">
          <li>
            <Link to="/notifications" className={`sidebar-link ${isActive("/notifications") ? "active" : ""}`}>
              Notifications
              {myRequests.length > 0 && (
                <span className="sidebar-link-badge">{myRequests.length}</span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/profile" className={`sidebar-link ${isActive("/profile") ? "active" : ""}`}>
              Profile
            </Link>
          </li>
          <li>
            <Link to="/about" className={`sidebar-link ${isActive("/about") ? "active" : ""}`}>
              About
            </Link>
          </li>
        </ul>
      </div>

    </aside>
  );
}

export default UserSidebar;
