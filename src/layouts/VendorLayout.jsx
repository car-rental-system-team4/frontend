import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

export default function VendorLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Redirect to login if not authenticated or not a vendor
  useEffect(() => {
    if (!user || user.role !== 'vendor') {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user || user.role !== 'vendor') {
    return null
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { label: 'Dashboard', path: '/vendor/dashboard', icon: '📊' },
    { label: 'My Cars', path: '/vendor/cars', icon: '🚗' },
    { label: 'Bookings', path: '/vendor/bookings', icon: '📅' },
    { label: 'Revenue', path: '/vendor/revenue', icon: '💰' },
    { label: 'Settings', path: '/vendor/settings', icon: '⚙️' }
  ]

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <nav className="vendor-sidebar">
        <div className="vendor-sidebar-header">
          <h5 className="mb-0">
            <span className="text-primary">Rent</span>YourCar
          </h5>
          <p className="text-muted small mb-0">Vendor Portal</p>
        </div>

        <div className="vendor-sidebar-profile">
          <div className="vendor-avatar">
            {user.fullName?.charAt(0).toUpperCase()}
          </div>
          <div className="vendor-profile-info">
            <p className="mb-0 fw-bold small">{user.fullName}</p>
            <small className="text-muted">{user.email}</small>
          </div>
        </div>

        <ul className="vendor-nav-menu">
          {navItems.map(item => (
            <li key={item.path}>
              <a 
                href={item.path}
                className={`vendor-nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="vendor-sidebar-footer">
          <a href="/profile" className="vendor-nav-link">
            <span className="nav-icon">👤</span>
            <span className="nav-label">My Profile</span>
          </a>
          <button 
            onClick={handleLogout}
            className="vendor-nav-link btn-logout"
          >
            <span className="nav-icon">🚪</span>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="vendor-main-content">
        <div className="vendor-topbar">
          <div className="vendor-topbar-left">
            <h2 className="mb-0">Welcome, {user.fullName?.split(' ')[0]}! 👋</h2>
          </div>
          <div className="vendor-topbar-right">
            <span className="vendor-status-badge">🟢 Online</span>
          </div>
        </div>

        <div className="vendor-content-area">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
