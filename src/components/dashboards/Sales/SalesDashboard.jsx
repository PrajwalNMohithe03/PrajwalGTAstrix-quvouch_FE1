import {
  User,
  QrCode,
  Star,
  DollarSign,
  Eye,
  Moon,
  Sun,
  Settings,
  LogOut,
  Briefcase,
  Utensils,
  Stethoscope,
  Scissors,
  Car,
} from "lucide-react";
import { fetchBusinessById } from "../../../features/business/businessThunk";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CreateClient from "./CreateClient";
import { logoutThunk } from "../../../features/auth/authSlice";
import {
  fetchSalesDashboardThunk,
  fetchSalesClientsThunk,
} from "../../../features/sales/salesClientSlice";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [createClientOpen, setCreateClientOpen] = useState(false);
const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { dashboard, clients, loading } = useSelector(
    (state) => state.sales
  );
  const filteredClients = clients.filter((client) =>
  client.businessName?.toLowerCase().includes(search.toLowerCase())
);


  // ✅ SINGLE REFRESH FUNCTION (KEY FIX)
const refreshDashboard = useCallback(async () => {
  await dispatch(fetchSalesDashboardThunk()).unwrap();
  await dispatch(fetchSalesClientsThunk()).unwrap();
}, [dispatch]);

  // ✅ LOAD DATA ON PAGE LOAD
  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  const logout = () => {
    dispatch(logoutThunk());
    navigate("/login", { replace: true });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* ============ BACKGROUND GLOW ============ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 40% at 50% 30%, rgba(168,85,247,0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 35% at 50% 70%, rgba(196,181,253,0.16), transparent 72%)",
          }}
        />
      </div>

      <div className="min-h-screen bg-[#faf7ff] dark:bg-[#0b0b14] text-gray-800 dark:text-gray-100">

        {/* ================= NAVBAR ================= */}
        <header className="relative z-10 bg-white/70 dark:bg-black/40 backdrop-blur border-b border-gray-200/60 dark:border-white/10 h-16">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

            {/* LOGO */}
            <div className="flex items-center gap-2 font-semibold">
              <div className="relative w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                <div className="absolute inset-0 bg-purple-500/40 blur-lg -z-10" />
                <QrCode size={18} />
              </div>
              <span className="text-lg">
                Qu<span className="text-purple-600">vouch</span>
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100/70 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-sm font-medium">
                <Briefcase size={16} />
                Sales Representative
              </div>

              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                <Settings size={18} />
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-purple-600 dark:text-purple-300 text-sm font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* ================= CONTENT ================= */}
        <main className="px-10 py-8 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">
            Welcome, Sales Rep! 👋
          </h1>
          <p className="text-gray-500 mb-8">
            Manage your clients and grow your portfolio
          </p>

          {loading && (
            <p className="text-sm text-gray-500 mb-4">
              Loading dashboard...
            </p>
          )}

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
  icon={<User />}
  title="My Clients"
  value={
    dashboard?.clientsCount ??
    dashboard?.totalClients ??
    dashboard?.clients ??
    clients.length
  }
  badge="+8 this month"
/>

            <StatCard
              icon={<QrCode />}
              title="Active QR Codes"
              value={dashboard?.activeQr || 0}
              badge="+23 this week"
            />
            <StatCard
              icon={<Star />}
              title="Total Reviews"
              value={dashboard?.reviews || 0}
              badge="+287 this month"
            />
            <StatCard
              icon={<DollarSign />}
              title="Commission"
              value={dashboard?.commission || 0}
              badge="+12.5%"
            />
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setCreateClientOpen(true)}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700"
            >
              Create New Client
            </button>
            <button className="border px-5 py-2 rounded-lg text-purple-600 hover:bg-purple-50">
              Generate Report
            </button>
          </div>
{/* ================= MY CLIENTS HEADER ================= */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
  <div>
    <h2 className="text-xl font-semibold flex items-center gap-2">
      <User className="text-purple-600" size={20} />
      My Clients
    </h2>
    <p className="text-sm text-gray-500">
      Manage and monitor all your clients
    </p>
  </div>

  <div className="mt-3 md:mt-0 relative">
    <input
      type="text"
      placeholder="Search clients..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="pl-9 pr-4 py-2 border rounded-lg text-sm
                 focus:outline-none focus:ring-2 focus:ring-purple-500
                 bg-white/70 dark:bg-white/5"
    />
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeWidth="2"
        d="M21 21l-4.35-4.35m1.6-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  </div>
</div>
{/* ================= CLIENT LIST ================= */}
<div className="space-y-4">
  {filteredClients.map((client) => (

    <ClientCard
      key={client.businessId}
      businessId={client.businessId}   // 👈 ADD THIS LINE
      icon={<Briefcase />}
      color="from-purple-500 to-indigo-500"
      name={client.businessName}
      contact={client.businessType}
     email={client.businessEmail}   
      status={client.status ?? "active"}
      qr="0 QR Codes"
      reviews="0 Reviews"
    />
  ))}
</div>


        </main>
      </div>

      {/* ================= CREATE CLIENT MODAL ================= */}
      <CreateClient
        open={createClientOpen}
        onClose={() => setCreateClientOpen(false)}
        onSuccess={refreshDashboard}
      />
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ icon, title, value, badge }) {
  return (
    <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur rounded-xl p-5 border border-purple-200/40 dark:border-white/10">
      <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-xl -z-10" />
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
          {badge}
        </span>
      </div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

function ClientCard({
  businessId,
  icon,
  color,
  name,
  contact,
  email,
  status,
  qr,
  reviews,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleView = async () => {
    try {
      await dispatch(fetchBusinessById(businessId)).unwrap();
      navigate(`/business/${businessId}`);
    } catch (err) {
      console.error("Failed to fetch business", err);
    }
  };

  return (
    <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur rounded-xl p-5 border border-purple-200/40 dark:border-white/10">
      <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-xl -z-10" />

      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex gap-4 items-start w-2/3">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center`}
          >
            {icon}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{name}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                {status}
              </span>
              <span className="text-xs text-gray-400">
                C-{Math.floor(Math.random() * 900 + 100)}
              </span>
            </div>

            <p className="text-sm text-gray-500">{contact}</p>

            <div className="flex gap-4 text-xs text-gray-400 mt-1">
              <span>{qr}</span>
            </div>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="hidden md:flex flex-col text-sm text-gray-500 w-1/4">
          <p>{email}</p>
          <p className="mt-1">{reviews}</p>
        </div>

        {/* RIGHT */}
        <div className="flex gap-3">
          <button className="border px-2 py-0.5 rounded-md text-xs text-purple-600 hover:bg-purple-50 whitespace-nowrap">
            Assign QR
          </button>

          <button
            onClick={handleView}
            className="border px-3 py-1 rounded-lg text-sm flex items-center gap-1 hover:bg-gray-50"
          >
            <Eye size={16} />
            View
          </button>
        </div>
      </div>
    </div>
  );
}
