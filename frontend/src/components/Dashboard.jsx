import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import SummaryCard from "./SummaryCard";
import TransactionList from "./TransactionList";
import AddTransaction from "./AddTransaction";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();
  const userIdRaw = localStorage.getItem("userId");
  const userId = userIdRaw ? Number(userIdRaw) : null;

  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [showAddTransaction, setShowAddTransaction] = useState(false);

  const loadDashboard = async () => {
    if (!userId) return;

    const [userRes, txRes, summaryRes] = await Promise.all([
      axios.get(`http://localhost:8080/user/${userId}`),
      axios.get(`http://localhost:8080/transaction/user/${userId}`),
      axios.get(`http://localhost:8080/dashboard/summary/${userId}`),
    ]);

    setUser(userRes.data);
    setTransactions(txRes.data);
    setSummary(summaryRes.data);
  };

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    loadDashboard().catch((err) => {
      console.error("Dashboard load error:", err);
    });
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(`http://localhost:8080/transaction/${id}`);
        alert("Transaction deleted!");
        loadDashboard();
      } catch (err) {
        console.error(err);
        alert("Failed to delete transaction!");
      }
    }
  };

  const handleEditTransaction = (transaction) => {
    navigate(`/update-transaction/${transaction.id}`);
  };

  // Prepare data for pie chart
  const getCategoryData = () => {
    const categoryMap = {};
    transactions.forEach((t) => {
      const cat = t.category || "Uncategorized";
      categoryMap[cat] = (categoryMap[cat] || 0) + Number(t.amount);
    });

    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#FF6384",
      "#C9CBCF",
    ];

    return { labels, data, colors };
  };

  const categoryData = getCategoryData();

  const pieChartData = {
    labels: categoryData.labels,
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryData.data,
        backgroundColor: categoryData.colors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-full">
            <span className="text-2xl">💰</span>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Smart Expense Dashboard
            </h1>
            {user && (
              <p className="text-gray-500 mt-2 text-lg">
                Welcome back,{" "}
                <span className="font-medium text-gray-800">{user.name}</span>!
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/profile"
            className="bg-white border border-gray-200 hover:border-gray-300 text-gray-800 px-5 py-2 rounded-lg shadow-sm transition duration-300 flex items-center gap-2"
          >
            <span>👤</span> Profile
          </Link>
          <button
            onClick={() => setShowAddTransaction(!showAddTransaction)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 flex items-center gap-2"
          >
            <span>➕</span>
            {showAddTransaction ? "Hide Add Transaction" : "Add Transaction"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition duration-300 flex items-center gap-2"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-10">
        <SummaryCard user={user} transactions={transactions} summary={summary} />
      </div>

      {/* Add Transaction */}
      {showAddTransaction && (
        <div className="mb-10">
          <AddTransaction onTransactionAdded={loadDashboard} />
        </div>
      )}

      {/* Charts & Transactions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <span>📊</span> Expenses by Category
          </h2>
          {transactions.length > 0 ? (
            <div className="h-80">
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p className="text-lg">No transactions yet</p>
              <button
                onClick={() => setShowAddTransaction(true)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Add your first transaction
              </button>
            </div>
          )}
        </div>

        {/* Recent Transactions (take full width on mobile, half on lg) */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <span>📜</span> Recent Transactions
          </h2>
          <TransactionList 
            transactions={transactions} 
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
