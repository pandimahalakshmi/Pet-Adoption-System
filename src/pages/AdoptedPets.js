import { Link } from "react-router-dom";

function AdoptedPets() {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const adoptions = JSON.parse(localStorage.getItem("adoptions")) || [];
  const payments = (JSON.parse(localStorage.getItem("payments")) || [])
    .filter(p => p.username === user.username);

  return (
    <div>
      <div className="home-section-title mb-1">Adopted Pets</div>
      <div className="home-section-sub mb-4">Pets you have successfully adopted</div>

      {adoptions.length === 0 ? (
        <div className="user-card">
          <div className="user-empty">
            <p>No adopted pets yet. Complete a payment to adopt a pet.</p>
            <Link to="/my-adoptions" className="btn btn-sm btn-primary">View My Requests</Link>
          </div>
        </div>
      ) : (
        <div className="myadopt-adopted-grid">
          {adoptions.map((pet, i) => {
            const payment = payments.find(p => p.petId === pet.id);
            return (
              <div key={i} className="myadopt-adopted-card">
                <div className="myadopt-adopted-img-wrap">
                  <img src={pet.image} alt={pet.name} className="myadopt-adopted-img" />
                  <span className="myadopt-adopted-badge">Adopted</span>
                </div>
                <div className="myadopt-adopted-body">
                  <div className="myadopt-adopted-name">{pet.name}</div>
                  <div className="myadopt-adopted-breed">{pet.breed} · {pet.type}</div>
                  <div className="myadopt-adopted-age">{pet.age} yr{pet.age !== 1 ? "s" : ""} old</div>

                  {payment && (
                    <div className="myadopt-adopted-receipt">
                      <div className="myadopt-receipt-mini-row">
                        <span>Amount Paid</span>
                        <strong style={{ color: "#16a34a" }}>${payment.amount}</strong>
                      </div>
                      <div className="myadopt-receipt-mini-row">
                        <span>Method</span>
                        <strong>{payment.method}</strong>
                      </div>
                      <div className="myadopt-receipt-mini-row">
                        <span>Date</span>
                        <strong>{new Date(payment.paidAt).toLocaleDateString()}</strong>
                      </div>
                      <div className="myadopt-receipt-mini-row">
                        <span>Txn ID</span>
                        <code style={{ fontSize: ".7rem" }}>{payment.txnId}</code>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdoptedPets;
