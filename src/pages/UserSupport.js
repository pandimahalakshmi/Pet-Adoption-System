import { useState } from "react";

function UserSupport() {
  const [form, setForm] = useState({ subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ subject: "", message: "" });
  };

  return (
    <div>
      <div className="home-section-title mb-1">Support</div>
      <div className="home-section-sub mb-4">Get help from our team</div>

      <div className="row g-4">
        {/* Contact form */}
        <div className="col-md-7">
          <div className="user-card">
            <div className="user-card-header"><h5>Send a Message</h5></div>
            <div className="p-4">
              {sent && <div className="alert alert-success py-2 small mb-3">Message sent! We'll get back to you within 24 hours.</div>}
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Subject</label>
                  <input className="form-control" placeholder="What do you need help with?" value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea className="form-control" rows={5} placeholder="Describe your issue in detail..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold">Send Message</button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="col-md-5">
          <div className="user-card">
            <div className="user-card-header"><h5>Contact Info</h5></div>
            <div className="p-4">
              {[
                { label: "Email", value: "adopt@petlove.com" },
                { label: "Phone", value: "1-800-PET-LOVE" },
                { label: "Hours", value: "Mon–Sat 9am – 6pm" },
                { label: "Address", value: "123 Paw Street, New York" },
              ].map(item => (
                <div key={item.label} className="mb-3 pb-3" style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ fontSize: ".72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".5px", color: "#94a3b8", marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: ".9rem", fontWeight: 600, color: "#1e293b" }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSupport;
