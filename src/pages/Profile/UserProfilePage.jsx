import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function UserProfilePage() {
  const { user, updateProfile, deleteProfile } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    profilePic: user?.profilePic || '',
    aadharId: user?.aadharId || '',
    drivingLicense: user?.drivingLicense || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMessage('');
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePic: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setErrorMessage('Full Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Phone number is required');
      return false;
    }
    if (!formData.aadharId.trim()) {
      setErrorMessage('Aadhar ID is required');
      return false;
    }
    if (!formData.drivingLicense.trim()) {
      setErrorMessage('Driving License number is required');
      return false;
    }
    if (!formData.address.trim()) {
      setErrorMessage('Address is required');
      return false;
    }
    if (!formData.city.trim()) {
      setErrorMessage('City is required');
      return false;
    }
    if (!formData.state.trim()) {
      setErrorMessage('State is required');
      return false;
    }
    if (!formData.zipCode.trim()) {
      setErrorMessage('Zip Code is required');
      return false;
    }
    return true;
  };

  const handleSaveProfile = () => {
    if (validateForm()) {
      updateProfile(formData);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      deleteProfile();
      navigate('/');
    }
  };

  if (!user) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">
          <h5>Please log in to view your profile</h5>
        </div>
      </div>
    );
  }

  return (
  <main className="profile-page">
    <div className="profile-container">

      {/* Alerts (full width above content) */}
      <div className="profile-alerts">
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            {successMessage}
            <button type="button" className="btn-close" onClick={() => setSuccessMessage('')}></button>
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {errorMessage}
            <button type="button" className="btn-close" onClick={() => setErrorMessage('')}></button>
          </div>
        )}
      </div>

      {/* Main content: left profile column + right form column */}
      <section className="profile-grid">

        {/* LEFT: Profile summary / picture / quick actions */}
        <aside className="profile-left">
          <div className="profile-pic-wrap">
            {formData.profilePic ? (
              <img
                src={formData.profilePic}
                alt="Profile"
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar placeholder">👤</div>
            )}
          </div>

          <div className="profile-meta">
            <h2 className="profile-name">{formData.fullName || 'Your Name'}</h2>
            <p className="profile-email">{formData.email || 'you@example.com'}</p>
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <button
                type="button"
                className="btn btn-outline-primary w-100"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Photo
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-primary w-100"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfilePicChange}
              accept="image/*"
              style={{ display: 'none' }}
            />

            <button
              type="button"
              className="btn btn-danger w-100 mt-2"
              onClick={handleDeleteProfile}
            >
              🗑 Delete Profile
            </button>
          </div>
        </aside>

        {/* RIGHT: Full form (no card) */}
        <div className="profile-right">
          <form className="profile-form" onSubmit={(e) => e.preventDefault()}>
            <section className="form-section">
              <h4 className="section-title">Personal Information</h4>

              <div className="row gx-3">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label fw-bold">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="10-digit phone number"
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h4 className="section-title">Document Information</h4>

              <div className="row gx-3">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label fw-bold">Aadhar ID</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="aadharId"
                    value={formData.aadharId}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="12-digit Aadhar number"
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label fw-bold">Driving License Number</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="drivingLicense"
                    value={formData.drivingLicense}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Driving License number"
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h4 className="section-title">Address Information</h4>

              <div className="mb-3">
                <label className="form-label fw-bold">Address</label>
                <textarea
                  className="form-control form-control-lg"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="3"
                  placeholder="Enter your full address"
                ></textarea>
              </div>

              <div className="row gx-3">
                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label fw-bold">City</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label fw-bold">State</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <label className="form-label fw-bold">Zip Code</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="6-digit zip code"
                  />
                </div>
              </div>
            </section>

            {/* Actions (Save / Cancel) - sticky bottom on large screens */}
            <div className="form-actions mt-4">
              {!isEditing ? (
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => setIsEditing(true)}
                  >
                    ✎ Edit Profile
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={handleDeleteProfile}
                  >
                    🗑 Delete Profile
                  </button>
                </div>
              ) : (
                <div className="d-flex gap-2 flex-wrap">
                  <button
                    type="button"
                    className="btn btn-success btn-lg"
                    onClick={handleSaveProfile}
                  >
                    ✓ Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        fullName: user?.fullName || '',
                        email: user?.email || '',
                        phone: user?.phone || '',
                        profilePic: user?.profilePic || '',
                        aadharId: user?.aadharId || '',
                        drivingLicense: user?.drivingLicense || '',
                        address: user?.address || '',
                        city: user?.city || '',
                        state: user?.state || '',
                        zipCode: user?.zipCode || '',
                      });
                      setErrorMessage('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  </main>
);
}
