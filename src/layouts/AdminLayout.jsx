import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  //get user info and logout function from custom hook
  const { user, logout } = useAuth();
  //get the navigation tool to change pages
  const navigate = useNavigate();

  //switch to toggle sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  //Security Check
  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login');
  };

  return (
    <div className="d-flex" min-vh-100>
      {/* Sidebar */}
      <nav
        className="bg-light border-end"
        style={{
          width: sidebarOpen ? '250px' : '0px',
          overflow: 'hidden',
          transition: 'width 0.3s ease',
          position: 'relative',
          minHeight: '100vh',
        }}
      >
        <div style={{ width: '250px', padding: '1rem' }}>
          <div className="mb-4">
            <h5 className="fw-bold mb-0 text-dark">Admin Panel</h5>
            <small className="text-muted">RentYourCar</small>
          </div>
          <hr />

          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <Link to="/admin/dashboard" className="nav-link text-dark">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/cars" className="nav-link text-dark">
                Manage Cars
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/bookings" className="nav-link text-dark">
                Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link text-dark">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/reports" className="nav-link text-dark">
                Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/settings" className="nav-link text-dark">
                Settings
              </Link>
            </li>
          </ul>

          <hr />
          <div className="position-absolute bottom-0 start-0 p-3" style={{ width: '250px' }}>
            <button
              className="btn btn-danger btn-sm w-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* {Header Bar} */}
        <header className="bg-light border-bottom p-3 d-flex justify-content-between align-items-center">
          {/* {Toggle Sidebar Button} */}
          <button
            className="btn btn-outline-secondary"
            onClick={() => setSidebarOpen(!sidebarOpen)}//flip true to false
          >
            ☰ Menu
          </button>
          {/* {User Info display} */}
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted">{user?.fullName || user?.email}</span>
            <samll className="badge bg-success">Admin</samll>
          </div>
        </header>

        {/* {Main Content} */}
        <main className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}