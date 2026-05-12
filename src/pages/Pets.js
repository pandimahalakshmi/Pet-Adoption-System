import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllPets, getPetPrice } from "../utils/petHelpers";

const TYPE_COLORS = {
  Dog: "#2a9d8f", Cat: "#7c3aed", Bird: "#d97706", Rabbit: "#dc2626"
};

function Pets() {
  const allPets = getAllPets();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const typeCounts = {
    All: allPets.length,
    Dog: allPets.filter(p => p.type === "Dog").length,
    Cat: allPets.filter(p => p.type === "Cat").length,
    Bird: allPets.filter(p => p.type === "Bird").length,
    Rabbit: allPets.filter(p => p.type === "Rabbit").length,
  };

  let filtered = allPets.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || p.type === filterType;
    return matchSearch && matchType;
  });

  if (sortBy === "name-asc")  filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "name-desc") filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
  if (sortBy === "age-asc")   filtered = [...filtered].sort((a, b) => a.age - b.age);
  if (sortBy === "age-desc")  filtered = [...filtered].sort((a, b) => b.age - a.age);

  const isFav = (id) => {
    const fav = JSON.parse(localStorage.getItem("fav")) || [];
    return fav.some(p => p.id === id);
  };

  const toggleFav = (pet, e) => {
    e.preventDefault();
    e.stopPropagation();
    let fav = JSON.parse(localStorage.getItem("fav")) || [];
    if (fav.some(p => p.id === pet.id)) {
      fav = fav.filter(p => p.id !== pet.id);
    } else {
      fav.push(pet);
    }
    localStorage.setItem("fav", JSON.stringify(fav));
    // force re-render
    window.dispatchEvent(new Event("favUpdated"));
  };

  // listen for fav updates to re-render
  const [, setTick] = useState(0);
  window.addEventListener("favUpdated", () => setTick(t => t + 1), { once: true });

  return (
    <div className="pets-page">

      {/* Page header */}
      <div className="pets-page-header">
        <div>
          <h2 className="pets-page-title">Browse Pets</h2>
          <p className="pets-page-sub">{filtered.length} pets available for adoption</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="pets-filter-bar">
        {/* Search */}
        <div className="pets-search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="pets-search-input"
            placeholder="Search by name or breed..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="pets-search-clear" onClick={() => setSearch("")}>✕</button>
          )}
        </div>

        {/* Type tabs */}
        <div className="pets-type-tabs">
          {["All", "Dog", "Cat", "Bird", "Rabbit"].map(t => (
            <button
              key={t}
              className={`pets-type-tab${filterType === t ? " active" : ""}`}
              style={filterType === t && t !== "All" ? { background: TYPE_COLORS[t], borderColor: TYPE_COLORS[t], color: "#fff" } : {}}
              onClick={() => setFilterType(t)}
            >
              {t === "All" ? "All" : t + "s"}
              <span className="pets-type-count">{typeCounts[t]}</span>
            </button>
          ))}
        </div>

        {/* Sort */}
        <select className="pets-sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="name-asc">Name A–Z</option>
          <option value="name-desc">Name Z–A</option>
          <option value="age-asc">Youngest First</option>
          <option value="age-desc">Oldest First</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="pets-empty">
          <div className="pets-empty-icon">🐾</div>
          <p>No pets found. Try a different search or filter.</p>
          <button className="btn btn-primary btn-sm" onClick={() => { setSearch(""); setFilterType("All"); }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="pets-grid">
          {filtered.map(pet => {
            const color = TYPE_COLORS[pet.type] || "#64748b";
            const faved = isFav(pet.id);
            const price = getPetPrice(pet);
            return (
              <div key={pet.id} className="pet-card">
                {/* Image */}
                <div className="pet-card-img-wrap">
                  <img src={pet.image} alt={pet.name} className="pet-card-img" />

                  {/* Type badge */}
                  <span className="pet-card-type" style={{ background: `${color}22`, color }}>
                    {pet.type}
                  </span>

                  {/* Favorite button */}
                  <button
                    className={`pet-card-fav${faved ? " faved" : ""}`}
                    onClick={(e) => toggleFav(pet, e)}
                    title={faved ? "Remove from favorites" : "Add to favorites"}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={faved ? "#ef4444" : "none"} stroke={faved ? "#ef4444" : "#fff"} strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  {/* Price */}
                  {price && <span className="pet-card-price">${price}</span>}
                </div>

                {/* Info */}
                <div className="pet-card-body">
                  <div className="pet-card-name">{pet.name}</div>
                  <div className="pet-card-breed">{pet.breed}</div>
                  <div className="pet-card-age">{pet.age} yr{pet.age !== 1 ? "s" : ""} old</div>

                  <Link to={`/pets/${pet.id}`} className="pet-card-btn">
                    View & Adopt
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Pets;
