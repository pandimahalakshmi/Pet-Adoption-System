import { Link, useLocation } from "react-router-dom";
import petsData from "../data/petsData";

function Sidebar() {
  const location = useLocation();
  const userPets = JSON.parse(localStorage.getItem("userPets")) || [];
  const allPets = [...petsData, ...userPets];
  const adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];
  const favorites = JSON.parse(localStorage.getItem("fav")) || [];

  const dogs = allPets.filter(p => p.type === "Dog");
  const cats = allPets.filter(p => p.type === "Cat");

  const navLinks = [
    { to: "/", label: "🏠 Home", exact: true },
    { to: "/pets", label: "🐾 All Pets" },
    { to: "/add-pet", label: "➕ Add Pet" },
  ];

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="sidebar">
      {/* Navigation */}
      <div className="sidebar-section">
        <h6 className="sidebar-section-title">Navigation</h6>
        <ul className="sidebar-nav">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`sidebar-link ${isActive(link.to, link.exact) ? "active" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Stats */}
      <div className="sidebar-section">
        <h6 className="sidebar-section-title">My Stats</h6>
        <div className="sidebar-stats">
          <div className="sidebar-stat-item">
            <span className="sidebar-stat-value">{allPets.length}</span>
            <span className="sidebar-stat-label">Total Pets</span>
          </div>
          <div className="sidebar-stat-item">
            <span className="sidebar-stat-value">{adoptions.length}</span>
            <span className="sidebar-stat-label">Adopted</span>
          </div>
          <div className="sidebar-stat-item">
            <span className="sidebar-stat-value">{favorites.length}</span>
            <span className="sidebar-stat-label">Favorites</span>
          </div>
          <div className="sidebar-stat-item">
            <span className="sidebar-stat-value">{userPets.length}</span>
            <span className="sidebar-stat-label">Added by You</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="sidebar-section">
        <h6 className="sidebar-section-title">Categories</h6>
        <ul className="sidebar-nav">
          <li>
            <Link to="/pets" className="sidebar-link">
              🐶 Dogs
              <span className="sidebar-badge">{dogs.length}</span>
            </Link>
          </li>
          <li>
            <Link to="/pets" className="sidebar-link">
              🐱 Cats
              <span className="sidebar-badge">{cats.length}</span>
            </Link>
          </li>
          <li>
            <Link to="/pets" className="sidebar-link">
              🐦 Birds
              <span className="sidebar-badge">0</span>
            </Link>
          </li>
          <li>
            <Link to="/pets" className="sidebar-link">
              🐰 Rabbits
              <span className="sidebar-badge">0</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Recent Pets */}
      <div className="sidebar-section">
        <h6 className="sidebar-section-title">Recent Pets</h6>
        <ul className="sidebar-recent">
          {allPets.slice(0, 4).map(pet => (
            <li key={pet.id}>
              <Link to={`/pets/${pet.id}`} className="sidebar-recent-item">
                <img src={pet.image} alt={pet.name} className="sidebar-pet-img" />
                <div>
                  <div className="sidebar-pet-name">{pet.name}</div>
                  <div className="sidebar-pet-breed">{pet.breed}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Add */}
      <div className="sidebar-section">
        <Link to="/add-pet" className="btn btn-warning w-100 fw-bold">
          + List a Pet for Adoption
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
