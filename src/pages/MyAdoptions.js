import { Link } from "react-router-dom";

function MyAdoptions() {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const myRequests = (JSON.parse(localStorage.getItem("adoptionRequests")) || [])
    .filter(r => r.username === user.username);

  const statusBadge = (status) => {
    if (status === "pending")  return <span className="req-badge pending">Pending Review</span>;
    if (status === "accepted") return <span className="req-badge accepted">Accepted</span>;
    if (status === "rejected") return <span className="req-badge rejected">Rejected</span>;
    if (status === "paid")     return <span className="req-badge paid">Adopted & Paid</span>;
    return null;
  };

  return (
    <div>
      <div className="home-section-title mb-1">My Adoption Requests</div>
      <div className="home-section-sub mb-4">Track the status of your adoption requests</div>

      <div className="user-card">
        {myRequests.length === 0 ? (
          <div className="user-empty">
            <p>No adoption requests yet. Browse pets and request to adopt!</p>
            <Link to="/pets" className="btn btn-sm btn-primary">Browse Pets</Link>
          </div>
        ) : (
          <ul className="user-pet-list">
            {myRequests.map((r, i) => (
              <li key={i} className="user-pet-item">
                <img src={r.petImage} alt={r.petName} className="user-pet-img" />
                <div className="flex-grow-1">
                  <div className="user-pet-name">{r.petName}</div>
                  <div className="user-pet-meta">{r.petBreed} · Requested {new Date(r.requestedAt).toLocaleDateString()}</div>
                  {r.price && <div className="user-pet-meta" style={{ color: "#2a9d8f", fontWeight: 700 }}>Fee: ${r.price}</div>}
                </div>
                <div className="d-flex align-items-center gap-2 flex-wrap justify-content-end">
                  {statusBadge(r.status)}
                  {r.status === "accepted" && (
                    <Link
                      to={`/payment/${r.id}`}
                      className="myadopt-pay-now-btn"
                    >
                      Pay & Adopt →
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyAdoptions;
