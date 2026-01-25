import { useState } from 'react'
import { useAuth } from '../../context'

export default function VendorDashboard() {
  const { user } = useAuth()
  
  const [stats] = useState({
    totalCars: 5,
    activeBookings: 8,
    completedBookings: 42,
    totalEarnings: 185500,
    monthlyEarnings: 35000,
    averageRating: 4.8
  })

  const [recentBookings] = useState([
    {
      id: 'BK001',
      customer: 'Rajesh Kumar',
      carName: 'Maruti Swift',
      pickupDate: '2025-12-08',
      returnDate: '2025-12-10',
      status: 'Active',
      amount: 3500
    },
    {
      id: 'BK002',
      customer: 'Priya Singh',
      carName: 'Honda Accord',
      pickupDate: '2025-12-09',
      returnDate: '2025-12-11',
      status: 'Pending',
      amount: 5000
    },
    {
      id: 'BK003',
      customer: 'Amit Patel',
      carName: 'Mahindra XUV500',
      pickupDate: '2025-12-06',
      returnDate: '2025-12-08',
      status: 'Completed',
      amount: 7500
    },
    {
      id: 'BK004',
      customer: 'Neha Sharma',
      carName: 'Tata Nexon',
      pickupDate: '2025-12-07',
      returnDate: '2025-12-09',
      status: 'Completed',
      amount: 4500
    }
  ])

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active':
        return <span className="badge bg-primary">Active</span>
      case 'Pending':
        return <span className="badge bg-warning text-dark">Pending</span>
      case 'Completed':
        return <span className="badge bg-success">Completed</span>
      default:
        return <span className="badge bg-secondary">{status}</span>
    }
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon primary">🚗</div>
            <div className="stat-content">
              <h6 className="stat-label">Active Cars</h6>
              <h3 className="stat-value">{stats.totalCars}</h3>
              <small className="stat-change text-success">+2 this month</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon info">📅</div>
            <div className="stat-content">
              <h6 className="stat-label">Active Bookings</h6>
              <h3 className="stat-value">{stats.activeBookings}</h3>
              <small className="stat-change text-success">+3 pending</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon success">✓</div>
            <div className="stat-content">
              <h6 className="stat-label">Completed</h6>
              <h3 className="stat-value">{stats.completedBookings}</h3>
              <small className="stat-change text-info">This year</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon accent">💰</div>
            <div className="stat-content">
              <h6 className="stat-label">This Month</h6>
              <h3 className="stat-value">₹{(stats.monthlyEarnings / 1000).toFixed(0)}K</h3>
              <small className="stat-change text-success">+18% growth</small>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="vendor-card">
            <div className="card-header">
              <h5 className="mb-0">Revenue Overview</h5>
              <small className="text-muted">Last 6 months</small>
            </div>
            <div className="card-body">
              <div className="revenue-chart-placeholder">
                <svg viewBox="0 0 400 200" className="chart-svg">
                  <rect x="40" y="150" width="30" height="30" fill="var(--primary-color)" rx="4"/>
                  <rect x="80" y="120" width="30" height="60" fill="var(--primary-color)" rx="4"/>
                  <rect x="120" y="90" width="30" height="90" fill="var(--primary-color)" rx="4"/>
                  <rect x="160" y="60" width="30" height="120" fill="var(--primary-color)" rx="4"/>
                  <rect x="200" y="40" width="30" height="140" fill="var(--accent-color)" rx="4"/>
                  <rect x="240" y="45" width="30" height="135" fill="var(--accent-color)" rx="4"/>
                </svg>
              </div>
              <div className="revenue-stats">
                <div className="revenue-stat-item">
                  <span>Total Earnings</span>
                  <strong>₹{stats.totalEarnings.toLocaleString()}</strong>
                </div>
                <div className="revenue-stat-item">
                  <span>Monthly Avg.</span>
                  <strong>₹{(stats.totalEarnings / 6).toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="vendor-card">
            <div className="card-header">
              <h5 className="mb-0">Performance</h5>
            </div>
            <div className="card-body">
              <div className="performance-metric">
                <div className="metric-label">
                  <span>Rating</span>
                  <strong>{stats.averageRating} / 5.0</strong>
                </div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill" 
                    style={{ width: `${(stats.averageRating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              <hr />
              <div className="performance-stats">
                <div className="perf-stat">
                  <span className="perf-label">Response Time</span>
                  <span className="perf-value">2.5 hrs</span>
                </div>
                <div className="perf-stat">
                  <span className="perf-label">Cancellation</span>
                  <span className="perf-value">2%</span>
                </div>
                <div className="perf-stat">
                  <span className="perf-label">Total Reviews</span>
                  <span className="perf-value">34</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="vendor-card">
        <div className="card-header">
          <h5 className="mb-0">Recent Bookings</h5>
          <a href="/vendor/bookings" className="btn btn-sm btn-outline-primary">
            View All
          </a>
        </div>
        <div className="table-responsive">
          <table className="vendor-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Car</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map(booking => (
                <tr key={booking.id}>
                  <td>
                    <strong>{booking.id}</strong>
                  </td>
                  <td>{booking.customer}</td>
                  <td>{booking.carName}</td>
                  <td>
                    <small>
                      {booking.pickupDate} to {booking.returnDate}
                    </small>
                  </td>
                  <td>
                    {getStatusBadge(booking.status)}
                  </td>
                  <td>
                    <strong>₹{booking.amount.toLocaleString()}</strong>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
