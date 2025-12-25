// src/screens/DashboardScreen.jsx
import React, { useState, useEffect } from 'react';
import { Wallet, FileText } from 'lucide-react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { fetchDashboardData } from '../api'; // Use your fake API

const DashboardScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchDashboardData();
        setData(response);
      } catch (error) {
        console.error("Error loading dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <>
      <div style={styles.pageTitleSection}>
        <h1 style={styles.pageTitle}>Dashboard</h1>
        <p style={styles.pageSubtitle}>Welcome back! Here's your financial overview</p>
      </div>

      <div style={styles.cardsGrid}>
        <div style={styles.blueCard}>
          <div style={styles.cardHeader}>
            <span style={styles.blueCardLabel}>Total Balance</span>
            <Wallet color="white" size={24} opacity={0.8} />
          </div>
          <div style={styles.balanceValue}>₹{data.balance.toLocaleString()}</div>
          <div style={styles.blueCardFooter}>
            <span style={styles.badgeGreen}>+12.5%</span>
            <span style={styles.blueCardSubtext}> from last month</span>
          </div>
        </div>

        <div style={styles.whiteCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardLabel}>Monthly Spend</span>
            <FileText color="#9CA3AF" size={24} />
          </div>
          <div style={styles.spendValue}>₹{data.monthlySpend.toLocaleString()}</div>
          <div style={styles.cardFooter}>
            <span style={styles.textGreen}>-8.2%</span>
            <span style={styles.cardSubtext}> vs budget</span>
          </div>
        </div>
      </div>

      <div style={styles.chartsGrid}>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Expense by Category</h3>
          <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.pieData} innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  {data.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={styles.legend}>
            {data.pieData.map(d => (
              <div key={d.name} style={styles.legendItem}>
                <div style={{ ...styles.dot, backgroundColor: d.color }}></div>
                <span style={{ fontSize: 12, color: '#666' }}>{d.name} {d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Budget vs Actual</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.barData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'transparent' }} formatter={(value) => `₹${value}`} />
                <Bar dataKey="budget" fill="#E5E7EB" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="actual" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  pageTitleSection: { marginBottom: '32px' },
  pageTitle: { fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: '0 0 8px 0' },
  pageSubtitle: { color: '#6B7280', fontSize: '16px', margin: 0 },
  cardsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' },
  blueCard: { backgroundColor: '#1D4ED8', borderRadius: '16px', padding: '24px', color: '#fff', boxShadow: '0 4px 6px -1px rgba(29, 78, 216, 0.3)' },
  whiteCard: { backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
  blueCardLabel: { fontSize: '14px', opacity: 0.9 },
  cardLabel: { fontSize: '14px', color: '#6B7280' },
  balanceValue: { fontSize: '36px', fontWeight: 'bold', marginBottom: '16px' },
  spendValue: { fontSize: '36px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' },
  blueCardFooter: { display: 'flex', alignItems: 'center', fontSize: '14px' },
  badgeGreen: { backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontWeight: '600', marginRight: '8px' },
  blueCardSubtext: { opacity: 0.8 },
  cardFooter: { display: 'flex', alignItems: 'center', fontSize: '14px' },
  textGreen: { color: '#059669', fontWeight: '600', marginRight: '8px' },
  cardSubtext: { color: '#6B7280' },
  chartsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' },
  chartCard: { backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB' },
  chartTitle: { fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '24px', marginTop: 0 },
  legend: { display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '20px' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '6px' },
  dot: { width: '8px', height: '8px', borderRadius: '50%' },
};

export default DashboardScreen;