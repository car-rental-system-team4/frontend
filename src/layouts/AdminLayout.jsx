import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <nav 
        className="bg-dark text-white p-3"
        style={{
          width: sidebarOpen ? '250px' : '0',
          overflow: 'hidden',
          transition: 'width 0.3s ease',
          position: 'relative',
          minHeight: '100vh'
        }}
      >
        <div className="mb-4">
          <h5 className="fw-bold mb-0">🔧 Admin Panel</h5>
          <small className="text-muted">RentYourCar</small>
        </div>

        <hr />

        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <Link to="/admin/dashboard" className="nav-link text-white text-decoration-none">
              📊 Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/cars" className="nav-link text-white text-decoration-none">
              🚗 Manage Cars
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/bookings" className="nav-link text-white text-decoration-none">
              📋 Bookings
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/users" className="nav-link text-white text-decoration-none">
              👥 Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/reports" className="nav-link text-white text-decoration-none">
              📈 Reports
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin/settings" className="nav-link text-white text-decoration-none">
              ⚙️ Settings
            </Link>
          </li>
        </ul>

        <hr />

        <div className="position-absolute bottom-0 start-0 p-3" style={{ width: '100%' }}>
          <button 
            className="btn btn-danger btn-sm w-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Header */}
        <header className="bg-light border-bottom p-3 d-flex justify-content-between align-items-center">
          <button 
            className="btn btn-outline-secondary"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰ Menu
          </button>

          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">👤 {user?.fullName || user?.email}</span>
            <small className="badge bg-success">Admin</small>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
