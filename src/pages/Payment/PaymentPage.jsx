import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const car = location.state?.car || null;
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!car || !user) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          <h5>Invalid booking session</h5>
          <p>Please select a car and log in before proceeding to payment.</p>
          <a href="/cars" className="btn btn-primary">Back to Cars</a>
        </div>
      </div>
    );
  }

  const calculateDays = () => {
    if (!pickupDate || !dropoffDate) return 0;
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);
    return Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
  };

  const days = calculateDays();
  const totalCost = days > 0 ? days * car.basePricePerDay : 0;

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2').slice(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardDetails(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validatePayment = () => {
    setError('');

    if (!pickupDate || !dropoffDate) {
      setError('Please select pick-up and drop-off dates');
      return false;
    }

    if (days <= 0) {
      setError('Drop-off date must be after pick-up date');
      return false;
    }

    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, '').length !== 16) {
        setError('Please enter a valid 16-digit card number');
        return false;
      }
      if (!cardDetails.cardHolder.trim()) {
        setError('Please enter cardholder name');
        return false;
      }
      if (!cardDetails.expiryDate || cardDetails.expiryDate.length !== 5) {
        setError('Please enter valid expiry date (MM/YY)');
        return false;
      }
      if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
        setError('Please enter valid 3-digit CVV');
        return false;
      }
    }

    return true;
  };

  const handlePayment = async () => {
    if (!validatePayment()) return;

    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      const booking = {
        bookingId: `BK${Date.now()}`,
        carBrand: car.brand,
        carModel: car.model,
        carImage: car.img,
        pickupLocation: 'Selected Location',
        pickupDate: pickupDate,
        pickupTime: '10:00 AM',
        dropoffLocation: 'Selected Location',
        dropoffDate: dropoffDate,
        dropoffTime: '6:00 PM',
        totalDays: days,
        costPerDay: car.basePricePerDay,
        totalCost: totalCost,
        status: 'Confirmed',
        bookingDate: new Date().toISOString().split('T')[0],
        paymentMethod: paymentMethod
      };

      // Save booking to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('bookings', JSON.stringify(existingBookings));

      setLoading(false);
      alert('Payment successful! Your booking has been confirmed.');
      navigate('/bookings');
    }, 2000);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold">Complete Your Booking</h1>

      <div className="row g-4">
        {/* Left Column - Booking Details */}
        <div className="col-lg-7">
          {/* Car Summary with Image */}
          <div className="card mb-4 shadow-lg">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">🚗 Booking Summary</h5>
            </div>
            <div className="card-body">
              {/* Large Car Image */}
              <div className="mb-3">
                <img
                  src={car.img || 'https://via.placeholder.com/500x300?text=Car+Image'}
                  alt={`${car.brand} ${car.model}`}
                  className="img-fluid rounded shadow-sm"
                  style={{ height: '250px', objectFit: 'cover', width: '100%' }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500x300?text=Car+Image';
                  }}
                />
              </div>

              {/* Car Details */}
              <div className="row g-3">
                <div className="col-md-8">
                  <h4 className="mb-2">{car.brand} {car.model}</h4>
                  <p className="text-muted mb-2">
                    {car.type} • {car.seats} seats • {car.fuel}
                  </p>
                  <p className="mb-0">
                    <strong className="text-primary fs-5">₹{car.basePricePerDay}</strong> <span className="text-muted">/day</span>
                  </p>
                </div>
                <div className="col-md-4 text-end">
                  <div className="badge bg-info text-dark p-2">
                    <small>Auto-assigned<br />on booking</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dates Selection */}
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">Rental Dates</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Pick-up Date</label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Drop-off Date</label>
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    min={pickupDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              {days > 0 && (
                <div className="alert alert-info mt-3 mb-0">
                  <strong>Total Duration:</strong> {days} day{days !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Payment Method</h5>
            </div>
            <div className="card-body">
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="card"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="card">
                  💳 Credit/Debit Card
                </label>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="upi"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="upi">
                  📱 UPI
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="wallet"
                  value="wallet"
                  checked={paymentMethod === 'wallet'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label" htmlFor="wallet">
                  💰 Digital Wallet
                </label>
              </div>
            </div>
          </div>

          {/* Card Details */}
          {paymentMethod === 'card' && (
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">Card Details</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Card Number</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="1234 5678 9012 3456"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    maxLength="19"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Cardholder Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="John Doe"
                    name="cardHolder"
                    value={cardDetails.cardHolder}
                    onChange={handleCardInputChange}
                  />
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Expiry Date</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="MM/YY"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardInputChange}
                      maxLength="5"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">CVV</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="123"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardInputChange}
                      maxLength="3"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
        </div>

        {/* Right Column - Price Summary */}
        <div className="col-lg-5">
          <div className="card sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Price Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Car: {car.brand} {car.model}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Daily Rate:</span>
                <strong>₹{car.basePricePerDay}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Duration:</span>
                <strong>{days} day{days !== 1 ? 's' : ''}</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <strong>₹{(car.basePricePerDay * days).toLocaleString()}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Insurance:</span>
                <strong>₹0 (Included)</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Taxes & Fees:</span>
                <strong>₹{Math.round(totalCost * 0.1).toLocaleString()}</strong>
              </div>
              <hr className="my-3" />
              <div className="d-flex justify-content-between mb-4">
                <h5 className="mb-0">Total Amount:</h5>
                <h4 className="text-primary mb-0">₹{Math.round(totalCost * 1.1).toLocaleString()}</h4>
              </div>

              {/* Terms */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                  defaultChecked
                />
                <label className="form-check-label small" htmlFor="terms">
                  I agree to the terms and conditions
                </label>
              </div>

              {/* Pay Button */}
              <button
                className="btn btn-primary btn-lg w-100"
                onClick={handlePayment}
                disabled={loading || days <= 0}
              >
                {loading ? '⏳ Processing...' : `💳 Pay ₹${Math.round(totalCost * 1.1).toLocaleString()}`}
              </button>

              {/* Info */}
              <div className="alert alert-info mt-3 mb-0 small">
                <strong>Test Card Number:</strong> 4532 1488 0343 6467<br />
                <strong>Any Expiry & CVV:</strong> Valid dates and 3-digit CVV
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
