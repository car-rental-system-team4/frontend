import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="container1">
        <div className="row align-items-center gy-4">
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold mb-4 text-white">Reliable Cars. Fair Prices. Anytime, Anywhere.</h1>
            <p className="lead text-white-50 mb-4">Pick from hatchbacks, sedans, or SUVs. Quick booking, secure pickup, and flexible returns.</p>
            <div className="d-flex gap-3">
              <Link to="/cars" className="btn btn-primary btn-lg">Browse Cars</Link>

            </div>
          </div>
          <div className="col-lg-6">
            <img
              src="/hero-car.jpg"
              alt="car hero"
              className="img-fluid rounded-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
