import { getAllPets, getPetPrice } from "../utils/petHelpers";

function AdminReports() {
  const payments = JSON.parse(localStorage.getItem("payments")) || [];
  const requests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];
  const allPets = getAllPets();

  // Enrich payments with pet price info
  const enriched = payments.map(p => {
    const req = requests.find(r => r.petId === p.petId && r.username === p.username);
    const pet = allPets.find(pt => pt.id === p.petId);
    const price = req?.price || (pet ? getPetPrice(pet) : p.amount);
    return { ...p, price };
  });

  const total = enriched.reduce((s, p) => s + (p.price || 0), 0);
  const byMethod = enriched.reduce((acc, p) => {
    acc[p.method] = (acc[p.method] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="adm-page">
      <div className="adm-welcome">
        <div>
          <h2 className="adm-welcome-title">Payment Reports</h2>
          <p className="adm-welcome-sub">All adoption payments received on the platform</p>
        </div>
        <div className="rpt-total-badge">
          Total Collected: <strong>${total.toFixed(2)}</strong>
        </div>
      </div>

      {/* Summary cards */}
      <div className="rpt-summary">
        <div className="rpt-summary-card">
          <div className="rpt-summary-value">{enriched.length}</div>
          <div className="rpt-summary-label">Total Payments</div>
        </div>
        <div className="rpt-summary-card">
          <div className="rpt-summary-value" style={{ color: "#16a34a" }}>${total.toFixed(2)}</div>
          <div className="rpt-summary-label">Total Revenue</div>
        </div>
        <div className="rpt-summary-card">
          <div className="rpt-summary-value" style={{ color: "#2a9d8f" }}>
            {enriched.length > 0 ? `$${(total / enriched.length).toFixed(2)}` : "$0"}
          </div>
          <div className="rpt-summary-label">Avg. Per Adoption</div>
        </div>
        <div className="rpt-summary-card">
          <div className="rpt-summary-value" style={{ color: "#7c3aed" }}>
            {Object.keys(byMethod).length > 0
              ? Object.entries(byMethod).sort((a, b) => b[1] - a[1])[0][0]
              : "—"}
          </div>
          <div className="rpt-summary-label">Top Payment Method</div>
        </div>
      </div>

      {enriched.length === 0 ? (
        <div className="adm-empty-state">No payments recorded yet.</div>
      ) : (
        <div className="adm-card">
          <div className="adm-card-header">
            <h5>Payment Records</h5>
            <span className="req-badge accepted">{enriched.length} transactions</span>
          </div>
          <div className="table-responsive">
            <table className="table admin-table mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pet</th>
                  <th>User</th>
                  <th>Pet Type</th>
                  <th>Adoption Fee</th>
                  <th>Method</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {enriched.map((p, i) => {
                  const pet = allPets.find(pt => pt.id === p.petId);
                  return (
                    <tr key={p.id}>
                      <td className="text-muted">{i + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={p.petImage} alt={p.petName} className="admin-table-img" />
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
                        {pet && (
                          <span className={`admin-badge ${pet.type === "Dog" ? "badge-dog" : pet.type === "Cat" ? "badge-cat" : "badge-system"}`}>
                            {pet.type}
                          </span>
                        )}
                      </td>
                      <td>
                        <strong style={{ color: "#16a34a", fontSize: "1rem" }}>${p.price}</strong>
                        {pet && (
                          <div className="admin-user-meta">{pet.age} yr{pet.age !== 1 ? "s" : ""} old</div>
                        )}
                      </td>
                      <td>
                        <span className={`admin-badge ${p.method === "Card" ? "badge-dog" : p.method === "UPI" ? "badge-cat" : "badge-system"}`}>
                          {p.method}
                        </span>
                      </td>
                      <td><code style={{ fontSize: ".72rem" }}>{p.txnId}</code></td>
                      <td className="text-muted">{new Date(p.paidAt).toLocaleDateString()}</td>
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
