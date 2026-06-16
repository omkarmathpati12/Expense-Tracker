
const SummaryCard = ({ user, transactions, summary }) => {
  const totalExpense =
    summary?.totalExpense !== undefined
      ? Number(summary.totalExpense)
      : transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  
  const totalTransactions = summary?.totalTransactions !== undefined
    ? summary.totalTransactions
    : transactions.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
          <span>👋</span> Welcome {user?.name || "User"}!
        </h2>
        <p className="text-blue-100">Email: {user?.email}</p>
      </div>

      {/* Total Expenses Card */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-lg text-green-100 mb-2 flex items-center gap-2">
          <span>💰</span> Total Expenses
        </h3>
        <h1 className="text-4xl font-bold mt-1">₹ {totalExpense.toLocaleString()}</h1>
      </div>

      {/* Total Transactions Card */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-lg text-purple-100 mb-2 flex items-center gap-2">
          <span>📈</span> Total Transactions
        </h3>
        <h1 className="text-4xl font-bold mt-1">{totalTransactions.toLocaleString()}</h1>
      </div>
    </div>
  );
};

export default SummaryCard;