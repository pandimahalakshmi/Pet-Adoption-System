import { Link } from "react-router-dom";
import { getAllPets, getPetPrice } from "../utils/petHelpers";

/* SVG Line Chart */
function LineChart({ data, color, yLabels }) {
  const w = 500, h = 120, pad = 10;
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - (v / max) * (h - pad * 2);
    return `${x},${y}`;
  });
  const polyline = pts.join(" ");
  const first = pts[0];
  const last = pts[pts.length - 1];
  const area = `${first} ${polyline} ${last.split(",")[0]},${h - pad} ${pad},${h - pad}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#lineGrad)" />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((pt, i) => {
        const [x, y] = pt.split(",");
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#fff" stroke={color} strokeWidth="2" />;
      })}
    </svg>
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function AdminDashboard() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userPets = JSON.parse(localStorage.getItem("userPets")) || [];
  const allPets = getAllPets();
  const adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];
  const payments = JSON.parse(localStorage.getItem("payments")) || [];
  const requests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];
  const admin = JSON.parse(localStorage.getItem("adminUser")) || {};

  // Build real monthly revenue from payments
  const revenueByMonth = Array(12).fill(0);
  payments.forEach(p => {
    const req = requests.find(r => r.petId === p.petId && r.username === p.username);
    const pet = allPets.find(pt => pt.id === p.petId);
    const price = req?.price || (pet ? getPetPrice(pet) : p.amount) || p.amount || 0;
    const month = new Date(p.paidAt).getMonth(); // 0-11
    revenueByMonth[month] += Number(price);
  });

  const totalRevenue = revenueByMonth.reduce((s, v) => s + v, 0);
  const maxRevenue = Math.max(...revenueByMonth, 1);

  // Y-axis: 5 steps from 0 to maxRevenue rounded up
  const yStep = Math.ceil(maxRevenue / 4 / 10) * 10 || 50;
  const yLabels = [yStep * 4, yStep * 3, yStep * 2, yStep, 0];

  const stats = [
    {
      label: "Total Pets",
      value: allPets.length,
      sub: "All listed pets",
      color: "#2a9d8f",
      iconBg: "#e6f7f5",
      to: "/admin/pets",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
          <line x1="9" y1="9" x2="9.01" y2="9"/>
          <line x1="15" y1="9" x2="15.01" y2="9"/>
        </svg>
      ),
    },
    {
      label: "Registered Users",
      value: users.length,
      sub: "Active members",
      color: "#7c3aed",
      iconBg: "#f0ebff",
      to: "/admin/users",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      label: "Total Adoptions",
      value: adoptions.length,
      sub: "Pets adopted",
      color: "#d97706",
      iconBg: "#fff8e6",
      to: "/admin/adoptions",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      label: "User-Added Pets",
      value: userPets.length,
      sub: "By community",
      color: "#0891b2",
      iconBg: "#e0f7fa",
      to: "/admin/pets",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="adm-page">

      {/* Welcome */}
      <div className="adm-welcome">
        <div>
          <h2 className="adm-welcome-title">Hello, {admin.name || "Admin"} 👋</h2>
          <p className="adm-welcome-sub">Here's your platform overview for today.</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/admin/add-pet" className="adm-btn-primary">+ Add Pet</Link>
          <Link to="/admin/users" className="adm-btn-outline">View Users</Link>
        </div>
      </div>

      {/* Stat Cards — 4 columns */}
      <div className="adm-stat-grid4">
        {stats.map(s => (
          <Link to={s.to} key={s.label} className="adm-stat4-card">
            <div className="adm-stat4-icon" style={{ background: s.iconBg }}>
              {s.icon}
            </div>
            <div className="adm-stat4-info">
              <div className="adm-stat4-label">{s.label}</div>
              <div className="adm-stat4-value" style={{ color: s.color }}>{s.value}</div>
              <div className="adm-stat4-sub">{s.sub}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Category Filter Cards */}
      <div className="adm-cat-section">
        <div className="adm-cat-header">
          <span className="adm-cat-title">Browse by Category</span>
          <Link to="/admin/pets" className="adm-recent-link">View All Pets</Link>
        </div>
        <div className="adm-cat-grid">
          {[
            { type: "Dog",    label: "Dogs",    count: allPets.filter(p => p.type === "Dog").length,    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",    color: "#2a9d8f", bg: "#e6f7f5" },
            { type: "Cat",    label: "Cats",    count: allPets.filter(p => p.type === "Cat").length,    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80",    color: "#7c3aed", bg: "#f0ebff" },
            { type: "Bird",   label: "Birds",   count: allPets.filter(p => p.type === "Bird").length,   img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=80",   color: "#d97706", bg: "#fff8e6" },
            { type: "Rabbit", label: "Rabbits", count: allPets.filter(p => p.type === "Rabbit").length, img: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&q=80", color: "#dc2626", bg: "#fef2f2" },
          ].map(cat => (
            <Link
              key={cat.type}
              to={`/admin/pets?type=${cat.type}`}
              className="adm-cat-card"
              style={{ "--cat-color": cat.color, "--cat-bg": cat.bg }}
            >
              <div className="adm-cat-img-wrap">
                <img src={cat.img} alt={cat.label} className="adm-cat-img" />
                <div className="adm-cat-overlay" />
              </div>
              <div className="adm-cat-info">
                <span className="adm-cat-label">{cat.label}</span>
                <span className="adm-cat-count">{cat.count} pets</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div className="adm-dashboard-body">

        {/* Monthly Revenue Chart */}
        <div className="adm-chart-card">
          <div className="adm-chart-header">
            <div>
              <div className="adm-chart-title">Monthly Revenue</div>
              <div className="adm-chart-sub">
                Adoption fee revenue per month · Total: <strong style={{ color: "#2a9d8f" }}>${totalRevenue.toFixed(0)}</strong>
              </div>
            </div>
            <div className="adm-chart-legend">
              <span className="adm-chart-dot" style={{ background: "#2a9d8f" }}></span>
              Revenue ($)
            </div>
          </div>

          <div className="adm-chart-wrap">
            <div className="adm-chart-yaxis">
              {yLabels.map(v => (
                <span key={v}>${v}</span>
              ))}
            </div>
            <div className="adm-chart-area">
              <LineChart data={revenueByMonth} color="#2a9d8f" />
            </div>
          </div>

          <div className="adm-chart-xaxis">
            {MONTHS.map(m => <span key={m}>{m}</span>)}
          </div>

          {/* Monthly breakdown */}
          {totalRevenue > 0 && (
            <div className="adm-revenue-breakdown">
              {MONTHS.map((m, i) => revenueByMonth[i] > 0 ? (
                <div key={m} className="adm-revenue-month">
                  <span className="adm-revenue-month-name">{m}</span>
                  <span className="adm-revenue-month-val">${revenueByMonth[i]}</span>
                </div>
              ) : null)}
            </div>
          )}
        </div>

        {/* Adoptions by Pet Category — inside the 2-col grid */}
        <div className="adm-bar-card">
          <div className="adm-chart-header">
            <div>
              <div className="adm-chart-title">Adoptions by Category</div>
              <div className="adm-chart-sub">
                By pet type · {adoptions.length} total
              </div>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              {[
                { label: "Dogs", color: "#2a9d8f" },
                { label: "Cats", color: "#7c3aed" },
                { label: "Birds", color: "#d97706" },
                { label: "Rabbits", color: "#dc2626" },
              ].map(c => (
                <div key={c.label} className="d-flex align-items-center gap-1">
                  <span style={{ width: 9, height: 9, borderRadius: 2, background: c.color, display: "inline-block" }} />
                  <span style={{ fontSize: ".7rem", color: "#64748b", fontWeight: 600 }}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {adoptions.length === 0 ? (
            <div className="adm-recent-empty" style={{ padding: "32px" }}>No adoptions yet.</div>
          ) : (() => {
            const cats = [
              { label: "Dogs",    type: "Dog",    color: "#2a9d8f" },
              { label: "Cats",    type: "Cat",    color: "#7c3aed" },
              { label: "Birds",   type: "Bird",   color: "#d97706" },
              { label: "Rabbits", type: "Rabbit", color: "#dc2626" },
            ].map(c => ({ ...c, count: adoptions.filter(p => p.type === c.type).length }));
            const maxCount = Math.max(...cats.map(c => c.count), 1);
            return (
              <div className="adm-vbar3-chart">
                {cats.map(cat => {
                  const heightPct = (cat.count / maxCount) * 100;
                  const pctOfTotal = adoptions.length > 0 ? Math.round((cat.count / adoptions.length) * 100) : 0;
                  return (
                    <div key={cat.label} className="adm-vbar3-col">
                      <div className="adm-vbar3-count" style={{ color: cat.count > 0 ? cat.color : "#cbd5e1" }}>
                        {cat.count}
                      </div>
                      <div className="adm-vbar3-track">
                        <div className="adm-vbar3-fill" style={{
                          height: cat.count > 0 ? `${Math.max(heightPct, 8)}%` : "4px",
                          background: cat.count > 0 ? `linear-gradient(to top, ${cat.color}, ${cat.color}bb)` : "#e2e8f0",
                          boxShadow: cat.count > 0 ? `0 4px 12px ${cat.color}33` : "none",
                        }} />
                      </div>
                      <div className="adm-vbar3-label" style={{ color: cat.count > 0 ? "#374151" : "#94a3b8" }}>
                        {cat.label}
                      </div>
                      <div className="adm-vbar3-pct" style={{ color: cat.count > 0 ? cat.color : "#cbd5e1" }}>
                        {pctOfTotal}%
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>

      </div>{/* end adm-dashboard-body */}

    </div>
  );
}

export default AdminDashboard;
