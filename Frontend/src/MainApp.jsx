import React, { useState } from 'react';
import {
  LayoutDashboard,
  Receipt,
  Bell,
  Wallet,
  FileText,
  LineChart
} from 'lucide-react';


import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

import TransactionScreen from './screens/TransactionScreen';
import InsightsScreen from './screens/InsightsScreen';


// 🔹 ZERO STATE DASHBOARD DATA (NEW USER)
const DASHBOARD_DATA = {
  balance: 0,
  monthlySpend: 0,

  pieData: [
    { name: 'Food', value: 0, color: '#6366F1' },
    { name: 'Transport', value: 0, color: '#22C55E' },
    { name: 'Shopping', value: 0, color: '#F97316' },
    { name: 'Bills', value: 0, color: '#EF4444' }
  ],

  barData: [
    { name: 'Week 1', budget: 0, actual: 0 },
    { name: 'Week 2', budget: 0, actual: 0 },
    { name: 'Week 3', budget: 0, actual: 0 },
    { name: 'Week 4', budget: 0, actual: 0 }
  ]
};

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const data = DASHBOARD_DATA;

  // --- DASHBOARD CONTENT ---
  const renderDashboardContent = () => (
    <>
      {/* TITLE */}
      <div style={styles.pageTitleSection}>
        <h1 style={styles.pageTitle}>Dashboard</h1>
        <p style={styles.pageSubtitle}>
          Welcome! Your financial activity will appear here once you start.
        </p>
      </div>

      {/* CARDS */}
      <div style={styles.cardsGrid}>
        <div style={styles.blueCard}>
          <div style={styles.cardHeader}>
            <span style={styles.blueCardLabel}>Total Balance</span>
            <Wallet color="white" size={24} />
          </div>
          <div style={styles.balanceValue}>₹{data.balance}</div>
          <div style={styles.blueCardFooter}>
            <span style={styles.blueCardSubtext}>No transactions yet</span>
          </div>
        </div>

        <div style={styles.whiteCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardLabel}>Monthly Spend</span>
            <FileText color="#9CA3AF" size={24} />
          </div>
          <div style={styles.spendValue}>₹{data.monthlySpend}</div>
          <div style={styles.cardFooter}>
            <span style={styles.cardSubtext}>Start spending to see insights</span>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div style={styles.chartsGrid}>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Expense by Category</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.pieData}
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {data.pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p style={styles.chartHint}>No expenses recorded yet</p>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Budget vs Actual</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="budget" fill="#E5E7EB" />
                <Bar dataKey="actual" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p style={styles.chartHint}>Set a budget to track spending</p>
        </div>
      </div>
    </>
  );

  return (
    <div style={styles.appContainer}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <Wallet color="white" size={20} />
          </div>
          <h2 style={styles.logoText}>FinanceHub</h2>
        </div>

        <nav style={styles.nav}>
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem
            icon={<Receipt size={20} />}
            label="Transactions"
            active={activeTab === 'transactions'}
            onClick={() => setActiveTab('transactions')}
          />
          <NavItem
  icon={<LineChart size={20} />}
  label="Insights"
  active={activeTab === 'insights'}
  onClick={() => setActiveTab('insights')}
/>

        
        </nav>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        <header style={styles.header}>
          <div style={styles.profileSection}>
            <Bell color="#6B7280" size={20} />
            <div style={styles.avatar}>U</div>
          </div>
        </header>

        <div style={styles.contentScroll}>
  {activeTab === 'dashboard' && renderDashboardContent()}
  {activeTab === 'transactions' && <TransactionScreen />}
  {activeTab === 'insights' && <InsightsScreen />}
</div>

      </main>
    </div>
  );
};

// --- NAV ITEM ---
const NavItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      ...styles.navItem,
      ...(active ? styles.navItemActive : {})
    }}
  >
    {icon}
    <span style={styles.navLabel}>{label}</span>
  </div>
);

// --- STYLES ---
const styles = {
  appContainer: { display: 'flex', height: '100vh', backgroundColor: '#F3F4F6' },
  sidebar: { width: 260, backgroundColor: '#fff', borderRight: '1px solid #E5E7EB', padding: 24 },
  logoContainer: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 },
  logoIcon: { width: 32, height: 32, backgroundColor: '#2563EB', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoText: { fontSize: 20, fontWeight: 'bold' },
  nav: { display: 'flex', flexDirection: 'column', gap: 8 },
  navItem: { display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: 8, cursor: 'pointer' },
  navItemActive: { backgroundColor: '#EFF6FF', color: '#2563EB' },
  navLabel: { marginLeft: 12 },
  main: { flex: 1, display: 'flex', flexDirection: 'column' },
  header: { height: 70, backgroundColor: '#fff', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', padding: '0 32px', alignItems: 'center' },
  profileSection: { display: 'flex', alignItems: 'center', gap: 12 },
  avatar: { width: 36, height: 36, borderRadius: '50%', backgroundColor: '#8B5CF6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  contentScroll: { flex: 1, padding: 32, overflowY: 'auto' },
  pageTitleSection: { marginBottom: 32 },
  pageTitle: { fontSize: 28, fontWeight: 'bold' },
  pageSubtitle: { color: '#6B7280' },
  cardsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 },
  blueCard: { backgroundColor: '#1D4ED8', borderRadius: 16, padding: 24, color: '#fff' },
  whiteCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: 16 },
  balanceValue: { fontSize: 36, fontWeight: 'bold' },
  spendValue: { fontSize: 36, fontWeight: 'bold' },
  chartsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24 },
  chartCard: { backgroundColor: '#fff', padding: 24, borderRadius: 16 },
  chartTitle: { fontSize: 18, fontWeight: 600, marginBottom: 16 },
  chartHint: { marginTop: 10, fontSize: 14, color: '#6B7280', textAlign: 'center' }
};

export default MainApp;
