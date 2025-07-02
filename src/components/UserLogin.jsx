import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import sidePannelImg from "../images/side-pannel2.jpg";

function UserLogin() {
  const [form, setForm] = useState({ accountNumber: "", pin: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      accountNumber: parseInt(form.accountNumber), // ensure it's a number
      pin: form.pin,
    };

    try {
      const response = await fetch("https://bank-user-backend-production-9391.up.railway.app/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resultText = await response.text(); // plain text from backend

      if (response.status === 200) {
          localStorage.setItem("accountNumber", form.accountNumber);
        navigate("/dashboard");
      } else {
        alert(resultText); // show backend message (e.g., "Incorrect PIN")
      }
    } catch (error) {
      alert("Server error");
      console.error("Login error:", error);
    }

    setForm({ accountNumber: "", pin: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700 flex overflow-hidden">
        
        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-white text-center mb-8 tracking-wide">
            User Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-300 w-5 h-5" />
              <input
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                placeholder="Account Number"
                required
                className="w-full pl-12 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-300 w-5 h-5" />
              <input
                type="password"
                name="pin"
                value={form.pin}
                onChange={handleChange}
                placeholder="PIN"
                required
                className="w-full pl-12 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-white text-black text-lg font-semibold hover:bg-gray-200 transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* Image Side Panel */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center rounded-r-3xl"
          style={{ backgroundImage: `url(${sidePannelImg})` }}
        />
      </div>
    </div>
  );
}

export default UserLogin;
