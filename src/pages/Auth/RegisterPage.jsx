import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RegisterPage() {
  const [userType, setUserType] = useState('customer') // 'customer' or 'vendor'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessAddress: ''
  })
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields')
      return
    }

    if (userType === 'vendor' && (!formData.businessName || !formData.businessAddress)) {
      setError('Please fill in all business information')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    // Simulate registration
    try {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        registeredAt: new Date().toISOString(),
        ...(userType === 'vendor' && {
          businessName: formData.businessName,
          businessAddress: formData.businessAddress
        })
      }
      register(userData, userType)
      
      // Redirect based on user type
      if (userType === 'vendor') {
        navigate('/vendor/dashboard')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
      <div className="card1 shadow-lg" style={{ width: '100%', maxWidth: '550px', margin: '20px' }}>
        <div className="card-body p-5">
          <h2 className="text-center mb-2 fw-bold">RentYourCar</h2>
          <h4 className="text-center mb-4">Create Account</h4>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* User Type Selection */}
          <div className="user-type-selector mb-4">
            <label className="form-label">I want to register as:</label>
            <div className="btn-group w-100" role="group">
              <input 
                type="radio" 
                className="btn-check" 
                name="userType" 
                id="customer" 
                value="customer"
                checked={userType === 'customer'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <label className="btn btn-outline-primary" htmlFor="customer">
                👤 Customer
              </label>

              <input 
                type="radio" 
                className="btn-check" 
                name="userType" 
                id="vendor" 
                value="vendor"
                checked={userType === 'vendor'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <label className="btn btn-outline-primary" htmlFor="vendor">
                🚗 Vendor
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Common Fields */}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Vendor-specific Fields */}
            {userType === 'vendor' && (
              <>
                <div className="alert alert-info mb-3">
                  <small>
                    <strong>Vendor Registration:</strong> Complete your business details to start renting cars.
                  </small>
                </div>

                <div className="mb-3">
                  <label htmlFor="businessName" className="form-label">Business Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="businessName"
                    name="businessName"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="businessAddress" className="form-label">Business Address</label>
                  <textarea
                    className="form-control"
                    id="businessAddress"
                    name="businessAddress"
                    placeholder="Enter your business address"
                    rows="2"
                    value={formData.businessAddress}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </>
            )}

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <small className="text-muted">Minimum 6 characters</small>
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              Register
            </button>
          </form>

          <hr />

          <div className="text-center">
            <p className="text-muted small mb-2">Already have an account?</p>
            <Link to="/login" className="btn btn-outline-primary w-100">
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
