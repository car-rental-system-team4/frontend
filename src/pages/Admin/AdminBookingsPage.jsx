import { useState } from 'react';

export default function AdminBookingsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [bookings, setBookings] = useState([
    { id: 'BK001', customer: 'Rajesh Kumar', car: 'Maruti Swift', startDate: '2025-12-10', endDate: '2025-12-15', amount: 7500, status: 'Completed' },
    { id: 'BK002', customer: 'Priya Singh', car: 'Honda City', startDate: '2025-12-12', endDate: '2025-12-14', amount: 5000, status: 'Pending' },
    { id: 'BK003', customer: 'Amit Patel', car: 'Mahindra XUV700', startDate: '2025-12-20', endDate: '2025-12-25', amount: 20000, status: 'Confirmed' },
    { id: 'BK004', customer: 'Neha Sharma', car: 'Tata Nexon', startDate: '2025-12-18', endDate: '2025-12-20', amount: 4000, status: 'Cancelled' },
    { id: 'BK005', customer: 'Vikram Malhotra', car: 'Maruti Swift', startDate: '2025-12-22', endDate: '2025-12-24', amount: 3000, status: 'Pending' },
  ]);

  const handleAction = (id, action) => {
    setBookings(bookings.map(booking => {
      if (booking.id === id) {
        return { ...booking, status: action === 'approve' ? 'Confirmed' : 'Cancelled' };
      }
      return booking;
    }));
  };

  const filteredBookings = activeTab === 'All'
    ? bookings
    : bookings.filter(b => b.status === activeTab);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return <span className="badge bg-success">Completed</span>;
      case 'Pending': return <span className="badge bg-warning text-dark">Pending</span>;
      case 'Confirmed': return <span className="badge bg-info">Confirmed</span>;
      case 'Cancelled': return <span className="badge bg-danger">Cancelled</span>;
      default: return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div>
      <h1 className="fw-bold mb-4">📋 Manage Bookings</h1>

      {/* Status Tabs */}
      <ul className="nav nav-tabs mb-4">
        {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(tab => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active fw-bold' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {/* Bookings Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Car Details</th>
                  <th>Dates</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(booking => (
                  <tr key={booking.id}>
                    <td><strong>{booking.id}</strong></td>
                    <td>{booking.customer}</td>
                    <td>{booking.car}</td>
                    <td>
                      <small className="d-block text-muted">From: {booking.startDate}</small>
                      <small className="d-block text-muted">To: {booking.endDate}</small>
                    </td>
                    <td><strong>₹{booking.amount}</strong></td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td>
                      {booking.status === 'Pending' ? (
                        <div className="d-flex gap-2">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleAction(booking.id, 'approve')}
                            title="Approve"
                          >
                            ✓
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleAction(booking.id, 'reject')}
                            title="Reject"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button className="btn btn-sm btn-outline-secondary">View Details</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBookings.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted mb-0">No bookings found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
