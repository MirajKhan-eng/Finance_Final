import React from 'react';
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

// 🔹 ZERO STATE INSIGHTS DATA
const INSIGHTS_DATA = {
  kpis: {
    income: 0,
    expenses: 0,
    savings: 0,
    growth: 0
  },

  pieData: [
    { name: 'Food', value: 0, color: '#6366F1' },
    { name: 'Transport', value: 0, color: '#22C55E' },
    { name: 'Shopping', value: 0, color: '#F97316' },
    { name: 'Bills', value: 0, color: '#EF4444' }
  ],

  trendData: [
    { month: 'Jan', amount: 0 },
    { month: 'Feb', amount: 0 },
    { month: 'Mar', amount: 0 },
    { month: 'Apr', amount: 0 },
    { month: 'May', amount: 0 },
    { month: 'Jun', amount: 0 }
  ]
};

const InsightsScreen = () => {
  const data = INSIGHTS_DATA;

  return (
    <div>
      {/* TITLE */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 'bold' }}>Insights</h1>
        <p style={{ color: '#6B7280' }}>
          Insights will appear once you start using the platform
        </p>
      </div>

      {/* KPI CARDS */}
      <div style={styles.cardsGrid}>
        <KpiCard title="Total Income" value="₹0" />
        <KpiCard title="Total Expenses" value="₹0" />
        <KpiCard title="Savings" value="₹0" />
        <KpiCard title="Growth Rate" value="0%" />
      </div>

      {/* CHARTS */}
      <div style={styles.chartsGrid}>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Spending Breakdown</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.pieData}
                  innerRadius={60}
                  outerRadius={90}
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
          <p style={styles.chartHint}>No spending data available</p>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Monthly Trend</h3>
          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p style={styles.chartHint}>Track trends once transactions are added</p>
        </div>
      </div>

      {/* EMPTY MESSAGE */}
      <div style={styles.emptyBox}>
        Personalized insights and recommendations will appear here as your
        financial data grows.
      </div>
    </div>
  );
};

// 🔹 KPI CARD
const KpiCard = ({ title, value }) => (
  <div style={styles.kpiCard}>
    <span style={{ color: '#6B7280', fontSize: 14 }}>{title}</span>
    <h2 style={{ fontSize: 28, marginTop: 8 }}>{value}</h2>
  </div>
);

// 🔹 STYLES
const styles = {
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 24,
    marginBottom: 32
  },
  kpiCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    border: '1px solid #E5E7EB'
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: 24,
    marginBottom: 32
  },
  chartCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 12
  },
  chartHint: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 8
  },
  emptyBox: {
    backgroundColor: '#F9FAFB',
    border: '1px dashed #D1D5DB',
    borderRadius: 12,
    padding: 24,
    textAlign: 'center',
    color: '#6B7280'
  }
};

export default InsightsScreen;
