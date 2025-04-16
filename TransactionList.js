/**
 * TransactionList Component
 * Displays a list of all transactions with basic details.
 * Each transaction has options to edit or delete.
 * @param {Object[]} transactions - An array of transaction objects to display.
 */
const TransactionList = ({ transactions }) => {
  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {/* Loop through each transaction and display it */}
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {/* Show transaction details */}
            {transaction.amount} - {transaction.description} ({new Date(transaction.date).toLocaleDateString()})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
