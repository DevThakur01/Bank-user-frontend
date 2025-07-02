import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { History } from "lucide-react";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const accountNumber = localStorage.getItem("accountNumber");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`https://bank-user-backend-production-9391.up.railway.app/transactions/${accountNumber}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to load transactions.");
        }
        const data = await response.json();
        setTransactions(data.reverse()); // Most recent first
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accountNumber) {
      fetchTransactions();
    } else {
      setError("Account number not found in localStorage.");
      setLoading(false);
    }
  }, [accountNumber]);

  if (loading) return <div className="text-white p-6 text-center">Loading transactions...</div>;
  if (error) return <div className="text-red-500 p-6 text-center">Error: {error}</div>;
  if (transactions.length === 0) return <div className="text-yellow-300 p-6 text-center">No transactions found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-8 rounded-2xl shadow-2xl w-full max-w-5xl">
        <div className="flex items-center gap-3 mb-6">
          <History size={28} className="text-orange-400" />
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
            Transaction History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3 text-left mb-6">
            <thead>
              <tr className="text-gray-400 text-sm uppercase border-b border-gray-700">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount (₹)</th>
                <th className="px-4 py-2">From → To</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={index}
                  className="bg-gray-800 hover:bg-gray-700 transition-all duration-200 rounded-lg"
                >
                  <td className="px-4 py-3">
                    {new Date(tx.transactionDate).toLocaleDateString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                      tx.type.toLowerCase() === "transfer"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-gray-600 text-white"
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-300">₹{tx.amount}</td>
                  <td className="px-4 py-3">{tx.senderAccNo} → {tx.receiverAccNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
