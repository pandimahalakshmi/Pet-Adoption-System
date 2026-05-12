import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserSettings() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deleteAccount = () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div>
      <div className="home-section-title mb-1">Settings</div>
      <div className="home-section-sub mb-4">Manage your account preferences</div>

      <div className="user-card" style={{ maxWidth: 520 }}>
        <div className="user-card-header"><h5>Notification Preferences</h5></div>
        <div className="p-4">
          {saved && <div className="alert alert-success py-2 small mb-3">Settings saved!</div>}
          <div className="d-flex justify-content-between align-items-center mb-3 pb-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
            <div>
              <div className="fw-semibold" style={{ fontSize: ".9rem" }}>Push Notifications</div>
              <div className="text-muted small">Get notified about adoption updates</div>
            </div>
            <div className="form-check form-switch mb-0">
              <input className="form-check-input" type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} style={{ width: 40, height: 22, cursor: "pointer" }} />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <div className="fw-semibold" style={{ fontSize: ".9rem" }}>Email Alerts</div>
              <div className="text-muted small">Receive email updates on requests</div>
            </div>
            <div className="form-check form-switch mb-0">
              <input className="form-check-input" type="checkbox" checked={emailAlerts} onChange={e => setEmailAlerts(e.target.checked)} style={{ width: 40, height: 22, cursor: "pointer" }} />
            </div>
          </div>
          <button className="btn btn-primary w-100 fw-bold mb-3" onClick={save}>Save Settings</button>
        </div>
      </div>

      <div className="user-card mt-3" style={{ maxWidth: 520 }}>
        <div className="user-card-header"><h5>Danger Zone</h5></div>
        <div className="p-4">
          <p className="text-muted small mb-3">Deleting your account is permanent and cannot be undone.</p>
          <button className="btn btn-outline-danger w-100 fw-bold" onClick={deleteAccount}>Delete My Account</button>
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
