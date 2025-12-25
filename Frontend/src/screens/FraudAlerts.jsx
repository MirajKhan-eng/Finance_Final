import React, { useState } from 'react';
import { 
  ShieldAlert, Bell, TriangleAlert, CreditCard, TrendingUp, 
  DollarSign, Filter, ChevronDown, CheckCircle, X, MapPin, Clock, Shield
} from 'lucide-react';

const FraudScreen = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('alerts'); 
  const [severityFilter, setSeverityFilter] = useState('All'); 
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  // --- DATA ---
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'Unknown Transaction Detected',
      severity: 'High',
      description: 'A transaction from an unrecognized merchant was detected on your account.',
      amount: 124789.00,
      merchant: 'GlobalTech Solutions Inc.',
      location: 'Lagos, Nigeria',
      time: 'Dec 21, 2025 at 03:42 AM',
      icon: CreditCard,
      reason: 'Unusual Location'
    },
    {
      id: 2,
      type: 'Sudden Expense Spike',
      severity: 'High',
      description: 'Your spending is 340% higher than your average weekly spending.',
      amount: null,
      merchant: 'Multiple Merchants',
      location: 'New York, NY',
      time: 'Last 7 Days',
      icon: TrendingUp,
      reason: 'Abnormal Volume'
    },
    {
      id: 3,
      type: 'Duplicate Charge Detected',
      severity: 'Medium',
      description: 'Similar transaction detected within 5 minutes.',
      amount: 4999.00,
      merchant: 'StreamingService Pro',
      location: 'Online',
      time: 'Dec 19, 2025 at 08:15 PM',
      icon: DollarSign,
      reason: 'Double Charge'
    },
    {
      id: 4,
      type: 'Shopping Spike Alert',
      severity: 'Low',
      description: 'Online shopping expenses 150% above your monthly average.',
      amount: 18200.75,
      merchant: 'Various Online Retailers',
      location: 'Online',
      time: 'Dec 18, 2025',
      icon: TrendingUp,
      reason: 'Spending Limit'
    }
  ]);

  const [transactions] = useState([
    { id: 101, merchant: 'GlobalTech Solutions Inc.', category: 'Unknown', location: 'Lagos, Nigeria', amount: 124789.00, date: 'Dec 21, 2025', time: '03:42 AM', status: 'Flagged', reason: 'Unrecognized merchant' },
    { id: 102, merchant: 'Luxury Boutique', category: 'Shopping', location: 'Dubai, UAE', amount: 89250.00, date: 'Dec 20, 2025', time: '11:23 PM', status: 'Flagged', reason: 'Transaction from new location' },
    { id: 103, merchant: 'Coffee House', category: 'Food & Dining', location: 'Mumbai, India', amount: 450.00, date: 'Dec 20, 2025', time: '08:30 AM', status: 'Normal', reason: null },
    { id: 104, merchant: 'StreamingService Pro', category: 'Entertainment', location: 'Online', amount: 4999.00, date: 'Dec 19, 2025', time: '08:15 PM', status: 'Flagged', reason: 'Duplicate charge detected' },
    { id: 105, merchant: 'Grocery Store', category: 'Groceries', location: 'Delhi, India', amount: 2560.00, date: 'Dec 19, 2025', time: '06:00 PM', status: 'Normal', reason: null }
  ]);

  // --- ACTIONS ---
  const handleDismiss = (id) => setAlerts(alerts.filter(alert => alert.id !== id));
  
  const handleViewDetails = (alert) => {
    setSelectedAlert(alert);
    setShowDetailModal(true);
  };

  const handleMarkSafe = () => {
    if (selectedAlert) handleDismiss(selectedAlert.id);
    setShowDetailModal(false);
  };

  // --- HELPERS ---
  const formatRupee = (amount) => {
    if (amount === null || amount === undefined) return '';
    return '₹' + amount.toLocaleString('en-IN');
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return { bg: '#FEF2F2', border: '#FCA5A5', text: '#DC2626', badge: '#EF4444' };
      case 'Medium': return { bg: '#FFF7ED', border: '#FDBA74', text: '#EA580C', badge: '#F97316' };
      case 'Low': return { bg: '#FEFCE8', border: '#FDE047', text: '#CA8A04', badge: '#EAB308' };
      default: return { bg: '#FFFFFF', border: '#E5E7EB', text: '#374151', badge: '#6B7280' };
    }
  };

  const filteredAlerts = severityFilter === 'All' ? alerts : alerts.filter(a => a.severity === severityFilter);

  const stats = {
    alerts: alerts.length,
    spikes: alerts.filter(a => a.type.includes('Spike')).length,
    loss: alerts.reduce((acc, curr) => acc + (curr.amount || 0), 0)
  };

  // --- RENDER ---
  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
           <div style={styles.headerIconBox}><ShieldAlert size={24} color="#DC2626"/></div>
           <div>
              <h1 style={styles.title}>Fraud Alert Center</h1>
              <p style={styles.subtitle}>Monitor suspicious activity on your account</p>
           </div>
        </div>
        <button style={styles.notifBtn}><Bell size={16} /> Notifications</button>
      </div>

      {/* SUMMARY CARDS */}
      <div style={styles.summaryGrid}>
         <div style={styles.summaryCard}>
            <div style={styles.summaryValueBlue}>{stats.alerts}</div>
            <div style={styles.summaryLabel}>Active Alerts</div>
         </div>
         <div style={styles.summaryCard}>
            <div style={styles.summaryValueRed}>{stats.spikes}</div>
            <div style={styles.summaryLabel}>Expense Spikes</div>
            <div style={styles.summaryIconBox}><TrendingUp size={16} color="#EA580C"/></div>
         </div>
         <div style={styles.summaryCard}>
            <div style={styles.summaryValueGreen}>{formatRupee(stats.loss)}</div>
            <div style={styles.summaryLabel}>Potential Loss</div>
            <div style={styles.summaryIconBoxGreen}><DollarSign size={16} color="#059669"/></div>
         </div>
      </div>

      {/* CONTROLS */}
      <div style={styles.controlsBar}>
         <div style={styles.tabs}>
            <button style={activeTab === 'alerts' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('alerts')}>
                <ShieldAlert size={16}/> Active Alerts ({stats.alerts})
            </button>
            <button style={activeTab === 'transactions' ? styles.tabActive : styles.tab} onClick={() => setActiveTab('transactions')}>
                Transactions
            </button>
         </div>
         <div style={{position: 'relative'}}>
            <button style={styles.filterBtn} onClick={() => setShowFilterMenu(!showFilterMenu)}>
                <Filter size={16} /> {severityFilter === 'All' ? 'All Severities' : severityFilter} <ChevronDown size={14}/>
            </button>
            {showFilterMenu && (
                <div style={styles.filterMenu}>
                    {['All', 'High', 'Medium', 'Low'].map(opt => (
                        <div key={opt} style={styles.filterOption} onClick={() => { setSeverityFilter(opt); setShowFilterMenu(false); }}>
                            {opt === 'All' ? 'All Severities' : opt}
                            {severityFilter === opt && <CheckCircle size={14} color="#111827"/>}
                        </div>
                    ))}
                </div>
            )}
         </div>
      </div>

      {/* CONTENT */}
      <div style={styles.contentArea}>
         {activeTab === 'alerts' && (
             <div style={styles.listContainer}>
                {filteredAlerts.length > 0 ? (
                    filteredAlerts.map(alert => {
                        const colors = getSeverityColor(alert.severity);
                        const Icon = alert.icon;
                        return (
                            <div key={alert.id} style={{...styles.alertCard, backgroundColor: colors.bg, borderColor: colors.border}}>
                                <div style={styles.alertHeader}>
                                    <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                                        <div style={{...styles.alertIconBox, backgroundColor: colors.bg}}>
                                            <Icon size={20} color={colors.text} />
                                        </div>
                                        <div>
                                            <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                                                <h3 style={{...styles.alertTitle, color: colors.text}}>{alert.type}</h3>
                                                <span style={{...styles.badge, backgroundColor: '#fff', color: colors.text, border: `1px solid ${colors.border}`}}>{alert.severity.toUpperCase()}</span>
                                            </div>
                                            <p style={styles.alertDesc}>{alert.description}</p>
                                        </div>
                                    </div>
                                    <TriangleAlert size={20} color={colors.text} />
                                </div>
                                {(alert.amount || alert.merchant) && (
                                    <div style={styles.detailsGrid}>
                                        {alert.amount && (<div><span style={styles.detailLabel}>Amount:</span><div style={{...styles.detailValue, color: colors.text}}>{formatRupee(alert.amount)}</div></div>)}
                                        {alert.merchant && (<div><span style={styles.detailLabel}>Merchant:</span><div style={{...styles.detailValue, color: colors.text}}>{alert.merchant}</div></div>)}
                                        {alert.location && (<div><span style={styles.detailLabel}>Location:</span><div style={{...styles.detailValue, color: colors.text}}>{alert.location}</div></div>)}
                                        {alert.time && (<div><span style={styles.detailLabel}>Time:</span><div style={{...styles.detailValue, color: colors.text}}>{alert.time}</div></div>)}
                                    </div>
                                )}
                                <div style={styles.cardActions}>
                                    <button style={styles.btnDark} onClick={() => handleViewDetails(alert)}>View Details</button>
                                    <button style={styles.btnLight} onClick={() => handleDismiss(alert.id)}>Dismiss</button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={styles.emptyState}><CheckCircle size={48} color="#10B981" /><h3>All Clear!</h3><p>No active fraud alerts.</p></div>
                )}
             </div>
         )}
         {activeTab === 'transactions' && (
             <div style={styles.listContainer}>
                 <h3 style={styles.sectionTitle}>Recent Transactions</h3>
                 {transactions.map(tx => (
                     <div key={tx.id} style={tx.status === 'Flagged' ? styles.txCardFlagged : styles.txCardNormal}>
                         <div style={styles.txHeader}>
                             <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                                <h4 style={styles.txMerchant}>{tx.merchant}</h4>
                                {tx.status === 'Flagged' ? <span style={styles.flagBadge}><TriangleAlert size={12}/> Flagged</span> : <span style={styles.normalBadge}><CheckCircle size={12}/> Normal</span>}
                             </div>
                             <div style={styles.txAmountRight}>
                                 <span style={{color: tx.status === 'Flagged' ? '#DC2626' : '#111827'}}>{formatRupee(tx.amount)}</span>
                                 <span style={styles.txTime}>{tx.time}</span>
                             </div>
                         </div>
                         <div style={styles.txSubRow}><span>{tx.category}</span><span style={{textAlign:'right'}}>{tx.date}</span></div>
                         <div style={styles.txLocation}>{tx.location}</div>
                         {tx.status === 'Flagged' && <div style={styles.flagReasonBox}><strong>Reason:</strong> {tx.reason}</div>}
                     </div>
                 ))}
             </div>
         )}
      </div>

      {/* DETAIL MODAL */}
      {showDetailModal && selectedAlert && (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <div style={styles.modalHeader}>
                    <div style={{display:'flex', alignItems:'center', gap:'10px'}}><ShieldAlert size={24} color="#DC2626"/><h3 style={{margin:0}}>Alert Details</h3></div>
                    <button onClick={() => setShowDetailModal(false)} style={styles.closeBtn}><X size={20}/></button>
                </div>
                <div style={styles.modalBody}>
                    <div style={{backgroundColor:'#FEF2F2', border:'1px solid #FECACA', borderRadius:'8px', padding:'16px', color:'#991B1B', marginBottom:'20px'}}>
                        <strong>{selectedAlert.severity.toUpperCase()} SEVERITY</strong>
                        <p style={{margin:'4px 0 0 0', fontSize:'14px'}}>{selectedAlert.description}</p>
                    </div>
                    <div style={styles.modalGrid}>
                        <div style={styles.modalItem}><MapPin size={16} color="#6B7280"/><div><span style={styles.modalLabel}>Location</span><div style={styles.modalValue}>{selectedAlert.location || 'Unknown'}</div></div></div>
                        <div style={styles.modalItem}><Clock size={16} color="#6B7280"/><div><span style={styles.modalLabel}>Time</span><div style={styles.modalValue}>{selectedAlert.time || 'N/A'}</div></div></div>
                        <div style={styles.modalItem}><CreditCard size={16} color="#6B7280"/><div><span style={styles.modalLabel}>Merchant</span><div style={styles.modalValue}>{selectedAlert.merchant || 'N/A'}</div></div></div>
                        <div style={styles.modalItem}><Shield size={16} color="#6B7280"/><div><span style={styles.modalLabel}>Reason</span><div style={styles.modalValue}>{selectedAlert.reason}</div></div></div>
                    </div>
                </div>
                <div style={styles.modalFooter}>
                    <button onClick={handleMarkSafe} style={styles.btnLight}>Mark Safe</button>
                    <button onClick={() => setShowDetailModal(false)} style={styles.btnDanger}>Block Card</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '32px', backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  headerIconBox: { width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #FECACA' },
  title: { fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 },
  subtitle: { color: '#6B7280', fontSize: '14px', marginTop: '4px' },
  notifBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: '#fff', border: '1px solid #D1D5DB', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', color: '#374151' },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' },
  summaryCard: { backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #E5E7EB', position: 'relative' },
  summaryValueBlue: { fontSize: '28px', fontWeight: 'bold', color: '#2563EB', marginBottom: '4px' },
  summaryValueRed: { fontSize: '28px', fontWeight: 'bold', color: '#DC2626', marginBottom: '4px' },
  summaryValueGreen: { fontSize: '28px', fontWeight: 'bold', color: '#059669', marginBottom: '4px' },
  summaryLabel: { fontSize: '14px', color: '#6B7280' },
  summaryIconBox: { position: 'absolute', top: '24px', right: '24px', width: '32px', height: '32px', backgroundColor: '#FFF7ED', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  summaryIconBoxGreen: { position: 'absolute', top: '24px', right: '24px', width: '32px', height: '32px', backgroundColor: '#ECFDF5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  controlsBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  tabs: { display: 'flex', gap: '12px' },
  tab: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', border: 'none', backgroundColor: 'transparent', color: '#6B7280', cursor: 'pointer', fontWeight: '500', fontSize: '14px' },
  tabActive: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '20px', border: '1px solid #E5E7EB', backgroundColor: '#fff', color: '#111827', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  filterBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#F3F4F6', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#374151', fontSize: '14px', fontWeight: '500' },
  filterMenu: { position: 'absolute', top: '110%', right: 0, width: '180px', backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, padding: '4px' },
  filterOption: { padding: '10px 12px', fontSize: '14px', color: '#374151', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '6px' },
  contentArea: { display: 'flex', flexDirection: 'column', gap: '20px' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '16px' },
  alertCard: { borderRadius: '16px', border: '1px solid', padding: '24px' },
  alertHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
  alertIconBox: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  alertTitle: { margin: 0, fontSize: '16px', fontWeight: 'bold' },
  badge: { fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px' },
  alertDesc: { margin: '4px 0 0 0', fontSize: '14px', color: '#4B5563' },
  detailsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' },
  detailLabel: { fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '2px' },
  detailValue: { fontSize: '14px', fontWeight: '600' },
  cardActions: { display: 'flex', gap: '12px' },
  btnDark: { backgroundColor: '#111827', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' },
  btnLight: { backgroundColor: '#fff', color: '#374151', border: '1px solid #D1D5DB', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' },
  sectionTitle: { fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '8px' },
  txCardFlagged: { backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '16px' },
  txCardNormal: { backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px' },
  txHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' },
  txMerchant: { fontSize: '15px', fontWeight: '600', color: '#111827', margin: 0 },
  flagBadge: { backgroundColor: '#DC2626', color: '#fff', fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px' },
  normalBadge: { backgroundColor: '#F3F4F6', color: '#374151', fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #E5E7EB' },
  txAmountRight: { textAlign: 'right', fontWeight: '700', fontSize: '15px' },
  txTime: { display: 'block', fontSize: '11px', color: '#6B7280', fontWeight: '400', marginTop: '2px' },
  txSubRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6B7280', marginBottom: '4px' },
  txLocation: { fontSize: '13px', color: '#6B7280' },
  flagReasonBox: { marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #FECACA', fontSize: '13px', color: '#991B1B' },
  emptyState: { padding: '40px', textAlign: 'center', color: '#6B7280', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', borderRadius: '16px', padding: '24px', width: '500px', maxWidth: '90%' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid #F3F4F6', paddingBottom: '16px' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' },
  modalBody: { marginBottom: '24px' },
  modalGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  modalItem: { display: 'flex', gap: '12px', alignItems: 'flex-start' },
  modalLabel: { fontSize: '12px', color: '#6B7280', display: 'block', marginBottom: '2px' },
  modalValue: { fontSize: '14px', fontWeight: '600', color: '#111827' },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: '12px' },
  btnDanger: { backgroundColor: '#DC2626', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' }
};

export default FraudScreen;