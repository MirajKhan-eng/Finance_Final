import React, { useState, useMemo, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Plus, X, Target, Calendar, 
  AlertCircle, ArrowUpRight, Download, Activity,
  ChevronDown 
} from 'lucide-react';

// Combined import for Trends data
import { historicalTrends } from '../data/mockInsights'; 

const InsightsScreen = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedHistory, setSelectedHistory] = useState('current');
  
  // 1. NEW: Loading State
  const [loading, setLoading] = useState(true);

  // 2. NEW: Simulate Data Fetching on Mount
  useEffect(() => {
    const loadData = async () => {
        setLoading(true);
        // Simulate a network request delay (0.8 seconds)
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoading(false);
    };
    loadData();
  }, []);

  // --- DYNAMIC DATA GENERATOR ---
  const getDashboardData = (period) => {
    const multipliers = {
        'current': 1,
        '1mo': 0.9,
        '2mo': 0.85,
        '3mo': 1.1,
        '4mo': 0.95,
        '5mo': 0.8,
        '6mo': 0.75
    };
    
    const m = multipliers[period] || 1;

    // KPI Cards Data
    const kpi = {
        revenue: 328000 * m,
        expenses: 214000 * m,
        profit: (328000 - 214000) * m,
        margin: 34.8 + (m > 1 ? 2 : -1),
        revChange: 12.5 * m,
        expChange: -3.2 * m
    };

    // Overview Charts Data
    const overviewGraph = [
        { name: 'Week 1', revenue: 45000 * m, expenses: 32000 * m, cashFlow: 13000 * m, growth: 5 * m },
        { name: 'Week 2', revenue: 52000 * m, expenses: 35000 * m, cashFlow: 17000 * m, growth: 8 * m },
        { name: 'Week 3', revenue: 48000 * m, expenses: 33000 * m, cashFlow: 15000 * m, growth: 6.5 * m },
        { name: 'Week 4', revenue: 61000 * m, expenses: 38000 * m, cashFlow: 23000 * m, growth: 12 * m },
    ];

    // Pie Chart Data
    const pieData = [
        { name: 'Salaries', value: 45000 * m, color: '#EC4899' },
        { name: 'Operations', value: 25000 * m, color: '#8B5CF6' },
        { name: 'Marketing', value: 15000 * m, color: '#3B82F6' },
        { name: 'Technology', value: 12000 * m, color: '#10B981' },
        { name: 'Other', value: 8000 * m, color: '#F59E0B' },
    ];

    return { kpi, overviewGraph, pieData };
  };

  const { kpi, overviewGraph, pieData } = useMemo(() => getDashboardData(selectedHistory), [selectedHistory]);

  // --- GOALS STATE ---
  const [goals, setGoals] = useState([
    {
      id: 1, title: "MacBook Pro M3", category: "Luxury", current: 1200, target: 3500, deadline: "2024-12-25",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000", monthlyContrib: 400
    },
    {
      id: 2, title: "Emergency Fund", category: "Emergency Fund", current: 4500, target: 10000, deadline: "2025-06-01",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000", monthlyContrib: 500
    },
    {
      id: 3, title: "Vacation to Japan", category: "Luxury", current: 800, target: 5000, deadline: "2025-08-15",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000", monthlyContrib: 600
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFundModal, setShowFundModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  
  const [newGoal, setNewGoal] = useState({ 
    title: '', category: 'Necessity', target: '', deadline: '', monthly: '', image: '' 
  });
  
  const [fundAmount, setFundAmount] = useState('');

  // --- HANDLERS ---
  const formatRupee = (val) => `₹${Math.round(val).toLocaleString()}`;

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return;
    setGoals([...goals, { 
      ...newGoal, 
      id: Date.now(), 
      current: 0, 
      target: Number(newGoal.target), 
      monthlyContrib: Number(newGoal.monthly) || 0,
      image: newGoal.image || "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1000"
    }]);
    setShowCreateModal(false); 
    setNewGoal({ title: '', category: 'Necessity', target: '', deadline: '', monthly: '', image: '' });
  };

  const handleAddFunds = () => {
    if (!selectedGoal || !fundAmount) return;
    setGoals(goals.map(g => g.id === selectedGoal.id ? { ...g, current: g.current + Number(fundAmount) } : g));
    setShowFundModal(false);
  };

  const handleExport = () => {
    let dataToExport = [];
    let fileName = 'financial_data.csv';

    if (activeTab === 'Trends') {
        const trend = historicalTrends[selectedHistory];
        dataToExport = trend.data.map(d => ({
            Day: d.day,
            ActualSpending: d.past,
            PredictedSpending: d.forecast || 0
        }));
        fileName = `trends_${selectedHistory}.csv`;
    } else if (activeTab === 'Expense Breakdown') {
        dataToExport = pieData.map(d => ({
            Category: d.name,
            Amount: d.value
        }));
        fileName = 'expense_breakdown.csv';
    } else if (activeTab === 'Goals') {
        dataToExport = goals.map(g => ({
            Goal: g.title,
            Target: g.target,
            Saved: g.current,
            Deadline: g.deadline
        }));
        fileName = 'goals.csv';
    } else {
        dataToExport = overviewGraph.map(d => ({
            Period: d.name,
            Revenue: d.revenue,
            Expenses: d.expenses,
            CashFlow: d.cashFlow
        }));
        fileName = `overview_${selectedHistory}.csv`;
    }

    const headers = Object.keys(dataToExport[0]);
    const csvContent = [
        headers.join(','),
        ...dataToExport.map(row => headers.map(fieldName => row[fieldName]).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  // 3. NEW: Show Loading UI
  if (loading) {
    return (
        <div style={{padding: '40px', textAlign: 'center', color: '#6B7280'}}>
            <h3>Analyzing Financial Insights...</h3>
        </div>
    );
  }

  // --- RENDER CONTENT ---
  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div style={styles.gridContainer}>
            <div style={styles.chartCard}>
              <h3 style={styles.cardTitle}>Revenue vs Expenses ({selectedHistory === 'current' ? 'This Month' : 'Past Trends'})</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={overviewGraph}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#6B7280'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill:'#6B7280'}} />
                    <Tooltip contentStyle={styles.tooltip} formatter={(val) => formatRupee(val)} />
                    <Legend verticalAlign="bottom" height={36} />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={{r:4}} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} dot={{r:4}} name="Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div style={styles.chartCard}>
              <h3 style={styles.cardTitle}>Expense Distribution</h3>
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(val) => formatRupee(val)} />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.cardTitle}>Cash Flow Trend</h3>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={overviewGraph}>
                    <defs>
                      <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#6B7280'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill:'#6B7280'}} />
                    <Tooltip contentStyle={styles.tooltip} formatter={(val) => formatRupee(val)} />
                    <Area type="monotone" dataKey="cashFlow" stroke="#10B981" fillOpacity={1} fill="url(#colorCash)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={styles.chartCard}>
              <h3 style={styles.cardTitle}>Weekly Growth Rate (%)</h3>
              <div style={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overviewGraph}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={styles.tooltip} />
                    <Bar dataKey="growth" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px'}}>
               <InsightCard icon={TrendingUp} color="#10B981" bg="#ECFDF5" title="Revenue Status" desc={`Your revenue is ${kpi.revChange > 0 ? 'up' : 'down'} by ${Math.abs(kpi.revChange).toFixed(1)}% this period.`} />
               <InsightCard icon={AlertCircle} color="#F59E0B" bg="#FFFBEB" title="Expense Alert" desc={`Expenses are ${kpi.expChange > 0 ? 'increasing' : 'controlled'}. Review marketing costs.`} />
               <InsightCard icon={Activity} color="#3B82F6" bg="#EFF6FF" title="Cash Flow" desc="Cash flow remains positive relative to expenses." />
            </div>
          </div>
        );

      case 'Revenue Analysis':
        return (
           <div style={styles.chartCard}>
              <h3 style={styles.cardTitle}>Detailed Revenue Analysis</h3>
              <div style={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={overviewGraph}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={styles.tooltip} formatter={(val) => formatRupee(val)} />
                    <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>
        );

      case 'Expense Breakdown':
        return (
          <div style={styles.gridContainer}>
             <div style={styles.chartCard}>
                <h3 style={styles.cardTitle}>Expense Distribution</h3>
                <div style={{ height: 350 }}>
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={2} dataKey="value">
                         {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                       </Pie>
                       <Tooltip formatter={(val) => formatRupee(val)} />
                     </PieChart>
                   </ResponsiveContainer>
                </div>
             </div>
             <div style={styles.chartCard}>
                <h3 style={styles.cardTitle}>Category Details</h3>
                <div style={{display:'flex', flexDirection:'column', gap:'20px', padding: '10px'}}>
                   {pieData.map(item => (
                      <div key={item.name} style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingBottom:'15px', borderBottom:'1px solid #F3F4F6'}}>
                         <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            <div style={{width:'12px', height:'12px', borderRadius:'50%', backgroundColor: item.color}}></div>
                            <span style={{fontWeight:'500', color:'#374151'}}>{item.name}</span>
                         </div>
                         <span style={{fontWeight:'bold', color:'#111827'}}>{formatRupee(item.value)}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        );

      case 'Trends':
        const currentData = historicalTrends[selectedHistory];
        const isPast = selectedHistory !== 'current';
        const diff = currentData.actualTotal - currentData.predictedTotal;

        return (
           <div style={styles.chartCard}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'20px'}}>
                 <div>
                    <h3 style={styles.cardTitle}>Expense Performance Review</h3>
                    <p style={{fontSize:'13px', color:'#6B7280', margin:0}}>
                        Comparing actual spending vs AI predictions for <strong>{currentData.label}</strong>
                    </p>
                 </div>
              </div>

              <div style={{ height: 350 }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                       <defs>
                          <linearGradient id="colorPast" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#111827" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#111827" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                       <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:'#6B7280', fontSize: 12}} interval={0} />
                       <YAxis axisLine={false} tickLine={false} tick={{fill:'#6B7280', fontSize: 12}} tickFormatter={(val) => `₹${val}`} />
                       <Tooltip contentStyle={styles.tooltip} formatter={(val) => formatRupee(val)} />
                       
                       <Area 
                          type="monotone" 
                          dataKey="past" 
                          stroke="#111827" 
                          fill="url(#colorPast)" 
                          strokeWidth={3} 
                          name="Actual Spending" 
                       />

                       {!isPast && (
                           <Area 
                              type="monotone" 
                              dataKey="forecast" 
                              stroke="#8B5CF6" 
                              fill="url(#colorForecast)" 
                              strokeWidth={3} 
                              strokeDasharray="5 5" 
                              name="AI Projected" 
                           />
                       )}
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div style={{marginTop: '24px', padding: '20px', backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB'}}>
                 <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px'}}>
                     <h4 style={{fontSize:'15px', fontWeight:'600', color:'#111827', margin:0}}>
                        {isPast ? 'AI Accuracy Report' : 'Live Forecast Analysis'}
                     </h4>
                     <span style={{
                         fontSize:'12px', fontWeight:'600', padding:'4px 8px', borderRadius:'6px',
                         backgroundColor: diff > 0 ? '#FEF2F2' : '#ECFDF5',
                         color: diff > 0 ? '#DC2626' : '#059669'
                     }}>
                        {diff > 0 ? `Over Prediction by ${formatRupee(diff)}` : `Under Prediction by ${formatRupee(Math.abs(diff))}`}
                     </span>
                 </div>
                 
                 <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                     <div>
                        <div style={{fontSize:'12px', color:'#6B7280', marginBottom:'4px'}}>AI Predicted Expense</div>
                        <div style={{fontSize:'20px', fontWeight:'700', color:'#4B5563'}}>{formatRupee(currentData.predictedTotal)}</div>
                     </div>
                     <div>
                        <div style={{fontSize:'12px', color:'#6B7280', marginBottom:'4px'}}>Actual Expense</div>
                        <div style={{fontSize:'20px', fontWeight:'700', color:'#111827'}}>{formatRupee(currentData.actualTotal)}</div>
                     </div>
                 </div>

                 <p style={{fontSize:'13px', color:'#4B5563', marginTop:'16px', lineHeight:'1.5', borderTop:'1px solid #E5E7EB', paddingTop:'12px'}}>
                    {isPast ? (
                        <>In {currentData.label}, you spent <strong>{formatRupee(currentData.actualTotal)}</strong> against a prediction of <strong>{formatRupee(currentData.predictedTotal)}</strong>.</>
                    ) : (
                        <>Based on current trends, you are projected to spend <strong>{formatRupee(currentData.predictedTotal)}</strong> by month end.</>
                    )}
                 </p>
              </div>
           </div>
        );

      case 'Goals':
      default:
        return (
          <>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Your Savings Goals</h2>
                <p style={styles.sectionSubtitle}>Track and achieve your financial objectives</p>
              </div>
              <button style={styles.blackBtn} onClick={() => setShowCreateModal(true)}>
                <Plus size={18} /> Create New Goal
              </button>
            </div>

            <div style={styles.assistantCard}>
              <h3 style={styles.cardTitle}>Goal Assistant</h3>
              <div style={styles.statsRow}>
                <StatItem label="Total Goals" value={goals.length} />
                <StatItem label="Total Target" value={formatRupee(goals.reduce((acc, curr) => acc + curr.target, 0))} />
                <StatItem label="Total Saved" value={formatRupee(goals.reduce((acc, curr) => acc + curr.current, 0))} color="#059669" />
              </div>
              <div style={styles.alertBoxBlue}>
                <ArrowUpRight size={20} color="#2563EB" />
                <div><span style={styles.alertTitle}>Savings Recommendation</span><p style={styles.alertText}>We recommend saving ₹3,800/mo (20% of funds).</p></div>
              </div>
            </div>

            <h3 style={styles.subHeading}>Active Goals</h3>
            <div style={styles.goalsGrid}>
              {goals.map(goal => (
                <div key={goal.id} style={styles.goalCard}>
                  <img src={goal.image} alt={goal.title} style={styles.cardImage} />
                  <div style={styles.cardContent}>
                    <div style={styles.cardHeader}>
                      <h4 style={styles.goalTitle}>{goal.title}</h4>
                      <span style={styles.tagPurple}>{goal.category}</span>
                    </div>
                    <div style={styles.progressSection}>
                      <div style={styles.progressLabels}><span>Progress</span><span style={styles.progressNumbers}>{formatRupee(goal.current)} / {formatRupee(goal.target)}</span></div>
                      <div style={styles.progressBarBg}><div style={{...styles.progressBarFill, width: `${Math.min((goal.current / goal.target) * 100, 100)}%`}}></div></div>
                      <span style={styles.percentText}>{((goal.current / goal.target) * 100).toFixed(1)}% Complete</span>
                    </div>
                    <button style={styles.addFundsBtn} onClick={() => { setSelectedGoal(goal); setShowFundModal(true); }}>Add Funds</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>Financial Insights</h1>
          <p style={styles.pageSubtitle}>Comprehensive analysis of your financial performance</p>
        </div>
        <div style={styles.headerActions}>
          
          <div style={{position:'relative'}}>
             <select 
                value={selectedHistory}
                onChange={(e) => setSelectedHistory(e.target.value)}
                style={styles.dropdownBtn}
             >
                <option value="current">Current Month</option>
                <option value="1mo">Last Month</option>
                <option value="2mo">2 Months Ago</option>
                <option value="3mo">3 Months Ago</option>
                <option value="4mo">4 Months Ago</option>
                <option value="5mo">5 Months Ago</option>
                <option value="6mo">6 Months Ago</option>
             </select>
             <ChevronDown size={14} style={{position:'absolute', right:'10px', top:'12px', pointerEvents:'none', color:'#374151'}}/>
          </div>

          <button style={styles.smPrimaryBtn} onClick={handleExport}>
             <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div style={styles.kpiGrid}>
        <KpiCard title="Total Revenue" value={formatRupee(kpi.revenue)} change={kpi.revChange} />
        <KpiCard title="Total Expenses" value={formatRupee(kpi.expenses)} change={kpi.expChange} inverse />
        <KpiCard title="Net Profit" value={formatRupee(kpi.profit)} change={kpi.revChange + 5} />
        <KpiCard title="Profit Margin" value={`${kpi.margin.toFixed(1)}%`} change={1.2} />
      </div>

      <div style={styles.tabs}>
        {['Overview', 'Revenue Analysis', 'Expense Breakdown', 'Trends', 'Goals'].map((tab) => (
            <button key={tab} style={activeTab === tab ? styles.tabActive : styles.tab} onClick={() => setActiveTab(tab)}>{tab}</button>
        ))}
      </div>

      <div style={styles.contentArea}>{renderContent()}</div>

      {showCreateModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
                <div><h3 style={{margin:0, fontSize:'18px'}}>Create New Goal</h3><p style={{margin:0, fontSize:'14px', color:'#6B7280'}}>Set a savings goal and track your progress.</p></div>
                <button onClick={() => setShowCreateModal(false)} style={styles.closeBtn}><X size={20}/></button>
            </div>
            <div style={styles.modalBody}>
               <label style={styles.label}>Goal Name *</label><input style={styles.input} value={newGoal.title} onChange={e => setNewGoal({...newGoal, title: e.target.value})} />
               <label style={styles.label}>Category *</label><select style={styles.input} value={newGoal.category} onChange={e => setNewGoal({...newGoal, category: e.target.value})}><option value="Necessity">Necessity</option><option value="Luxury">Luxury</option><option value="Emergency Fund">Emergency Fund</option><option value="Savings">Savings</option></select>
               <label style={styles.label}>Target Amount (₹) *</label><input type="number" style={styles.input} value={newGoal.target} onChange={e => setNewGoal({...newGoal, target: e.target.value})} />
               <label style={styles.label}>Target Date *</label><input type="date" style={styles.input} value={newGoal.deadline} onChange={e => setNewGoal({...newGoal, deadline: e.target.value})} />
            </div>
            <div style={styles.modalFooter}><button onClick={() => setShowCreateModal(false)} style={styles.cancelBtn}>Cancel</button><button onClick={handleAddGoal} style={styles.blackBtn}>Create Goal</button></div>
          </div>
        </div>
      )}

      {showFundModal && selectedGoal && (
        <div style={styles.modalOverlay}>
           <div style={styles.modal}>
              <div style={styles.modalHeader}>
                  <div><h3 style={{margin:0}}>Add Funds</h3><p style={{margin:0, fontSize:'14px', color:'#6B7280'}}>To "{selectedGoal.title}"</p></div>
                  <button onClick={() => setShowFundModal(false)} style={styles.closeBtn}><X size={20}/></button>
              </div>
              <input type="number" placeholder="Enter Amount" style={styles.input} value={fundAmount} onChange={e => setFundAmount(e.target.value)} />
              <div style={styles.modalFooter}><button onClick={() => setShowFundModal(false)} style={styles.cancelBtn}>Cancel</button><button onClick={handleAddFunds} style={styles.blackBtn}>Add Funds</button></div>
           </div>
        </div>
      )}
    </div>
  );
};

// --- SUB-COMPONENTS ---
const KpiCard = ({ title, value, change, inverse }) => {
  const isPositive = change > 0;
  const color = inverse ? (isPositive ? '#DC2626' : '#059669') : (isPositive ? '#059669' : '#DC2626');
  return (
    <div style={styles.card}>
      <span style={styles.cardLabel}>{title}</span>
      <div style={styles.kpiValue}>{value}</div>
      <div style={{...styles.kpiChange, color}}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />} {Math.abs(change).toFixed(1)}% <span style={{color: '#6B7280', fontWeight: '400', marginLeft: '4px'}}>vs last period</span>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, color }) => (
    <div style={styles.statItem}><span style={styles.statLabel}>{label}</span><span style={{...styles.statValue, color: color || '#111827'}}>{value}</span></div>
);

const InsightCard = ({ icon: Icon, color, bg, title, desc }) => (
    <div style={{backgroundColor: bg, padding:'16px', borderRadius:'12px', border:`1px solid ${color}20`}}>
        <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px', color: color, fontWeight:'600'}}>
            <Icon size={18} /> {title}
        </div>
        <p style={{fontSize:'13px', color:'#4B5563', margin:0, lineHeight:'1.4'}}>{desc}</p>
    </div>
);

// --- STYLES ---
const styles = {
  container: { padding: '32px', backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'Inter, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '24px', alignItems:'flex-start' },
  pageTitle: { fontSize: '26px', fontWeight: 'bold', color: '#111827', margin: 0 },
  pageSubtitle: { color: '#6B7280', marginTop: '4px', fontSize:'14px' },
  headerActions: { display: 'flex', gap: '10px' },
  dropdownBtn: { 
      backgroundColor: '#fff', color: '#374151', border: '1px solid #D1D5DB', 
      padding: '8px 32px 8px 12px', borderRadius: '6px', cursor: 'pointer', 
      fontSize: '13px', fontWeight: '500', appearance: 'none', outline: 'none' 
  },
  smPrimaryBtn: { backgroundColor: '#111827', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '500' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  cardLabel: { fontSize: '13px', color: '#6B7280', fontWeight: '500' },
  kpiValue: { fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: '8px 0' },
  kpiChange: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600' },
  tabs: { display: 'flex', gap: '8px', borderBottom: '1px solid #E5E7EB', marginBottom: '24px' },
  tab: { padding: '10px 16px', cursor: 'pointer', color: '#6B7280', fontWeight: '500', background:'none', border:'none', borderBottom: '2px solid transparent', fontSize: '14px' },
  tabActive: { padding: '10px 16px', cursor: 'pointer', color: '#111827', fontWeight: '700', background:'none', border:'none', borderBottom: '2px solid #111827', fontSize: '14px' },
  gridContainer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  chartCard: { backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E5E7EB' },
  cardTitle: { fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '20px' },
  tooltip: { backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', color: '#111827', margin: 0 },
  sectionSubtitle: { color: '#6B7280', fontSize: '14px' },
  blackBtn: { backgroundColor: '#000', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' },
  assistantCard: { backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E5E7EB', marginBottom: '32px' },
  statsRow: { display: 'flex', gap: '40px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #F3F4F6' },
  statItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
  statLabel: { fontSize: '12px', color: '#6B7280' },
  statValue: { fontSize: '20px', fontWeight: 'bold' },
  alertBoxBlue: { backgroundColor: '#EFF6FF', borderRadius: '8px', padding: '16px', display: 'flex', gap: '12px' },
  alertTitle: { display: 'block', fontSize: '14px', fontWeight: '600', color: '#1F2937' },
  alertText: { fontSize: '13px', color: '#4B5563', margin: 0 },
  subHeading: { fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' },
  goalsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' },
  goalCard: { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' },
  cardImage: { width: '100%', height: '140px', objectFit: 'cover' },
  cardContent: { padding: '20px' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px' },
  goalTitle: { fontSize: '16px', fontWeight: '600' },
  tagPurple: { backgroundColor: '#F3E8FF', color: '#7E22CE', fontSize: '12px', fontWeight: '500', padding: '4px 10px', borderRadius: '20px' },
  progressSection: { marginBottom: '20px' },
  progressLabels: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6B7280', marginBottom: '8px' },
  progressBarBg: { width: '100%', height: '8px', backgroundColor: '#F3F4F6', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' },
  progressBarFill: { height: '100%', backgroundColor: '#111827', borderRadius: '4px' },
  percentText: { fontSize: '12px', color: '#6B7280' },
  addFundsBtn: { width: '100%', backgroundColor: '#111827', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', borderRadius: '16px', padding: '24px', width: '450px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'flex-start' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' },
  modalBody: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' },
  label: { fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' },
  input: { padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px' },
  modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: '12px' },
  cancelBtn: { backgroundColor: '#fff', color: '#374151', border: '1px solid #D1D5DB', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight:'500' },
  quickAdd: { display: 'flex', gap: '8px', marginTop: '10px', marginBottom: '20px' },
  quickBtn: { flex: 1, padding: '8px', border: '1px solid #E5E7EB', backgroundColor: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
};

export default InsightsScreen;