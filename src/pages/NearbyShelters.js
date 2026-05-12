const shelters = [
  { name: "Happy Paws Shelter", address: "123 Main St, New York, NY", phone: "212-555-0101", types: ["Dog", "Cat"], rating: 4.8 },
  { name: "City Animal Rescue", address: "456 Park Ave, Brooklyn, NY", phone: "718-555-0202", types: ["Dog", "Cat", "Bird"], rating: 4.6 },
  { name: "Furry Friends Home", address: "789 Oak Rd, Queens, NY", phone: "347-555-0303", types: ["Cat", "Rabbit"], rating: 4.9 },
  { name: "Paws & Claws Center", address: "321 Elm St, Bronx, NY", phone: "929-555-0404", types: ["Dog", "Bird"], rating: 4.5 },
  { name: "Safe Haven Shelter", address: "654 Pine Ave, Staten Island, NY", phone: "718-555-0505", types: ["Dog", "Cat", "Rabbit"], rating: 4.7 },
  { name: "Animal Care NYC", address: "987 Maple Dr, Manhattan, NY", phone: "212-555-0606", types: ["Dog", "Cat", "Bird", "Rabbit"], rating: 4.4 },
];

const typeColor = { Dog: "#2a9d8f", Cat: "#7c3aed", Bird: "#d97706", Rabbit: "#dc2626" };

function NearbyShelters() {
  return (
    <div>
      <div className="home-section-title mb-1">Nearby Shelters</div>
      <div className="home-section-sub mb-4">Partner shelters in your area</div>

      <div className="row g-3">
        {shelters.map((s, i) => (
          <div className="col-md-6" key={i}>
            <div className="user-card h-100">
              <div className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-bold mb-0" style={{ color: "#1e293b" }}>{s.name}</h6>
                  <span style={{ background: "#f0fdf9", color: "#2a9d8f", fontSize: ".78rem", fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>
                    ★ {s.rating}
                  </span>
                </div>
                <div className="text-muted small mb-1">{s.address}</div>
                <div className="text-muted small mb-3">{s.phone}</div>
                <div className="d-flex gap-2 flex-wrap">
                  {s.types.map(t => (
                    <span key={t} style={{ background: `${typeColor[t]}18`, color: typeColor[t], fontSize: ".7rem", fontWeight: 700, padding: "2px 9px", borderRadius: 20 }}>
                      {t}s
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NearbyShelters;
