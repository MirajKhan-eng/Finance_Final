import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Camera, Settings, CheckCircle, 
  Wallet, TrendingUp, TrendingDown, PiggyBank, CreditCard, ChevronDown
} from 'lucide-react';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('Personal Info');

  // --- MOCK DATA ---
  const user = {
    firstName: 'Sarah',
    lastName: 'Anderson',
    email: 'sarah.anderson@email.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    joinDate: 'January 2023',
    dob: '1990-05-15',
    gender: 'Female',
    nationality: 'Indian',
    occupation: 'Software Engineer'
  };

  const financials = {
    balance: 452500.75,
    income: 85000.00,
    expenses: 53200.40,
    savings: 187500.00,
    netChange: 31790.60
  };

  const formatRupee = (val) => {
    return '₹' + val.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <div style={{display:'flex', gap:'16px', alignItems:'center'}}>
            <button style={styles.backBtn}>←</button>
            <div>
                <h1 style={styles.pageTitle}>Profile Settings</h1>
                <p style={styles.pageSubtitle}>Manage your account and preferences</p>
            </div>
        </div>
        <button style={styles.settingsBtn}>
            <Settings size={18} /> Settings
        </button>
      </div>

      {/* 1. PROFILE HEADER CARD */}
      <div style={styles.profileCard}>
        <div style={styles.profileHeaderContent}>
            <div style={{position:'relative'}}>
                <div style={styles.avatarCircle}>
                    <span style={styles.avatarText}>SA</span>
                </div>
                <button style={styles.cameraBtn}><Camera size={14} color="#fff"/></button>
            </div>
            
            <div style={{flex: 1}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px'}}>
                    <h2 style={styles.userName}>{user.firstName} {user.lastName}</h2>
                    <span style={styles.verifiedBadge}>Verified</span>
                </div>
                <p style={styles.memberSince}>Premium Account • Member since {user.joinDate}</p>
                
                <div style={styles.contactRow}>
                    <div style={styles.contactItem}><Mail size={14}/> {user.email}</div>
                    <div style={styles.contactItem}><Phone size={14}/> {user.phone}</div>
                    <div style={styles.contactItem}><MapPin size={14}/> {user.location}</div>
                </div>
            </div>

            <button style={styles.blackBtn}>Edit Profile</button>
        </div>
      </div>

      {/* 2. FINANCIAL STATS GRID */}
      <div style={styles.statsGrid}>
         <StatCard label="Total Balance" value={formatRupee(financials.balance)} icon={Wallet} color="#3B82F6" bg="#EFF6FF" />
         <StatCard label="Monthly Income" value={formatRupee(financials.income)} icon={TrendingUp} color="#10B981" bg="#ECFDF5" />
         <StatCard label="Monthly Expenses" value={formatRupee(financials.expenses)} icon={TrendingDown} color="#EF4444" bg="#FEF2F2" />
         <StatCard label="Savings" value={formatRupee(financials.savings)} icon={PiggyBank} color="#8B5CF6" bg="#F5F3FF" />
      </div>

      {/* 3. NET MONTHLY CHANGE CARD */}
      <div style={styles.netCard}>
         <div style={{display:'flex', alignItems:'center', gap:'16px'}}>
             <div style={styles.netIconBox}><CreditCard size={24} color="#059669"/></div>
             <div>
                 <span style={styles.netLabel}>Net Monthly Change</span>
                 <div style={styles.netValue}>+{formatRupee(financials.netChange)}</div>
             </div>
         </div>
         <span style={styles.surplusBadge}>Surplus</span>
      </div>

      {/* 4. TABS */}
      <div style={styles.tabContainer}>
         {['Personal Info', 'Security', 'Financial'].map(tab => (
             <button 
                key={tab} 
                style={activeTab === tab ? styles.activeTab : styles.tab}
                onClick={() => setActiveTab(tab)}
             >
                {tab}
             </button>
         ))}
      </div>

      {/* 5. FORM SECTION (Personal Info) */}
      {activeTab === 'Personal Info' && (
          <div style={styles.formCard}>
              <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'24px'}}>
                  <User size={20} color="#3B82F6"/>
                  <h3 style={styles.formTitle}>Personal Information</h3>
              </div>
              <p style={styles.formSubtitle}>Update your personal details and information</p>

              <div style={styles.formGrid}>
                  <FormInput label="First Name" value={user.firstName} />
                  <FormInput label="Last Name" value={user.lastName} />
                  
                  <FormInput label="Date of Birth" value={user.dob} type="date" />
                  <FormSelect label="Gender" value={user.gender} options={['Male', 'Female', 'Other']} />
                  
                  <FormInput label="Nationality" value={user.nationality} />
                  <FormInput label="Occupation" value={user.occupation} />
              </div>

              <div style={{marginTop: '32px'}}>
                  <button style={styles.saveBtn}>Save Changes</button>
              </div>
          </div>
      )}

      {activeTab === 'Security' && <div style={styles.emptyTab}>Security Settings Coming Soon</div>}
      {activeTab === 'Financial' && <div style={styles.emptyTab}>Financial Settings Coming Soon</div>}

    </div>
  );
};

// --- SUB COMPONENTS ---

const StatCard = ({ label, value, icon: Icon, color, bg }) => (
    <div style={styles.statCard}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'12px'}}>
            <span style={styles.statLabel}>{label}</span>
            <div style={{padding:'8px', borderRadius:'8px', backgroundColor: bg}}>
                <Icon size={18} color={color} />
            </div>
        </div>
        <div style={{...styles.statValue, color}}>{value}</div>
    </div>
);

const FormInput = ({ label, value, type = "text" }) => (
    <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
        <label style={styles.label}>{label}</label>
        <input type={type} defaultValue={value} style={styles.input} />
    </div>
);

const FormSelect = ({ label, value, options }) => (
    <div style={{display:'flex', flexDirection:'column', gap:'6px'}}>
        <label style={styles.label}>{label}</label>
        <div style={{position:'relative'}}>
            <select defaultValue={value} style={{...styles.input, appearance:'none'}}>
                {options.map(opt => <option key={opt}>{opt}</option>)}
            </select>
            <ChevronDown size={16} style={{position:'absolute', right:'12px', top:'12px', color:'#6B7280', pointerEvents:'none'}}/>
        </div>
    </div>
);

// --- STYLES ---
const styles = {
  container: { padding: '32px', backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  backBtn: { background:'none', border:'none', fontSize:'24px', cursor:'pointer', color:'#374151' },
  pageTitle: { fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 },
  pageSubtitle: { color: '#6B7280', marginTop: '4px', fontSize:'14px' },
  settingsBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#fff', border: '1px solid #D1D5DB', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', color: '#374151' },
  profileCard: { backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', marginBottom: '24px' },
  profileHeaderContent: { display: 'flex', gap: '24px', alignItems: 'center' },
  avatarCircle: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #fff', boxShadow: '0 0 0 1px #E5E7EB' },
  avatarText: { fontSize: '28px', fontWeight: '600', color: '#374151' },
 cameraBtn: { position: 'absolute', bottom: '0', right: '0', backgroundColor: '#2563EB', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid #fff' },
  userName: { fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 },
  verifiedBadge: { backgroundColor: '#ECFDF5', color: '#059669', fontSize: '12px', fontWeight: '600', padding: '2px 8px', borderRadius: '12px', border: '1px solid #A7F3D0' },
  memberSince: { color: '#6B7280', fontSize: '14px', margin: '4px 0 12px 0' },
  contactRow: { display: 'flex', gap: '24px', color: '#4B5563', fontSize: '14px' },
  contactItem: { display: 'flex', alignItems: 'center', gap: '6px' },
  blackBtn: { backgroundColor: '#111827', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '24px' },
  statCard: { backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB' },
  statLabel: { color: '#6B7280', fontSize: '14px', fontWeight: '500' },
  statValue: { fontSize: '24px', fontWeight: 'bold', marginTop: '4px' },
  netCard: { backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #10B981', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.1)' },
  netIconBox: { width: '48px', height: '48px', backgroundColor: '#ECFDF5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  netLabel: { color: '#6B7280', fontSize: '14px' },
  netValue: { color: '#059669', fontSize: '24px', fontWeight: 'bold' },
  surplusBadge: { backgroundColor: '#ECFDF5', color: '#059669', padding: '6px 16px', borderRadius: '20px', fontWeight: '600', fontSize: '14px' },
  tabContainer: { display: 'flex', gap: '8px', backgroundColor: '#F3F4F6', padding: '4px', borderRadius: '12px', width: 'fit-content', marginBottom: '24px' },
  tab: { padding: '8px 24px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#6B7280', fontWeight: '500', cursor: 'pointer' },
  activeTab: { padding: '8px 24px', borderRadius: '8px', border: 'none', background: '#fff', color: '#111827', fontWeight: '600', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  formCard: { backgroundColor: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #E5E7EB' },
  formTitle: { margin: 0, fontSize: '18px', fontWeight: '600' },
  formSubtitle: { margin: '4px 0 24px 0', color: '#6B7280', fontSize: '14px' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  label: { fontSize: '14px', fontWeight: '500', color: '#374151' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', color: '#111827', backgroundColor: '#F9FAFB' },
  saveBtn: { backgroundColor: '#111827', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '14px' },
  emptyTab: { padding: '40px', textAlign: 'center', color: '#6B7280', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #E5E7EB' }
};

export default ProfileScreen;