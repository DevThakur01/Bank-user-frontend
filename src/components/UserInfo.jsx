import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, User, Mail, Wallet, Landmark } from "lucide-react";

function UserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const accountNumber = localStorage.getItem("accountNumber");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://bank-admin-backend-production.up.railway.app/user/${accountNumber}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to fetch user data");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accountNumber) {
      fetchUserDetails();
    } else {
      setError("Account number not found in localStorage");
      setLoading(false);
    }
  }, [accountNumber]);

  if (loading) return <div className="text-white p-6 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 p-6 text-center">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6">
      <div className="bg-white/10 border border-white/20 text-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          User Information
        </h2>

        <div className="space-y-4">
          <InfoRow icon={CreditCard} label="Account Number" value={user.accountNumber} />
          <InfoRow icon={User} label="Name" value={`${user.firstname} ${user.lastname}`} />
          <InfoRow icon={Mail} label="Email" value={user.email} />
          <InfoRow icon={Landmark} label="Account Type" value={user.accountType} />
          <InfoRow icon={Wallet} label="Balance" value={`₹${user.balance}`} />
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg shadow-inner">
      <Icon size={20} className="text-blue-300" />
      <div>
        <p className="text-sm text-gray-300">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

export default UserInfo;
