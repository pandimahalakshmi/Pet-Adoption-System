import { Link } from "react-router-dom";
import PetCard from "../components/PetCard";
import { getAllPets } from "../utils/petHelpers";

function UserDashboard() {
  const allPets = getAllPets();

  return (
    <div>

      {/* Hero */}
      <div className="home-hero">
        <div className="row align-items-center g-0">
          <div className="col-lg-6 home-hero-text">
            <h1 className="home-hero-title">A Forever Family For Pets In Need</h1>
            <p className="home-hero-desc">
              Every pet deserves a loving home. Our platform connects you with pets
              waiting for adoption from trusted shelters.
            </p>
            <div className="d-flex gap-2 flex-wrap">
              <Link to="/pets" className="btn btn-warning fw-bold px-4">Find Pets</Link>
              <Link to="/add-pet" className="btn btn-outline-light px-4">Add a Pet</Link>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800"
              className="home-hero-img"
              alt="Happy cat"
            />
          </div>
        </div>
      </div>

      {/* Browse by Category */}
      <div className="home-section">
        <div className="home-section-title">Browse by Category</div>
        <div className="home-section-sub">Find the perfect pet that matches your lifestyle</div>
        <div className="row g-3">
          {[
            { label: "Dogs",    count: allPets.filter(p => p.type === "Dog").length },
            { label: "Cats",    count: allPets.filter(p => p.type === "Cat").length },
            { label: "Birds",   count: allPets.filter(p => p.type === "Bird").length },
            { label: "Rabbits", count: allPets.filter(p => p.type === "Rabbit").length },
          ].map(cat => (
            <div className="col-6 col-md-3" key={cat.label}>
              <Link to="/pets" className="text-decoration-none">
                <div className="category-card">
                  <h5 className="mb-1 fw-bold">{cat.label}</h5>
                  <span className="badge bg-primary">{cat.count} available</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Pets */}
      <div className="home-section">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <div className="home-section-title mb-0">Featured Pets</div>
            <div className="home-section-sub mb-0">These pets are waiting for you</div>
          </div>
          <Link to="/pets" className="btn btn-outline-primary btn-sm">View All</Link>
        </div>
        <div className="row">
          {allPets.slice(0, 3).map(p => <PetCard key={p.id} pet={p} />)}
        </div>
      </div>

    </div>
  );
}

export default UserDashboard;
