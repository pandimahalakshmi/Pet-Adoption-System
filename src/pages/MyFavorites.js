import { useState } from "react";
import { Link } from "react-router-dom";

function MyFavorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("fav")) || []
  );

  const removeFavorite = (petId) => {
    const updated = favorites.filter(p => p.id !== petId);
    setFavorites(updated);
    localStorage.setItem("fav", JSON.stringify(updated));
  };

  return (
    <div>
      <div className="home-section-title mb-1">My Favorites</div>
      <div className="home-section-sub mb-4">Pets you have saved for later</div>

      <div className="user-card">
        <div className="user-card-header">
          <h5>Saved Pets</h5>
          <span className="badge bg-danger">{favorites.length}</span>
        </div>

        {favorites.length === 0 ? (
          <div className="user-empty">
            <p>No favorites saved yet. Browse pets and click the heart icon to save them here.</p>
            <Link to="/pets" className="btn btn-sm btn-primary">Browse Pets</Link>
          </div>
        ) : (
          <ul className="user-pet-list">
            {favorites.map((pet, i) => (
              <li key={i} className="user-pet-item">
                <img src={pet.image} alt={pet.name} className="user-pet-img" />
                <div className="flex-grow-1">
                  <div className="user-pet-name">{pet.name}</div>
                  <div className="user-pet-meta">{pet.breed} · {pet.type} · {pet.age} yr{pet.age !== 1 ? "s" : ""}</div>
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <Link to={`/pets/${pet.id}`} className="btn btn-sm btn-primary">View</Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFavorite(pet.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyFavorites;
