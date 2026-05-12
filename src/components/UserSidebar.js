import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllPets } from "../utils/petHelpers";

function UserSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const allPets = getAllPets();
  const adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];
  const favorites = JSON.parse(localStorage.getItem("fav")) || [];
  const myRequests = (JSON.parse(localStorage.getItem("adoptionRequests")) || [])
    .filter(r => r.username === user.username);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

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

      {/* Navigation */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">Navigation</div>
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
            <Link to="/about" className={`sidebar-link ${isActive("/about") ? "active" : ""}`}>
              About
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
              <span className="sidebar-link-badge">{myRequests.length}</span>
            </Link>
          </li>
          <li>
            <Link to="/my-favorites" className={`sidebar-link ${isActive("/my-favorites") ? "active" : ""}`}>
              My Favorites
              <span className="sidebar-link-badge">{favorites.length}</span>
            </Link>
          </li>
          <li>
            <Link to="/adopted-pets" className={`sidebar-link ${isActive("/adopted-pets") ? "active" : ""}`}>
              Adopted Pets
              <span className="sidebar-link-badge">{adoptions.length}</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout */}
      <button onClick={logout} className="sidebar-logout-btn">Logout</button>

    </aside>
  );
}

export default UserSidebar;
