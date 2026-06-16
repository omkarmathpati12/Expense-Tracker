
import TransactionCard from "./TransactionCard";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  return (
    <div>
      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        transactions.map((t) => (
          <TransactionCard key={t.id} transaction={t} onDelete={onDelete} onEdit={onEdit} />
        ))
      )}
    </div>
  );
};

export default TransactionList;