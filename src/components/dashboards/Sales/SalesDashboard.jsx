import {
  User,
  QrCode,
  Star,
  DollarSign,
  Eye,
  Moon,
  Sun,
  LogOut,
  Briefcase,
   Settings,
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
  searchClientsThunk,
  toggleBusinessStatusThunk,
  deleteClientThunk,
  generateQrThunk,
} from "../../../features/sales/SalesClientSlice";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [createClientOpen, setCreateClientOpen] = useState(false);
  const [generateQrOpen, setGenerateQrOpen] = useState(false);
  const [qrBusinessId, setQrBusinessId] = useState("");
  const [qrLocation, setQrLocation] = useState("");
  const [search, setSearch] = useState("");
const [viewClient, setViewClient] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { dashboard, clients, activeQr } = useSelector(
  (state) => state.sales
);
  const token = useSelector((state) => state.auth.accessToken);

  const refreshDashboard = useCallback(async () => {
    await dispatch(fetchSalesDashboardThunk()).unwrap();
    await dispatch(fetchSalesClientsThunk()).unwrap();
      await dispatch(fetchActiveQrThunk()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      refreshDashboard();
    }
  }, [token, refreshDashboard]);

  useEffect(() => {
    if (search.trim() === "") {
      dispatch(fetchSalesClientsThunk());
    } else {
      dispatch(searchClientsThunk(search));
    }
  }, [search, dispatch]);

  const logout = () => {
    dispatch(logoutThunk());
    navigate("/login", { replace: true });
  };
const handleGenerateQrSubmit = async () => {
  console.log("QR Submit Clicked");
  console.log("BusinessId:", qrBusinessId);
  console.log("Location:", qrLocation);

  if (!qrBusinessId || !qrLocation.trim()) {
    console.log("Validation failed");
    return;
  }

  try {
    await dispatch(
      generateQrThunk({
        businessId: Number(qrBusinessId),
        location: qrLocation,
      })
    ).unwrap();

    setGenerateQrOpen(false);
    setQrBusinessId("");
    setQrLocation("");

  } catch (err) {
    console.error("QR generation failed:", err);
  }
};

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

        {/* NAVBAR */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

            <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
              <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                <QrCode size={18} />
              </div>
              <span className="text-lg">
                Qu<span className="text-purple-600">vouch</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <div className="hidden sm:flex items-center gap-2 px-4 py-2 border bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 rounded-lg text-sm font-medium">
                <Briefcase size={16} />
                Sales Representative
              </div>

              <button
                onClick={() => navigate("/settings")}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition"
              >
                <Settings size={18} />
              </button>


              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 border bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 rounded-lg text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-800 transition">
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* MAIN */}
        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-8">

            <h1 className="text-3xl font-bold mb-1 dark:text-white">
              Welcome, Sales Rep! 👋
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mb-10">
              Manage your clients and grow your portfolio
            </p>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <StatCard icon={<User />} title="My Clients"
                value={dashboard?.clientsCount ?? clients?.length ?? 0}
                badge="+8 this month"
              />
             <StatCard
  icon={<QrCode />}
  title="Active QR Codes"
  value={activeQr?.length || 0}
  badge="+23 this week"
/>
              <StatCard icon={<Star />} title="Total Reviews"
                value={dashboard?.reviews || 0}
                badge="+287 this month"
              />
              <StatCard icon={<DollarSign />} title="Commission"
                value={dashboard?.commission || 0}
                badge="+12.5%"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setCreateClientOpen(true)}
                className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                Create New Client
              </button>

              <button
                onClick={() => setGenerateQrOpen(true)}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
                Generate QR Code
              </button>

              <button
                onClick={() => navigate("/register")}
                className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
                Register New Client
              </button>

              <button className="border px-5 py-2 rounded-lg text-purple-600 hover:bg-purple-50">
                Generate Report
              </button>
            </div>

            {/* CLIENT LIST */}
            <div className="space-y-4">
              {clients?.map((client) => (
              <ClientCard
  key={client.businessId}
  client={client}
  refreshDashboard={refreshDashboard}
  onView={(client) => setViewClient(client)}
/>
              ))}
            </div>

          </div>
        </main>

        {/* QR MODAL */}
        {generateQrOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 shadow-xl">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">
                Generate QR Code
              </h2>

            <input
  type="number"
  placeholder="Enter Business ID"
  value={qrBusinessId}
  onChange={(e) => setQrBusinessId(e.target.value)}
  className="w-full px-4 py-2 border rounded-lg mb-4 dark:bg-gray-800"
/>

<input
  type="text"
  placeholder="Enter Location (Example: Bangalore Branch)"
  value={qrLocation}
  onChange={(e) => setQrLocation(e.target.value)}
  className="w-full px-4 py-2 border rounded-lg mb-4 dark:bg-gray-800"
/>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setGenerateQrOpen(false)}
                  className="px-4 py-2 border rounded-lg">
                  Cancel
                </button>

                <button
                  onClick={handleGenerateQrSubmit}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Generate
                </button>
              </div>
            </div>
          </div>
        )}
        {/* VIEW MODAL */}
{viewClient && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-900 w-[520px] rounded-2xl shadow-xl p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-white">
          Business Details
        </h2>
        <button
          onClick={() => setViewClient(null)}
          className="text-gray-400 hover:text-gray-600 text-lg">
          ✕
        </button>
      </div>

      {/* AVATAR + NAME */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl font-semibold">
          {viewClient.businessName
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div>
          <h3 className="text-lg font-semibold dark:text-white">
            {viewClient.businessName}
          </h3>
          <p className="text-sm text-gray-500">
            {viewClient.businessType}
          </p>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-2 gap-4 text-sm">

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-500">Business ID</p>
          <p className="font-medium dark:text-white">
            {viewClient.businessId}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-500">Email</p>
          <p className="font-medium dark:text-white">
            {viewClient.businessEmail}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-500">Status</p>
          <p className="font-medium dark:text-white">
            {viewClient.status}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <p className="text-gray-500">QR Codes</p>
          <p className="font-medium dark:text-white">
            {viewClient.qrCount || 0}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg col-span-2">
          <p className="text-gray-500">Reviews</p>
          <p className="font-medium dark:text-white">
            {viewClient.reviewCount || 0}
          </p>
        </div>

      </div>

    </div>
  </div>
)}

        <CreateClient
          open={createClientOpen}
          onClose={() => setCreateClientOpen(false)}
          onSuccess={refreshDashboard}
        />
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ icon, title, value = 0, badge }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Number(value);
    const duration = 800;
    const stepTime = 20;
    const step = Math.ceil(end / (duration / stepTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white flex items-center justify-center">
          {icon}
        </div>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600">
          {badge}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-3xl font-bold mt-1 dark:text-white">{count}</h3>
      </div>
    </div>
  );
}

/* ================= CLIENT CARD ================= */
/* ================= CLIENT CARD ================= */
function ClientCard({ client, refreshDashboard, onView }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleView = () => {
  onView(client);
};

  const handleToggle = async () => {
  await dispatch(
    toggleBusinessStatusThunk(client.businessId)
  ).unwrap();
};
const handleDelete = async () => {
  await dispatch(
    deleteClientThunk(client.businessId)
  ).unwrap();
};
  const getStatusColor = (status) => {
    if (status === "ACTIVE") return "bg-green-100 text-green-600";
    if (status === "PENDING") return "bg-yellow-100 text-yellow-600";
    if (status === "INACTIVE") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return (
      (words[0]?.charAt(0) || "") +
      (words[words.length - 1]?.charAt(0) || "")
    ).toUpperCase();
  };

  const colors = [
    "bg-purple-500",
    "bg-indigo-500",
    "bg-pink-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-orange-500",
  ];

  const avatarColor =
    colors[client.businessId % colors.length];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${avatarColor}`}>
            {getInitials(client.businessName)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold dark:text-white">
                {client.businessName}
              </h3>

              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(client.status)}`}>
                {client.status}
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {client.businessType}
            </p>

            <div className="flex gap-4 text-xs text-gray-400 mt-1">
              <span>{client.qrCount || 0} QR Codes</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex gap-3">

          <button
            onClick={handleToggle}
            className="px-3 py-1 rounded-lg text-sm border border-gray-300">
            Toggle
          </button>

          <button
            onClick={handleDelete}
            className="px-3 py-1 rounded-lg text-sm border border-red-300 text-red-500">
            Delete
          </button>

          <button
            onClick={handleView}
            className="px-4 py-1 rounded-lg text-sm border border-gray-300 flex items-center gap-2 hover:bg-gray-100">
            <Eye size={16} />
            View
          </button>

        </div>

      </div>
    </div>
  );
}