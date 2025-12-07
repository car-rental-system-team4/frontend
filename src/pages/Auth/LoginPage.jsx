import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  // Demo credentials
  const ADMIN_CREDENTIALS = {
    email: 'admin@rentcar.com',
    password: 'admin123'
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    // Check if admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminData = {
        email,
        fullName: 'Admin User',
        role: 'admin',
        loginTime: new Date().toISOString()
      }
      login(adminData)
      setSuccessMessage('Admin login successful! Redirecting...')
      setTimeout(() => navigate('/admin/dashboard'), 1500)
      return
    }

    // Regular customer login
    if (email && password.length >= 6) {
      const userData = {
        email,
        fullName: email.split('@')[0],
        role: 'customer',
        loginTime: new Date().toISOString()
      }
      login(userData)
      setSuccessMessage('Login successful! Redirecting...')
      setTimeout(() => navigate('/'), 1500)
      return
    }

    setError('Invalid email or password. (Tip: Use admin@rentcar.com / admin123 for admin)')
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card1 shadow-lg" style={{ width: '100%', maxWidth: '400px', margin: '20px' }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-4 fw-bold">RentYourCar</h2>
          <h4 className="text-center mb-4">Login</h4>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Login
            </button>
          </form>

          <div className="text-center mb-3">
            <Link to="/forgot-password" className="text-decoration-none text-muted small">Forgot Password?</Link>
          </div>

          <hr />

          {/* Demo Credentials Info */}
          <div className="alert alert-info small mb-3">
            <strong>Demo Admin:</strong><br/>
            Email: admin@rentcar.com<br/>
            Password: admin123
          </div>

          <div className="text-center">
            <p className="text-muted small mb-2">Don't have an account?</p>
            <Link to="/register" className="btn btn-outline-primary w-100">
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
