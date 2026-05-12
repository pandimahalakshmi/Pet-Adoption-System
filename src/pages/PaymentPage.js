import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAllPets } from "../utils/petHelpers";

function PaymentPage() {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const allRequests = JSON.parse(localStorage.getItem("adoptionRequests")) || [];
  const request = allRequests.find(r => String(r.id) === String(requestId) && r.username === user.username);

  const [form, setForm] = useState({ method: "Card", cardName: "", cardNumber: "", expiry: "", cvv: "", upi: "" });
  const [paid, setPaid] = useState(false);
  const [paidData, setPaidData] = useState(null);
  const AMOUNT = 50;

  if (!request) {
    return (
      <div className="user-empty" style={{ padding: "60px 20px", textAlign: "center" }}>
        <p>Request not found or already processed.</p>
        <Link to="/my-adoptions" className="btn btn-primary btn-sm">Back to My Adoptions</Link>
      </div>
    );
  }

  if (request.status === "paid") {
    return (
      <div className="user-empty" style={{ padding: "60px 20px", textAlign: "center" }}>
        <p>This pet has already been adopted and paid for.</p>
        <Link to="/adopted-pets" className="btn btn-success btn-sm me-2">View Adopted Pets</Link>
        <Link to="/my-adoptions" className="btn btn-outline-primary btn-sm">My Requests</Link>
      </div>
    );
  }

  const handlePay = (e) => {
    e.preventDefault();
    const txnId = "TXN" + Date.now();

    const payment = {
      id: txnId, txnId,
      petId: request.petId, petName: request.petName,
      petImage: request.petImage, petBreed: request.petBreed,
      petType: request.petType, petAge: request.petAge,
      username: user.username, userName: user.name || user.username,
      amount: AMOUNT, method: form.method, paidAt: new Date().toISOString(),
    };

    // Save payment
    const payments = JSON.parse(localStorage.getItem("payments")) || [];
    payments.push(payment);
    localStorage.setItem("payments", JSON.stringify(payments));

    // Add to adoptions
    const adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];
    const allPets = getAllPets();
    const pet = allPets.find(p => p.id === request.petId);
    if (pet) { adoptions.push(pet); localStorage.setItem("adoptions", JSON.stringify(adoptions)); }

    // Mark request as paid
    const reqs = JSON.parse(localStorage.getItem("adoptionRequests")) || [];
    localStorage.setItem("adoptionRequests", JSON.stringify(
      reqs.map(r => r.id === request.id ? { ...r, status: "paid", txnId } : r)
    ));

    setPaidData(payment);
    setPaid(true);
  };

  // ── Receipt page after payment ──
  if (paid && paidData) {
    return (
      <div className="myadopt-receipt">
        <div className="myadopt-receipt-icon">✓</div>
        <h3 className="myadopt-receipt-title">Payment Successful!</h3>
        <p className="myadopt-receipt-sub">
          You have successfully adopted <strong>{request.petName}</strong>!
        </p>

        <div className="myadopt-receipt-card">
          <img src={request.petImage} alt={request.petName} className="myadopt-receipt-img" />
          <div className="myadopt-receipt-details">
            <div className="myadopt-receipt-row"><span>Pet Name</span><strong>{request.petName}</strong></div>
            <div className="myadopt-receipt-row"><span>Breed</span><strong>{request.petBreed}</strong></div>
            <div className="myadopt-receipt-row"><span>Amount Paid</span><strong style={{ color: "#16a34a" }}>${paidData.amount}</strong></div>
            <div className="myadopt-receipt-row"><span>Payment Method</span><strong>{paidData.method}</strong></div>
            <div className="myadopt-receipt-row"><span>Transaction ID</span><code style={{ fontSize: ".78rem" }}>{paidData.txnId}</code></div>
            <div className="myadopt-receipt-row"><span>Date</span><strong>{new Date(paidData.paidAt).toLocaleString()}</strong></div>
          </div>
        </div>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <button className="myadopt-back-btn" onClick={() => navigate("/adopted-pets")}>
            View Adopted Pets
          </button>
          <button
            className="myadopt-back-btn"
            style={{ background: "#f1f5f9", color: "#475569" }}
            onClick={() => navigate("/my-adoptions")}
          >
            My Requests
          </button>
        </div>
      </div>
    );
  }

  // ── Payment form ──
  return (
    <div className="myadopt-pay-page">
      <Link to="/my-adoptions" className="req-detail-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to My Adoptions
      </Link>

      <div className="myadopt-pay-card">
        {/* Pet summary */}
        <div className="myadopt-pay-pet">
          <img src={request.petImage} alt={request.petName} className="myadopt-pay-pet-img" />
          <div>
            <h4 className="myadopt-pay-pet-name">{request.petName}</h4>
            <div className="myadopt-pay-pet-meta">{request.petBreed} · {request.petType}</div>
            <div className="myadopt-pay-amount">Adoption Fee: <strong>${AMOUNT}</strong></div>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "20px 0" }} />

        {/* Payment method tabs */}
        <div className="myadopt-pay-tabs">
          {["Card", "UPI", "Cash"].map(m => (
            <button
              key={m}
              className={`myadopt-pay-tab${form.method === m ? " active" : ""}`}
              onClick={() => setForm({ ...form, method: m })}
              type="button"
            >
              {m}
            </button>
          ))}
        </div>

        <form onSubmit={handlePay} className="myadopt-pay-form">
          {form.method === "Card" && (
            <>
              <div className="pd-field">
                <label>Cardholder Name</label>
                <input className="pd-input" placeholder="Name on card" required
                  value={form.cardName} onChange={e => setForm({ ...form, cardName: e.target.value })} />
              </div>
              <div className="pd-field">
                <label>Card Number</label>
                <input className="pd-input" placeholder="1234 5678 9012 3456" maxLength={19} required
                  value={form.cardNumber} onChange={e => setForm({ ...form, cardNumber: e.target.value })} />
              </div>
              <div className="pd-row">
                <div className="pd-field">
                  <label>Expiry Date</label>
                  <input className="pd-input" placeholder="MM/YY" maxLength={5} required
                    value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} />
                </div>
                <div className="pd-field">
                  <label>CVV</label>
                  <input className="pd-input" placeholder="123" maxLength={3} required
                    value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value })} />
                </div>
              </div>
            </>
          )}
          {form.method === "UPI" && (
            <div className="pd-field">
              <label>UPI ID</label>
              <input className="pd-input" placeholder="yourname@upi" required
                value={form.upi} onChange={e => setForm({ ...form, upi: e.target.value })} />
            </div>
          )}
          {form.method === "Cash" && (
            <div className="myadopt-cash-note">
              Visit the shelter and pay <strong>${AMOUNT}</strong> in cash. Click confirm to record your payment.
            </div>
          )}

          <button type="submit" className="myadopt-pay-submit">
            Confirm Payment — ${AMOUNT}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
