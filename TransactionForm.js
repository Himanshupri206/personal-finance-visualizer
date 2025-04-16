// Importing necessary hooks and components
import { useState } from 'react';

/**
 * TransactionForm Component
 * A form for adding a new transaction with amount, date, and description.
 */
const TransactionForm = ({ onSubmit }) => {
  // State hooks for form inputs
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  /**
   * Handle form submission.
   * Sends the new transaction data to the parent component for further processing.
   * @param {Event} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the page from reloading
    onSubmit({ amount, date, description });  // Pass data to the parent component
    setAmount('');  // Clear form after submission
    setDate('');
    setDescription('');
  };

  // Return the JSX for the form
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)} // Update state as user types
        placeholder="Amount"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)} // Update state as user selects date
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update state as user types description
        placeholder="Description"
        required
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
