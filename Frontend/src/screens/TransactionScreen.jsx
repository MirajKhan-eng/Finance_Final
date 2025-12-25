// src/screens/TransactionScreen.js

import React, { useState } from 'react';
import { transactions } from '../data/mockTransactions';
import { Search, Filter } from 'lucide-react';

const DEMO_MODE = true; // 🔥 set false later to enable real data

const TransactionScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Use empty data in demo mode
  const sourceTransactions = DEMO_MODE ? [] : transactions;

  const filteredTransactions = sourceTransactions.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Transactions</h1>
          <p style={styles.subtitle}>View and manage your financial history</p>
        </div>

        <div style={styles.actions}>
          <div style={styles.searchContainer}>
            <Search size={18} color="#6B7280" />
            <input
              type="text"
              placeholder="Search transactions..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button style={styles.filterBtn}>
            <Filter size={18} /> Filter
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div style={styles.listContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={{ ...styles.th, textAlign: 'left' }}>Transaction</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Date</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item) => (
                <tr key={item.id} style={styles.row}>
                  <td style={styles.td}>
                    <div style={styles.titleText}>{item.title}</div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.categoryBadge}>{item.category}</span>
                  </td>
                  <td style={styles.td}>{item.date}</td>
                  <td style={{ ...styles.td, textAlign: 'right' }}>
                    <span
                      style={{
                        ...styles.amount,
                        color:
                          item.type === 'income' ? '#059669' : '#DC2626',
                      }}
                    >
                      {item.type === 'income' ? '+' : ''}$
                      {Math.abs(item.amount).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{
                    padding: '48px',
                    textAlign: 'center',
                    color: '#6B7280',
                  }}
                >
                  {searchTerm
                    ? `No transactions found matching "${searchTerm}"`
                    : 'No transactions yet. Your activity will appear here once you start using FinanceHub.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { paddingBottom: '40px' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: 0 },
  subtitle: {
    color: '#6B7280',
    fontSize: '16px',
    margin: '8px 0 0 0',
  },
  actions: { display: 'flex', gap: '12px', alignItems: 'center' },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    padding: '10px 16px',
    width: '250px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    marginLeft: '10px',
    fontSize: '14px',
    width: '100%',
    color: '#374151',
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: '#fff',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    color: '#374151',
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    border: '1px solid #E5E7EB',
    overflow: 'hidden',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: {
    backgroundColor: '#F9FAFB',
    borderBottom: '1px solid #E5E7EB',
  },
  th: {
    padding: '16px 24px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  row: { borderBottom: '1px solid #F3F4F6' },
  td: { padding: '20px 24px', fontSize: '14px', color: '#374151' },
  titleText: { fontWeight: '600', color: '#111827' },
  categoryBadge: {
    backgroundColor: '#EEF2FF',
    color: '#4F46E5',
    padding: '4px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: '500',
  },
  amount: { fontWeight: '600', fontSize: '14px' },
};

export default TransactionScreen;
