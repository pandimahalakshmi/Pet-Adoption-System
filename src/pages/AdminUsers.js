import { useState } from "react";

function AdminUsers() {
  const [search, setSearch] = useState("");
  const [, forceUpdate] = useState(0);

  // Read fresh every render so new registrations show immediately
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const filtered = users.filter(u =>
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.username || "").toLowerCase().includes(search.toLowerCase())
  );

  const deleteUser = (username) => {
    if (!window.confirm(`Delete user "${username}"?`)) return;
    const updated = users.filter(u => u.username !== username);
    localStorage.setItem("users", JSON.stringify(updated));
    forceUpdate(n => n + 1);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">Manage Users</div>
          <div className="admin-page-sub">All registered users on the platform</div>
        </div>
        <span className="badge bg-primary fs-6">{users.length} Users</span>
      </div>

      {/* Search */}
      <div className="admin-card mb-4">
        <div className="p-3 d-flex gap-3 align-items-center flex-wrap">
          <input
            className="form-control form-control-sm"
            style={{ maxWidth: 280 }}
            placeholder="Search by name or username..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="text-muted small ms-auto">{filtered.length} users found</span>
        </div>
      </div>

      {/* Table */}
      <div className="admin-card">
        <div className="table-responsive">
          <table className="table admin-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Username</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    {users.length === 0 ? "No users registered yet." : "No users match your search."}
                  </td>
                </tr>
              ) : (
                filtered.map((u, i) => (
                  <tr key={u.username}>
                    <td className="text-muted">{i + 1}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="admin-user-avatar" style={{ width: 30, height: 30, fontSize: "0.8rem" }}>
                          {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <strong>{u.name || "—"}</strong>
                      </div>
                    </td>
                    <td className="text-muted">@{u.username}</td>
                    <td className="text-muted">{u.phone || "—"}</td>
                    <td className="text-muted">{u.gender || "—"}</td>
                    <td>
                      <span className="admin-badge badge-system">User</span>
                    </td>
                    <td>
                      <button
                        className="admin-action-btn delete"
                        onClick={() => deleteUser(u.username)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
