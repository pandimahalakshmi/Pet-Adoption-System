import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllPets, deletePetGlobally } from "../utils/petHelpers";

/* ── Pet Detail Modal ── */
function PetModal({ pet, onClose, onDelete, typeColors }) {
  if (!pet) return null;
  const isUserPet = pet.id > 10 || typeof pet.id === "string" || pet.id > 1000000;
  const color = typeColors[pet.type] || "#64748b";

  return (
    <div className="adm-modal-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className="adm-modal-close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Image */}
        <div className="adm-modal-img-wrap">
          <img src={pet.image} alt={pet.name} className="adm-modal-img" />
          <span className="adm-modal-type-badge" style={{ background: `${color}22`, color }}>
            {pet.type}
          </span>
        </div>

        {/* Details */}
        <div className="adm-modal-body">
          <h3 className="adm-modal-name">{pet.name}</h3>

          <div className="adm-modal-grid">
            <div className="adm-modal-field">
              <span className="adm-modal-field-label">Breed</span>
              <span className="adm-modal-field-value">{pet.breed}</span>
            </div>
            <div className="adm-modal-field">
              <span className="adm-modal-field-label">Type</span>
              <span className="adm-modal-field-value" style={{ color }}>{pet.type}</span>
            </div>
            <div className="adm-modal-field">
              <span className="adm-modal-field-label">Age</span>
              <span className="adm-modal-field-value">{pet.age} year{pet.age !== 1 ? "s" : ""} old</span>
            </div>
            <div className="adm-modal-field">
              <span className="adm-modal-field-label">Source</span>
              <span className={`adm-modal-source ${isUserPet ? "user" : "system"}`}>
                {isUserPet ? "User Added" : "System"}
              </span>
            </div>
            <div className="adm-modal-field">
              <span className="adm-modal-field-label">Status</span>
              <span className="adm-modal-status">Available</span>
            </div>
            <div className="adm-modal-field">
              <span className="adm-modal-field-label">Pet ID</span>
              <span className="adm-modal-field-value" style={{ fontFamily: "monospace", fontSize: ".8rem" }}>#{pet.id}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="adm-modal-actions">
            <button
              className="adm-modal-delete-btn"
              onClick={() => { onDelete(pet.id); onClose(); }}
            >
              Delete Pet
            </button>
            <button className="adm-modal-close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable Pet Card ── */
function PetCard4({ pet, typeColors, onClick }) {
  const color = typeColors[pet.type] || "#64748b";
  const isUserPet = pet.id > 40;
  return (
    <div className="adm-pet4-card" onClick={onClick}>
      <div className="adm-pet4-img-wrap">
        <img src={pet.image} alt={pet.name} className="adm-pet4-img" />
        <span className="adm-pet4-type-badge" style={{ background: `${color}22`, color }}>
          {pet.type}
        </span>
        <div className="adm-pet4-hover-overlay">
          <span className="adm-pet4-view-btn">View Details</span>
        </div>
      </div>
      <div className="adm-pet4-body">
        <div className="adm-pet4-name">{pet.name}</div>
        <div className="adm-pet4-breed">{pet.breed}</div>
        <div className="adm-pet4-footer">
          <span className="adm-pet4-age">{pet.age} yr{pet.age !== 1 ? "s" : ""}</span>
          <span className={`adm-pet4-source ${isUserPet ? "user" : "system"}`}>
            {isUserPet ? "User" : "System"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
function AdminPets() {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedPet, setSelectedPet] = useState(null);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get("type");
    if (t) setFilterType(t);
  }, [location.search]);

  const allPets = getAllPets();

  const filtered = allPets.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || p.type === filterType;
    return matchSearch && matchType;
  });

  const deleteUserPet = (id) => {
    if (!window.confirm("Delete this pet from the entire platform?")) return;
    deletePetGlobally(id);
    forceUpdate(n => n + 1);
  };

  const typeCounts = {
    All: allPets.length,
    Dog: allPets.filter(p => p.type === "Dog").length,
    Cat: allPets.filter(p => p.type === "Cat").length,
    Bird: allPets.filter(p => p.type === "Bird").length,
    Rabbit: allPets.filter(p => p.type === "Rabbit").length,
  };

  const typeColors = {
    Dog: "#2a9d8f", Cat: "#7c3aed", Bird: "#d97706", Rabbit: "#dc2626"
  };

  return (
    <div className="adm-page">

      {/* Header */}
      <div className="adm-welcome">
        <div>
          <h2 className="adm-welcome-title">Manage Pets</h2>
          <p className="adm-welcome-sub">All pets listed on the platform — {allPets.length} total</p>
        </div>
        <Link to="/admin/add-pet" className="adm-btn-primary">+ Add New Pet</Link>
      </div>

      {/* Category stat card filters */}
      <div className="adm-pets-stat-filter">
        {[
          { type: "All",    label: "All Pets",  color: "#475569", bg: "#f8fafc", border: "#e2e8f0" },
          { type: "Dog",    label: "Dogs",      color: "#2a9d8f", bg: "#f0fdf9", border: "#99f6e4" },
          { type: "Cat",    label: "Cats",      color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
          { type: "Bird",   label: "Birds",     color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
          { type: "Rabbit", label: "Rabbits",   color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
        ].map(cat => (
          <button
            key={cat.type}
            className={`adm-pets-stat-card${filterType === cat.type ? " active" : ""}`}
            style={filterType === cat.type
              ? { background: cat.bg, borderColor: cat.color, "--active-color": cat.color }
              : {}}
            onClick={() => setFilterType(cat.type)}
          >
            <div
              className="adm-pets-stat-count"
              style={{ color: filterType === cat.type ? cat.color : "#1e293b" }}
            >
              {typeCounts[cat.type]}
            </div>
            <div
              className="adm-pets-stat-label"
              style={{ color: filterType === cat.type ? cat.color : "#64748b" }}
            >
              {cat.label}
            </div>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="adm-pets-search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          className="adm-pets-search-input"
          placeholder="Search by name or breed..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <span className="adm-pets-search-count">{filtered.length} pets</span>
      </div>

      {/* Grid — flat mixed, 4 per row */}
      {filtered.length === 0 ? (
        <div className="adm-empty-state">No pets found.</div>
      ) : (
        <div className="adm-pet-grid4">
          {filtered.map(pet => (
            <PetCard4
              key={pet.id}
              pet={pet}
              typeColors={typeColors}
              onClick={() => setSelectedPet(pet)}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selectedPet && (
        <PetModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
          onDelete={deleteUserPet}
          typeColors={typeColors}
        />
      )}
    </div>
  );
}

export default AdminPets;
