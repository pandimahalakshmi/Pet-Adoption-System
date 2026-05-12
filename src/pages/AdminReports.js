import { getAllPets, getPetPrice } from "../utils/petHelpers";

function AdminReports() {
  const payments = JSON.parse(localStorage.getItem("payments")) || [];
  const requests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];
  const allPets = getAllPets();

  const enriched = payments.map(p => {
    const req = requests.find(r => r.petId === p.petId && r.username === p.username);
    const pet = allPets.find(pt => pt.id === p.petId);
    const price = req?.price || (pet ? getPetPrice(pet) : p.amount) || p.amount;
    return { ...p, price, pet };
  });

  const total = enriched.reduce((s, p) => s + (p.price || 0), 0);
  const byMethod = enriched.reduce((acc, p) => {
    acc[p.method] = (acc[p.method] || 0) + 1;
    return acc;
  }, {});
  const topMethod = Object.entries(byMethod).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  const methodColor = { Card: "#2a9d8f", UPI: "#7c3aed", Cash: "#d97706" };

  const summaryCards = [
    { label: "Total Payments", value: enriched.length, color: "#2a9d8f", bg: "#f0fdf9", icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    )},
    { label: "Total Revenue", value: `$${total.toFixed(2)}`, color: "#16a34a", bg: "#f0fdf4", icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    )},
    { label: "Avg. Per Adoption", value: enriched.length > 0 ? `$${(total / enriched.length).toFixed(2)}` : "$0", color: "#7c3aed", bg: "#f5f3ff", icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    )},
    { label: "Top Method", value: topMethod, color: methodColor[topMethod] || "#d97706", bg: "#fffbeb", icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={methodColor[topMethod] || "#d97706"} strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    )},
  ];

  return (
    <div className="adm-page">

      {/* Header */}
      <div className="adm-welcome">
        <div>
          <h2 className="adm-welcome-title">Payment Reports</h2>
          <p className="adm-welcome-sub">All adoption payments received on the platform</p>
        </div>
        {enriched.length > 0 && (
          <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", color: "#16a34a", borderRadius: 10, padding: "8px 18px", fontWeight: 700, fontSize: ".95rem" }}>
            Total: <strong>${total.toFixed(2)}</strong>
          </div>
        )}
      </div>

      {/* Summary stat cards */}
      <div className="rpt-stat-grid">
        {summaryCards.map(s => (
          <div key={s.label} className="rpt-stat-card" style={{ background: s.bg }}>
            <div className="rpt-stat-icon" style={{ background: `${s.color}18` }}>{s.icon}</div>
            <div className="rpt-stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="rpt-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {enriched.length === 0 ? (
        <div className="adm-empty-state">
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>💳</div>
          <p>No payments recorded yet. Payments will appear here after users complete adoptions.</p>
        </div>
      ) : (
        <div className="adm-card">
          <div className="adm-card-header">
            <h5>Payment Records</h5>
            <span className="req-badge accepted">{enriched.length} transaction{enriched.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="table-responsive">
            <table className="table admin-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pet</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Adoption Fee</th>
                  <th>Method</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {enriched.map((p, i) => {
                  const mColor = methodColor[p.method] || "#64748b";
                  return (
                    <tr key={p.id}>
                      <td className="text-muted">{i + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {p.petImage && <img src={p.petImage} alt={p.petName} className="admin-table-img" />}
                          <div>
                            <div className="admin-user-name">{p.petName}</div>
                            <div className="admin-user-meta">{p.petBreed}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="admin-user-name">{p.userName}</div>
                        <div className="admin-user-meta">@{p.username}</div>
                      </td>
                      <td>
                        {p.pet && (
                          <span className={`admin-badge ${p.pet.type === "Dog" ? "badge-dog" : p.pet.type === "Cat" ? "badge-cat" : "badge-system"}`}>
                            {p.pet.type}
                          </span>
                        )}
                      </td>
                      <td>
                        <strong style={{ color: "#16a34a", fontSize: "1rem" }}>${p.price}</strong>
                        {p.pet && <div className="admin-user-meta">{p.pet.age} yr{p.pet.age !== 1 ? "s" : ""} old</div>}
                      </td>
                      <td>
                        <span className="rpt-payment-method-badge" style={{ background: `${mColor}18`, color: mColor }}>
                          {p.method}
                        </span>
                      </td>
                      <td><code style={{ fontSize: ".72rem", color: "#64748b" }}>{p.txnId}</code></td>
                      <td className="text-muted" style={{ whiteSpace: "nowrap" }}>
                        {new Date(p.paidAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                      <td><span className="req-badge accepted">Paid</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminReports;
