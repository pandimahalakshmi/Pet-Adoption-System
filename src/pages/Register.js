import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.username || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.username === form.username)) {
      setError("Username already taken. Please choose another.");
      return;
    }
    users.push({ ...form, role: "user" });
    localStorage.setItem("users", JSON.stringify(users));
    nav("/login");
  };

  return (
    <div className="auth-fullpage">
      {/* Top brand bar */}
      <div className="auth-topbar">
        <Link to="/" className="auth-topbar-brand">AdoptPet</Link>
        <span className="auth-topbar-hint">
          Already have an account? <Link to="/login">Sign in</Link>
        </span>
      </div>

      {/* Centered card */}
      <div className="auth-center">
        <div className="auth-box auth-box-wide">
          {/* Icon */}
          <div className="auth-box-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2.2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
          </div>

          <h2 className="auth-box-title">Create your account</h2>
          <p className="auth-box-sub">Join AdoptPet and find your perfect companion</p>

          {error && (
            <div className="auth-error">{error}</div>
          )}

          <form onSubmit={handleRegister}>
            <div className="auth-field">
              <label>Full Name <span className="auth-required">*</span></label>
              <input
                className="auth-input"
                placeholder="Your full name"
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                autoFocus
              />
            </div>

            <div className="auth-field">
              <label>Username <span className="auth-required">*</span></label>
              <input
                className="auth-input"
                placeholder="Choose a username"
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>

            <div className="auth-field">
              <label>Password <span className="auth-required">*</span></label>
              <input
                type="password"
                className="auth-input"
                placeholder="Create a password"
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="auth-row">
              <div className="auth-field">
                <label>Phone</label>
                <input
                  className="auth-input"
                  placeholder="Phone number"
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="auth-field">
                <label>Gender</label>
                <select
                  className="auth-input"
                  onChange={e => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <button className="auth-submit-btn" type="submit">
              Create Account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
