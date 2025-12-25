import React, { useState } from 'react';
import { 
  Heart, 
  Calculator, 
  CreditCard, 
  ShieldCheck, 
  Lightbulb, 
  CheckCircle,
  TrendingUp, 
  Target,      
  Calendar,
  Plus,       
  Trash2
} from 'lucide-react';
import './GuidancePage.css';

const GuidancePage = () => {
  const [activeTab, setActiveTab] = useState('debt');

  // --- GLOBAL STATE ---
  const [income, setIncome] = useState(50000);
  const [expenses, setExpenses] = useState(35000);
  const [emis, setEmis] = useState(15000); 
  const [emergencySavings, setEmergencySavings] = useState(100000);
  const [monthlyInvestments, setMonthlyInvestments] = useState(50000);
  
  // Checkboxes
  const [hasHealthIns, setHasHealthIns] = useState(true);
  const [hasLifeIns, setHasLifeIns] = useState(false);

  // --- DEBT TAB STATE (Crucial for Add/Save to work) ---
  const [debts, setDebts] = useState([
    { id: 1, name: 'Credit Card', balance: 50000, rate: 24, minPayment: 2500 }
  ]);
  const [showAddDebt, setShowAddDebt] = useState(false);
  
  // State for the Form Inputs
  const [newDebt, setNewDebt] = useState({ 
    name: '', 
    balance: '', 
    rate: '', 
    minPayment: '' 
  });

  // Calculate Total EMI dynamically
  const totalDebtEMI = debts.reduce((sum, debt) => sum + Number(debt.minPayment), 0);

  // --- DEBT HANDLERS (The Logic) ---
  const handleAddDebt = () => {
    // 1. Validation: Don't save if empty
    if (!newDebt.name || !newDebt.balance) {
        alert("Please enter at least a Debt Name and Balance.");
        return;
    }

    // 2. Create new object
    const newItem = { 
      id: Date.now(), // Unique ID
      name: newDebt.name, 
      balance: Number(newDebt.balance), 
      rate: Number(newDebt.rate) || 0, // Default to 0 if empty
      minPayment: Number(newDebt.minPayment) || 0 
    };

    // 3. Update List
    setDebts([...debts, newItem]);

    // 4. Reset Form
    setNewDebt({ name: '', balance: '', rate: '', minPayment: '' });
    setShowAddDebt(false);
  };

  const handleDeleteDebt = (id) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  // --- BUDGET STATE ---
  const [selectedSlice, setSelectedSlice] = useState(null);

  // --- INVESTING STATE ---
  const [sipAmount, setSipAmount] = useState(10000);
  const [sipYears, setSipYears] = useState(20);
  const [sipRate, setSipRate] = useState(12);

  // --- RETIREMENT STATE ---
  const [retCurrentAge, setRetCurrentAge] = useState(25);
  const [retRetirementAge, setRetRetirementAge] = useState(60);
  const [retMonthlyExpenses, setRetMonthlyExpenses] = useState(40000);
  const [retCurrentSavings, setRetCurrentSavings] = useState(100000);
  const [retReturnRate, setRetReturnRate] = useState(12);

  // --- HELPER FUNCTIONS ---
  const formatCurrencyShort = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${Math.round(amount).toLocaleString()}`;
  };

  // --- CALCULATORS ---
  const calculateHealthScore = () => {
    let score = 0;
    const savingsRatio = ((income - expenses) / income) * 100;
    if (savingsRatio > 20) score += 30; else if (savingsRatio > 10) score += 20; else if (savingsRatio > 0) score += 10;

    const currentEMI = activeTab === 'debt' ? totalDebtEMI : emis;
    const emiRatio = (currentEMI / income) * 100;
    if (emiRatio < 30) score += 25; else if (emiRatio < 40) score += 15; else score += 5;

    const monthsCovered = emergencySavings / expenses;
    if (monthsCovered >= 6) score += 20; else if (monthsCovered >= 3) score += 10; else score += 5;

    const investmentRatio = (monthlyInvestments / income) * 100;
    if (investmentRatio > 20) score += 15; else if (investmentRatio > 10) score += 10; else if (investmentRatio > 0) score += 5;

    if (hasHealthIns) score += 5;
    if (hasLifeIns) score += 5;

    return Math.min(score, 100);
  };
  const healthScore = calculateHealthScore();
  const getGrade = (score) => {
    if (score >= 80) return { grade: 'A', text: 'Excellent' };
    if (score >= 60) return { grade: 'B', text: 'Good' };
    if (score >= 40) return { grade: 'C', text: 'Average' };
    return { grade: 'D', text: 'Needs Attention' };
  };
  const gradeInfo = getGrade(healthScore);

  const calculateSIP = (p, n, r) => {
    const i = r / 100 / 12;
    const months = n * 12;
    const invested = p * months;
    const value = p * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    return { invested, value, returns: value - invested };
  };
  const sipData = calculateSIP(sipAmount, sipYears, sipRate);

  const calculateRetirement = () => {
    const yearsToRetire = Math.max(1, retRetirementAge - retCurrentAge);
    const annualExpenses = retMonthlyExpenses * 12;
    const requiredCorpus = annualExpenses * 25; 
    const r = retReturnRate / 100;
    const fvCurrentSavings = retCurrentSavings * Math.pow((1 + r), yearsToRetire);
    const shortfall = Math.max(0, requiredCorpus - fvCurrentSavings);
    const i = r / 12;
    const n = yearsToRetire * 12;
    let monthlySIP = 0;
    if (shortfall > 0) {
      monthlySIP = (shortfall * i) / (Math.pow(1 + i, n) - 1);
    }
    return { yearsToRetire, requiredCorpus, monthlySIP, fvCurrentSavings, annualExpenses };
  };
  const retData = calculateRetirement();

  const calculateCostOfDelay = () => {
    const delays = [0, 5, 10, 15, 20];
    const data = delays.map(delay => {
       const startAge = retCurrentAge + delay;
       if (startAge >= retRetirementAge) return { age: startAge, sip: 0 };
       const years = retRetirementAge - startAge;
       const r = retReturnRate / 100;
       const i = r / 12;
       const n = years * 12;
       const sip = (retData.requiredCorpus - retData.fvCurrentSavings) * i / (Math.pow(1 + i, n) - 1);
       return { age: startAge, sip: Math.max(0, sip) };
    });
    return data;
  };
  const delayData = calculateCostOfDelay();
  const maxDelaySIP = Math.max(...delayData.map(d => d.sip));

  // SVG Helpers
  const getCoordinatesForPercent = (percent, radius, center) => {
    const x = center + radius * Math.cos(2 * Math.PI * percent);
    const y = center + radius * Math.sin(2 * Math.PI * percent);
    return [x, y];
  };
  const size = 220; const center = size / 2; const strokeWidth = 40; const radius = (size - strokeWidth) / 2 - 20; const circumference = 2 * Math.PI * radius;
  const slices = [
    { id: 'needs', percent: 0.5, color: '#3b82f6', label: 'Needs', startOffset: 0, centerPercent: 0.25 },
    { id: 'wants', percent: 0.3, color: '#10b981', label: 'Wants', startOffset: 0.5, centerPercent: 0.65 },
    { id: 'savings', percent: 0.2, color: '#a855f7', label: 'Savings', startOffset: 0.8, centerPercent: 0.9 },
  ];
  const handleSliceClick = (id) => setSelectedSlice(selectedSlice === id ? null : id);
  const graphPath = (() => {
    const pointsInvested = []; const pointsValue = []; const width = 600; const height = 250; const padding = 30;
    const maxValue = sipData.value * 1.1;
    for (let yr = 0; yr <= sipYears; yr++) {
      const x = padding + (yr / sipYears) * (width - 2 * padding);
      const d = calculateSIP(sipAmount, yr, sipRate);
      pointsInvested.push(`${x},${height - padding - (d.invested / maxValue) * (height - 2 * padding)}`);
      pointsValue.push(`${x},${height - padding - (d.value / maxValue) * (height - 2 * padding)}`);
    }
    return { invested: pointsInvested.join(' '), value: pointsValue.join(' ') };
  })();

  const renderSidebar = () => (
    <div className="tips-sidebar">
      <div className="sidebar-header"><Lightbulb size={20} color="#eab308" />Quick Tips</div>
      {activeTab === 'health' && (<><div className="tip-card blue"><h4>Aim for 80+</h4><p>A score above 80 indicates excellent financial health.</p></div><div className="tip-card green"><h4>Improve Gradually</h4><p>Focus on one area at a time to improve your score.</p></div></>)}
      {activeTab === 'budget' && <div className="tip-card orange"><h4>Track Everything</h4><p>Monitor your spending for 30 days before budgeting.</p></div>}
      {activeTab === 'debt' && (<><div className="tip-card orange"><h4>High Interest First</h4><p>Always prioritize paying off high-interest debt like credit cards (Avalanche Method).</p></div><div className="tip-card red"><h4>Avoid New Debt</h4><p>Stop taking on new debt while you are aggressively paying off existing loans.</p></div></>)}
      {activeTab === 'investing' && (<><div className="tip-card blue"><h4>Start Today</h4><p>Even ₹500/month can grow significantly via compounding.</p></div><div className="tip-card purple"><h4>Stay Invested</h4><p>Don't panic during market downturns - time in market beats timing the market.</p></div></>)}
      {activeTab === 'retirement' && (<><div className="tip-card purple"><h4>Never Too Early</h4><p>Starting at 25 vs 35 can save you lakhs in required monthly contributions.</p></div><div className="tip-card red"><h4>Employer Match</h4><p>Always contribute enough to EPF/NPS to get full employer matching.</p></div></>)}
      <div className="tip-card blue"><h4><span role="img" aria-label="star">✨</span> Pro Tip</h4><p>Use all the calculators together to create a comprehensive financial plan.</p></div>
    </div>
  );

  return (
    <div className="guidance-container">
      <div className="page-header">
        <h1>Finance Guidance</h1>
        <p>Interactive tools to plan your financial future.</p>
      </div>

      <div className="tabs-container">
        <button className={`tab-btn ${activeTab === 'health' ? 'active' : ''}`} onClick={() => setActiveTab('health')}><Heart size={18} /> Health Score</button>
        <button className={`tab-btn ${activeTab === 'budget' ? 'active' : ''}`} onClick={() => setActiveTab('budget')}><Calculator size={18} /> Budgeting</button>
        <button className={`tab-btn ${activeTab === 'debt' ? 'active' : ''}`} onClick={() => setActiveTab('debt')}><CreditCard size={18} /> Debt</button>
        <button className={`tab-btn ${activeTab === 'emergency' ? 'active' : ''}`} onClick={() => setActiveTab('emergency')}><ShieldCheck size={18} /> Emergency</button>
        <button className={`tab-btn ${activeTab === 'investing' ? 'active' : ''}`} onClick={() => setActiveTab('investing')}><TrendingUp size={18} /> Investing</button>
        <button className={`tab-btn ${activeTab === 'retirement' ? 'active' : ''}`} onClick={() => setActiveTab('retirement')}><Target size={18} /> Retirement</button>
      </div>

      <div className="guidance-grid">
        <div className="main-content">
          
          {/* TAB 1: HEALTH */}
          {activeTab === 'health' && (
             <div className="main-card">
               <div className="section-title">Financial Health Score</div>
               <div className="score-display">
                 <div className="big-score">{healthScore}</div>
                 <div className="score-grade"><CheckCircle size={28} color="#2563eb" weight="fill" />Grade {gradeInfo.grade}</div>
                 <div className="score-text">{gradeInfo.text}</div>
                 <div className="progress-bar-container"><div className="progress-fill" style={{width: `${healthScore}%`}}></div></div>
               </div>
               <div className="input-row">
                 <div className="input-group"><label>Monthly Income</label><input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} /></div>
                 <div className="input-group"><label>Monthly Expenses</label><input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} /></div>
               </div>
               <div className="input-row">
                 <div className="input-group"><label>Total EMIs</label><input type="number" value={emis} onChange={(e) => setEmis(Number(e.target.value))} /></div>
                 <div className="input-group"><label>Emergency Fund</label><input type="number" value={emergencySavings} onChange={(e) => setEmergencySavings(Number(e.target.value))} /></div>
               </div>
               <div className="input-row single-input">
                 <div className="input-group"><label>Monthly Investments</label><input type="number" value={monthlyInvestments} onChange={(e) => setMonthlyInvestments(Number(e.target.value))} /></div>
               </div>
               <div className="checkbox-group">
                 <label className="checkbox-item"><input type="checkbox" checked={hasHealthIns} onChange={(e) => setHasHealthIns(e.target.checked)} />I have Health Insurance</label>
                 <label className="checkbox-item"><input type="checkbox" checked={hasLifeIns} onChange={(e) => setHasLifeIns(e.target.checked)} />I have Term Life Insurance</label>
               </div>
               <div className="score-breakdown">
                 <strong>Score Breakdown:</strong>
                 <div className="breakdown-item"><span>Savings Rate</span> <span>Max 30 pts</span></div>
                 <div className="breakdown-item"><span>EMI Management</span> <span>Max 25 pts</span></div>
                 <div className="breakdown-item"><span>Emergency Fund</span> <span>Max 20 pts</span></div>
                 <div className="breakdown-item"><span>Investment Habits</span> <span>Max 15 pts</span></div>
                 <div className="breakdown-item"><span>Insurance Coverage</span> <span>Max 10 pts</span></div>
               </div>
             </div>
          )}

          {/* TAB 2: BUDGETING */}
          {activeTab === 'budget' && (
            <div className="main-card">
              <div className="section-title">50/30/20 Budget Calculator</div>
              <div className="input-group" style={{marginBottom: '30px'}}><label>Monthly Income</label><input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} /></div>
              <div style={{display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap'}}>
                <div style={{ width: size, height: size, position: 'relative' }}>
                  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{transform: 'rotate(-90deg)'}}>
                    {slices.map((slice) => {
                      const strokeDasharray = `${slice.percent * circumference} ${circumference}`;
                      const strokeDashoffset = -slice.startOffset * circumference;
                      const isActive = selectedSlice === slice.id;
                      const adjustedCenterPercent = slice.centerPercent - 0.25;
                      const [lineStartX, lineStartY] = getCoordinatesForPercent(adjustedCenterPercent, radius + strokeWidth/2, center);
                      const [lineEndX, lineEndY] = getCoordinatesForPercent(adjustedCenterPercent, radius + strokeWidth/2 + 15, center);
                      const [textX, textY] = getCoordinatesForPercent(adjustedCenterPercent, radius + strokeWidth/2 + 25, center);
                      const textAnchor = textX > center ? 'start' : 'end';
                      return (<g key={slice.id} onClick={() => handleSliceClick(slice.id)} style={{cursor: 'pointer'}}><circle cx={center} cy={center} r={radius} fill="transparent" stroke={slice.color} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} style={{ transition: 'all 0.3s ease', opacity: selectedSlice && !isActive ? 0.5 : 1, strokeWidth: isActive ? strokeWidth + 4 : strokeWidth }} /><line x1={lineStartX} y1={lineStartY} x2={lineEndX} y2={lineEndY} stroke={slice.color} strokeWidth={1.5} style={{ transition: 'opacity 0.3s', opacity: selectedSlice && !isActive ? 0.2 : 1 }} transform={`rotate(90 ${center} ${center})`} /><text x={textX} y={textY} fill={slice.color} textAnchor={textAnchor} dominantBaseline="central" fontWeight="600" fontSize="14px" style={{ transition: 'opacity 0.3s', opacity: selectedSlice && !isActive ? 0.3 : 1 }} transform={`rotate(90 ${center} ${center})`}>{slice.label}</text></g>);
                    })}
                    <circle cx={center} cy={center} r={radius - strokeWidth/2} fill="white" />
                  </svg>
                </div>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '250px'}}>
                  <div className={`tip-card blue ${selectedSlice === 'needs' ? 'selected-card' : ''} ${selectedSlice && selectedSlice !== 'needs' ? 'dimmed-card' : ''}`} style={{display:'flex', justifyContent:'space-between', transition: 'all 0.3s'}} onClick={() => handleSliceClick('needs')}><span><strong>Needs (50%)</strong><br/>Housing, utilities</span><strong style={{fontSize: '20px', color:'#2563eb'}}>₹{(income * 0.5).toLocaleString()}</strong></div>
                  <div className={`tip-card green ${selectedSlice === 'wants' ? 'selected-card' : ''} ${selectedSlice && selectedSlice !== 'wants' ? 'dimmed-card' : ''}`} style={{display:'flex', justifyContent:'space-between', transition: 'all 0.3s'}} onClick={() => handleSliceClick('wants')}><span><strong>Wants (30%)</strong><br/>Dining out, hobbies</span><strong style={{fontSize: '20px', color:'#059669'}}>₹{(income * 0.3).toLocaleString()}</strong></div>
                  <div className={`tip-card purple ${selectedSlice === 'savings' ? 'selected-card' : ''} ${selectedSlice && selectedSlice !== 'savings' ? 'dimmed-card' : ''}`} style={{padding:'20px', background:'#f3e8ff', borderRadius:'12px', border:'1px solid #e9d5ff', display:'flex', justifyContent:'space-between', transition: 'all 0.3s'}} onClick={() => handleSliceClick('savings')}><span style={{color:'#6b21a8'}}><strong>Savings (20%)</strong><br/>Investing, debt</span><strong style={{fontSize: '20px', color:'#7e22ce'}}>₹{(income * 0.2).toLocaleString()}</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEBT (FIXED HANDLER) */}
          {activeTab === 'debt' && (
            <div className="main-card">
              <div className="section-title">Debt Management Calculator</div>
              <div className="input-group" style={{marginBottom: '20px'}}><label>Monthly Income</label><input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} /></div>
              
              <div className="tip-card green" style={{border: '2px solid #22c55e', display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '30px'}}>
                 <CheckCircle size={32} color="#16a34a" />
                 <div style={{width: '100%'}}>
                   <h4 style={{fontSize:'18px', color: '#16a34a', margin: '0 0 5px 0'}}>
                     Total EMI: ₹{totalDebtEMI.toLocaleString()} ({(totalDebtEMI/income*100).toFixed(1)}% of income)
                   </h4>
                   <p style={{margin: 0}}>Your debt is under control!</p>
                   <div style={{height: '8px', background: '#dcfce7', borderRadius: '4px', marginTop: '10px', width: '100%'}}>
                     <div style={{width: `${Math.min((totalDebtEMI/income*100), 100)}%`, height: '100%', background: '#16a34a', borderRadius: '4px'}}></div>
                   </div>
                 </div>
              </div>

              <div className="debt-list">
                {debts.map((debt, index) => (
                  <div key={debt.id} className="debt-item-card">
                    <div className="debt-header">
                      <span className="debt-name">{debt.name}</span>
                      <button className="delete-btn" onClick={() => handleDeleteDebt(debt.id)}><Trash2 size={16} /></button>
                    </div>
                    <div className="debt-grid">
                      <div><span className="debt-label">Balance</span><div className="debt-value-box">₹{debt.balance.toLocaleString()}</div></div>
                      <div><span className="debt-label">Interest Rate (%)</span><div className="debt-value-box">{debt.rate}%</div></div>
                      <div><span className="debt-label">Min Payment</span><div className="debt-value-box">₹{debt.minPayment.toLocaleString()}</div></div>
                      <div style={{display:'flex', alignItems:'end'}}><span className="priority-badge">Priority #{index + 1}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              {!showAddDebt ? (
                <button className="add-debt-btn" onClick={() => setShowAddDebt(true)}><Plus size={18} /> Add Debt</button>
              ) : (
                <div className="add-debt-form">
                  <h4>Add New Debt</h4>
                  <div className="input-row">
                    <div className="input-group"><label>Debt Name</label><input type="text" placeholder="e.g. Car Loan" value={newDebt.name} onChange={(e) => setNewDebt({...newDebt, name: e.target.value})} /></div>
                    <div className="input-group"><label>Balance</label><input type="number" placeholder="50000" value={newDebt.balance} onChange={(e) => setNewDebt({...newDebt, balance: e.target.value})} /></div>
                  </div>
                  <div className="input-row">
                    <div className="input-group"><label>Interest Rate (%)</label><input type="number" placeholder="12" value={newDebt.rate} onChange={(e) => setNewDebt({...newDebt, rate: e.target.value})} /></div>
                    <div className="input-group"><label>Min Payment</label><input type="number" placeholder="2000" value={newDebt.minPayment} onChange={(e) => setNewDebt({...newDebt, minPayment: e.target.value})} /></div>
                  </div>
                  <div style={{display:'flex', gap:'10px'}}>
                    <button className="save-btn" onClick={handleAddDebt}>Save Debt</button>
                    <button className="cancel-btn" onClick={() => setShowAddDebt(false)}>Cancel</button>
                  </div>
                </div>
              )}

              <div className="strategy-card">
                 <h4 className="strategy-title">Recommended Payoff Strategy (Avalanche Method)</h4>
                 <p className="strategy-desc">Pay minimums on all debts, then put extra money toward the highest interest rate debt ({debts.sort((a,b) => b.rate - a.rate)[0]?.name || 'None'}) first.</p>
              </div>
            </div>
          )}

          {/* TAB 4: EMERGENCY */}
          {activeTab === 'emergency' && (
            <div className="main-card">
               <div className="section-title">Emergency Fund Calculator</div>
               <div className="input-row">
                  <div className="input-group"><label>Monthly Essential Expenses</label><input type="number" value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} /></div>
                  <div className="input-group"><label>Current Emergency Savings</label><input type="number" value={emergencySavings} onChange={(e) => setEmergencySavings(Number(e.target.value))} /></div>
               </div>
               <div className="fund-progress-card">
                  <div className="fund-stats"><span style={{color: '#3b82f6', fontWeight: 500}}>Current Progress</span><span style={{fontSize: '32px', fontWeight: 700, color: '#2563eb'}}>{Math.min(((emergencySavings / (expenses * 6)) * 100).toFixed(0), 100)}%</span></div>
                  <div style={{fontSize: '24px', fontWeight: 700, marginBottom: '10px', color:'#1e293b'}}>₹{emergencySavings.toLocaleString()} / ₹{(expenses * 6).toLocaleString()}</div>
                  <div className="progress-bar-container" style={{width:'100%', background:'#dbeafe', margin: '0 0 10px 0'}}><div className="progress-fill" style={{width: `${Math.min((emergencySavings/(expenses*6))*100, 100)}%`, background: '#2563eb'}}></div></div>
               </div>
            </div>
          )}

          {/* TAB 5: INVESTING */}
          {activeTab === 'investing' && (
            <div className="main-card">
              <div className="section-title" style={{display:'flex', alignItems:'center', gap:'10px'}}><TrendingUp size={24} color="#7c3aed" /> Investment Growth Calculator</div>
              <div className="invest-inputs-grid">
                <div className="input-group"><label>Monthly Investment (SIP)</label><input type="number" value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))} /></div>
                <div className="input-group"><div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}><label>Investment Period</label><span style={{fontWeight:'700', color:'#7c3aed'}}>{sipYears} years</span></div><input type="range" min="1" max="40" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="range-purple" /></div>
                <div className="input-group"><div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}><label>Expected Return</label><span style={{fontWeight:'700', color:'#7c3aed'}}>{sipRate}% p.a.</span></div><input type="range" min="1" max="30" value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} className="range-purple" /></div>
              </div>
              <div className="invest-results-row">
                 <div className="result-card blue"><span>Total Invested</span><h3>{formatCurrencyShort(sipData.invested)}</h3></div>
                 <div className="result-card green"><span>Returns Gained</span><h3>{formatCurrencyShort(sipData.returns)}</h3></div>
                 <div className="result-card purple"><span>Total Value</span><h3>{formatCurrencyShort(sipData.value)}</h3></div>
              </div>
              <div className="graph-container"><svg viewBox="0 0 600 250" className="invest-graph"><line x1="30" y1="220" x2="570" y2="220" stroke="#e2e8f0" strokeWidth="2" /><line x1="30" y1="30" x2="30" y2="220" stroke="#e2e8f0" strokeWidth="2" /><path d={`M${graphPath.invested}`} fill="none" stroke="#3b82f6" strokeWidth="3" /><path d={`M${graphPath.value}`} fill="none" stroke="#10b981" strokeWidth="3" /><text x="30" y="240" fill="#64748b" fontSize="12">0</text><text x="550" y="240" fill="#64748b" fontSize="12">{sipYears} yrs</text></svg></div>
            </div>
          )}

          {/* TAB 6: RETIREMENT */}
          {activeTab === 'retirement' && (
             <div className="main-card">
               <div className="section-title" style={{display:'flex', alignItems:'center', gap:'10px'}}><Target size={24} color="#9333ea" /> Retirement Planning Calculator</div>
               <div className="input-row">
                 <div className="input-group"><label>Current Age</label><input type="number" value={retCurrentAge} onChange={(e) => setRetCurrentAge(Number(e.target.value))} /></div>
                 <div className="input-group"><div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}><label>Retirement Age</label><span style={{fontWeight:'700', color:'#1e293b'}}>{retRetirementAge}</span></div><input type="range" min={retCurrentAge + 1} max="80" value={retRetirementAge} onChange={(e) => setRetRetirementAge(Number(e.target.value))} /></div>
               </div>
               <div className="input-row">
                 <div className="input-group"><label>Expected Monthly Expenses</label><input type="number" value={retMonthlyExpenses} onChange={(e) => setRetMonthlyExpenses(Number(e.target.value))} /></div>
                 <div className="input-group"><label>Current Retirement Savings</label><input type="number" value={retCurrentSavings} onChange={(e) => setRetCurrentSavings(Number(e.target.value))} /></div>
               </div>
               <div className="retirement-plan-card">
                  <div className="plan-header"><Calendar size={20} color="#9333ea" /><h4>Your Retirement Plan</h4></div>
                  <div className="plan-grid">
                     <div><div className="plan-label">Required Corpus</div><div className="plan-value">{formatCurrencyShort(retData.requiredCorpus)}</div></div>
                     <div><div className="plan-label">Monthly SIP Required</div><div className="plan-value">₹{Math.round(retData.monthlySIP).toLocaleString()}</div></div>
                  </div>
               </div>
               <div className="chart-section"><h4 style={{marginBottom: '20px', color: '#1e293b'}}>The Cost of Delaying Retirement Planning</h4><svg width="100%" height="200" viewBox="0 0 600 200">{delayData.map((data, index) => { const barHeight = (data.sip / maxDelaySIP) * 150; const x = 50 + (index * 110); const y = 170 - barHeight; return (<g key={index}><rect x={x} y={y} width="60" height={barHeight} fill="#8b5cf6" rx="4" /><text x={x + 30} y={y - 10} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4b5563">{formatCurrencyShort(data.sip)}</text><text x={x + 30} y="190" textAnchor="middle" fontSize="12" fill="#6b7280">{data.age}</text></g>);})}<text x="300" y="200" textAnchor="middle" fontSize="12" fontWeight="600" fill="#374151">Starting Age</text></svg></div>
             </div>
          )}

        </div>
        {renderSidebar()}
      </div>
    </div>
  );
};

export default GuidancePage;