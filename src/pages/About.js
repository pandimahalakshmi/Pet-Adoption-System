function About() {
  return (
    <div>

      {/* Hero banner */}
      <div className="about-hero">
        <div className="row align-items-center g-0">
          <div className="col-lg-6 about-hero-text">
            <h1 className="about-hero-title">About AdoptPet</h1>
            <p className="about-hero-desc">
              We are a passionate team dedicated to connecting loving families
              with pets in need. Every adoption changes two lives — the pet's and yours.
            </p>
          </div>
          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800&q=80"
              className="about-hero-img"
              alt="Person with pet"
            />
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="about-section">
        <div className="about-section-title">Our Mission</div>
        <p className="about-section-text">
          AdoptPet was founded with a simple but powerful mission — to give every pet a second
          chance at a happy life. We believe that every dog, cat, bird, and rabbit deserves a
          warm home and a caring family. Our platform makes the adoption process easy, transparent,
          and completely free for adopters.
        </p>
      </div>

      {/* Stats */}
      <div className="about-stats-row">
        {[
          { value: "10,000+", label: "Pets Listed" },
          { value: "5,000+",  label: "Happy Adoptions" },
          { value: "100+",    label: "Partner Shelters" },
          { value: "100%",    label: "Free Service" },
        ].map(s => (
          <div key={s.label} className="about-stat-card">
            <div className="about-stat-value">{s.value}</div>
            <div className="about-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="about-section">
        <div className="about-section-title">How It Works</div>
        <div className="row g-3 mt-1">
          {[
            { num: "01", title: "Create an Account", desc: "Sign up for free in under a minute. No credit card required." },
            { num: "02", title: "Browse Pets",        desc: "Explore dogs, cats, birds, and rabbits from verified shelters." },
            { num: "03", title: "Send a Request",     desc: "Submit an adoption request with your reason and details." },
            { num: "04", title: "Get Approved",       desc: "Admin reviews your request and sends an approval notification." },
            { num: "05", title: "Pay & Adopt",        desc: "Complete a simple payment and welcome your new companion home." },
          ].map(item => (
            <div className="col-md-4" key={item.num}>
              <div className="about-step-card">
                <div className="about-step-num">Step {item.num}</div>
                <h6 className="fw-bold mt-2 mb-1">{item.title}</h6>
                <p className="text-muted small mb-0">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="about-section">
        <div className="about-section-title">Why Choose AdoptPet?</div>
        <div className="row g-3">
          {[
            { title: "Verified Shelters",  desc: "All our partner shelters are verified and trusted before listing." },
            { title: "100% Free",          desc: "Our platform is completely free for all adopters." },
            { title: "Easy Process",       desc: "Simple, transparent, and straightforward adoption steps." },
            { title: "Ongoing Support",    desc: "We support you before, during, and after the adoption." },
            { title: "Safe Payments",      desc: "Secure payment processing for adoption fees." },
            { title: "All Pet Types",      desc: "Dogs, cats, birds, rabbits — find your perfect match." },
          ].map(f => (
            <div className="col-6 col-md-4" key={f.title}>
              <div className="about-feature-card">
                <div className="about-feature-title">{f.title}</div>
                <div className="about-feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="about-contact-card">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h4 className="mb-2">Get in Touch</h4>
            <div className="about-contact-list">
              <span>Phone: 1-800-PET-LOVE</span>
              <span>Email: adopt@petlove.com</span>
              <span>Address: 123 Paw Street, New York, USA</span>
              <span>Hours: Mon–Sat 9am – 6pm</span>
            </div>
          </div>
          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <a href="mailto:adopt@petlove.com" className="btn btn-warning fw-bold px-4">
              Contact Us
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}

export default About;
