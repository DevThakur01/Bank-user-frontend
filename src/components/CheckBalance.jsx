import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";

function CheckBalance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const accountNumber = localStorage.getItem("accountNumber");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`https://bank-admin-backend-production.up.railway.app/user/${accountNumber}`);

        if (!response.ok) {
          const errorMsg = await response.text();
          throw new Error(errorMsg || "Failed to fetch balance");
        }

        const data = await response.json();
        setBalance(data.balance);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accountNumber) {
      fetchBalance();
    } else {
      setError("Account number not found in localStorage");
      setLoading(false);
    }
  }, [accountNumber]);

  if (loading) return <div className="text-white p-6 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 p-6 text-center">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="bg-white/10 border border-white/20 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-green-500/20 rounded-full shadow-md">
            <Wallet size={36} className="text-green-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
          Current Balance
        </h2>

        <p className="text-5xl font-mono text-green-400 mb-6 animate-pulse">₹{balance.toFixed(2)}</p>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default CheckBalance;
