function UserNotifications() {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const requests = (JSON.parse(localStorage.getItem("adoptionRequests")) || [])
    .filter(r => r.username === user.username);

  const notifications = requests.map(r => ({
    id: r.id,
    title: r.status === "accepted"
      ? `Your request for ${r.petName} was accepted!`
      : r.status === "rejected"
      ? `Your request for ${r.petName} was not approved.`
      : r.status === "paid"
      ? `You successfully adopted ${r.petName}!`
      : `Adoption request for ${r.petName} is pending review.`,
    sub: new Date(r.requestedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
    type: r.status,
    image: r.petImage,
  }));

  const typeColor = { pending: "#d97706", accepted: "#16a34a", rejected: "#dc2626", paid: "#2a9d8f" };
  const typeBg    = { pending: "#fffbeb", accepted: "#f0fdf4", rejected: "#fef2f2", paid: "#f0fdf9" };

  return (
    <div>
      <div className="home-section-title mb-1">Notifications</div>
      <div className="home-section-sub mb-4">Updates about your adoption requests</div>

      <div className="user-card">
        <div className="user-card-header">
          <h5>All Notifications</h5>
          <span className="badge bg-primary">{notifications.length}</span>
        </div>
        {notifications.length === 0 ? (
          <div className="user-empty">
            <p>No notifications yet. Submit an adoption request to get started.</p>
          </div>
        ) : (
          <ul className="user-pet-list">
            {notifications.map((n, i) => (
              <li key={i} className="user-pet-item" style={{ background: typeBg[n.type] || "#fff" }}>
                <img src={n.image} alt="" className="user-pet-img" />
                <div className="flex-grow-1">
                  <div className="user-pet-name">{n.title}</div>
                  <div className="user-pet-meta">{n.sub}</div>
                </div>
                <span className="req-badge" style={{ background: typeBg[n.type], color: typeColor[n.type] }}>
                  {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserNotifications;
