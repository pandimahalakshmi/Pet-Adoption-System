import { useState } from "react";

function AdminAdoptions() {
  const [adoptions, setAdoptions] = useState(
    JSON.parse(localStorage.getItem("adoptions")) || []
  );

  const clearAll = () => {
    if (!window.confirm("Clear all adoption records?")) return;
    setAdoptions([]);
    localStorage.setItem("adoptions", JSON.stringify([]));
  };

  const removeOne = (index) => {
    if (!window.confirm("Remove this adoption record?")) return;
    const updated = adoptions.filter((_, i) => i !== index);
    setAdoptions(updated);
    localStorage.setItem("adoptions", JSON.stringify(updated));
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-title">All Adoptions</div>
          <div className="admin-page-sub">Pets that have been adopted through the platform</div>
        </div>
        {adoptions.length > 0 && (
          <button className="btn btn-outline-danger btn-sm" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="table admin-table mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Pet</th>
                <th>Type</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adoptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">No adoptions recorded yet.</td>
                </tr>
              ) : (
                adoptions.map((pet, i) => (
                  <tr key={i}>
                    <td className="text-muted">{i + 1}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img src={pet.image} alt={pet.name} className="admin-table-img" />
                        <strong>{pet.name}</strong>
                      </div>
                    </td>
                    <td>
                      <span className={`admin-badge ${pet.type === "Dog" ? "badge-dog" : "badge-cat"}`}>
                        {pet.type}
                      </span>
                    </td>
                    <td className="text-muted">{pet.breed}</td>
                    <td>{pet.age} yr{pet.age !== 1 ? "s" : ""}</td>
                    <td>
                      <button
                        className="admin-action-btn delete"
                        onClick={() => removeOne(i)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminAdoptions;
