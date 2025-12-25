// This file simulates a backend server

// 1. Define the data structure (This is what your Backend MUST return later)
const MOCK_DASHBOARD_DATA = {
    balance: 47284.52,
    monthlySpend: 4440.00,
    pieData: [
        { name: 'Food', value: 28, color: '#3B82F6' },
        { name: 'Travel', value: 20, color: '#10B981' },
        { name: 'Shopping', value: 16, color: '#8B5CF6' },
        { name: 'Bills', value: 36, color: '#F59E0B' },
    ],
    barData: [
        { name: 'Week 1', budget: 1500, actual: 1200 },
        { name: 'Week 2', budget: 1000, actual: 850 },
        { name: 'Week 3', budget: 1800, actual: 1600 },
        { name: 'Week 4', budget: 800, actual: 700 },
        { name: 'Week 5', budget: 600, actual: 450 },
    ]
};

// 2. Create an "Async" function to simulate a network request
export const fetchDashboardData = () => {
    return new Promise((resolve) => {
        // We simulate a 1-second delay (like a real internet connection)
        setTimeout(() => {
            resolve(MOCK_DASHBOARD_DATA);
        }, 1000); 
    });
};