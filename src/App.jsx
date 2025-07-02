import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import UserLogin from './components/UserLogin'
import UserDashboard from './components/UserDashboard';
import TransferMoney from './components/TransferMoney';
import TransactionHistory from './components/TransactionHistory'
import CheckBalance from './components/CheckBalance';
import UserInfo from './components/UserInfo';
function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/transfer" element={<TransferMoney />} />
        <Route path="/check-balance" element={<CheckBalance />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
