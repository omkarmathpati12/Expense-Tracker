import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-7 text-center">
        <h1 className="text-4xl font-extrabold mb-2">Smart Expense Tracker</h1>
        <p className="text-gray-600 mb-6">
          Track expenses, view summaries, and manage transactions.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-xl bg-gray-200 text-gray-900 font-bold hover:bg-gray-300 transition"
          >
            Register
          </Link>
        </div>

        <div className="mt-5 text-gray-500 text-sm">
          Tip: after logging in, go to <b>Dashboard</b> to see your summaries.
        </div>
      </div>
    </div>
  );
};

export default Home;

