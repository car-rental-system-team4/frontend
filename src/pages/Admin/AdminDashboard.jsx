import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 45,
    totalCars: 12,
    totalBookings: 128,
    totalRevenue: 450000,
    pendingBookings: 8,
    completedBookings: 95
  });

  const [recentBookings, setRecentBookings] = useState([
    {
      id: 'BK001',
      customer: 'Rajesh Kumar',
      car: 'Maruti Swift',
      bookingDate: '2025-12-01',
      status: 'Completed',
      amount: 7500
    },
    {
      id: 'BK002',
      customer: 'Priya Singh',
      car: 'Honda Accord',
      bookingDate: '2025-12-02',
      status: 'Pending',
      amount: 10500
    },
    {
      id: 'BK003',
      customer: 'Amit Patel',
      car: 'Mahindra XUV500',
      bookingDate: '2025-12-02',
      status: 'Confirmed',
      amount: 31500
    },
    {
      id: 'BK004',
      customer: 'Neha Sharma',
      car: 'Tata Nexon',
      bookingDate: '2025-12-01',
      status: 'Completed',
      amount: 12500
    }
  ]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed':
        return <span className="badge bg-success">Completed</span>;
      case 'Pending':
        return <span className="badge bg-warning text-dark">Pending</span>;
      case 'Confirmed':
        return <span className="badge bg-info">Confirmed</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  return (
    <div>
      <h1 className="mb-4 fw-bold">📊 Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted mb-2">Total Users</h6>
              <h2 className="fw-bold text-primary mb-0">{stats.totalUsers}</h2>
              <small className="text-success">↑ 5 this month</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted mb-2">Active Cars</h6>
              <h2 className="fw-bold text-info mb-0">{stats.totalCars}</h2>
              <small className="text-success">✓ All available</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted mb-2">Total Bookings</h6>
              <h2 className="fw-bold text-warning mb-0">{stats.totalBookings}</h2>
              <small className="text-info">{stats.pendingBookings} pending</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted mb-2">Total Revenue</h6>
              <h2 className="fw-bold text-success mb-0">₹{(stats.totalRevenue / 100000).toFixed(1)}L</h2>
              <small className="text-success">↑ 12% vs last month</small>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">➕ Add New Car</button>
                <button className="btn btn-outline-primary">📋 View All Bookings</button>
                <button className="btn btn-outline-primary">👥 Manage Users</button>
                <button className="btn btn-outline-primary">📊 Generate Reports</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Statistics Summary</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Completed Bookings</small>
                  <strong>95</strong>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-success" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Pending Bookings</small>
                  <strong>8</strong>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-warning" style={{ width: '8%' }}></div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-between mb-1">
                  <small>Car Utilization</small>
                  <strong>85%</strong>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-info" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">📋 Recent Bookings</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Booking Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(booking => (
                  <tr key={booking.id}>
                    <td><strong>{booking.id}</strong></td>
                    <td>{booking.customer}</td>
                    <td>{booking.car}</td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td>{getStatusBadge(booking.status)}</td>
                    <td><strong>₹{booking.amount.toLocaleString()}</strong></td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
