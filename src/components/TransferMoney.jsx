import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";

function TransferMoney() {
  const [receiverAccNo, setReceiverAccNo] = useState("");
  const [amount, setAmount] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const senderAccNo = localStorage.getItem("accountNumber");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponseMessage("");

    if (!senderAccNo) {
      setError("Sender account number not found.");
      return;
    }

    const payload = {
      senderAccNo: parseInt(senderAccNo),
      receiverAccNo: parseInt(receiverAccNo),
      amount: parseFloat(amount),
      type: "Transfer",
    };

    try {
      const response = await fetch("https://bank-admin-backend-production.up.railway.app/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(text || "Transfer failed.");
      }

      setResponseMessage(text);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <div className="bg-green-900 text-green-200 border border-green-500 p-8 rounded-2xl shadow-xl max-w-lg text-center">
          <h2 className="text-3xl font-bold mb-4 text-green-300">Transfer Successful!</h2>
          <p className="mb-6">{responseMessage}</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-lg w-full border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Send size={28} className="text-blue-400" />
          <h2 className="text-3xl font-bold text-white bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-transparent">
            Transfer Money
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-800 border border-red-500 text-red-200 rounded shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Receiver Account Number</label>
            <input
              type="number"
              value={receiverAccNo}
              onChange={(e) => setReceiverAccNo(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-300">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
              step="0.01"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
          >
            Transfer
          </button>
        </form>
      </div>
    </div>
  );
}

export default TransferMoney;
