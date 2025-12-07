import { Link } from 'react-router-dom';

export default function CarCard({ car }) {
  return (
    <div className="card h-100 shadow-sm border-0">
      <div className="position-relative overflow-hidden" style={{ height: "200px" }}>
        <img 
          src={car.img || "https://via.placeholder.com/400x300?text=Car"} 
          alt={car.model} 
          className="card-img-top"
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
        />
        <span className="badge bg-danger position-absolute top-2 end-2">₹{car.basePricePerDay}/day</span>
      </div>
      <div className="card-body">
        <h5 className="card-title">{car.brand} {car.model}</h5>
        <p className="card-text text-muted small">
          {car.type} • {car.seats || 4} seats • {car.fuel || "Petrol"}
        </p>
        <p className="card-text text-muted small">
          {car.transmission || "Manual"} • {car.mileage || "N/A"} km
        </p>
        <Link 
          to={`/car/${car.carId}`}
          state={{ car }}
          className="btn btn-primary w-100"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
