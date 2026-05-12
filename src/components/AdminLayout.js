import { Navigate, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  const admin = JSON.parse(localStorage.getItem("adminUser"));
  const navigate = useNavigate();
  if (!admin) return <Navigate to="/login" />;

  const logout = () => {
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  return (
    <div className="adm-layout">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        {/* Brand */}
        <div className="adm-brand">
          <div className="adm-brand-icon">A</div>
          <span className="adm-brand-name">AdoptPet</span>
        </div>
        <AdminSidebar />
      </aside>

      {/* Right side */}
      <div className="adm-right">
        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar-title">
            Admin Panel
          </div>
          <div className="adm-topbar-actions">
            {/* Bell with notification badge */}
            <div className="adm-topbar-icon-btn" style={{ position: "relative" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {(() => {
                const pending = (JSON.parse(localStorage.getItem("adoptionRequests")) || []).filter(r => r.status === "pending").length;
                return pending > 0 ? (
                  <span style={{ position:"absolute", top:4, right:4, width:16, height:16, borderRadius:"50%", background:"#ef4444", color:"#fff", fontSize:".6rem", fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid #fff" }}>
                    {pending}
                  </span>
                ) : null;
              })()}
            </div>
            {/* User chip */}
            <div className="adm-topbar-user">
              <div className="adm-topbar-avatar">
                {admin.name ? admin.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="adm-topbar-user-info">
                <span className="adm-topbar-user-name">{admin.name || "Admin"}</span>
                <span className="adm-topbar-user-role">Super Admin</span>
              </div>
            </div>
            {/* Logout */}
            <button className="adm-topbar-logout" onClick={logout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="adm-main">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
