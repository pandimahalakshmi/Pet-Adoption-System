import { Link, useLocation } from "react-router-dom";
import { getAllPets } from "../utils/petHelpers";

function AdminSidebar() {
  const location = useLocation();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const allPets = getAllPets();
  const adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];

  const isActive = (path) => location.pathname === path;

  const navGroups = [
    {
      title: "MAIN",
      links: [
        {
          to: "/admin/dashboard", label: "Dashboard",
          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        },
      ]
    },
    {
      title: "PETS",
      links: [
        {
          to: "/admin/pets", label: "Manage Pets", badge: allPets.length,
          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
        },
        {
          to: "/admin/add-pet", label: "Add New Pet",
          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
        },
      ]
    },
    {
      title: "USERS",
      links: [
        {
          to: "/admin/users", label: "Manage Users", badge: users.length,
          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        },
      ]
    },
    {
      title: "ADOPTIONS",
      links: [
        {
          to: "/admin/requests", label: "Adoption Requests",
          badge: (() => { const p = (JSON.parse(localStorage.getItem("adoptionRequests")) || []).filter(r => r.status === "pending").length; return p > 0 ? p : undefined; })(),
          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        },
        {
          to: "/admin/adoptions", label: "All Adoptions", badge: adoptions.length,
          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        },
        {
          to: "/admin/reports", label: "Payment Reports",
          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        },
      ]
    },
  ];

  return (
    <nav className="adm-nav">
      {navGroups.map(group => (
        <div key={group.title} className="adm-nav-group">
          <div className="adm-nav-group-title">{group.title}</div>
          {group.links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`adm-nav-link${isActive(link.to) ? " active" : ""}`}
            >
              <span className="adm-nav-link-icon">{link.icon}</span>
              <span className="adm-nav-link-label">{link.label}</span>
              {link.badge !== undefined && (
                <span className="adm-nav-link-badge">{link.badge}</span>
              )}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}

export default AdminSidebar;
