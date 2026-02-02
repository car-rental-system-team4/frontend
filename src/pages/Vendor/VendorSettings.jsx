import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context'
import { updateProfile as apiUpdateProfile, deleteProfile as apiDeleteProfile } from '../../services/api'
import { FaCheckCircle } from 'react-icons/fa'

export default function VendorSettings() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()

  const [vendorInfo, setVendorInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNo: '',
    houseNo: '',
    buildingName: '',
    streetName: '',
    area: '',
    pincode: ''
  })

  // Update vendorInfo when user data is available
  useEffect(() => {
    if (user) {
      setVendorInfo(prev => ({
        ...prev,
        fullName: user.name || user.fullName || '',
        email: user.email || '',
        phone: user.phoneNo || user.phone || '',
        licenseNo: user.licenseNo || '',
        houseNo: user.houseNo || '',
        buildingName: user.buildingName || '',
        streetName: user.streetName || '',
        area: user.area || '',
        pincode: user.pincode || ''
      }))
    }
  }, [user])



  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleVendorInfoChange = (e) => {
    const { name, value } = e.target
    setVendorInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }



  const handleSave = async () => {
    try {
      setIsLoading(true)
      // Prepare update data matching the backend API format
      const updateData = {
        name: vendorInfo.fullName,
        phoneNo: vendorInfo.phone,
        licenseNo: vendorInfo.licenseNo,
        houseNo: vendorInfo.houseNo,
        buildingName: vendorInfo.buildingName,
        streetName: vendorInfo.streetName,
        area: vendorInfo.area,
        pincode: vendorInfo.pincode
      }

      const response = await apiUpdateProfile(updateData)

      // Update local user context
      if (user) {
        const updatedUser = { ...user, ...updateData }
        updateUser(updatedUser)
      }

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert(error.response?.data?.message || 'Failed to save settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async () => {
    setPasswordError('')

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All fields are required')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New password and confirm password do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long')
      return
    }

    try {
      setIsLoading(true)
      const updateData = {
        currentPassword: passwordData.currentPassword,
        password: passwordData.newPassword
      }

      await apiUpdateProfile(updateData)
      alert('Password changed successfully!')
      setShowChangePasswordModal(false)
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setPasswordError('')
    } catch (error) {
      console.error('Failed to change password:', error)
      setPasswordError(error.response?.data?.message || 'Failed to change password. Please check your current password.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.')) {
      return
    }

    try {
      setIsLoading(true)
      await apiDeleteProfile()
      alert('Account deleted successfully')
      logout()
      navigate('/login')
    } catch (error) {
      console.error('Failed to delete account:', error)
      alert(error.response?.data?.message || 'Failed to delete account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h4 className="mb-4">Settings</h4>

      {saveSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <FaCheckCircle className="me-2" /> Settings saved successfully!
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {/* Personal Information */}
      <div className="vendor-card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Profile Information</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={vendorInfo.fullName}
                onChange={handleVendorInfoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={vendorInfo.email}
                onChange={handleVendorInfoChange}
                disabled // Email cannot be changed
              />
              <small className="text-muted">Email cannot be changed</small>
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={vendorInfo.phone}
                onChange={handleVendorInfoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">License Number</label>
              <input
                type="text"
                className="form-control"
                name="licenseNo"
                value={vendorInfo.licenseNo || ''}
                onChange={handleVendorInfoChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="vendor-card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Address Details</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">House/Flat No</label>
              <input
                type="text"
                className="form-control"
                name="houseNo"
                value={vendorInfo.houseNo}
                onChange={handleVendorInfoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Building Name</label>
              <input
                type="text"
                className="form-control"
                name="buildingName"
                value={vendorInfo.buildingName}
                onChange={handleVendorInfoChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label">Street Name</label>
              <input
                type="text"
                className="form-control"
                name="streetName"
                value={vendorInfo.streetName}
                onChange={handleVendorInfoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Area/Locality</label>
              <input
                type="text"
                className="form-control"
                name="area"
                value={vendorInfo.area}
                onChange={handleVendorInfoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                className="form-control"
                name="pincode"
                value={vendorInfo.pincode}
                onChange={handleVendorInfoChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="vendor-card danger-zone">
        <div className="card-header bg-danger-light">
          <h5 className="mb-0">Account Actions</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <h6>Change Password</h6>
              <p className="text-muted small">Update your account password to keep your account secure.</p>
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowChangePasswordModal(true)}
                disabled={isLoading}
              >
                Change Password
              </button>
            </div>
            <div className="col-md-6">
              <h6 className="text-danger">Delete Account</h6>
              <p className="text-muted small">Permanently delete your vendor account and all associated data.</p>
              <button
                className="btn btn-outline-danger"
                onClick={() => setShowDeleteModal(true)}
                disabled={isLoading}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-4 d-flex gap-2 justify-content-end">
        <button className="btn btn-secondary" onClick={() => navigate('/vendor/dashboard')}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="vendor-modal-overlay" onClick={() => {
          setShowChangePasswordModal(false)
          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
          setPasswordError('')
        }}>
          <div className="vendor-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h5>Change Password</h5>
              <button
                className="btn-close"
                onClick={() => {
                  setShowChangePasswordModal(false)
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                  setPasswordError('')
                }}
              ></button>
            </div>
            <div className="modal-body">
              {passwordError && (
                <div className="alert alert-danger">{passwordError}</div>
              )}
              <div className="mb-3">
                <label className="form-label">Current Password *</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  placeholder="Enter current password"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password *</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                />
                <small className="form-text text-muted">Password must be at least 6 characters</small>
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm New Password *</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowChangePasswordModal(false)
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                  setPasswordError('')
                }}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleChangePassword}
                disabled={isLoading}
              >
                {isLoading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="vendor-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="vendor-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header bg-danger text-white">
              <h5>Delete Account</h5>
              <button
                className="btn-close btn-close-white"
                onClick={() => setShowDeleteModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-danger">
                <strong>Warning!</strong> This action cannot be undone.
              </div>
              <p>Are you sure you want to permanently delete your vendor account?</p>
              <p className="text-muted small">
                This will delete:
                <ul>
                  <li>Your account and profile information</li>
                  <li>All your vehicles</li>
                  <li>All booking history</li>
                  <li>All revenue data</li>
                </ul>
              </p>
              <p className="text-danger fw-bold">This action is permanent and irreversible!</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
