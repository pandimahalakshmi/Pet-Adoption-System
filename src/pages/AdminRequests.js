import { useState } from "react";

/* ── Detail Page View ── */
function RequestDetail({ request, onBack, onUpdateStatus }) {
  const r = request;

  const statusBadge = (status) => {
    if (status === "pending")  return <span className="req-badge pending">Pending Review</span>;
    if (status === "accepted") return <span className="req-badge accepted">Accepted</span>;
    if (status === "rejected") return <span className="req-badge rejected">Rejected</span>;
    if (status === "paid")     return <span className="req-badge paid">Adopted & Paid</span>;
    return null;
  };

  return (
    <div style={{ background: "#fce8ec", minHeight: "100%", padding: "8px 0 24px" }}>
      {/* Back button */}
      <button className="req-detail-back" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Requests
      </button>

      {/* Main card — image left, details right */}
      <div className="req-detail-card">

        {/* Left: Pet Image */}
        <div className="req-detail-img-col">
          <img src={r.petImage} alt={r.petName} className="req-detail-img" />
          <div className="req-detail-pet-meta">
            <span className="req-detail-type-badge">{r.petType}</span>
            {statusBadge(r.status)}
          </div>
        </div>

        {/* Right: All Details */}
        <div className="req-detail-info-col">

          {/* Pet name + date */}
          <div className="req-detail-header">
            <div>
              <h2 className="req-detail-pet-name">{r.petName}</h2>
              <p className="req-detail-pet-sub">{r.petBreed} · {r.petAge} yr{r.petAge !== 1 ? "s" : ""} old</p>
            </div>
            <div className="req-detail-date">
              Requested on {new Date(r.requestedAt).toLocaleDateString("en-US", { day:"numeric", month:"long", year:"numeric" })}
            </div>
          </div>

          {/* Pet info grid */}
          <div className="req-detail-grid">
            <div className="req-detail-field">
              <span className="req-detail-field-label">Breed</span>
              <span className="req-detail-field-value">{r.petBreed}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Type</span>
              <span className="req-detail-field-value">{r.petType}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Age</span>
              <span className="req-detail-field-value">{r.petAge} year{r.petAge !== 1 ? "s" : ""}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Status</span>
              <span className="req-detail-field-value">{statusBadge(r.status)}</span>
            </div>
          </div>

          <hr className="req-detail-divider" />

          {/* User details */}
          <div className="req-detail-section-title">Applicant Details</div>
          <div className="req-detail-grid">
            <div className="req-detail-field">
              <span className="req-detail-field-label">Full Name</span>
              <span className="req-detail-field-value">{r.userName}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Username</span>
              <span className="req-detail-field-value">@{r.username}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Phone</span>
              <span className="req-detail-field-value">{r.userPhone || "—"}</span>
            </div>
            <div className="req-detail-field">
              <span className="req-detail-field-label">Address</span>
              <span className="req-detail-field-value">{r.address || "—"}</span>
            </div>
          </div>

          <hr className="req-detail-divider" />

          {/* Reason */}
          <div className="req-detail-section-title">Reason for Adoption</div>
          <p className="req-detail-text">{r.reason}</p>

          {r.experience && (
            <>
              <div className="req-detail-section-title" style={{ marginTop: 14 }}>Pet Experience</div>
              <p className="req-detail-text">{r.experience}</p>
            </>
          )}

          {/* Action buttons */}
          {r.status === "pending" && (
            <div className="req-detail-actions">
              <button
                className="req-accept-btn"
                onClick={() => onUpdateStatus(r.id, "accepted")}
              >
                Accept Request
              </button>
              <button
                className="req-reject-btn"
                onClick={() => onUpdateStatus(r.id, "rejected")}
              >
                Reject Request
              </button>
            </div>
          )}

          {r.status === "accepted" && (
            <div className="req-detail-accepted-note">
              This request has been accepted. Waiting for user payment.
            </div>
          )}
          {r.status === "rejected" && (
            <div className="req-detail-rejected-note">
              This request was rejected.
            </div>
          )}
          {r.status === "paid" && (
            <div className="req-detail-paid-note">
              Adoption complete. Payment received.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ── List View ── */
function AdminRequests() {
  const [requests, setRequests] = useState(
    JSON.parse(localStorage.getItem("adoptionRequests")) || []
  );
  const [selected, setSelected] = useState(null);

  const pending = requests.filter(r => r.status === "pending");
  const handled = requests.filter(r => r.status !== "pending");

  const updateStatus = (id, status) => {
    const updated = requests.map(r =>
      r.id === id ? { ...r, status, handledAt: new Date().toISOString() } : r
    );
    setRequests(updated);
    localStorage.setItem("adoptionRequests", JSON.stringify(updated));
    // Update selected so the detail page reflects new status
    const updatedReq = updated.find(r => r.id === id);
    setSelected(updatedReq);
  };

  const statusBadge = (status) => {
    if (status === "pending")  return <span className="req-badge pending">Pending</span>;
    if (status === "accepted") return <span className="req-badge accepted">Accepted</span>;
    if (status === "rejected") return <span className="req-badge rejected">Rejected</span>;
    if (status === "paid")     return <span className="req-badge paid">Paid</span>;
    return null;
  };

  // Show detail page instead of list
  if (selected) {
    return (
      <RequestDetail
        request={selected}
        onBack={() => setSelected(null)}
        onUpdateStatus={updateStatus}
      />
    );
  }

  return (
    <div className="adm-page">
      <div className="adm-welcome">
        <div>
          <h2 className="adm-welcome-title">Adoption Requests</h2>
          <p className="adm-welcome-sub">Review and manage user adoption requests</p>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <span className="req-badge pending">{pending.length} Pending</span>
          <span className="req-badge accepted">{handled.filter(r => r.status === "accepted").length} Accepted</span>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="adm-empty-state">No adoption requests yet.</div>
      ) : (
        <>
          {pending.length > 0 && (
            <div className="req-section">
              <div className="req-section-title">Pending Requests ({pending.length})</div>
              <div className="req-list">
                {pending.map(r => (
                  <div key={r.id} className="req-card">
                    <img src={r.petImage} alt={r.petName} className="req-pet-img" />
                    <div className="req-info">
                      <div className="req-pet-name">{r.petName}</div>
                      <div className="req-meta">{r.petBreed} · {r.petType}</div>
                      <div className="req-user">Requested by: <strong>{r.userName}</strong> (@{r.username})</div>
                      <div className="req-reason">"{r.reason.slice(0, 80)}{r.reason.length > 80 ? "..." : ""}"</div>
                    </div>
                    <div className="req-right">
                      {statusBadge(r.status)}
                      <div className="req-date">{new Date(r.requestedAt).toLocaleDateString()}</div>
                      <button className="req-view-btn" onClick={() => setSelected(r)}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {handled.length > 0 && (
            <div className="req-section">
              <div className="req-section-title">Handled Requests ({handled.length})</div>
              <div className="req-list">
                {handled.map(r => (
                  <div key={r.id} className="req-card">
                    <img src={r.petImage} alt={r.petName} className="req-pet-img" />
                    <div className="req-info">
                      <div className="req-pet-name">{r.petName}</div>
                      <div className="req-meta">{r.petBreed} · {r.petType}</div>
                      <div className="req-user">By: <strong>{r.userName}</strong> (@{r.username})</div>
                    </div>
                    <div className="req-right">
                      {statusBadge(r.status)}
                      <div className="req-date">{new Date(r.requestedAt).toLocaleDateString()}</div>
                      <button className="req-view-btn" onClick={() => setSelected(r)}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminRequests;
