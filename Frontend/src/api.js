import db from './data/db.json';

// Helper to simulate network delay (0.8 seconds)
const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDashboardData = async () => {
  await delay(); // Wait...
  return db.dashboard; // Return data
};

export const fetchTransactions = async () => {
  await delay(600); // Slightly faster for transactions
  return db.transactions;
};

export const fetchGoals = async () => {
  await delay(1000); // Slower for goals
  return db.goals;
};

export const fetchUserData = async () => {
  await delay(300);
  return db.user;
};