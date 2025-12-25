import React, { useState } from 'react';
import './BudgetCalculator.css'; 

const BudgetCalculator = () => {
  // 1. Centralized State (Updated with realistic Rupee values)
  const [data, setData] = useState({
    salary: 55000,
    otherIncome: 15000,
    rent: 18000,
    utilities: 3500,
    groceries: 8000,
    transportation: 3000,
    entertainment: 2500,
    health: 2000
  });

  // 2. Calculations
  const totalIncome = data.salary + data.otherIncome;
  const totalExpenses = data.rent + data.utilities + data.groceries + data.transportation + data.entertainment + data.health;
  const netSavings = totalIncome - totalExpenses;

  // 3. Update Helper
  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: Number(value) }));
  };

  return (
    <div className="bc-container">
      
      {/* Title */}
      <div className="bc-title-section">
        <h1 className="bc-title">Financial Budget Calculator</h1>
      </div>

      <div className="bc-grid">
        
        {/* --- LEFT COLUMN: INPUTS --- */}
        <div className="bc-card-white">
          
          {/* Income Section */}
          <SliderItem 
            label="Monthly Salary"
            field="salary"
            val={data.salary}
            min={10000} max={200000}
            update={updateField}
            desc="Enter your primary source of income"
          />
          <SliderItem 
            label="Other Income"
            field="otherIncome"
            val={data.otherIncome}
            min={0} max={100000}
            update={updateField}
            desc="Enter other sources of income (e.g., investments, freelance work)"
          />

          <div className="bc-divider"></div>

          {/* Expenses Section */}
          <SliderItem 
            label="Rent/Mortgage"
            field="rent"
            val={data.rent}
            min={5000} max={50000}
            update={updateField}
            desc="Enter your monthly rent or mortgage payment"
          />
          <SliderItem 
            label="Utilities"
            field="utilities"
            val={data.utilities}
            min={500} max={15000}
            update={updateField}
            desc="Enter your monthly utilities expenses (e.g., electricity, water, gas)"
          />
          <SliderItem 
            label="Groceries"
            field="groceries"
            val={data.groceries}
            min={1000} max={30000}
            update={updateField}
            desc="Enter your monthly groceries expenses"
          />
          <SliderItem 
            label="Transportation"
            field="transportation"
            val={data.transportation}
            min={500} max={20000}
            update={updateField}
            desc="Enter your monthly transportation expenses"
          />
          <SliderItem 
            label="Entertainment"
            field="entertainment"
            val={data.entertainment}
            min={500} max={20000}
            update={updateField}
            desc="Enter your monthly entertainment expenses"
          />
           <SliderItem 
            label="Health & Fitness"
            field="health"
            val={data.health}
            min={500} max={20000}
            update={updateField}
            desc="Enter your monthly health and fitness expenses"
          />
        </div>

        {/* --- RIGHT COLUMN: SUMMARY --- */}
        <div>
          <div className="bc-card-blue">
            
            <div className="bc-summary-item">
              <span className="bc-summary-label">Total Income</span>
              <div className="bc-summary-value">₹{totalIncome.toLocaleString('en-IN')}</div>
              <span className="bc-summary-sub">Your monthly income</span>
            </div>

            <div className="bc-summary-item">
              <span className="bc-summary-label">Total Expenses</span>
              <div className="bc-summary-value">₹{totalExpenses.toLocaleString('en-IN')}</div>
              <span className="bc-summary-sub">Your monthly expenses</span>
            </div>

            <div className="bc-summary-item" style={{ borderBottom: 'none' }}>
              <span className="bc-summary-label">Net Savings</span>
              <div className="bc-summary-value">₹{netSavings.toLocaleString('en-IN')}</div>
              <span className="bc-summary-sub">Your net savings (surplus/deficit)</span>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '24px' }}>
              <h3 className="bc-footer-title">Your Financial Snapshot is Complete!</h3>
              <p className="bc-footer-text">
                This free tool helps you understand your financial position instantly. Use this data to start planning.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// --- Helper Component for the Slider ---
const SliderItem = ({ label, field, val, min, max, update, desc }) => {
  const percentage = ((val - min) / (max - min)) * 100;

  return (
    <div className="bc-slider-container">
      <div className="bc-slider-header">
        <label className="bc-label">{label}</label>
        <span className="bc-value">₹{val.toLocaleString('en-IN')}</span>
      </div>

      <div className="bc-slider-wrapper">
        {/* The Input */}
        <input 
          type="range"
          min={min}
          max={max}
          value={val}
          onChange={(e) => update(field, e.target.value)}
          className="bc-range-input"
        />
        {/* The Track (Gray) */}
        <div className="bc-track">
           {/* The Fill (Blue) */}
           <div className="bc-track-fill" style={{ width: `${percentage}%` }}></div>
        </div>
        {/* The Thumb (Circle) */}
        <div className="bc-thumb" style={{ left: `${percentage}%` }}></div>
      </div>

      <div className="bc-slider-footer">
        <span>₹{min.toLocaleString('en-IN')}</span>
        <span>₹{max.toLocaleString('en-IN')}</span>
      </div>
      <p className="bc-desc">{desc}</p>
    </div>
  );
};

export default BudgetCalculator;