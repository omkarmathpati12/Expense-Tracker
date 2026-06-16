import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const userIdRaw = localStorage.getItem("userId");
  const userId = userIdRaw ? Number(userIdRaw) : null;

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const loadUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/user/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Profile load error", err);
      }
    };

    loadUser();
  }, [userId, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-4 border-b pb-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user?.name}
            </h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.name}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.email}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.role}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.status}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">Loading...</p>
        )}

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate("/update-profile")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;