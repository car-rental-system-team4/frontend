export default function AdminReportsPage() {
  const topCars = [
    { name: 'Maruti Swift', rentals: 45, revenue: 120000 },
    { name: 'Mahindra XUV700', rentals: 38, revenue: 250000 },
    { name: 'Honda City', rentals: 30, revenue: 150000 },
    { name: 'Tata Nexon', rentals: 25, revenue: 95000 },
  ];

  const recentActivity = [
    { id: 1, user: 'Rajesh Kumar', action: 'Booked a car', time: '2 hours ago' },
    { id: 2, user: 'Admin User', action: 'Updated car price', time: '4 hours ago' },
    { id: 3, user: 'Priya Singh', action: 'Registered as Vendor', time: '5 hours ago' },
    { id: 4, user: 'Amit Patel', action: 'Cancelled booking', time: '1 day ago' },
    { id: 5, user: 'System', action: 'Generated monthly invoice', time: '1 day ago' },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold mb-0">📈 Reports & Analytics</h1>
        <div>
          <button className="btn btn-outline-secondary me-2">Month</button>
          <button className="btn btn-primary">Year</button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-8">
          {/* Revenue Summary */}
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Revenue Overview</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-end mb-4 gap-3">
                <h2 className="mb-0 fw-bold text-success">₹12,45,000</h2>
                <span className="text-muted">Total Revenue (Year to Date)</span>
              </div>

              {/* Mock Bar Chart Representation */}
              <div className="d-flex align-items-end justify-content-between" style={{ height: '200px' }}>
                {[40, 60, 45, 70, 50, 80, 65, 85, 90, 75, 60, 95].map((height, i) => (
                  <div key={i} className="d-flex flex-column align-items-center flex-grow-1">
                    <div
                      className="bg-primary bg-opacity-75 rounded-top w-50"
                      style={{ height: `${height}%`, minWidth: '20px' }}
                    ></div>
                    <small className="text-muted mt-2">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {/* Activity Log */}
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0 fw-bold">Recent Activity</h5>
            </div>
            <div className="card-body p-0">
              <ul className="list-group list-group-flush">
                {recentActivity.map(item => (
                  <li key={item.id} className="list-group-item px-4 py-3">
                    <div className="d-flex justify-content-between">
                      <strong>{item.user}</strong>
                      <small className="text-muted">{item.time}</small>
                    </div>
                    <small className="text-secondary">{item.action}</small>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer bg-white text-center border-0 p-3">
              <button className="btn btn-sm btn-link text-decoration-none">View All Activity</button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Cars */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">Top Performing Cars</h5>
        </div>
        <div className="card-body">
          <div className="row g-4">
            {topCars.map((car, index) => (
              <div key={index} className="col-md-6">
                <div className="d-flex justify-content-between mb-1">
                  <span>{car.name}</span>
                  <small className="text-muted">{car.rentals} rentals</small>
                </div>
                <div className="progress mb-2" style={{ height: '8px' }}>
                  <div
                    className="progress-bar"
                    style={{ width: `${(car.rentals / 50) * 100}%`, backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#0dcaf0'][index] }}
                  ></div>
                </div>
                <small className="text-success fw-bold">₹{car.revenue.toLocaleString()} Revenue</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
