import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllPets, getPetPrice } from "../utils/petHelpers";

function PetDetails() {
  const { id } = useParams();
  const allPets = getAllPets();
  const pet = allPets.find(p => p.id === parseInt(id));
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const price = pet ? getPetPrice(pet) : 0;

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ reason: "", experience: "", address: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!pet) return (
    <div className="pd-wrap">
      <p className="text-muted">Pet not found.</p>
      <Link to="/pets" className="btn btn-primary btn-sm">Back to Pets</Link>
    </div>
  );

  // Check if user already sent a request for this pet
  const requests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];
  const existing = requests.find(r => r.petId === pet.id && r.username === user.username);

  const submitRequest = (e) => {
    e.preventDefault();
    setError("");
    if (!form.reason.trim()) { setError("Please provide a reason for adoption."); return; }

    const newRequest = {
      id: Date.now(),
      petId: pet.id,
      petName: pet.name,
      petImage: pet.image,
      petBreed: pet.breed,
      petType: pet.type,
      petAge: pet.age,
      username: user.username,
      userName: user.name || user.username,
      userPhone: form.phone || user.phone || "—",
      reason: form.reason,
      experience: form.experience,
      address: form.address,
      price: price,
      status: "pending", // pending | accepted | rejected
      requestedAt: new Date().toISOString(),
    };

    const updated = [...requests, newRequest];
    localStorage.setItem("adoptionRequests", JSON.stringify(updated));
    setSubmitted(true);
  };

  return (
    <div className="pd-wrap">
      {/* Back */}
      <Link to="/pets" className="pd-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to Pets
      </Link>

      <div className="pd-card">
        {/* Image */}
        <div className="pd-img-wrap">
          <img src={pet.image} alt={pet.name} className="pd-img" />
          <span className="pd-type-badge">{pet.type}</span>
        </div>

        {/* Info */}
        <div className="pd-info">
          <h2 className="pd-name">{pet.name}</h2>

          <div className="pd-details-grid">
            <div className="pd-detail-item">
              <span className="pd-detail-label">Breed</span>
              <span className="pd-detail-value">{pet.breed}</span>
            </div>
            <div className="pd-detail-item">
              <span className="pd-detail-label">Type</span>
              <span className="pd-detail-value">{pet.type}</span>
            </div>
            <div className="pd-detail-item">
              <span className="pd-detail-label">Age</span>
              <span className="pd-detail-value">{pet.age} year{pet.age !== 1 ? "s" : ""} old</span>
            </div>
            <div className="pd-detail-item">
              <span className="pd-detail-label">Status</span>
              <span className="pd-status-available">Available</span>
            </div>
            <div className="pd-detail-item">
              <span className="pd-detail-label">Adoption Fee</span>
              <span className="pd-detail-value" style={{ color: "#2a9d8f", fontWeight: 800, fontSize: "1.1rem" }}>${price}</span>
            </div>
          </div>

          {/* Request status */}
          {existing ? (
            <div className={`pd-request-status ${existing.status}`}>
              {existing.status === "pending" && (
                <>
                  <div className="pd-req-icon pending">⏳</div>
                  <div>
                    <div className="pd-req-title">Request Pending</div>
                    <div className="pd-req-sub">Your adoption request is under review by the admin.</div>
                  </div>
                </>
              )}
              {existing.status === "accepted" && (
                <>
                  <div className="pd-req-icon accepted">✓</div>
                  <div>
                    <div className="pd-req-title">Request Accepted!</div>
                    <div className="pd-req-sub">Go to your dashboard to complete payment and adopt {pet.name}.</div>
                  </div>
                  <Link to="/dashboard" className="pd-req-btn">Go to Dashboard</Link>
                </>
              )}
              {existing.status === "rejected" && (
                <>
                  <div className="pd-req-icon rejected">✕</div>
                  <div>
                    <div className="pd-req-title">Request Rejected</div>
                    <div className="pd-req-sub">Unfortunately your request was not approved this time.</div>
                  </div>
                </>
              )}
            </div>
          ) : submitted ? (
            <div className="pd-request-status pending">
              <div className="pd-req-icon pending">⏳</div>
              <div>
                <div className="pd-req-title">Request Submitted!</div>
                <div className="pd-req-sub">Your adoption request has been sent to the admin for review.</div>
              </div>
            </div>
          ) : showForm ? (
            /* Adoption Request Form */
            <div className="pd-form-wrap">
              <h5 className="pd-form-title">Adoption Request for {pet.name}</h5>
              {error && <div className="pd-form-error">{error}</div>}
              <form onSubmit={submitRequest}>
                <div className="pd-field">
                  <label>Why do you want to adopt {pet.name}? <span className="text-danger">*</span></label>
                  <textarea
                    className="pd-input"
                    rows={3}
                    placeholder="Tell us your reason for adopting..."
                    value={form.reason}
                    onChange={e => setForm({ ...form, reason: e.target.value })}
                    required
                  />
                </div>
                <div className="pd-field">
                  <label>Previous pet experience</label>
                  <textarea
                    className="pd-input"
                    rows={2}
                    placeholder="Have you owned pets before? Describe your experience..."
                    value={form.experience}
                    onChange={e => setForm({ ...form, experience: e.target.value })}
                  />
                </div>
                <div className="pd-row">
                  <div className="pd-field">
                    <label>Your Address</label>
                    <input className="pd-input" placeholder="Home address"
                      value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                  </div>
                  <div className="pd-field">
                    <label>Phone Number</label>
                    <input className="pd-input" placeholder="Contact number"
                      value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div className="pd-form-actions">
                  <button type="submit" className="pd-submit-btn">Submit Request</button>
                  <button type="button" className="pd-cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <button className="pd-adopt-btn" onClick={() => setShowForm(true)}>
              Request to Adopt {pet.name} — ${price}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PetDetails;
