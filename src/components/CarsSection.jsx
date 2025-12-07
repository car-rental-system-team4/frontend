import { useState } from 'react';
import CarCard from './CarCard';

const SAMPLE_CARS = [
  {
    carId: 1,
    brand: "Maruti",
    model: "Swift",
    type: "Hatchback",
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "20 kmpl",
    basePricePerDay: 1500,
    img: "/Swift.jpg"
  },
  {
    carId: 2,
    brand: "Honda",
    model: "Accord",
    type: "Sedan",
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "16 kmpl",
    basePricePerDay: 3500,
    img: "Accord.jpg"
  },
  {
    carId: 3,
    brand: "Mahindra",
    model: "XUV500",
    type: "SUV",
    seats: 7,
    fuel: "Diesel",
    transmission: "Automatic",
    mileage: "15 kmpl",
    basePricePerDay: 4500,
    img: "XUV500.jpg"
  },
  {
    carId: 4,
    brand: "Tata",
    model: "Nexon",
    type: "SUV",
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "18 kmpl",
    basePricePerDay: 2500,
    img: "Nexon.jpg"
  },
  {
    carId: 5,
    brand: "Hyundai",
    model: "Creta",
    type: "SUV",
    seats: 5,
    fuel: "Diesel",
    transmission: "Automatic",
    mileage: "19 kmpl",
    basePricePerDay: 3200,
    img: "creta.jpg"
  },
  {
    carId: 6,
    brand: "Toyota",
    model: "Fortuner",
    type: "SUV",
    seats: 7,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "14 kmpl",
    basePricePerDay: 5500,
    img: "Fortuner.jpg"
  }
];

export default function CarsSection() {
  const [location, setLocation] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterFuel, setFilterFuel] = useState("All");
  const [filterTransmission, setFilterTransmission] = useState("All");
  const [filterSeats, setFilterSeats] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);

  // Available locations for dropdown
  const LOCATIONS = ["All Locations", "Delhi", "Mumbai", "Bangalore", "Pune", "Chennai", "Hyderabad", "Jaipur"];

  const filteredCars = SAMPLE_CARS.filter(car => {
    // Type filter
    if (filterType !== "All" && car.type !== filterType) return false;
    
    // Fuel filter
    if (filterFuel !== "All" && car.fuel !== filterFuel) return false;
    
    // Transmission filter
    if (filterTransmission !== "All" && car.transmission !== filterTransmission) return false;
    
    // Seats filter
    if (filterSeats !== "All" && car.seats !== parseInt(filterSeats)) return false;
    
    // Price filter
    if (car.basePricePerDay > maxPrice) return false;
    
    return true;
  });

  const resetFilters = () => {
    setLocation("");
    setFilterType("All");
    setFilterFuel("All");
    setFilterTransmission("All");
    setFilterSeats("All");
    setMaxPrice(10000);
  };

  return (
    <section id="cars" className="py-5">
      <div className="container">
        <h2 className="mb-4 fw-bold">Find Your Perfect Car</h2>
        
        {/* Location and Filters Section */}
        <div className="card bg-light p-4 mb-5">
          <h5 className="mb-3 fw-bold">Search & Filter Options</h5>
          
          {/* Location Input */}
          <div className="row mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Pick-up Location</label>
              <select 
                className="form-select form-select-lg"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Select a location</option>
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Selected Location</label>
              <div className="p-3 bg-white rounded border">
                <span className="text-muted">{location || "No location selected"}</span>
              </div>
            </div>
          </div>

          {/* Filter Chips/Buttons */}
          <div className="row g-3">
            {/* Car Type Filter */}
            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label fw-bold">Car Type</label>
              <select 
                className="form-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
              </select>
            </div>

            {/* Fuel Type Filter */}
            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label fw-bold">Fuel Type</label>
              <select 
                className="form-select"
                value={filterFuel}
                onChange={(e) => setFilterFuel(e.target.value)}
              >
                <option value="All">All Fuels</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

            {/* Transmission Filter */}
            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label fw-bold">Transmission</label>
              <select 
                className="form-select"
                value={filterTransmission}
                onChange={(e) => setFilterTransmission(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* Seats Filter */}
            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label fw-bold">Seats</label>
              <select 
                className="form-select"
                value={filterSeats}
                onChange={(e) => setFilterSeats(e.target.value)}
              >
                <option value="All">All Seats</option>
                <option value="5">5 Seater</option>
                <option value="7">7 Seater</option>
              </select>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="row g-3 mt-2">
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Max Price per Day: ₹{maxPrice}</label>
              <input 
                type="range" 
                className="form-range"
                min="1000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <div className="text-muted small mt-1">₹1000 - ₹10000</div>
            </div>

            {/* Reset Button */}
            <div className="col-12 col-md-6 d-flex align-items-end">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-3">
          <p className="text-muted">
            Showing <strong>{filteredCars.length}</strong> car(s) 
            {location && ` in ${location}`}
          </p>
        </div>

        {/* Cars grid */}
        {filteredCars.length > 0 ? (
          <div className="row g-4">
            {filteredCars.map(car => (
              <div key={car.carId} className="col-md-6 col-lg-4">
                <CarCard car={car} />
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-warning text-center py-5">
            <h5>No cars found matching your criteria</h5>
            <p className="mb-0">Try adjusting your filters or location</p>
          </div>
        )}
      </div>
    </section>
  );
}
