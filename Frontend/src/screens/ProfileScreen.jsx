import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Camera, Edit2, 
  Shield, CreditCard, Save
} from 'lucide-react';
import './ProfileScreen.css';

const INITIAL_USER = {
  firstName: "Miraj",
  lastName: "Khan",
  role: "Premium Member",
  email: "miraj.khan@example.com",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  dob: "1998-05-15",
  gender: "Male",
  nationality: "Indian",
  occupation: "Software Engineer",
  bio: "Building the future of fintech at Capital OS.",
  joinDate: "January 2023"
};

// 1. Accept Prop from MainApp
const ProfileScreen = ({ onProfileUpdate }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(INITIAL_USER);

  useEffect(() => {
    const loadProfile = async () => {
      await new Promise(r => setTimeout(r, 600));
      const savedData = localStorage.getItem('capitalUser');
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      // 1. Save to Local Storage
      localStorage.setItem('capitalUser', JSON.stringify(formData));
      
      // 2. Update Main App Header Dynamically
      if (onProfileUpdate) {
          onProfileUpdate(formData);
      }

      setIsSaving(false);
      alert("Profile Updated Successfully!");
    }, 1000);
  };

  if (loading) {
    return (
      <div style={{padding: '40px', textAlign: 'center', color: '#64748b'}}>
        <h3>Loading Profile...</h3>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="page-header">
        <h1>Profile Settings</h1>
        <p>Manage your account details and preferences.</p>
      </div>

      {/* --- RESTRUCTURED HEADER CARD --- */}
      <div className="profile-header-card">
        <div className="profile-cover"></div>
        <div className="profile-content">
          <div className="avatar-section">
            <div className="profile-avatar">
              {formData.firstName[0]}{formData.lastName[0]}
              <button className="camera-btn"><Camera size={16} /></button>
            </div>
            <div className="user-info-header">
              <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <h2>{formData.firstName} {formData.lastName}</h2>
                <span className="badge-verified">Verified</span>
              </div>
              <p className="user-role">{formData.role} • Member since {formData.joinDate}</p>
              <div className="contact-row">
                <span><Mail size={14} /> {formData.email}</span>
                <span><Phone size={14} /> {formData.phone}</span>
                <span><MapPin size={14} /> {formData.location}</span>
              </div>
            </div>
          </div>
          <button className="edit-header-btn" onClick={() => document.getElementById('firstName').focus()}>
            <Edit2 size={16} /> Edit Profile
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-label">Total Balance</span>
          <div className="stat-value text-blue">₹4,52,500.75</div>
          <div className="stat-icon-bg blue"><CreditCard size={18} /></div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Monthly Income</span>
          <div className="stat-value text-green">₹85,000.00</div>
          <div className="stat-icon-bg green"><TrendingUpIcon /></div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Monthly Expenses</span>
          <div className="stat-value text-red">₹53,200.40</div>
          <div className="stat-icon-bg red"><TrendingDownIcon /></div>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Savings</span>
          <div className="stat-value text-purple">₹1,87,500.00</div>
          <div className="stat-icon-bg purple"><Shield size={18} /></div>
        </div>
      </div>

      <div className="profile-tabs">
        <button className={`p-tab ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
          <User size={18} /> Personal Info
        </button>
        <button className={`p-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
          <Shield size={18} /> Security
        </button>
        <button className={`p-tab ${activeTab === 'financial' ? 'active' : ''}`} onClick={() => setActiveTab('financial')}>
          <CreditCard size={18} /> Financial Details
        </button>
      </div>

      <div className="profile-form-card">
        {activeTab === 'personal' && (
          <div className="form-section">
            <h3 className="form-title">Personal Information</h3>
            <p className="form-subtitle">Update your personal details here.</p>
            
            <div className="form-grid">
              <div className="input-group">
                <label>First Name</label>
                <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div className="input-group">
                <label>Nationality</label>
                <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Occupation</label>
                <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} />
              </div>
              <div className="input-group full-width">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="input-group full-width">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="form-actions">
              <button className="save-btn-primary" onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
           <div className="placeholder-content">
              <Shield size={48} color="#cbd5e1" />
              <h3>Security Settings</h3>
           </div>
        )}

        {activeTab === 'financial' && (
           <div className="placeholder-content">
              <CreditCard size={48} color="#cbd5e1" />
              <h3>Financial Profile</h3>
           </div>
        )}
      </div>
    </div>
  );
};

const TrendingUpIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const TrendingDownIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>;

export default ProfileScreen;