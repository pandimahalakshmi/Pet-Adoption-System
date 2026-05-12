import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Notification: count pending adoption requests for this user
  const myRequests = user
    ? (JSON.parse(localStorage.getItem("adoptionRequests")) || []).filter(
        r => r.username === user.username && r.status === "accepted"
      )
    : [];
  const notifCount = myRequests.length;

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="app-navbar">
      <div className="app-navbar-inner">

        {/* Brand */}
        <Link to="/" className="app-nav-brand">
          <div className="app-nav-logo">A</div>
          <span className="app-nav-title">AdoptPet</span>
        </Link>

        {/* Center Links */}
        {user && (
          <ul className="app-nav-links">
            <li><Link to="/" className={`app-nav-link${isActive("/") ? " active" : ""}`}>Home</Link></li>
            <li><Link to="/dashboard" className={`app-nav-link${isActive("/dashboard") ? " active" : ""}`}>Dashboard</Link></li>
            <li><Link to="/pets" className={`app-nav-link${isActive("/pets") ? " active" : ""}`}>Browse Pets</Link></li>
          </ul>
        )}

        {/* Right Side */}
        <div className="app-nav-right">
          {user ? (
            <>
              {/* Notification Bell — shows accepted requests waiting for payment */}
              <div
                className="app-nav-bell"
                title={notifCount > 0 ? `${notifCount} request(s) accepted — pay now!` : "No new notifications"}
                onClick={() => navigate("/my-adoptions")}
                style={{ cursor: "pointer" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                {notifCount > 0 && (
                  <span className="app-nav-bell-dot">{notifCount}</span>
                )}
              </div>

              {/* User Chip */}
              <div className="app-nav-user-chip">
                <div className="app-nav-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span className="app-nav-username">{user.name || user.username}</span>
              </div>

              {/* Logout */}
              <button onClick={logout} className="app-nav-logout-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="app-nav-btn-ghost">Login</Link>
              <Link to="/register" className="app-nav-btn-solid">Get Started</Link>
            </>
          )}

          {/* Mobile Hamburger */}
          <button className="app-nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="app-nav-mobile">
          {user ? (
            <>
              <Link to="/" className="app-nav-mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/dashboard" className="app-nav-mobile-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/pets" className="app-nav-mobile-link" onClick={() => setMenuOpen(false)}>Browse Pets</Link>
              <Link to="/my-adoptions" className="app-nav-mobile-link" onClick={() => setMenuOpen(false)}>My Adoptions</Link>
              <button onClick={logout} className="app-nav-mobile-link app-nav-mobile-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="app-nav-mobile-link" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="app-nav-mobile-link" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
