import { useState } from "react";

function UserProfile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || {});
  const [form, setForm] = useState({ name: user.name || "", phone: user.phone || "", gender: user.gender || "" });
  const [saved, setSaved] = useState(false);

  const save = (e) => {
    e.preventDefault();
    const updated = { ...user, ...form };
    localStorage.setItem("currentUser", JSON.stringify(updated));
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "60vh", paddingTop: 20 }}>
      <div style={{ width: "100%", maxWidth: 520 }}>
      <div className="home-section-title mb-1" style={{ textAlign: "center" }}>My Profile</div>
      <div className="home-section-sub mb-4" style={{ textAlign: "center" }}>Manage your personal information</div>

      <div className="user-card">
        <div className="user-card-header"><h5>Profile Details</h5></div>
        <div className="p-4">
          {saved && <div className="alert alert-success py-2 small mb-3">Profile updated successfully!</div>}

          {/* Avatar */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#2a9d8f", color: "#fff", fontWeight: 900, fontSize: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#1e293b" }}>{user.name || user.username}</div>
              <div style={{ fontSize: ".82rem", color: "#64748b" }}>@{user.username}</div>
            </div>
          </div>

          <form onSubmit={save}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input className="form-control" value={user.username} disabled style={{ background: "#f8fafc" }} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Phone</label>
              <input className="form-control" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Gender</label>
              <select className="form-select" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserProfile;
