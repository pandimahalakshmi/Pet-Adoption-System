import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPetPrice } from "../utils/petHelpers";

function AdminAddPet() {
  const [pet, setPet] = useState({
    name: "", type: "Dog", breed: "", age: "",
    gender: "Male", color: "", weight: "",
    vaccinated: "Yes", description: ""
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Live price preview
  const previewPrice = pet.type && pet.age ? getPetPrice({ type: pet.type, age: Number(pet.age) }) : null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please select a valid image file."); return; }
    setError("");
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!imagePreview) { setError("Please upload a pet image."); return; }
    const pets = JSON.parse(localStorage.getItem("userPets")) || [];
    pets.push({
      ...pet,
      id: Date.now(),
      age: Number(pet.age),
      weight: pet.weight ? Number(pet.weight) : undefined,
      image: imagePreview
    });
    localStorage.setItem("userPets", JSON.stringify(pets));
    setSuccess(true);
    setTimeout(() => navigate("/admin/pets"), 1400);
  };

  return (
    <div className="adm-addpet-page">
      <div className="adm-welcome">
        <div>
          <h2 className="adm-welcome-title">Add New Pet</h2>
          <p className="adm-welcome-sub">Fill in all details to list a new pet for adoption</p>
        </div>
        {previewPrice && (
          <div className="adm-addpet-price-preview">
            Adoption Fee Preview: <strong>${previewPrice}</strong>
          </div>
        )}
      </div>

      <div className="adm-addpet-center">
        <div className="adm-addpet-card" style={{ maxWidth: 680 }}>

          {success && (
            <div className="adm-addpet-success">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Pet added successfully! Redirecting to Manage Pets...
            </div>
          )}
          {error && <div className="adm-addpet-error">{error}</div>}

          <form onSubmit={submit}>

            {/* Image Upload */}
            <div className="adm-addpet-field">
              <label className="adm-addpet-label">Pet Photo <span className="adm-addpet-req">*</span></label>
              <div
                className={`adm-upload-zone${imagePreview ? " has-image" : ""}`}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onClick={() => document.getElementById("petImageInput").click()}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="adm-upload-preview" />
                    <div className="adm-upload-change">Click to change photo</div>
                  </>
                ) : (
                  <div className="adm-upload-placeholder">
                    <div className="adm-upload-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                    <div className="adm-upload-text">
                      <span className="adm-upload-link">Click to upload</span> or drag & drop
                    </div>
                    <div className="adm-upload-hint">PNG, JPG, WEBP up to 5MB</div>
                  </div>
                )}
                <input id="petImageInput" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
              </div>
            </div>

            {/* Row 1: Name + Type */}
            <div className="adm-addpet-row">
              <div className="adm-addpet-field">
                <label className="adm-addpet-label">Pet Name <span className="adm-addpet-req">*</span></label>
                <input className="adm-addpet-input" placeholder="e.g. Buddy"
                  value={pet.name} onChange={e => setPet({ ...pet, name: e.target.value })} required />
              </div>
              <div className="adm-addpet-field">
                <label className="adm-addpet-label">Type <span className="adm-addpet-req">*</span></label>
                <select className="adm-addpet-input" value={pet.type} onChange={e => setPet({ ...pet, type: e.target.value })}>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                </select>
              </div>
            </div>

            {/* Row 2: Breed + Age */}
            <div className="adm-addpet-row">
              <div className="adm-addpet-field">
                <label className="adm-addpet-label">Breed <span className="adm-addpet-req">*</span></label>
                <input className="adm-addpet-input" placeholder="e.g. Golden Retriever"
                  value={pet.breed} onChange={e => setPet({ ...pet, breed: e.target.value })} required />
              </div>
              <div className="adm-addpet-field">
                <label className="adm-addpet-label">Age (years) <span className="adm-addpet-req">*</span></label>
                <input type="number" className="adm-addpet-input" placeholder="e.g. 2"
                  value={pet.age} onChange={e => setPet({ ...pet, age: e.target.value })} required min="0" max="30" />
              </div>
            </div>

            {/* Row 3: Gender + Color */}
            <div className="adm-addpet-row">
              <div className="adm-addpet-field">
                <label className="adm-addpet-label">Gender</label>
                <select className="adm-addpet-input" value={pet.gender} onChange={e => setPet({ ...pet, gender: e.target.value })}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="adm-addpet-field">
                <label className="adm-addpet-label">Color / Coat</label>
                <input className="adm-addpet-input" placeholder="e.g. Golden, Black & White"
                  value={pet.color} onChange={e => setPet({ ...pet, color: e.target.value })} />
              </div>
            </div>

            {/* Row 4: Weight + Vaccinated */}
            <div className="adm-addpet-row">
              <div className="adm-addpet-field">
                <label className="adm-addpet-label">Weight (kg)</label>
                <input type="number" className="adm-addpet-input" placeholder="e.g. 5.5"
                  value={pet.weight} onChange={e => setPet({ ...pet, weight: e.target.value })} min="0" step="0.1" />
              </div>
              <div className="adm-addpet-field">
                <label className="adm-addpet-label">Vaccinated</label>
                <select className="adm-addpet-input" value={pet.vaccinated} onChange={e => setPet({ ...pet, vaccinated: e.target.value })}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Partial">Partial</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="adm-addpet-field">
              <label className="adm-addpet-label">Description</label>
              <textarea className="adm-addpet-input" rows={3}
                placeholder="Describe the pet's personality, habits, special needs..."
                value={pet.description} onChange={e => setPet({ ...pet, description: e.target.value })}
                style={{ resize: "vertical" }} />
            </div>

            {/* Price preview box */}
            {previewPrice && (
              <div className="adm-addpet-price-box">
                <div className="adm-addpet-price-label">Calculated Adoption Fee</div>
                <div className="adm-addpet-price-value">${previewPrice}</div>
                <div className="adm-addpet-price-note">
                  Based on type ({pet.type}) and age ({pet.age} yr{Number(pet.age) !== 1 ? "s" : ""})
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="adm-addpet-actions">
              <button type="submit" className="adm-addpet-submit">Add Pet</button>
              <button type="button" className="adm-addpet-cancel" onClick={() => navigate("/admin/pets")}>Cancel</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminAddPet;
