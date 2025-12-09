import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function VendorSettings() {
  const { user, updateProfile } = useAuth()
  
  const [vendorInfo, setVendorInfo] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    businessName: 'RentYourCar Express',
    businessAddress: '123 Car Street, Mumbai, MH 400001',
    businessPhone: '+91 98765 43200',
    taxId: 'TIN123456789',
    bankAccountName: 'Vendor Name',
    bankAccountNumber: '****1234',
    ifscCode: 'SBIN0001234'
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    monthlyReports: false,
    autoApproveBookings: false,
    maintenanceReminders: true,
    documentExpiry: true
  })

  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleVendorInfoChange = (e) => {
    const { name, value } = e.target
    setVendorInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = () => {
    updateProfile(vendorInfo)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div>
      <h4 className="mb-4">Settings</h4>

      {saveSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          ✓ Settings saved successfully!
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      {/* Personal Information */}
      <div className="vendor-card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Personal Information</h5>
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
              />
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
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="vendor-card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Business Information</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Business Name</label>
              <input 
                type="text" 
                className="form-control"
                name="businessName"
                value={vendorInfo.businessName}
                onChange={handleVendorInfoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Business Phone</label>
              <input 
                type="tel" 
                className="form-control"
                name="businessPhone"
                value={vendorInfo.businessPhone}
                onChange={handleVendorInfoChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label">Business Address</label>
              <textarea 
                className="form-control"
                rows="2"
                name="businessAddress"
                value={vendorInfo.businessAddress}
                onChange={handleVendorInfoChange}
              ></textarea>
            </div>
            <div className="col-md-6">
              <label className="form-label">Tax ID (TIN)</label>
              <input 
                type="text" 
                className="form-control"
                name="taxId"
                value={vendorInfo.taxId}
                onChange={handleVendorInfoChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bank Information */}
      <div className="vendor-card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Bank Information</h5>
          <small className="text-muted">For payout transfers</small>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Account Holder Name</label>
              <input 
                type="text" 
                className="form-control"
                name="bankAccountName"
                value={vendorInfo.bankAccountName}
                onChange={handleVendorInfoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Account Number</label>
              <input 
                type="text" 
                className="form-control"
                name="bankAccountNumber"
                value={vendorInfo.bankAccountNumber}
                onChange={handleVendorInfoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">IFSC Code</label>
              <input 
                type="text" 
                className="form-control"
                name="ifscCode"
                value={vendorInfo.ifscCode}
                onChange={handleVendorInfoChange}
              />
            </div>
            <div className="col-12">
              <button className="btn btn-primary btn-sm">
                Verify Bank Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="vendor-card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Notification Preferences</h5>
        </div>
        <div className="card-body">
          <div className="settings-group">
            <h6 className="settings-group-title">Communication Channels</h6>
            <div className="settings-item">
              <div className="settings-label">
                <label className="form-check-label">Email Notifications</label>
                <small className="text-muted">Get booking and system updates via email</small>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={preferences.emailNotifications}
                  onChange={() => handlePreferenceChange('emailNotifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-item">
              <div className="settings-label">
                <label className="form-check-label">SMS Notifications</label>
                <small className="text-muted">Get instant alerts via SMS</small>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={preferences.smsNotifications}
                  onChange={() => handlePreferenceChange('smsNotifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-item">
              <div className="settings-label">
                <label className="form-check-label">Push Notifications</label>
                <small className="text-muted">Browser notifications on your device</small>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={preferences.pushNotifications}
                  onChange={() => handlePreferenceChange('pushNotifications')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <hr />

          <div className="settings-group">
            <h6 className="settings-group-title">Reports & Analytics</h6>
            <div className="settings-item">
              <div className="settings-label">
                <label className="form-check-label">Weekly Reports</label>
                <small className="text-muted">Receive weekly performance summaries</small>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={preferences.weeklyReports}
                  onChange={() => handlePreferenceChange('weeklyReports')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-item">
              <div className="settings-label">
                <label className="form-check-label">Monthly Reports</label>
                <small className="text-muted">Detailed monthly analytics and insights</small>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={preferences.monthlyReports}
                  onChange={() => handlePreferenceChange('monthlyReports')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <hr />

          <div className="settings-group">
            <h6 className="settings-group-title">Booking Management</h6>
            <div className="settings-item">
              <div className="settings-label">
                <label className="form-check-label">Auto-Approve Bookings</label>
                <small className="text-muted">Automatically approve all new bookings</small>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={preferences.autoApproveBookings}
                  onChange={() => handlePreferenceChange('autoApproveBookings')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-item">
              <div className="settings-label">
                <label className="form-check-label">Maintenance Reminders</label>
                <small className="text-muted">Alerts for scheduled maintenance</small>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={preferences.maintenanceReminders}
                  onChange={() => handlePreferenceChange('maintenanceReminders')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="settings-item">
              <div className="settings-label">
                <label className="form-check-label">Document Expiry Alerts</label>
                <small className="text-muted">Reminders for insurance and license renewal</small>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={preferences.documentExpiry}
                  onChange={() => handlePreferenceChange('documentExpiry')}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="vendor-card danger-zone">
        <div className="card-header bg-danger-light">
          <h5 className="mb-0">Account Actions</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <h6>Change Password</h6>
              <p className="text-muted small">Update your account password</p>
              <button className="btn btn-outline-primary">Change Password</button>
            </div>
            <div className="col-md-6">
              <h6 className="text-danger">Delete Account</h6>
              <p className="text-muted small">Permanently delete your vendor account</p>
              <button className="btn btn-outline-danger">Delete Account</button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-4 d-flex gap-2 justify-content-end">
        <button className="btn btn-secondary">Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  )
}
