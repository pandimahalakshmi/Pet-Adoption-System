import { Link } from "react-router-dom";
import { getPetPrice } from "../utils/petHelpers";

const TYPE_COLORS = {
  Dog: "#2a9d8f", Cat: "#7c3aed", Bird: "#d97706", Rabbit: "#dc2626"
};

function PetCard({ pet }) {
  const color = TYPE_COLORS[pet.type] || "#64748b";
  const price = getPetPrice(pet);

  const toggleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let fav = JSON.parse(localStorage.getItem("fav")) || [];
    if (fav.some(p => p.id === pet.id)) {
      fav = fav.filter(p => p.id !== pet.id);
    } else {
      fav.push(pet);
    }
    localStorage.setItem("fav", JSON.stringify(fav));
  };

  const faved = (JSON.parse(localStorage.getItem("fav")) || []).some(p => p.id === pet.id);

  return (
    <div className="col-md-4 mb-4">
      <div className="pet-card">
        <div className="pet-card-img-wrap">
          <img src={pet.image} alt={pet.name} className="pet-card-img" />
          <span className="pet-card-type" style={{ background: `${color}22`, color }}>
            {pet.type}
          </span>
          <button
            className={`pet-card-fav${faved ? " faved" : ""}`}
            onClick={toggleFav}
            title={faved ? "Remove from favorites" : "Add to favorites"}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={faved ? "#ef4444" : "none"} stroke={faved ? "#ef4444" : "#fff"} strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          {/* Price tag */}
          <span className="pet-card-price">${price}</span>
        </div>
        <div className="pet-card-body">
          <div className="pet-card-name">{pet.name}</div>
          <div className="pet-card-breed">{pet.breed}</div>
          <div className="pet-card-age">{pet.age} yr{pet.age !== 1 ? "s" : ""} old</div>
          <Link to={`/pets/${pet.id}`} className="pet-card-btn">
            View & Adopt
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PetCard;
