// src/data/mockInsights.js

export const historicalTrends = {
  current: {
    label: "Current Month",
    actualTotal: 45000,
    predictedTotal: 48000,
    data: [
      { day: "1", past: 2000, forecast: 2000 },
      { day: "5", past: 8000, forecast: 8500 },
      { day: "10", past: 15000, forecast: 16000 },
      { day: "15", past: 22000, forecast: 24000 },
      { day: "20", past: 30000, forecast: 32000 },
      { day: "25", past: 38000, forecast: 40000 },
      { day: "30", past: 45000, forecast: 48000 }
    ]
  },
  "1mo": {
    label: "Last Month",
    actualTotal: 42000,
    predictedTotal: 41000,
    data: [
      { day: "1", past: 1500, forecast: 1500 },
      { day: "15", past: 20000, forecast: 19000 },
      { day: "30", past: 42000, forecast: 41000 }
    ]
  },
  "2mo": {
    label: "2 Months Ago",
    actualTotal: 38000,
    predictedTotal: 40000,
    data: [
      { day: "1", past: 1000, forecast: 1200 },
      { day: "15", past: 18000, forecast: 20000 },
      { day: "30", past: 38000, forecast: 40000 }
    ]
  },
  "3mo": {
    label: "3 Months Ago",
    actualTotal: 51000,
    predictedTotal: 45000,
    data: [
      { day: "1", past: 3000, forecast: 2000 },
      { day: "15", past: 25000, forecast: 22000 },
      { day: "30", past: 51000, forecast: 45000 }
    ]
  },
  "4mo": {
    label: "4 Months Ago",
    actualTotal: 39000,
    predictedTotal: 40000,
    data: [
      { day: "1", past: 1500, forecast: 1500 },
      { day: "30", past: 39000, forecast: 40000 }
    ]
  },
  "5mo": {
    label: "5 Months Ago",
    actualTotal: 35000,
    predictedTotal: 38000,
    data: [
      { day: "1", past: 1000, forecast: 1500 },
      { day: "30", past: 35000, forecast: 38000 }
    ]
  },
  "6mo": {
    label: "6 Months Ago",
    actualTotal: 32000,
    predictedTotal: 35000,
    data: [
      { day: "1", past: 800, forecast: 1000 },
      { day: "30", past: 32000, forecast: 35000 }
    ]
  }
};