import { useState } from 'react';

export default function AdminCarsPage() {
  const [cars, setCars] = useState([
    { id: 1, name: 'Maruti Swift', category: 'Hatchback', price: 1500, status: 'Available', image: 'https://placehold.co/600x400?text=Swift' },
    { id: 2, name: 'Honda City', category: 'Sedan', price: 2500, status: 'Rented', image: 'https://placehold.co/600x400?text=City' },
    { id: 3, name: 'Mahindra XUV700', category: 'SUV', price: 4000, status: 'Available', image: 'https://placehold.co/600x400?text=XUV700' },
    { id: 4, name: 'Tata Nexon', category: 'SUV', price: 2000, status: 'Maintenance', image: 'https://placehold.co/600x400?text=Nexon' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter(car => car.id !== id));
    }
  };

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">🚗 Manage Cars</h1>
        <button className="btn btn-primary">➕ Add New Car</button>
      </div>

      {/* Search and Filter */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search cars by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option value="">All Categories</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option value="">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Rented">Rented</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
      <div className="row g-4">
        {filteredCars.map(car => (
          <div key={car.id} className="col-md-6 col-lg-4 col-xl-3">
            <div className="card shadow-sm border-0 h-100">
              <div className="position-relative">
                <img src={car.image} className="card-img-top" alt={car.name} style={{ height: '200px', objectFit: 'cover' }} />
                <span className={`position-absolute top-0 end-0 badge m-2 ${car.status === 'Available' ? 'bg-success' :
                  car.status === 'Rented' ? 'bg-warning text-dark' : 'bg-danger'
                  }`}>
                  {car.status}
                </span>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title fw-bold mb-0">{car.name}</h5>
                  <small className="text-muted">{car.category}</small>
                </div>
                <p className="card-text text-primary fw-bold mb-3">₹{car.price}/day</p>

                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-secondary flex-grow-1">✏️ Edit</button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(car.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-5">
          <h3 className="text-muted">No cars found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
