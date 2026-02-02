import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getVendorVehicles, getVendorBookings, getUserComplaints } from '../../services/api'
import { FaCar, FaCheckCircle, FaMoneyBillWave, FaClock, FaClipboardList } from 'react-icons/fa'

export default function VendorDashboard() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [bookings, setBookings] = useState([])
  const [recentBookings, setRecentBookings] = useState([])
  const [recentComplaints, setRecentComplaints] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [vehiclesRes, bookingsRes, complaintsRes] = await Promise.all([
        getVendorVehicles(),
        getVendorBookings(),
        getUserComplaints()
      ])

      setVehicles(vehiclesRes.data || [])
      const bookingsData = bookingsRes.data || []
      setBookings(bookingsData)
      setRecentBookings(bookingsData.slice(0, 5))

      const complaintsData = complaintsRes.data || []
      setRecentComplaints(complaintsData.slice(0, 3)) // Top 3 recent complaints

    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      if (err.response?.status === 403) {
        console.error('Access denied. Please make sure you are logged in as a vendor.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Calculate stats from vehicles and bookings
  const stats = {
    totalCars: vehicles.length,
    availableCars: vehicles.filter(v => v.status === 'AVAILABLE').length,
    rentedCars: vehicles.filter(v => v.status === 'BOOKED').length,
    activeBookings: bookings.filter(b => b.status === 'ACTIVE').length,
    totalEarnings: bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
    // rating placeholder logic for now as it might be complex to average
    averageRating: 4.8
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-primary'
      case 'PENDING': return 'bg-warning text-dark'
      case 'CONFIRMED': return 'bg-info'
      case 'COMPLETED': return 'bg-success'
      case 'CANCELLED': return 'bg-danger'
      default: return 'bg-secondary'
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon primary"><FaCar /></div>
            <div className="stat-content">
              <h6 className="stat-label">Total Cars</h6>
              <h3 className="stat-value">{stats.totalCars}</h3>
              <small className="stat-change text-info">{stats.availableCars} available</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon success"><FaCheckCircle /></div>
            <div className="stat-content">
              <h6 className="stat-label">Available</h6>
              <h3 className="stat-value">{stats.availableCars}</h3>
              <small className="stat-change text-success">Ready to rent</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon info"><FaCar /></div>
            <div className="stat-content">
              <h6 className="stat-label">Rented</h6>
              <h3 className="stat-value">{stats.rentedCars}</h3>
              <small className="stat-change text-info">Currently rented</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon accent"><FaMoneyBillWave /></div>
            <div className="stat-content">
              <h6 className="stat-label">Total Value</h6>
              <h3 className="stat-value">₹{(stats.totalEarnings / 1000).toFixed(0)}K</h3>
              <small className="stat-change text-info">Daily rate total</small>
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
                  <rect x="40" y="150" width="30" height="30" fill="var(--primary-color)" rx="4" />
                  <rect x="80" y="120" width="30" height="60" fill="var(--primary-color)" rx="4" />
                  <rect x="120" y="90" width="30" height="90" fill="var(--primary-color)" rx="4" />
                  <rect x="160" y="60" width="30" height="120" fill="var(--primary-color)" rx="4" />
                  <rect x="200" y="40" width="30" height="140" fill="var(--accent-color)" rx="4" />
                  <rect x="240" y="45" width="30" height="135" fill="var(--accent-color)" rx="4" />
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

      {/* Recent Activity Grid */}
      <div className="row g-4">
        {/* Recent Bookings - Left Column */}
        <div className="col-lg-8">
          <div className="vendor-card h-100">
            <div className="card-header">
              <h5 className="mb-0">Recent Bookings</h5>
              <Link to="/vendor/bookings" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="table-responsive">
              <table className="vendor-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Car</th>
                    <th>Dates</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.length === 0 ? (
                    <tr><td colSpan="5" className="text-center text-muted py-3">No bookings found</td></tr>
                  ) : (
                    recentBookings.map(booking => (
                      <tr key={booking.id}>
                        <td><strong>#{booking.id}</strong></td>
                        <td>{booking.vehicleMake} {booking.vehicleModel}</td>
                        <td>
                          {new Date(booking.pickupDate).toLocaleDateString()}
                        </td>
                        <td>
                          <span className={`badge ${booking.status === 'COMPLETED' ? 'bg-success' :
                            booking.status === 'PENDING' ? 'bg-warning text-dark' :
                              booking.status === 'ACTIVE' ? 'bg-primary' :
                                booking.status === 'CONFIRMED' ? 'bg-info' : 'bg-secondary'
                            }`}>{booking.status}</span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Complaints / Notifications - Right Column */}
        <div className="col-lg-4">
          <div className="vendor-card h-100">
            <div className="card-header">
              <h5 className="mb-0">Recent Complaints</h5>
              <Link to="/vendor/complaints" className="btn btn-sm btn-outline-warning">
                View All
              </Link>
            </div>
            <div className="card-body">
              {recentComplaints.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <FaClipboardList className="display-4 mb-2 opacity-25" />
                  <p>No active complaints</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {recentComplaints.map(complaint => (
                    <div key={complaint.id} className="p-3 border rounded bg-light">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <strong className="text-truncate" style={{ maxWidth: '120px' }}>{complaint.subject}</strong>
                        <span className={`badge ${complaint.status === 'RESOLVED' ? 'bg-success' :
                          complaint.status === 'PENDING' ? 'bg-warning text-dark' : 'bg-secondary'
                          }`}>{complaint.status}</span>
                      </div>
                      <p className="small text-muted mb-0 text-truncate">{complaint.description}</p>
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Details Modal */}
      {
        selectedBooking && (
          <div className="vendor-modal-overlay" onClick={() => setSelectedBooking(null)}>
            <div className="vendor-modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h5>Booking Details - {selectedBooking.id}</h5>
                <button
                  className="btn-close"
                  onClick={() => setSelectedBooking(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="detail-section">
                  <h6 className="section-title">Customer Information</h6>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Name:</span>
                      <span className="value">{selectedBooking.userName || 'Unknown'}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h6 className="section-title">Vehicle Information</h6>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Car:</span>
                      <span className="value">{selectedBooking.vehicleMake} {selectedBooking.vehicleModel}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h6 className="section-title">Booking Details</h6>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Pickup Date:</span>
                      <span className="value">{new Date(selectedBooking.pickupDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Return Date:</span>
                      <span className="value">{new Date(selectedBooking.returnDate).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Duration:</span>
                      <span className="value">
                        {Math.ceil((new Date(selectedBooking.returnDate) - new Date(selectedBooking.pickupDate)) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Status:</span>
                      <span className={`badge ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h6 className="section-title">Payment Information</h6>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="label">Total Amount:</span>
                      <strong className="text-success">₹{selectedBooking.totalAmount?.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedBooking(null)}
                >
                  Close
                </button>
                <Link
                  to="/vendor/bookings"
                  className="btn btn-primary"
                  onClick={() => setSelectedBooking(null)}
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}
