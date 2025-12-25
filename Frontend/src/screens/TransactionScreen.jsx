import React, { useState, useEffect } from 'react';
// import { transactions } from '../data/mockTransactions';  <-- REMOVE THIS OLD LINE
import { fetchTransactions } from '../api'; // <-- ADD THIS NEW LINE
import { Search, Filter, Check } from 'lucide-react';

const TransactionScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  // 1. ADD STATE FOR DATA & LOADING
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. FETCH DATA ON MOUNT
  useEffect(() => {
    const loadData = async () => {
        const data = await fetchTransactions();
        setTransactions(data);
        setLoading(false);
    };
    loadData();
  }, []);

  // 3. SHOW LOADING STATE
  if (loading) {
      return (
          <div style={{padding: '40px', textAlign: 'center', color: '#6B7280'}}>
              <h3>Loading Transactions...</h3>
          </div>
      );
  }

  // ... (Rest of your filter logic remains exactly the same) ...
  const filteredTransactions = transactions.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term);
    
    let matchesFilter = true;
    if (filterType === 'Income') {
        matchesFilter = item.type === 'income';
    } else if (filterType === 'Expense') {
        matchesFilter = item.type === 'expense';
    }

    return matchesSearch && matchesFilter;
  });

  const handleFilterSelect = (type) => {
      setFilterType(type);
      setShowFilterMenu(false);
  };

  return (
    <div style={styles.container}>
      {/* ... (Keep your existing JSX exactly the same, just the data source changed) ... */}
      
      {/* Header */}
      <div style={styles.header}>
        {/* ... existing header code ... */}
        {/* (I'm skipping copying the header code to save space, keep yours as is) */}
             <div>
            <h1 style={styles.title}>Transactions</h1>
            <p style={styles.subtitle}>View and manage your financial history</p>
        </div>
        
        <div style={styles.actions}>
            {/* Search Bar */}
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

            {/* FILTER DROPDOWN */}
            <div style={{ position: 'relative' }}>
                <button 
                    style={{
                        ...styles.filterBtn,
                        backgroundColor: filterType !== 'All' ? '#EFF6FF' : '#fff',
                        borderColor: filterType !== 'All' ? '#2563EB' : '#D1D5DB',
                        color: filterType !== 'All' ? '#2563EB' : '#374151'
                    }}
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                >
                    <Filter size={18} /> 
                    {filterType === 'All' ? 'Filter' : filterType}
                </button>

                {showFilterMenu && (
                    <div style={styles.dropdownMenu}>
                        <div style={styles.dropdownItem} onClick={() => handleFilterSelect('All')}>
                            <span>All Transactions</span>
                            {filterType === 'All' && <Check size={16} />}
                        </div>
                        <div style={styles.dropdownItem} onClick={() => handleFilterSelect('Income')}>
                            <span>Income Only</span>
                            {filterType === 'Income' && <Check size={16} />}
                        </div>
                        <div style={styles.dropdownItem} onClick={() => handleFilterSelect('Expense')}>
                            <span>Expense Only</span>
                            {filterType === 'Expense' && <Check size={16} />}
                        </div>
                    </div>
                )}
            </div>
        </div>

      </div>

      {/* Transactions List */}
      <div style={styles.listContainer}>
        <table style={styles.table}>
            <thead>
                <tr style={styles.tableHeader}>
                    <th style={{...styles.th, textAlign: 'left'}}>Transaction</th>
                    <th style={styles.th}>Category</th>
                    <th style={styles.th}>Date</th>
                    <th style={{...styles.th, textAlign: 'right'}}>Amount</th>
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
                            <td style={{...styles.td, textAlign: 'right'}}>
                                <span style={{ 
                                    ...styles.amount, 
                                    color: item.type === 'income' ? '#059669' : '#DC2626' 
                                }}>
                                    {item.type === 'income' ? '+' : ''}₹{Math.abs(item.amount).toLocaleString()}
                                </span>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                            No transactions found matching "{searchTerm}"
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

// ... (Your styles remain exactly the same) ...
const styles = {
  container: { paddingBottom: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#111827', margin: 0 },
  subtitle: { color: '#6B7280', fontSize: '16px', margin: '8px 0 0 0' },
  actions: { display: 'flex', gap: '12px', alignItems: 'center' },
  searchContainer: { display: 'flex', alignItems: 'center', backgroundColor: '#fff', border: '1px solid #D1D5DB', borderRadius: '8px', padding: '10px 16px', width: '250px' },
  searchInput: { border: 'none', outline: 'none', marginLeft: '10px', fontSize: '14px', width: '100%', color: '#374151' },
  filterBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', border: '1px solid #D1D5DB', transition: 'all 0.2s' },
  dropdownMenu: { position: 'absolute', top: '110%', right: 0, backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', width: '180px', zIndex: 10, overflow: 'hidden' },
  dropdownItem: { padding: '10px 16px', fontSize: '14px', color: '#374151', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.2s' },
  listContainer: { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' },
  th: { padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'left' },
  row: { borderBottom: '1px solid #F3F4F6' },
  td: { padding: '20px 24px', fontSize: '14px', color: '#374151' },
  titleText: { fontWeight: '600', color: '#111827' },
  categoryBadge: { backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '500' },
  amount: { fontWeight: '600', fontSize: '14px' },
};

export default TransactionScreen;