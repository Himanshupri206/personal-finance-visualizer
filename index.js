import { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import MonthlyExpensesChart from '../components/MonthlyExpensesChart';

/**
 * Main Home Page Component.
 * Displays the transaction form, list, and a monthly expenses chart.
 */
const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);

  // Fetch transactions when the component is mounted
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);

      // Process data to generate chart data
      const monthlyData = processChartData(data);
      setChartData(monthlyData);
    };
    fetchTransactions();
  }, []);

  /**
   * Add a new transaction and update the state.
   * @param {Object} transaction - The transaction object to add.
   */
  const handleAddTransaction = async (transaction) => {
    const response = await fetch('/api/transactions/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction),
    });
    const newTransaction = await response.json();
    setTransactions((prev) => [...prev, newTransaction]);
  };

  /**
   * Process the transaction data to group by month.
   * @param {Object[]} data - The list of transactions.
   * @returns {Object[]} - The grouped data for charting.
   */
  const processChartData = (data) => {
    return data.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
      if (!acc[month]) acc[month] = 0;
      acc[month] += transaction.amount;
      return acc;
    }, {});
  };

  return (
    <div>
      <h1>Personal Finance Visualizer</h1>
      <TransactionForm onSubmit={handleAddTransaction} />
      <TransactionList transactions={transactions} />
      <MonthlyExpensesChart data={chartData} />
    </div>
  );
};

export default Home;
