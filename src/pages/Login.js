import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ADMIN = { username: "admin", password: "admin123", role: "admin", name: "Admin" };

function Login() {
  const [tab, setTab] = useState("user"); // "user" | "admin"
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (tab === "admin") {
        if (form.username === ADMIN.username && form.password === ADMIN.password) {
          localStorage.setItem("adminUser", JSON.stringify(ADMIN));
          nav("/admin/dashboard");
        } else {
          setError("Invalid admin credentials. Try admin / admin123");
        }
      } else {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const valid = users.find(
          u => u.username === form.username && u.password === form.password
        );
        if (valid) {
          localStorage.setItem("currentUser", JSON.stringify(valid));
          nav("/home");
        } else {
          setError("Invalid username or password. Please try again.");
        }
      }
      setLoading(false);
    }, 400);
  };

  const switchTab = (t) => {
    setTab(t);
    setError("");
    setForm({ username: "", password: "" });
  };

  return (
    <div className="auth-fullpage">
      {/* Top brand bar */}
      <div className="auth-topbar">
        <Link to="/" className="auth-topbar-brand">AdoptPet</Link>
        <span className="auth-topbar-hint">
          New here? <Link to="/register">Create an account</Link>
        </span>
      </div>

      {/* Centered card */}
      <div className="auth-center">
        <div className="auth-box">

          {/* Tab switcher */}
          <div className="auth-tabs">
            <button
              className={`auth-tab${tab === "user" ? " active" : ""}`}
              onClick={() => switchTab("user")}
              type="button"
            >
              User Login
            </button>
            <button
              className={`auth-tab${tab === "admin" ? " active" : ""}`}
              onClick={() => switchTab("admin")}
              type="button"
            >
              Admin Login
            </button>
          </div>

          {/* Icon */}
          <div className="auth-box-icon">
            {tab === "user" ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2.2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2.2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            )}
          </div>

          <h2 className="auth-box-title">
            {tab === "user" ? "Welcome back" : "Admin Access"}
          </h2>
          <p className="auth-box-sub">
            {tab === "user"
              ? "Sign in to your AdoptPet account"
              : "Sign in to the admin dashboard"}
          </p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="auth-field">
              <label>Username</label>
              <input
                className="auth-input"
                placeholder={tab === "admin" ? "admin" : "Enter your username"}
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
                autoFocus
              />
            </div>

            <div className="auth-field">
              <label>Password</label>
              <input
                type="password"
                className="auth-input"
                placeholder={tab === "admin" ? "admin123" : "Enter your password"}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {tab === "admin" && (
              <p className="auth-admin-hint">Default: admin / admin123</p>
            )}

            <button className="auth-submit-btn" type="submit" disabled={loading}>
              {loading ? "Signing in..." : tab === "admin" ? "Sign In as Admin" : "Sign In"}
            </button>
          </form>

          {tab === "user" && (
            <p className="auth-switch">
              Don't have an account? <Link to="/register">Register for free</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
