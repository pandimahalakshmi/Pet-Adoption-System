import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAllPets, deletePetGlobally, getPetPrice } from "../utils/petHelpers";

/* ── Pet Detail Full Page ── */
function PetDetailPage({ pet, onBack, onDelete, typeColors, onPriceUpdate }) {
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceInput, setPriceInput] = useState("");
  const [, forceRender] = useState(0);

  const color = typeColors[pet.type] || "#64748b";
  const currentPrice = getPetPrice(pet);

  const savePrice = () => {
    const val = Number(priceInput);
    if (!val || val <= 0) return;
    const userPets = JSON.parse(localStorage.getItem("userPets")) || [];
    const idx = userPets.findIndex(p => p.id === pet.id);
    if (idx !== -1) {
      userPets[idx].price = val;
      localStorage.setItem("userPets", JSON.stringify(userPets));
    } else {
      const petPrices = JSON.parse(localStorage.getItem("petPrices")) || {};
      petPrices[pet.id] = val;
      localStorage.setItem("petPrices", JSON.stringify(petPrices));
    }
    setEditingPrice(false);
    onPriceUpdate();
    forceRender(n => n + 1);
  };

  return (
    <div className="adm-page">
      {/* Back button */}
      <button className="req-detail-back" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Manage Pets
      </button>

      {/* Detail card — image left, info right */}
      <div className="req-detail-card">

        {/* Left: Image */}
        <div className="req-detail-img-col">
          <img src={pet.image} alt={pet.name} className="req-detail-img" />
          <div className="req-detail-pet-meta">
            <span className="req-detail-type-badge" style={{ color, background: `${color}22` }}>
              {pet.type}
            </span>
            <span className="req-detail-type-badge" style={{ background: "#f0fdf4", color: "#16a34a" }}>
              Available
            </span>
          </div>
        </div>

        {/* Right: Info */}
        <div className="req-detail-info-col">

          <div className="req-detail-header">
            <div>
              <h2 className="req-detail-pet-name">{pet.name}</h2>
              <p className="req-detail-pet-sub">{pet.breed} · {pet.age} yr{pet.age !== 1 ? "s" : ""} old</p>
            </div>
            <div className="req-detail-date">Pet ID: #{pet.id}</div>
          </div>

          {/* Pet details grid */}
          <div className="req-detail-grid">
            <div className="req-detail-field">
              <span className="req-detail-field-label">Breed</span>
              <span className="req-detail-field-value">{pet.breed}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Type</span>
              <span className="req-detail-field-value" style={{ color }}>{pet.type}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Age</span>
              <span className="req-detail-field-value">{pet.age} year{pet.age !== 1 ? "s" : ""}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Gender</span>
              <span className="req-detail-field-value">{pet.gender || "—"}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Color</span>
              <span className="req-detail-field-value">{pet.color || "—"}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Weight</span>
              <span className="req-detail-field-value">{pet.weight ? `${pet.weight} kg` : "—"}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Vaccinated</span>
              <span className="req-detail-field-value">{pet.vaccinated || "—"}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Source</span>
              <span className={`adm-modal-source ${pet.id > 40 ? "user" : "system"}`}>
                {pet.id > 40 ? "User Added" : "System"}
              </span>
            </div>
          </div>

          {pet.description && (
            <>
              <hr className="req-detail-divider" />
              <div className="req-detail-section-title">Description</div>
              <p className="req-detail-text">{pet.description}</p>
            </>
          )}

          <hr className="req-detail-divider" />

          {/* Adoption Fee — editable */}
          <div className="req-detail-section-title">Adoption Fee</div>
          {editingPrice ? (
            <div className="adm-price-edit-row">
              <span className="adm-price-edit-symbol">$</span>
              <input
                type="number"
                className="adm-price-edit-input"
                placeholder="Enter price"
                value={priceInput}
                onChange={e => setPriceInput(e.target.value)}
                min="1"
                autoFocus
              />
              <button className="adm-price-save-btn" onClick={savePrice}>Save</button>
              <button className="adm-price-cancel-btn" onClick={() => setEditingPrice(false)}>Cancel</button>
            </div>
          ) : (
            <div className="adm-price-display-row">
              <span className="adm-price-display-value">
                {currentPrice
                  ? <span style={{ color: "#2a9d8f", fontWeight: 900, fontSize: "1.6rem" }}>${currentPrice}</span>
                  : <span style={{ color: "#ef4444", fontSize: ".9rem", fontWeight: 600 }}>Price not set</span>
                }
              </span>
              <button
                className="adm-price-edit-btn"
                onClick={() => { setPriceInput(currentPrice ? String(currentPrice) : ""); setEditingPrice(true); }}
              >
                {currentPrice ? "Edit Price" : "Set Price"}
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="req-detail-actions" style={{ marginTop: 24 }}>
            <button
              className="req-reject-btn"
              onClick={() => { onDelete(pet.id); onBack(); }}
            >
              Delete Pet
            </button>
            <button className="req-accept-btn" onClick={onBack}>
              Back to List
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Pet Card ── */
function PetCard4({ pet, typeColors, onClick }) {
  const color = typeColors[pet.type] || "#64748b";
  const price = getPetPrice(pet);
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
          {price
            ? <span style={{ color: "#2a9d8f", fontWeight: 700, fontSize: ".8rem" }}>${price}</span>
            : <span style={{ color: "#ef4444", fontSize: ".72rem", fontWeight: 600 }}>No price</span>
          }
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

  // Show detail page instead of grid
  if (selectedPet) {
    return (
      <PetDetailPage
        pet={selectedPet}
        onBack={() => { setSelectedPet(null); forceUpdate(n => n + 1); }}
        onDelete={deleteUserPet}
        typeColors={typeColors}
        onPriceUpdate={() => forceUpdate(n => n + 1)}
      />
    );
  }

  return (
    <div className="adm-page">

      <div className="adm-welcome">
        <div>
          <h2 className="adm-welcome-title">Manage Pets</h2>
          <p className="adm-welcome-sub">All pets listed on the platform — {allPets.length} total</p>
        </div>
        <Link to="/admin/add-pet" className="adm-btn-primary">+ Add New Pet</Link>
      </div>

      {/* Stat filter cards */}
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
            style={filterType === cat.type ? { background: cat.bg, borderColor: cat.color } : {}}
            onClick={() => setFilterType(cat.type)}
          >
            <div className="adm-pets-stat-count" style={{ color: filterType === cat.type ? cat.color : "#1e293b" }}>
              {typeCounts[cat.type]}
            </div>
            <div className="adm-pets-stat-label" style={{ color: filterType === cat.type ? cat.color : "#64748b" }}>
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

      {/* Grid */}
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
    </div>
  );
}

export default AdminPets;
