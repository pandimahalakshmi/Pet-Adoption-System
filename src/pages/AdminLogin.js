import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ADMIN = { username: "admin", password: "admin123", role: "admin", name: "Admin" };

function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (form.username === ADMIN.username && form.password === ADMIN.password) {
        localStorage.setItem("adminUser", JSON.stringify(ADMIN));
        nav("/admin/dashboard");
      } else {
        setError("Invalid admin credentials.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-left">
        <h1>AdoptPet</h1>
        <p>Admin Control Panel</p>
        <div className="admin-login-item">Manage all pets and users</div>
        <div className="admin-login-item">View all adoptions</div>
        <div className="admin-login-item">Add and remove pets</div>
        <div className="admin-login-item">Full platform control</div>
      </div>
      <div className="admin-login-right">
        <div className="admin-auth-card">
          <h2>Admin Login</h2>
          <div className="admin-auth-sub">Sign in to access the admin panel</div>

          {error && <div className="alert alert-danger py-2 small">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input
                className="form-control"
                placeholder="Admin username"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Admin password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            <button className="btn btn-primary w-100 py-2 fw-bold" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In as Admin"}
            </button>
          </form>

          <div className="admin-hint mt-3">
            Default credentials: <strong>admin</strong> / <strong>admin123</strong>
          </div>

          <div className="text-center mt-3">
            <Link to="/login" className="text-muted small">Back to User Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
