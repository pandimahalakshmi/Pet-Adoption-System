import { Link } from "react-router-dom";
import petsData from "../data/petsData";

function Landing() {
  const dogs = petsData.filter(p => p.type === "Dog");
  const cats = petsData.filter(p => p.type === "Cat");

  return (
    <div className="landing-page">

      {/* ── HERO ── */}
      <section className="lp-hero">
        <div className="container">

          {/* Mini nav inside hero */}
          <div className="lp-hero-nav">
            <div className="lp-hero-nav-brand">AdoptPet</div>
            <div className="lp-hero-nav-links">
              <a href="#about">Home</a>
              <a href="#pets">Adopt a Pet</a>
              <a href="#how">Our Story</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="lp-hero-nav-actions">
              <Link to="/login" className="lp-nav-login">Login</Link>
              <Link to="/register" className="lp-nav-signup">Sign Up</Link>
            </div>
          </div>

          {/* Hero Card */}
          <div className="lp-hero-card">

            {/* Left: Text */}
            <div className="lp-hero-left">
              <h1 className="lp-hero-title">
                Find Your<br />
                <span className="lp-hero-accent">Perfect Friend</span>
              </h1>
              <p className="lp-hero-desc">
                Thousands of pets are waiting for a loving home. Browse dogs,
                cats, and more from verified shelters near you. Adoption is
                free, easy, and changes lives forever.
              </p>
              <div className="lp-hero-btns">
                <Link to="/register" className="lp-btn-primary">Adopt Now</Link>
                <Link to="/login" className="lp-btn-secondary">Learn More</Link>
              </div>

              {/* Stats inside card */}
              <div className="lp-hero-stats">
                <div className="lp-hero-stat">
                  <strong>10,000+</strong>
                  <span>Pets Listed</span>
                </div>
                <div className="lp-hero-stat-divider" />
                <div className="lp-hero-stat">
                  <strong>100+</strong>
                  <span>Shelters Partnered</span>
                </div>
                <div className="lp-hero-stat-divider" />
                <div className="lp-hero-stat">
                  <strong>5,000+</strong>
                  <span>Pet Lovers</span>
                </div>
              </div>
            </div>

            {/* Right: Images */}
            <div className="lp-hero-right">
              {/* Big dog image */}
              <div className="lp-hero-dog-wrap">
                <img
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80"
                  alt="Dog"
                  className="lp-hero-dog-img"
                />
              </div>
              {/* Small circle: person with pet */}
              <div className="lp-hero-circle-wrap">
                <img
                  src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=300&q=80"
                  alt="Person with pet"
                  className="lp-hero-circle-img"
                />
              </div>
              {/* Slide indicators */}
              <div className="lp-hero-dots">
                <span className="lp-dot active">01</span>
                <span className="lp-dot-line" />
                <span className="lp-dot">02</span>
                <span className="lp-dot-line" />
                <span className="lp-dot">03</span>
                <span className="lp-dot-line" />
                <span className="lp-dot">04</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="landing-section" id="about">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="landing-section-title">Find Your Perfect Pet</h2>
            <p className="landing-section-sub">Browse by category and discover your new best friend</p>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { emoji: "🐶", label: "Dogs", count: dogs.length, desc: "Loyal, playful companions" },
              { emoji: "🐱", label: "Cats", count: cats.length, desc: "Independent, loving friends" },
              { emoji: "🐦", label: "Birds", count: 0, desc: "Colorful, cheerful pets" },
              { emoji: "🐰", label: "Rabbits", count: 0, desc: "Gentle, fluffy friends" },
            ].map(cat => (
              <div className="col-6 col-md-3" key={cat.label}>
                <Link to="/register" className="text-decoration-none">
                  <div className="landing-category-card text-center">
                    <div className="landing-cat-emoji">{cat.emoji}</div>
                    <h5 className="fw-bold mb-1">{cat.label}</h5>
                    <p className="text-muted small mb-2">{cat.desc}</p>
                    <span className="lp-cat-badge">{cat.count} available</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PETS ── */}
      <section className="landing-section lp-pets-bg" id="pets">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="landing-section-title">Meet Our Pets</h2>
            <p className="landing-section-sub">These adorable animals are looking for their forever home</p>
          </div>
          <div className="row g-4">
            {petsData.slice(0, 6).map(pet => (
              <div className="col-md-4 col-sm-6" key={pet.id}>
                <div className="landing-pet-card">
                  <div className="landing-pet-img-wrap">
                    <img src={pet.image} alt={pet.name} className="landing-pet-img" />
                    <div className="landing-pet-overlay">
                      <Link to="/register" className="lp-btn-primary" style={{ fontSize: ".82rem", padding: "7px 18px" }}>
                        Adopt {pet.name}
                      </Link>
                    </div>
                  </div>
                  <div className="landing-pet-info">
                    <div>
                      <h6 className="fw-bold mb-0">{pet.name}</h6>
                      <span className="text-muted small">{pet.breed} · {pet.age} yr{pet.age !== 1 ? "s" : ""}</span>
                    </div>
                    <span className="landing-pet-type">{pet.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/register" className="lp-btn-primary" style={{ fontSize: "1rem", padding: "12px 40px" }}>
              View All Pets
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="landing-section" id="how">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="landing-section-title">How Adoption Works</h2>
            <p className="landing-section-sub">Simple steps to find your new companion</p>
          </div>
          <div className="row g-4">
            {[
              { num: "01", title: "Create Account", desc: "Sign up for free in under a minute. No credit card required." },
              { num: "02", title: "Browse Pets", desc: "Explore hundreds of pets from verified shelters near you." },
              { num: "03", title: "Pick Your Pet", desc: "Save favorites and choose the pet that feels right for you." },
              { num: "04", title: "Adopt & Celebrate", desc: "Complete the adoption and welcome your new family member home." },
            ].map(step => (
              <div className="col-md-3 col-sm-6" key={step.num}>
                <div className="lp-step-card text-center">
                  <div className="lp-step-num">{step.num}</div>
                  <h6 className="fw-bold mt-3 mb-2">{step.title}</h6>
                  <p className="text-muted small mb-0">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="landing-section lp-testi-bg">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="landing-section-title">Happy Families</h2>
            <p className="landing-section-sub">Stories from people who found their perfect pet</p>
          </div>
          <div className="row g-4">
            {[
              { name: "Sarah M.", pet: "Buddy (Golden Retriever)", text: "AdoptPet made the whole process so easy. Buddy has been the best addition to our family!", avatar: "S" },
              { name: "James K.", pet: "Luna (Persian Cat)", text: "I found Luna in minutes. The platform is simple and the shelter was amazing. Highly recommend!", avatar: "J" },
              { name: "Emily R.", pet: "Max (Labrador)", text: "We were nervous about adopting but AdoptPet guided us every step of the way. Max is our world now.", avatar: "E" },
            ].map(t => (
              <div className="col-md-4" key={t.name}>
                <div className="landing-testimonial">
                  <div className="lp-testi-stars">★★★★★</div>
                  <p className="landing-testimonial-text mt-2">"{t.text}"</p>
                  <div className="d-flex align-items-center gap-3 mt-3">
                    <div className="lp-testi-avatar">{t.avatar}</div>
                    <div>
                      <div className="fw-bold small">{t.name}</div>
                      <div className="text-muted" style={{ fontSize: ".72rem" }}>Adopted: {t.pet}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-cta" id="contact">
        <div className="container text-center">
          <h2 className="lp-cta-title">Ready to Find Your Perfect Pet?</h2>
          <p className="lp-cta-sub">
            Join thousands of happy families. It's free, fast, and life-changing.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/register" className="lp-btn-primary" style={{ fontSize: "1rem", padding: "12px 40px" }}>
              Start Adopting Today
            </Link>
            <Link to="/login" className="lp-btn-outline-white" style={{ fontSize: "1rem", padding: "12px 32px" }}>
              Already have an account?
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Landing;
