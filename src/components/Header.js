import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="header-brand">
          <div>
            <span className="header-brand-name">AdoptPet</span>
            <span className="header-brand-tag">Find your forever friend</span>
          </div>
        </Link>
        <div className="header-right">
          <span className="header-contact-item d-none d-md-inline">1-800-PET-LOVE</span>
          <span className="header-contact-item d-none d-md-inline">adopt@petlove.com</span>
          {user && (
            <div className="header-user-box">
              <div className="header-avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="d-none d-md-block">
                <div className="header-user-name">{user.name || user.username}</div>
                <div className="header-user-role">Member</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
