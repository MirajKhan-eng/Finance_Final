import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Receipt,
  LineChart,
  ShieldAlert,
  User,
  Bell,
  Wallet,
  Calculator,
  Compass,
  X
} from 'lucide-react';

// Screens
import DashboardScreen from './screens/DashboardScreen';
import TransactionScreen from './screens/TransactionScreen';
import InsightsScreen from './screens/InsightsScreen';
import FraudAlerts from './screens/FraudAlerts';
import BudgetCalculator from './screens/BudgetCalculator';
import GuidancePage from './screens/GuidancePage';
import ProfileScreen from './screens/ProfileScreen';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);

  // ✅ REAL AUTHENTICATED USER STATE
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 FETCH LOGGED-IN USER FROM DJANGO SESSION
  useEffect(() => {
    fetch('http://localhost:8000/auth/profile/', {
      credentials: 'include', // VERY IMPORTANT
    })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => {
        setUserProfile({
          name: data.name,
          email: data.email,
          avatar: data.name ? data.name[0].toUpperCase() : 'U'
        });
        setLoading(false);
      })
      .catch(() => {
        // If user is not logged in, redirect
        window.location.href = '/login';
      });
  }, []);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <div style={styles.appContainer}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}><Wallet color="white" size={20} /></div>
          <h2 style={styles.logoText}>Capital OS</h2>
        </div>

        <nav style={styles.nav}>
          <NavItem label="Dashboard" icon={<LayoutDashboard size={20} />} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem label="Transactions" icon={<Receipt size={20} />} active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} />
          <NavItem label="Insights" icon={<LineChart size={20} />} active={activeTab === 'insights'} onClick={() => setActiveTab('insights')} />
          <NavItem label="Fraud Alerts" icon={<ShieldAlert size={20} />} active={activeTab === 'fraud'} onClick={() => setActiveTab('fraud')} />
          <NavItem label="Budget Calculator" icon={<Calculator size={20} />} active={activeTab === 'calculator'} onClick={() => setActiveTab('calculator')} />
          <NavItem label="Guidance" icon={<Compass size={20} />} active={activeTab === 'guidance'} onClick={() => setActiveTab('guidance')} />
          <NavItem label="Profile" icon={<User size={20} />} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        <header style={styles.header}>
          <div style={styles.profileSection}>
            <Bell size={20} color="#6B7280" />

            <div style={styles.userInfo}>
              <div style={styles.userDetails}>
                <span style={styles.userName}>
                    {userProfile.name || userProfile.email}
                    </span>

              </div>
              <div style={styles.avatar}>{userProfile.avatar}</div>
            </div>
          </div>
        </header>

        <div style={styles.content}>
          {activeTab === 'dashboard' && <DashboardScreen />}
          {activeTab === 'transactions' && <TransactionScreen />}
          {activeTab === 'insights' && <InsightsScreen />}
          {activeTab === 'fraud' && <FraudAlerts />}
          {activeTab === 'calculator' && <BudgetCalculator />}
          {activeTab === 'guidance' && <GuidancePage />}
          {activeTab === 'profile' && <ProfileScreen />}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} style={{ ...styles.navItem, ...(active ? styles.navItemActive : {}) }}>
    {icon}
    <span style={styles.navLabel}>{label}</span>
  </div>
);

const styles = {
  appContainer: { display: 'flex', height: '100vh', background: '#F3F4F6' },
  sidebar: { width: 260, background: '#fff', padding: 24, borderRight: '1px solid #E5E7EB' },
  logoContainer: { display: 'flex', gap: 12, marginBottom: 40 },
  logoIcon: { background: '#2563EB', padding: 8, borderRadius: 8 },
  logoText: { fontSize: 20, fontWeight: 'bold' },
  nav: { display: 'flex', flexDirection: 'column', gap: 8 },
  navItem: { padding: '12px 16px', cursor: 'pointer', display: 'flex', gap: 12 },
  navItemActive: { background: '#EFF6FF', borderRadius: 8, color: '#2563EB' },
  navLabel: { fontWeight: 500 },
  main: { flex: 1, display: 'flex', flexDirection: 'column' },
  header: { height: 70, background: '#fff', borderBottom: '1px solid #E5E7EB', padding: '0 32px', display: 'flex', justifyContent: 'flex-end' },
  profileSection: { display: 'flex', alignItems: 'center', gap: 20 },
  userInfo: { display: 'flex', alignItems: 'center', gap: 12 },
  userDetails: { textAlign: 'right' },
  userName: { fontWeight: 600 },
  userEmail: { fontSize: 12, color: '#6B7280' },
  avatar: { width: 36, height: 36, borderRadius: '50%', background: '#8B5CF6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, padding: 32, overflowY: 'auto' }
};

export default MainApp;
