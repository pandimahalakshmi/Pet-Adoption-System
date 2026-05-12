import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="footer-brand-name mb-2">AdoptPet</div>
              <p className="footer-desc">
                We connect loving families with pets in need. Every adoption changes two lives.
                Join our community and make a difference today.
              </p>
            </div>
            <div className="col-md-2">
              <div className="footer-heading">Quick Links</div>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/pets">Browse Pets</Link></li>
                <li><Link to="/add-pet">Add a Pet</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
            </div>
            <div className="col-md-2">
              <div className="footer-heading">Pet Types</div>
              <ul className="footer-links">
                <li><Link to="/pets">Dogs</Link></li>
                <li><Link to="/pets">Cats</Link></li>
                <li><Link to="/pets">Birds</Link></li>
                <li><Link to="/pets">Rabbits</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <div className="footer-heading">Contact</div>
              <ul className="footer-contact-list">
                <li>Phone: 1-800-PET-LOVE</li>
                <li>Email: adopt@petlove.com</li>
                <li>Address: 123 Paw Street, New York</li>
                <li>Hours: Mon-Sat 9am - 6pm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          <span>© {year} AdoptPet. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#!">Privacy Policy</a>
            <a href="#!">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
