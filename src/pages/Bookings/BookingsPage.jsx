import { useState, useEffect } from 'react';
import { useAuth } from '../../context';

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('current');

  // Initialize bookings from localStorage
  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  // Sample bookings data for demo (will be populated when user books a car)
  const sampleBookings = [
    {
      bookingId: 'BK001',
      carBrand: 'Maruti',
      carModel: 'Swift',
      carImage: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=400&q=60',
      pickupLocation: 'Delhi',
      pickupDate: '2025-12-05',
      pickupTime: '10:00 AM',
      dropoffLocation: 'Delhi',
      dropoffDate: '2025-12-10',
      dropoffTime: '6:00 PM',
      totalDays: 5,
      costPerDay: 1500,
      totalCost: 7500,
      status: 'Confirmed',
      bookingDate: '2025-11-25'
    },
    {
      bookingId: 'BK002',
      carBrand: 'Honda',
      carModel: 'Accord',
      carImage: 'https://images.unsplash.com/photo-1606611013016-969c19d24e6f?auto=format&fit=crop&w=400&q=60',
      pickupLocation: 'Mumbai',
      pickupDate: '2025-12-15',
      pickupTime: '2:00 PM',
      dropoffLocation: 'Pune',
      dropoffDate: '2025-12-18',
      dropoffTime: '4:00 PM',
      totalDays: 3,
      costPerDay: 3500,
      totalCost: 10500,
      status: 'Pending',
      bookingDate: '2025-11-24'
    },
    {
      bookingId: 'BK003',
      carBrand: 'Mahindra',
      carModel: 'XUV500',
      carImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=60',
      pickupLocation: 'Bangalore',
      pickupDate: '2025-10-05',
      pickupTime: '9:00 AM',
      dropoffLocation: 'Bangalore',
      dropoffDate: '2025-10-12',
      dropoffTime: '5:00 PM',
      totalDays: 7,
      costPerDay: 4500,
      totalCost: 31500,
      status: 'Completed',
      bookingDate: '2025-09-20'
    },
    {
      bookingId: 'BK004',
      carBrand: 'Tata',
      carModel: 'Nexon',
      carImage: 'https://images.unsplash.com/photo-1606611013016-969c19d24e6f?auto=format&fit=crop&w=400&q=60',
      pickupLocation: 'Chennai',
      pickupDate: '2025-09-10',
      pickupTime: '8:00 AM',
      dropoffLocation: 'Chennai',
      dropoffDate: '2025-09-15',
      dropoffTime: '6:00 PM',
      totalDays: 5,
      costPerDay: 2500,
      totalCost: 12500,
      status: 'Completed',
      bookingDate: '2025-08-25'
    }
  ];

  // Filter bookings based on status
  const currentBookings = bookings.length > 0 
    ? bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending')
    : sampleBookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending');

  const pastBookings = bookings.length > 0
    ? bookings.filter(b => b.status === 'Completed')
    : sampleBookings.filter(b => b.status === 'Completed');

  const displayBookings = activeTab === 'current' ? currentBookings : pastBookings;

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Confirmed':
        return <span className="badge bg-success">Confirmed</span>;
      case 'Pending':
        return <span className="badge bg-warning text-dark">Pending</span>;
      case 'Completed':
        return <span className="badge bg-secondary">Completed</span>;
      default:
        return <span className="badge bg-light text-dark">{status}</span>;
    }
  };

  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h5>Please log in to view your bookings</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold">My Bookings</h1>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4" role="tablist">
        <li className="nav-item" role="presentation">
          <button 
            className={`nav-link ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'current'}
          >
            Current Bookings ({currentBookings.length})
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button 
            className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
            type="button"
            role="tab"
            aria-selected={activeTab === 'past'}
          >
            Past Bookings ({pastBookings.length})
          </button>
        </li>
      </ul>

      {/* Bookings List */}
      {displayBookings.length === 0 ? (
        <div className="alert alert-info text-center py-5">
          <h5>No {activeTab === 'current' ? 'current' : 'past'} bookings</h5>
          <p className="mb-0">You haven't made any {activeTab === 'current' ? 'current' : 'past'} bookings yet.</p>
        </div>
      ) : (
        <div className="row g-4">
          {displayBookings.map(booking => (
            <div key={booking.bookingId} className="col-lg-6">
              <div className="card h-100 shadow-sm booking-card">
                <div className="row g-0 h-100">
                  {/* Car Image */}
                  <div className="col-md-4">
                    <img
                      src={booking.carImage}
                      alt={`${booking.carBrand} ${booking.carModel}`}
                      className="img-fluid h-100"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="col-md-8">
                    <div className="card-body">
                      {/* Header */}
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h5 className="card-title mb-0">
                            {booking.carBrand} {booking.carModel}
                          </h5>
                          <small className="text-muted">Booking ID: {booking.bookingId}</small>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <hr className="my-2" />

                      {/* Booking Details Grid */}
                      <div className="row g-2 mb-3 small">
                        <div className="col-6">
                          <strong>Pick-up:</strong>
                          <div className="text-muted">
                            {booking.pickupLocation}<br />
                            {booking.pickupDate} at {booking.pickupTime}
                          </div>
                        </div>
                        <div className="col-6">
                          <strong>Drop-off:</strong>
                          <div className="text-muted">
                            {booking.dropoffLocation}<br />
                            {booking.dropoffDate} at {booking.dropoffTime}
                          </div>
                        </div>
                      </div>

                      {/* Rental Duration */}
                      <div className="mb-3 small">
                        <strong>Duration:</strong>
                        <span className="ms-2 text-muted">{booking.totalDays} days</span>
                      </div>

                      {/* Cost Breakdown */}
                      <div className="bg-light p-2 rounded mb-3 small">
                        <div className="d-flex justify-content-between mb-1">
                          <span>₹{booking.costPerDay} × {booking.totalDays} days</span>
                          <span>₹{(booking.costPerDay * booking.totalDays).toLocaleString()}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold border-top pt-1">
                          <span>Total Cost:</span>
                          <span>₹{booking.totalCost.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Booking Date */}
                      <div className="text-muted small">
                        Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>

                      {/* Action Buttons */}
                      {booking.status === 'Confirmed' && (
                        <div className="d-flex gap-2 mt-3">
                          <button className="btn btn-sm btn-outline-primary flex-grow-1">
                            Modify
                          </button>
                          <button className="btn btn-sm btn-outline-danger flex-grow-1">
                            Cancel
                          </button>
                        </div>
                      )}
                      {booking.status === 'Pending' && (
                        <div className="alert alert-warning my-3 py-1 px-2 small mb-0">
                          ⏳ Awaiting confirmation. Please complete the payment.
                        </div>
                      )}
                      {booking.status === 'Completed' && (
                        <div className="d-flex gap-2 mt-3">
                          <button className="btn btn-sm btn-outline-secondary flex-grow-1">
                            View Receipt
                          </button>
                          <button className="btn btn-sm btn-outline-primary flex-grow-1">
                            Rate & Review
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
