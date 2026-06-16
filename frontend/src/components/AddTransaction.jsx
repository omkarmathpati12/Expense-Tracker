import { useState } from 'react';

import axios from 'axios';

function AddTransaction({ onTransactionAdded }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');

  const userIdRaw = localStorage.getItem("userId");
  const userId = userIdRaw ? Number(userIdRaw) : null;


  const api = axios.create({
    baseURL: 'http://localhost:8080',
  });

  const handleAddTransaction = async () => {
    try {
      if (!userId) {
        alert('Please login first');
        return;
      }

      const response = await api.post('/transaction/create', {
        description,
        amount: amount === '' ? null : Number(amount),
        category,
        notes,
        user: { userId: userId },
      });

      console.log(response.data);
      alert('Transaction added successfully!');

      // optional: clear form
      setDescription('');
      setAmount('');
      setCategory('');
      setNotes('');

      if (onTransactionAdded) {
        onTransactionAdded();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add transaction!');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Add Transaction</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Category</label>
        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Notes</label>
        <textarea
          placeholder="Enter Notes"
          rows="3"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>

      <button
        onClick={handleAddTransaction}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Add Transaction
      </button>
    </div>
  );
}

export default AddTransaction;

