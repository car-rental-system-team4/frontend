import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function UserProfilePage() {
  // 1. Get user and logout 
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Initialize State with user data if available
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    licenseNo: '',
    aadharNo: '',
    houseNo: '',
    buildingName: '',
    streetName: '',
    area: '',
    pincode: '',
  });

  // Sync state when 'user' loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNo: user.phoneNo || '',
        licenseNo: user.licenseNo || '',
        aadharNo: user.aadharNo || '',
        houseNo: user.houseNo || '',
        buildingName: user.buildingName || '',
        streetName: user.streetName || '',
        area: user.area || '',
        pincode: user.pincode || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    // Since we don't have an Update API yet, show a message
    alert("Profile Update API is not yet connected.");
    setIsEditing(false);
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure?')) {
      alert("Delete API is not yet connected.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning">Please log in to view your profile</div>
      </div>
    );
  }

  return (
    <main className="profile-page py-5 bg-light">
      <div className="container">
        
        {/* Header Section */}
        <div className="row mb-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
                <h2>My Profile</h2>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </div>
        </div>

        <div className="row">
          {/* LEFT: Profile Card */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm text-center p-4">
              <div className="mb-3">
                 {/* Placeholder for Image */}
                 <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto" style={{width: '100px', height: '100px', fontSize: '2rem'}}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                 </div>
              </div>
              <h4>{formData.name}</h4>
              <p className="text-muted">{user.role}</p>
              
              {!isEditing && (
                <button className="btn btn-primary w-100" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="col-lg-8">
            <div className="card shadow-sm p-4">
              <form onSubmit={(e) => e.preventDefault()}>
                
                {/* Personal Info */}
                <h5 className="mb-3 text-primary">Personal Information</h5>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={formData.email} disabled /> {/* Email usually cannot be changed */}
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" name="phoneNo" value={formData.phoneNo} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                </div>

                {/* Identity Info */}
                <h5 className="mb-3 mt-3 text-primary">Identity Details</h5>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Aadhar Number</label>
                        <input type="text" className="form-control" name="aadharNo" value={formData.aadharNo} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Driving License</label>
                        <input type="text" className="form-control" name="licenseNo" value={formData.licenseNo} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                </div>

                {/* Address Info */}
                <h5 className="mb-3 mt-3 text-primary">Address Details</h5>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label className="form-label">House No</label>
                        <input type="text" className="form-control" name="houseNo" value={formData.houseNo} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="col-md-8 mb-3">
                        <label className="form-label">Building Name</label>
                        <input type="text" className="form-control" name="buildingName" value={formData.buildingName} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Street</label>
                        <input type="text" className="form-control" name="streetName" value={formData.streetName} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Area</label>
                        <input type="text" className="form-control" name="area" value={formData.area} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label className="form-label">Pincode</label>
                        <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleInputChange} disabled={!isEditing} />
                    </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                    <div className="d-flex gap-2 mt-4">
                        <button className="btn btn-success" onClick={handleSaveProfile}>Save Changes</button>
                        <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                )}

              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}