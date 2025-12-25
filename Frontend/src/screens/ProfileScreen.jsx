import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit2,
  Shield,
  CreditCard,
  Save
} from 'lucide-react';
import './ProfileScreen.css';

const ProfileScreen = ({ onProfileUpdate }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    dob: '',
    gender: '',
    nationality: '',
    occupation: '',
    role: 'Standard User',
    joinDate: ''
  });

  // 🔐 FETCH REAL USER FROM DJANGO SESSION
  useEffect(() => {
    fetch('http://localhost:8000/auth/profile/', {
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        const nameParts = data.name?.split(' ') || [];
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ');

        setFormData(prev => ({
          ...prev,
          firstName,
          lastName,
          email: data.email
        }));

        // 🔄 Sync header in MainApp
        if (onProfileUpdate) {
          onProfileUpdate({
            firstName,
            lastName,
            role: 'Standard User'
          });
        }

        setLoading(false);
      })
      .catch(() => {
        window.location.href = '/login';
      });
  }, [onProfileUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);

    // ⚠️ Backend update endpoint not implemented yet
    // For now this is UI-only
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated (UI only)');
    }, 800);
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
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

      {/* HEADER CARD */}
      <div className="profile-header-card">
        <div className="profile-cover"></div>

        <div className="profile-content">
          <div className="avatar-section">
            <div className="profile-avatar">
              {formData.firstName[0]}
              {formData.lastName[0] || ''}
              <button className="camera-btn">
                <Camera size={16} />
              </button>
            </div>

            <div className="user-info-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2>{formData.firstName} {formData.lastName}</h2>
                <span className="badge-verified">Verified</span>
              </div>

              <p className="user-role">{formData.role}</p>

              <div className="contact-row">
                <span><Mail size={14} /> {formData.email}</span>
                {formData.phone && <span><Phone size={14} /> {formData.phone}</span>}
                {formData.location && <span><MapPin size={14} /> {formData.location}</span>}
              </div>
            </div>
          </div>

          <button
            className="edit-header-btn"
            onClick={() => document.getElementById('firstName').focus()}
          >
            <Edit2 size={16} /> Edit Profile
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="profile-tabs">
        <button className={`p-tab ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
          <User size={18} /> Personal Info
        </button>
        <button className={`p-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
          <Shield size={18} /> Security
        </button>
        <button className={`p-tab ${activeTab === 'financial' ? 'active' : ''}`} onClick={() => setActiveTab('financial')}>
          <CreditCard size={18} /> Financial
        </button>
      </div>

      {/* FORM */}
      <div className="profile-form-card">
        {activeTab === 'personal' && (
          <div className="form-section">
            <h3 className="form-title">Personal Information</h3>
            <p className="form-subtitle">Update your personal details.</p>

            <div className="form-grid">
              <div className="input-group">
                <label>First Name</label>
                <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
              </div>

              <div className="input-group">
                <label>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} />
              </div>

              <div className="input-group full-width">
                <label>Email</label>
                <input disabled value={formData.email} />
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

export default ProfileScreen;
