
const TransactionCard = ({ transaction, onDelete, onEdit }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">{transaction.category}</h3>
      <p className="text-gray-600">{transaction.description}</p>
      <p className="text-lg font-bold text-gray-900 mt-2">₹ {transaction.amount}</p>
      {transaction.createdDate && (
        <small className="text-gray-500">
          {new Date(transaction.createdDate).toLocaleString()}
        </small>
      )}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(transaction)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(transaction.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;