// src/data/mockInsights.js

export const monthlyStats = [
  { name: 'May', income: 4000, expense: 2400 },
  { name: 'Jun', income: 3000, expense: 1398 },
  { name: 'Jul', income: 2000, expense: 8800 }, // High expense month!
  { name: 'Aug', income: 2780, expense: 3908 },
  { name: 'Sep', income: 1890, expense: 4800 },
  { name: 'Oct', income: 2390, expense: 3800 },
];

export const spendingCategories = [
  { name: 'Food', value: 400, color: '#0088FE' },
  { name: 'Rent', value: 1200, color: '#00C49F' },
  { name: 'Transport', value: 300, color: '#FFBB28' },
  { name: 'Entertainment', value: 200, color: '#FF8042' },
];


// NEW: Data for the Trend & Forecast Graph
export const trendData = [
  { day: '1', past: 2000, forecast: null },
  { day: '2', past: 2100, forecast: null },
  { day: '3', past: 2500, forecast: null },
  { day: '4', past: 2200, forecast: null },
  { day: '5', past: 2100, forecast: null },
  { day: '6', past: 2800, forecast: null },
  { day: '7', past: 2600, forecast: null },
  { day: '8', past: 2400, forecast: null },
  { day: '9', past: 2900, forecast: null },
  { day: '10', past: 2850, forecast: null },
  { day: '11', past: 2900, forecast: null },
  { day: '12', past: 2800, forecast: null },
  { day: '13', past: 3200, forecast: null },
  { day: '14', past: 3600, forecast: null },
  // "Today" - This point connects both lines
  { day: '15', past: 3600, forecast: 3600 }, 
  { day: '16', past: null, forecast: 2800 },
  { day: '17', past: null, forecast: 2850 },
  { day: '18', past: null, forecast: 2850 },
  { day: '19', past: null, forecast: 2700 },
  { day: '20', past: null, forecast: 2800 },
  { day: '21', past: null, forecast: 2600 },
  { day: '22', past: null, forecast: 2800 },
  { day: '23', past: null, forecast: 2750 },
  { day: '24', past: null, forecast: 2700 },
  { day: '25', past: null, forecast: 2680 },
  { day: '26', past: null, forecast: 2650 },
  { day: '27', past: null, forecast: 2700 },
  { day: '28', past: null, forecast: 2500 },
  { day: '29', past: null, forecast: 2600 },
  { day: '30', past: null, forecast: 2650 },
];


// ... keep monthlyStats and spendingCategories ...

// NEW: Historical Data for the last 6 months
// src/data/mockInsights.js

export const historicalTrends = {
  current: {
    label: "Current Month (Dec)",
    predictedTotal: 5200, // Fixed: was 52000
    actualTotal: 3600,    // Fixed: was 36000
    status: "On Track",
    data: [
      { day: '1', past: 1200, forecast: null },
      { day: '3', past: 1400, forecast: null },
      { day: '6', past: 1800, forecast: null },
      { day: '9', past: 2100, forecast: null },
      { day: '12', past: 2400, forecast: null },
      { day: '15', past: 3600, forecast: 3600 }, // Connection Point
      { day: '18', past: null, forecast: 3800 },
      { day: '21', past: null, forecast: 4100 },
      { day: '24', past: null, forecast: 4500 },
      { day: '27', past: null, forecast: 4900 },
      { day: '30', past: null, forecast: 5100 },
      { day: '31', past: null, forecast: 5200 }, // End of month
    ]
  },
  '1mo': {
    label: "November (1 Mo Ago)",
    predictedTotal: 4500, // Fixed
    actualTotal: 4850,    // Fixed
    status: "Over Budget",
    data: [
      { day: '1', past: 500 }, { day: '5', past: 1200 }, { day: '10', past: 2200 },
      { day: '15', past: 3000 }, { day: '20', past: 3800 }, { day: '25', past: 4500 },
      { day: '30', past: 4850 }
    ]
  },
  '2mo': {
    label: "October (2 Mo Ago)",
    predictedTotal: 4200, // Fixed
    actualTotal: 4120,    // Fixed
    status: "Under Budget",
    data: [
      { day: '1', past: 800 }, { day: '10', past: 1800 }, { day: '20', past: 3000 },
      { day: '30', past: 4120 }
    ]
  },
  '3mo': {
    label: "September (3 Mo Ago)",
    predictedTotal: 5000,
    actualTotal: 4980,
    status: "On Target",
    data: [{ day: '1', past: 1000 }, { day: '15', past: 2500 }, { day: '30', past: 4980 }]
  },
  '4mo': {
    label: "August (4 Mo Ago)",
    predictedTotal: 3800,
    actualTotal: 4500,
    status: "Over Budget",
    data: [{ day: '1', past: 500 }, { day: '15', past: 2000 }, { day: '30', past: 4500 }]
  },
  '5mo': {
    label: "July (5 Mo Ago)",
    predictedTotal: 4000,
    actualTotal: 3950,
    status: "Under Budget",
    data: [{ day: '1', past: 800 }, { day: '15', past: 2500 }, { day: '30', past: 3950 }]
  },
  '6mo': {
    label: "June (6 Mo Ago)",
    predictedTotal: 4100,
    actualTotal: 4100,
    status: "Perfect Match",
    data: [{ day: '1', past: 900 }, { day: '15', past: 2200 }, { day: '30', past: 4100 }]
  }
};