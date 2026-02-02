import { useState, useEffect } from 'react'

import { getVendorBookings } from '../../services/api'
import { FaMoneyBillWave, FaChartBar, FaChartLine, FaStar } from 'react-icons/fa'
export default function VendorRevenue() {
  const [revenueData, setRevenueData] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  useEffect(() => {
    fetchRevenueData()
  }, [])

  const fetchRevenueData = async () => {
    try {
      setLoading(true)
      const response = await getVendorBookings()
      const bookingsList = response.data || []
      setBookings(bookingsList)

      // Process monthly data found in bookings
      // Create a map for all months
      const monthMap = {}
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      months.forEach(m => monthMap[m] = { month: m, revenue: 0, bookings: 0, totalRating: 0, ratingCount: 0 })

      bookingsList.forEach(booking => {
        if (!booking.pickupDate) return
        const date = new Date(booking.pickupDate)
        const monthName = date.toLocaleString('default', { month: 'long' })

        if (monthMap[monthName]) {
          monthMap[monthName].revenue += (booking.totalAmount || 0)
          monthMap[monthName].bookings += 1
          if (booking.rating) {
            monthMap[monthName].totalRating += booking.rating
            monthMap[monthName].ratingCount += 1
          }
        }
      })

      // Convert back to array
      const processedData = Object.values(monthMap).map(m => ({
        ...m,
        avgRating: m.ratingCount > 0 ? (m.totalRating / m.ratingCount).toFixed(1) : 0
      }))

      // Filter to show only recent months or all? Let's show all for now or current window
      // For this demo, let's just use the processed data, maybe slice last 6 months if needed
      // But since data might be sparse, let's keep all non-zero or just the full list?
      // existing UI expects 6 months. Let's just pass the full list or relevant months.
      const relevantData = processedData.filter(d => d.bookings > 0 || months.includes(d.month)) // simplified
      setRevenueData(processedData)

    } catch (err) {
      console.error('Error fetching revenue data:', err)
    } finally {
      setLoading(false)
    }
  }

  const totalRevenue = revenueData.reduce((sum, m) => sum + m.revenue, 0)
  const totalBookings = revenueData.reduce((sum, m) => sum + m.bookings, 0)
  const avgRevenue = revenueData.length > 0 ? (totalRevenue / 12).toFixed(0) : 0 // Monthly avg over year

  const selectedMonthData = revenueData.find(m => m.month === selectedMonth) || { month: selectedMonth, revenue: 0, bookings: 0, avgRating: 0 }

  return (
    <div>
      <h4 className="mb-4">Revenue Management</h4>

      {/* Overall Stats */}
      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon primary"><FaMoneyBillWave /></div>
            <div className="stat-content">
              <h6 className="stat-label">Total Revenue</h6>
              <h3 className="stat-value">₹{(totalRevenue / 100000).toFixed(2)}L</h3>
              <small className="stat-change text-success">+12% from last year</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon info"><FaChartBar /></div>
            <div className="stat-content">
              <h6 className="stat-label">Avg Monthly</h6>
              <h3 className="stat-value">₹{(avgRevenue / 1000).toFixed(0)}K</h3>
              <small className="stat-change">This period</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon success"><FaChartLine /></div>
            <div className="stat-content">
              <h6 className="stat-label">Total Bookings</h6>
              <h3 className="stat-value">{totalBookings}</h3>
              <small className="stat-change">6 months</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="vendor-stat-card">
            <div className="stat-icon accent"><FaStar /></div>
            <div className="stat-content">
              <h6 className="stat-label">Avg Rating</h6>
              <h3 className="stat-value">4.7/5</h3>
              <small className="stat-change text-success">+0.2 improvement</small>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="vendor-card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Revenue Trend (Last 6 Months)</h5>
        </div>
        <div className="card-body">
          <div className="revenue-chart-container">
            <div className="chart-bars">
              {revenueData.map((data, idx) => (
                <div key={idx} className="chart-bar-wrapper">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${(data.revenue / 45000) * 250}px`,
                      opacity: selectedMonth === data.month ? 1 : 0.6
                    }}
                    onClick={() => setSelectedMonth(data.month)}
                  >
                    <div className="bar-value">₹{(data.revenue / 1000).toFixed(0)}K</div>
                  </div>
                  <div className="chart-month">{data.month.slice(0, 3)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Month Details */}
      {selectedMonthData && (
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="vendor-card">
              <div className="card-header">
                <h6 className="mb-0">{selectedMonth} Details</h6>
              </div>
              <div className="card-body">
                <div className="detail-row-large mb-3">
                  <span>Total Revenue</span>
                  <strong className="text-success">₹{selectedMonthData.revenue.toLocaleString()}</strong>
                </div>
                <div className="detail-row-large mb-3">
                  <span>Total Bookings</span>
                  <strong>{selectedMonthData.bookings}</strong>
                </div>
                <div className="detail-row-large mb-3">
                  <span>Average Per Booking</span>
                  <strong>₹{(selectedMonthData.revenue / selectedMonthData.bookings).toLocaleString()}</strong>
                </div>
                <div className="detail-row-large">
                  <span>Average Rating</span>
                  <strong><FaStar className="text-warning me-1" /> {selectedMonthData.avgRating}/5</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="vendor-card">
              <div className="card-header">
                <h6 className="mb-0">Performance Breakdown</h6>
              </div>
              <div className="card-body">
                <div className="performance-metric">
                  <div className="metric-label">
                    <span>Revenue Growth</span>
                    <strong>+8.5%</strong>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-fill success" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <hr />
                <div className="performance-metric">
                  <div className="metric-label">
                    <span>Booking Fulfillment</span>
                    <strong>95%</strong>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-fill primary" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <hr />
                <div className="performance-metric">
                  <div className="metric-label">
                    <span>Customer Satisfaction</span>
                    <strong>94%</strong>
                  </div>
                  <div className="metric-bar">
                    <div className="metric-fill accent" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="vendor-card">
        <div className="card-header">
          <h5 className="mb-0">Recent Transactions</h5>
          <select className="form-select form-select-sm" style={{ maxWidth: '150px' }}>
            <option>All Months</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
        </div>
        <div className="table-responsive">
          <table className="vendor-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Booking ID</th>
                <th>Customer</th>
                <th>Car</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 10).map(txn => (
                <tr key={txn.id}>
                  <td><strong>#{txn.id}</strong></td>
                  <td>#{txn.id}</td>
                  <td>{txn.userName || 'Unknown'}</td>
                  <td>{txn.vehicleMake} {txn.vehicleModel}</td>
                  <td><strong>₹{txn.totalAmount?.toLocaleString()}</strong></td>
                  <td>{new Date(txn.bookingDate || txn.pickupDate || Date.now()).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${txn.status === 'COMPLETED' ? 'bg-success' :
                      txn.status === 'PENDING' ? 'bg-warning text-dark' :
                        txn.status === 'ACTIVE' ? 'bg-primary' :
                          txn.status === 'CONFIRMED' ? 'bg-info' :
                            'bg-danger'
                      }`}>
                      {txn.status}
                    </span>
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
