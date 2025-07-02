import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Send,
  DollarSign,
  History,
  LogOut,
  CreditCard,
} from "lucide-react";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const accountNumber = localStorage.getItem("accountNumber");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://bank-user-backend-production-9391.up.railway.app/user/${accountNumber}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to fetch user details.");
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
      setError("Account number not found in localStorage.");
      setLoading(false);
    }
  }, [accountNumber]);

  const handleLogout = () => {
    localStorage.removeItem("accountNumber");
    navigate("/");
  };

  const quickActions = [
    {
      title: "View User Info",
      description: "Manage your profile",
      icon: User,
      path: "/user-info",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
    },
    {
      title: "Transfer Money",
      description: "Send money instantly",
      icon: Send,
      path: "/transfer",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
    },
    {
      title: "Check Balance",
      description: "View account details",
      icon: DollarSign,
      path: "/check-balance",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
    },
    {
      title: "Transaction History",
      description: "View recent activity",
      icon: History,
      path: "/transaction-history",
      color: "from-orange-500 to-orange-600",
      hoverColor: "hover:from-orange-600 hover:to-orange-700",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading user dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Welcome back,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {user.firstname} {user.lastname}!
                  </span>
                </h1>
                <p className="text-gray-300 text-lg">
                  Here's what's happening with your account today.
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-6 py-3 rounded-xl border border-red-500/30 transition-all duration-300 hover:scale-105"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Account Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <CreditCard className="text-blue-400" size={24} />
                </div>
              </div>
              <h3 className="text-gray-300 text-sm font-medium mb-2">Account Number</h3>
              <p className="text-2xl font-bold text-white mb-2">{user.accountNumber}</p>
              <p className="text-gray-400 text-sm">Primary Checking Account</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className={`group backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 text-left`}
              >
                <div
                  className={`inline-flex p-4 bg-gradient-to-br ${action.color} ${action.hoverColor} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <action.icon className="text-white" size={24} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
