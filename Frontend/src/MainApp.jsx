import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Receipt, LineChart, ShieldAlert, User, Bell, 
  Wallet, Calculator, Compass, X 
} from 'lucide-react';

// --- Screen Imports ---
import ChatAssistant from './screens/ChatAssistant';
import { fetchDashboardData } from './api'; 

import DashboardScreen from './screens/DashboardScreen'; 
import TransactionScreen from './screens/TransactionScreen';
import InsightsScreen from './screens/InsightsScreen'; 
import FraudAlerts from './screens/FraudAlerts';
import BudgetCalculator from './screens/BudgetCalculator';
import GuidancePage from './screens/GuidancePage';
import ProfileScreen from './screens/ProfileScreen'; 

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatData, setChatData] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // --- 1. LIFTED STATE: User Profile lives here now ---
  const [userProfile, setUserProfile] = useState({
    name: "Miraj Khan",
    role: "Premium Member",
    avatar: "MK"
  });

  // Load User Data & Dashboard Data on Start
  useEffect(() => {
    const loadData = async () => {
        // 1. Fetch Dashboard Data
        const response = await fetchDashboardData();
        setChatData(response);

        // 2. Load Profile from LocalStorage (Persist Login)
        const savedProfile = localStorage.getItem('capitalUser');
        if (savedProfile) {
            const parsed = JSON.parse(savedProfile);
            setUserProfile({
                name: `${parsed.firstName} ${parsed.lastName}`,
                role: parsed.role,
                avatar: `${parsed.firstName[0]}${parsed.lastName[0]}`
            });
        }
    };
    loadData();
  }, []);

  // --- 2. UPDATE FUNCTION: Passed down to ProfileScreen ---
  const handleProfileUpdate = (updatedData) => {
      setUserProfile({
          name: `${updatedData.firstName} ${updatedData.lastName}`,
          role: updatedData.role,
          avatar: `${updatedData.firstName[0]}${updatedData.lastName[0]}`
      });
  };

  const notifications = [
      { id: 1, title: 'Salary Credited', msg: 'Your salary of ₹85,000 has been credited.', time: '2 hrs ago', type: 'success' },
      { id: 2, title: 'Budget Exceeded', msg: 'You exceeded your Dining budget by ₹2,000.', time: '5 hrs ago', type: 'warning' },
      { id: 3, title: 'New Feature', msg: 'Check out the new Retirement Planner tab!', time: '1 day ago', type: 'info' },
  ];

  return (
    <div style={styles.appContainer}>
      <aside style={styles.sidebar}>
         <div style={styles.logoContainer}>
          <div style={styles.logoIcon}><Wallet color="white" size={20} /></div>
          <h2 style={styles.logoText}>Capital OS</h2>
        </div>
        
        <nav style={styles.nav}>
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Receipt size={20} />} label="Transactions" active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')} />
          <NavItem icon={<LineChart size={20} />} label="Insights" active={activeTab === 'insights'} onClick={() => setActiveTab('insights')} />
          <NavItem icon={<ShieldAlert size={20} />} label="Fraud Alerts" active={activeTab === 'Fraud Alerts'} onClick={() => setActiveTab('Fraud Alerts')} />
          <NavItem icon={<Calculator size={20} />} label="Budget Calculator" active={activeTab === 'calculator'} onClick={() => setActiveTab('calculator')} />
          <NavItem icon={<Compass size={20} />} label="Guidance" active={activeTab === 'guidance'} onClick={() => setActiveTab('guidance')} />
          <NavItem icon={<User size={20} />} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
            <div style={styles.profileSection}>
                <div style={{ position: 'relative' }}>
                    <div style={{ cursor: 'pointer', position: 'relative' }} onClick={() => setShowNotifications(!showNotifications)}>
                        <Bell color="#6B7280" size={20} style={{ marginRight: 20 }} />
                        {showNotifications && <div style={{ position: 'absolute', top: -2, right: 18, width: 8, height: 8, backgroundColor: '#EF4444', borderRadius: '50%', border: '2px solid white' }}></div>}
                    </div>
                    {showNotifications && (
                        <div style={styles.notificationPopup}>
                            <div style={styles.popupHeader}>
                                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>Notifications</h4>
                                <X size={16} style={{ cursor: 'pointer', color: '#6B7280' }} onClick={() => setShowNotifications(false)} />
                            </div>
                            <div style={styles.notificationList}>
                                {notifications.map(notif => (
                                    <div key={notif.id} style={styles.notificationItem}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: 4, backgroundColor: notif.type === 'success' ? '#10B981' : notif.type === 'warning' ? '#F59E0B' : '#3B82F6' }}></div>
                                        <div>
                                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1F2937' }}>{notif.title}</div>
                                            <div style={{ fontSize: '12px', color: '#4B5563', margin: '2px 0' }}>{notif.msg}</div>
                                            <div style={{ fontSize: '11px', color: '#9CA3AF' }}>{notif.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={styles.popupFooter}>Mark all as read</div>
                        </div>
                    )}
                </div>

                <div style={styles.userInfo}>
                <div style={styles.userDetails}>
                    {/* --- DYNAMIC HEADER DATA --- */}
                    <span style={styles.userName}>{userProfile.name}</span>
                    <span style={styles.userRole}>{userProfile.role}</span>
                </div>
                <div style={styles.avatar}>{userProfile.avatar}</div>
                </div>
            </div>
        </header>

        <div className="dashboard-scroll" style={{
            ...styles.contentScroll,
            padding: activeTab === 'calculator' ? '0' : '32px',
            backgroundColor: activeTab === 'calculator' ? '#F9FAFB' : 'transparent' 
        }}>
            
            {activeTab === 'dashboard' && <DashboardScreen />}
            {activeTab === 'transactions' && <TransactionScreen />}
            {activeTab === 'insights' && <InsightsScreen />}
            {activeTab === 'Fraud Alerts' && <FraudAlerts />}
            {activeTab === 'calculator' && <BudgetCalculator />}
            {activeTab === 'guidance' && <GuidancePage />}
            
            {/* --- PASS CALLBACK TO PROFILE --- */}
            {activeTab === 'profile' && <ProfileScreen onProfileUpdate={handleProfileUpdate} />}

        </div>
      </main>

      {chatData && <ChatAssistant dashboardData={chatData} />}
      
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
    <div onClick={onClick} style={{...styles.navItem, ...(active ? styles.navItemActive : {}), color: active ? '#2563EB' : '#4B5563'}}>
      {icon} <span style={styles.navLabel}>{label}</span>
    </div>
);

const styles = {
    appContainer: { display: 'flex', height: '100vh', backgroundColor: '#F3F4F6' },
    sidebar: { width: '260px', backgroundColor: '#fff', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', padding: '24px' },
    logoContainer: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' },
    logoIcon: { width: '32px', height: '32px', backgroundColor: '#2563EB', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    logoText: { fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 },
    nav: { display: 'flex', flexDirection: 'column', gap: '8px' },
    navItem: { display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', transition: '0.2s' },
    navItemActive: { backgroundColor: '#EFF6FF' },
    navLabel: { marginLeft: '12px', fontSize: '15px', fontWeight: '500' },
    main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    header: { height: '70px', backgroundColor: '#fff', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 32px', position: 'relative' },
    profileSection: { display: 'flex', alignItems: 'center' },
    userInfo: { display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #E5E7EB', paddingLeft: '20px' },
    userDetails: { textAlign: 'right' },
    userName: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827' },
    userRole: { display: 'block', fontSize: '12px', color: '#6B7280' },
    avatar: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#8B5CF6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '14px' },
    contentScroll: { flex: 1, padding: '32px', overflowY: 'auto' },
    notificationPopup: { position: 'absolute', top: '40px', right: '0', width: '300px', backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', zIndex: 50, overflow: 'hidden' },
    popupHeader: { padding: '12px 16px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9FAFB' },
    notificationList: { maxHeight: '300px', overflowY: 'auto' },
    notificationItem: { padding: '12px 16px', borderBottom: '1px solid #F3F4F6', display: 'flex', gap: '10px', alignItems: 'flex-start' },
    popupFooter: { padding: '10px', textAlign: 'center', fontSize: '12px', color: '#2563EB', fontWeight: '600', cursor: 'pointer', borderTop: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }
};

export default MainApp;