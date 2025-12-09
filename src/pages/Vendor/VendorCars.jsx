import { useState } from 'react'

export default function VendorCars() {
  const [cars] = useState([
    {
      id: 'CAR001',
      name: 'Maruti Swift',
      model: 'Swift LXi',
      registrationNumber: 'MH01AB1234',
      fuelType: 'Petrol',
      transmission: 'Manual',
      seating: 5,
      dailyRate: 1800,
      status: 'Available',
      bookings: 12,
      rating: 4.7,
      image: '🚗'
    },
    {
      id: 'CAR002',
      name: 'Honda Accord',
      model: 'Accord 2.4L',
      registrationNumber: 'MH02CD5678',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seating: 5,
      dailyRate: 2500,
      status: 'Available',
      bookings: 18,
      rating: 4.8,
      image: '🚙'
    },
    {
      id: 'CAR003',
      name: 'Mahindra XUV500',
      model: 'XUV500 W10',
      registrationNumber: 'MH03EF9012',
      fuelType: 'Diesel',
      transmission: 'Automatic',
      seating: 7,
      dailyRate: 3200,
      status: 'Available',
      bookings: 25,
      rating: 4.9,
      image: '🚐'
    },
    {
      id: 'CAR004',
      name: 'Tata Nexon',
      model: 'Nexon EV',
      registrationNumber: 'MH04GH3456',
      fuelType: 'Electric',
      transmission: 'Automatic',
      seating: 5,
      dailyRate: 2200,
      status: 'Maintenance',
      bookings: 15,
      rating: 4.6,
      image: '🔋'
    },
    {
      id: 'CAR005',
      name: 'Toyota Fortuner',
      model: 'Fortuner 4x4',
      registrationNumber: 'MH05IJ7890',
      fuelType: 'Diesel',
      transmission: 'Automatic',
      seating: 7,
      dailyRate: 4500,
      status: 'Available',
      bookings: 8,
      rating: 4.5,
      image: '🚗'
    }
  ])

  const [selectedCar, setSelectedCar] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredCars = filterStatus === 'All' 
    ? cars 
    : cars.filter(car => car.status === filterStatus)

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Available':
        return <span className="badge bg-success">Available</span>
      case 'Rented':
        return <span className="badge bg-info">Rented</span>
      case 'Maintenance':
        return <span className="badge bg-warning text-dark">Maintenance</span>
      default:
        return <span className="badge bg-secondary">{status}</span>
    }
  }

  const totalEarnings = cars.reduce((sum, car) => sum + (car.dailyRate * car.bookings), 0)

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>My Vehicles</h4>
        <button className="btn btn-primary">
          ➕ Add New Car
        </button>
      </div>

      {/* Stats Summary */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="vendor-stat-card">
            <div className="stat-icon primary">🚗</div>
            <div className="stat-content">
              <h6 className="stat-label">Total Cars</h6>
              <h3 className="stat-value">{cars.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="vendor-stat-card">
            <div className="stat-icon success">✓</div>
            <div className="stat-content">
              <h6 className="stat-label">Available</h6>
              <h3 className="stat-value">{cars.filter(c => c.status === 'Available').length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="vendor-stat-card">
            <div className="stat-icon info">📅</div>
            <div className="stat-content">
              <h6 className="stat-label">Total Bookings</h6>
              <h3 className="stat-value">{cars.reduce((sum, c) => sum + c.bookings, 0)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="vendor-stat-card">
            <div className="stat-icon accent">💰</div>
            <div className="stat-content">
              <h6 className="stat-label">Est. Revenue</h6>
              <h3 className="stat-value">₹{(totalEarnings / 100000).toFixed(1)}L</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="vendor-filters mb-4">
        <div className="filter-group">
          {['All', 'Available', 'Rented', 'Maintenance'].map(status => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
              <span className="filter-count">
                {status === 'All' 
                  ? cars.length 
                  : cars.filter(c => c.status === status).length
                }
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Cars Grid */}
      <div className="row g-4 mb-4">
        {filteredCars.map(car => (
          <div key={car.id} className="col-md-6 col-lg-4">
            <div className="vendor-car-card">
              <div className="car-image">
                <span className="car-emoji">{car.image}</span>
                {getStatusBadge(car.status)}
              </div>

              <div className="car-card-body">
                <h6 className="car-name">{car.name}</h6>
                <small className="text-muted">{car.model}</small>

                <div className="car-specs">
                  <div className="spec">
                    <span className="spec-icon">⛽</span>
                    <span className="spec-text">{car.fuelType}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-icon">⚙️</span>
                    <span className="spec-text">{car.transmission}</span>
                  </div>
                  <div className="spec">
                    <span className="spec-icon">👥</span>
                    <span className="spec-text">{car.seating} Seats</span>
                  </div>
                </div>

                <div className="car-rating">
                  <span className="star">★</span>
                  <span className="rating-value">{car.rating}/5</span>
                  <span className="text-muted">({car.bookings} bookings)</span>
                </div>

                <div className="car-price">
                  <span className="price-label">Daily Rate</span>
                  <span className="price-value">₹{car.dailyRate}</span>
                </div>
              </div>

              <div className="car-card-footer">
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => setSelectedCar(car)}
                >
                  View Details
                </button>
                <button className="btn btn-sm btn-outline-primary">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cars Table */}
      <div className="vendor-card">
        <div className="card-header">
          <h5 className="mb-0">Detailed Car Information</h5>
        </div>
        <div className="table-responsive">
          <table className="vendor-table">
            <thead>
              <tr>
                <th>Car Name</th>
                <th>Registration</th>
                <th>Fuel Type</th>
                <th>Transmission</th>
                <th>Daily Rate</th>
                <th>Bookings</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map(car => (
                <tr key={car.id}>
                  <td>
                    <strong>{car.name}</strong>
                    <br/>
                    <small className="text-muted">{car.model}</small>
                  </td>
                  <td>{car.registrationNumber}</td>
                  <td>{car.fuelType}</td>
                  <td>{car.transmission}</td>
                  <td><strong>₹{car.dailyRate}</strong></td>
                  <td>{car.bookings}</td>
                  <td>⭐ {car.rating}/5</td>
                  <td>{getStatusBadge(car.status)}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setSelectedCar(car)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Car Details Modal */}
      {selectedCar && (
        <div className="vendor-modal-overlay" onClick={() => setSelectedCar(null)}>
          <div className="vendor-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h5>{selectedCar.name} - Details</h5>
              <button 
                className="btn-close"
                onClick={() => setSelectedCar(null)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h6 className="section-title">Basic Information</h6>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Car Name:</span>
                    <span className="value">{selectedCar.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Model:</span>
                    <span className="value">{selectedCar.model}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Car ID:</span>
                    <span className="value">{selectedCar.id}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Registration:</span>
                    <span className="value">{selectedCar.registrationNumber}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h6 className="section-title">Vehicle Specifications</h6>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Fuel Type:</span>
                    <span className="value">{selectedCar.fuelType}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Transmission:</span>
                    <span className="value">{selectedCar.transmission}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Seating Capacity:</span>
                    <span className="value">{selectedCar.seating} Seats</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Daily Rate:</span>
                    <strong className="text-success">₹{selectedCar.dailyRate}</strong>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h6 className="section-title">Performance Metrics</h6>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Total Bookings:</span>
                    <span className="value">{selectedCar.bookings}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Average Rating:</span>
                    <span className="value">⭐ {selectedCar.rating}/5</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Current Status:</span>
                    {getStatusBadge(selectedCar.status)}
                  </div>
                  <div className="detail-item">
                    <span className="label">Est. Earnings:</span>
                    <strong className="text-success">₹{(selectedCar.dailyRate * selectedCar.bookings).toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedCar(null)}
              >
                Close
              </button>
              <button className="btn btn-primary">Edit Car</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
