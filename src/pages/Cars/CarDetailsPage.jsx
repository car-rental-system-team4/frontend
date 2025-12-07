import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CarDetailsPage() {
  const { carId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  // Car database for when car is not passed through state
  const CAR_DATABASE = {
    1: {
      carId: 1,
      brand: 'Maruti',
      model: 'Swift',
      type: 'Hatchback',
      seats: 5,
      fuel: 'Petrol',
      transmission: 'Manual',
      mileage: '20 kmpl',
      basePricePerDay: 1500,
      img: '/Swift.jpg',
      rating: 4.5,
      totalReviews: 24,
      description: 'The Maruti Swift is a reliable and fuel-efficient hatchback perfect for city driving and weekend getaways. With its compact size, excellent mileage, and user-friendly features, it\'s ideal for budget-conscious travelers.',
      features: [
        'Compact and easy to maneuver',
        'Excellent fuel efficiency (20 kmpl)',
        'Air conditioning',
        'Power steering',
        'Power windows',
        'USB connectivity',
        'ABS (Anti-lock braking system)',
        'Free 24/7 roadside assistance'
      ],
      images: [
        '/Swift.jpg',
        'https://images.unsplash.com/photo-1609708536965-59d5e2f58f68?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=60'
      ]
    },
    2: {
      carId: 2,
      brand: 'Honda',
      model: 'Accord',
      type: 'Sedan',
      seats: 5,
      fuel: 'Petrol',
      transmission: 'Automatic',
      mileage: '16 kmpl',
      basePricePerDay: 3500,
      img: '/Accord.jpg',
      rating: 4.7,
      totalReviews: 18,
      description: 'The Honda Accord is a premium sedan with superior comfort and performance. Ideal for business travelers and long-distance journeys.',
      features: [
        'Automatic transmission',
        'Cruise control',
        'Sunroof',
        'Premium sound system',
        'Power steering',
        'Climate control',
        'Leather seats',
        'Navigation system'
      ],
      images: [
        '/Accord.jpg',
        'https://images.unsplash.com/photo-1606611013016-969c19d24e6f?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=60'
      ]
    },
    3: {
      carId: 3,
      brand: 'Mahindra',
      model: 'XUV500',
      type: 'SUV',
      seats: 7,
      fuel: 'Diesel',
      transmission: 'Automatic',
      mileage: '15 kmpl',
      basePricePerDay: 4500,
      img: '/XUV500.jpg',
      rating: 4.6,
      totalReviews: 32,
      description: 'The Mahindra XUV500 is a spacious 7-seater SUV perfect for family trips and group travel. Premium comfort with excellent off-road capabilities.',
      features: [
        'Spacious 7-seater layout',
        'Automatic transmission',
        'All-wheel drive',
        'Power windows',
        'Alloy wheels',
        'Panoramic sunroof',
        'Touchscreen infotainment',
        'Cruise control'
      ],
      images: [
        '/XUV500.jpg',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1609708536965-59d5e2f58f68?auto=format&fit=crop&w=600&q=60'
      ]
    }
  };

  // Get car from state (passed from CarCard) or from database, then merge with database details
  const getCarDetails = () => {
    let selectedCar = location.state?.car || CAR_DATABASE[carId];
    
    // If car was passed from CarCard, merge it with database details
    if (location.state?.car && CAR_DATABASE[carId]) {
      selectedCar = { ...CAR_DATABASE[carId], ...location.state.car };
    }
    
    // If still no car, use database or default
    if (!selectedCar) {
      selectedCar = CAR_DATABASE[carId] || {
        carId: carId || 1,
        brand: 'Maruti',
        model: 'Swift',
        type: 'Hatchback',
        seats: 5,
        fuel: 'Petrol',
        transmission: 'Manual',
        mileage: '20 kmpl',
        basePricePerDay: 1500,
        img: '/Swift.jpg',
        rating: 4.5,
        totalReviews: 24,
        description: 'The Maruti Swift is a reliable and fuel-efficient hatchback perfect for city driving and weekend getaways. With its compact size, excellent mileage, and user-friendly features, it\'s ideal for budget-conscious travelers.',
        features: [
          'Compact and easy to maneuver',
          'Excellent fuel efficiency (20 kmpl)',
          'Air conditioning',
          'Power steering',
          'Power windows',
          'USB connectivity',
          'ABS (Anti-lock braking system)',
          'Free 24/7 roadside assistance'
        ],
        images: [
          '/Swift.jpg',
          'https://images.unsplash.com/photo-1609708536965-59d5e2f58f68?auto=format&fit=crop&w=600&q=60',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=60'
        ],
        availableDates: [
          { date: '2025-12-05', available: true },
          { date: '2025-12-06', available: true },
          { date: '2025-12-07', available: false },
          { date: '2025-12-08', available: true },
          { date: '2025-12-09', available: true },
          { date: '2025-12-10', available: true },
          { date: '2025-12-11', available: false },
          { date: '2025-12-12', available: true }
        ]
      };
    }

    // Ensure all required properties exist
    return {
      ...selectedCar,
      features: selectedCar.features || [],
      images: selectedCar.images || [selectedCar.img, selectedCar.img, selectedCar.img],
      availableDates: selectedCar.availableDates || [
        { date: '2025-12-05', available: true },
        { date: '2025-12-06', available: true },
        { date: '2025-12-07', available: false },
        { date: '2025-12-08', available: true },
        { date: '2025-12-09', available: true },
        { date: '2025-12-10', available: true },
        { date: '2025-12-11', available: false },
        { date: '2025-12-12', available: true }
      ]
    };
  };

  const car = getCarDetails();

  // Sample reviews data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Rajesh Kumar',
      rating: 5,
      date: '2025-11-20',
      comment: 'Excellent car! Very fuel efficient and comfortable for long drives. The rental process was smooth.',
      verified: true
    },
    {
      id: 2,
      author: 'Priya Singh',
      rating: 4,
      date: '2025-11-15',
      comment: 'Good car overall. The AC works perfectly and the car is well maintained. Recommended!',
      verified: true
    },
    {
      id: 3,
      author: 'Amit Patel',
      rating: 5,
      date: '2025-11-10',
      comment: 'Amazing experience! The car was clean and in perfect condition. Customer service was helpful.',
      verified: true
    },
    {
      id: 4,
      author: 'Neha Sharma',
      rating: 4,
      date: '2025-11-05',
      comment: 'Very good value for money. No issues during the 5-day rental period.',
      verified: false
    }
  ]);

  const handleAddReview = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!newReview.comment.trim()) {
      alert('Please enter a comment');
      return;
    }
    const review = {
      id: reviews.length + 1,
      author: user.fullName || user.email,
      rating: newReview.rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      verified: true
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const handleBooking = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/payment', { state: { car, bookingType: 'new' } });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className="text-warning">
        {i < Math.floor(rating) ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="container py-5">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
          <li className="breadcrumb-item"><a href="/cars" className="text-decoration-none">Cars</a></li>
          <li className="breadcrumb-item active">{car.brand} {car.model}</li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* Left Column - Images and Info */}
        <div className="col-lg-7">
          {/* Main Image */}
          <div className="mb-4">
            <img
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              className="img-fluid rounded shadow"
              style={{ height: '400px', objectFit: 'cover', width: '100%' }}
            />
          </div>

          {/* Thumbnail Images */}
          <div className="row g-2 mb-4">
            {car.images.map((image, index) => (
              <div key={index} className="col-4">
                <img
                  src={image}
                  alt={`${car.brand} ${car.model} - ${index + 1}`}
                  className="img-fluid rounded"
                  style={{ height: '100px', objectFit: 'cover', width: '100%', cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">About this car</h5>
            </div>
            <div className="card-body">
              <p className="mb-3">{car.description}</p>
              <h6 className="fw-bold mb-2">Key Features:</h6>
              <ul className="list-unstyled">
                {car.features.map((feature, index) => (
                  <li key={index} className="mb-2">
                    <span className="badge bg-light text-dark me-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Available Dates */}
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Available Dates</h5>
            </div>
            <div className="card-body">
              <div className="row g-2">
                {car.availableDates.map((dateObj, index) => (
                  <div key={index} className="col-6 col-md-4">
                    <div className={`p-2 text-center rounded ${dateObj.available ? 'bg-light' : 'bg-danger bg-opacity-10'}`}>
                      <small className="d-block">{new Date(dateObj.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</small>
                      <strong className={dateObj.available ? 'text-success' : 'text-danger'}>
                        {dateObj.available ? '✓ Available' : '✗ Booked'}
                      </strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Info & Reviews */}
        <div className="col-lg-5">
          {/* Car Header */}
          <div className="card mb-4 shadow-lg">
            <div className="card-body">
              <h3 className="card-title mb-2">{car.brand} {car.model}</h3>
              <p className="text-muted mb-3">{car.type} • {car.seats} seats • {car.fuel}</p>

              {/* Rating */}
              <div className="d-flex align-items-center mb-3">
                <span className="me-2">{renderStars(car.rating)}</span>
                <strong>{car.rating}</strong>
                <span className="text-muted ms-2">({car.totalReviews} reviews)</span>
              </div>

              <hr />

              {/* Specs Grid */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <small className="text-muted">Transmission</small>
                  <p className="mb-0"><strong>{car.transmission}</strong></p>
                </div>
                <div className="col-6">
                  <small className="text-muted">Mileage</small>
                  <p className="mb-0"><strong>{car.mileage}</strong></p>
                </div>
              </div>

              <hr />

              {/* Price & Booking */}
              <div className="mb-3">
                <h4 className="text-primary mb-2">₹{car.basePricePerDay} <small className="text-muted fs-6">/day</small></h4>
                <small className="text-muted d-block mb-3">Includes insurance and roadside assistance</small>
              </div>

              {/* Buttons */}
              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleBooking}
                >
                  🚗 Book Now
                </button>
                {user && (
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    ⭐ Add Review
                  </button>
                )}
                {!user && (
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/login')}
                  >
                    Login to Add Review
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Add Review Form */}
          {showReviewForm && user && (
            <div className="card mb-4 border-primary">
              <div className="card-header bg-light border-primary">
                <h5 className="mb-0">Write Your Review</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Your Rating</label>
                  <div className="d-flex gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        className={`btn btn-sm ${newReview.rating >= star ? 'btn-warning' : 'btn-outline-warning'}`}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <small className="text-muted">{newReview.rating} star{newReview.rating !== 1 ? 's' : ''}</small>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Your Comment</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Share your experience with this car..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-primary flex-grow-1"
                    onClick={handleAddReview}
                  >
                    Submit Review
                  </button>
                  <button 
                    className="btn btn-outline-secondary flex-grow-1"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="card mt-5">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Customer Reviews ({reviews.length})</h5>
        </div>
        <div className="card-body">
          {reviews.length === 0 ? (
            <p className="text-muted mb-0">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="row g-3">
              {reviews.map(review => (
                <div key={review.id} className="col-md-6">
                  <div className="border rounded p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <strong>{review.author}</strong>
                        {review.verified && <span className="badge bg-success ms-2 small">Verified</span>}
                      </div>
                      <small className="text-muted">{review.date}</small>
                    </div>
                    <div className="mb-2">{renderStars(review.rating)}</div>
                    <p className="mb-0 text-muted">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
