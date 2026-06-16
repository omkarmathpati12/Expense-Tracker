import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const navigate = useNavigate();

  const userIdRaw = localStorage.getItem("userId");
  const userId = userIdRaw ? Number(userIdRaw) : null;

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        navigate("/login");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/user/${userId}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setStatus(response.data.status);
      } catch (err) {
        console.error(err);
        alert("Failed to load user");
      }
    };
    fetchUser();
  }, [userId, navigate]);

  const handleUpdate = async () => {
    try {
      if (!userId) {
        alert("Please login first");
        return;
      }
      const updateData = { name, email, status };
      if (password) {
        updateData.password = password;
      }
      await axios.put(`http://localhost:8080/user/${userId}`, updateData);
      alert("Profile updated!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`http://localhost:8080/user/${userId}`);
        localStorage.removeItem("userId");
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Failed to delete account");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <span>✏️</span> Update Profile
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">New Password (leave blank to keep current)</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 shadow-md transition duration-300 font-medium"
          >
            Update Profile
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 shadow-sm transition duration-300 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 shadow-sm transition duration-300 font-medium"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
