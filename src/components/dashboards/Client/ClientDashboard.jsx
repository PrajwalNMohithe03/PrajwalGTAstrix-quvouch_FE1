import {
  Star,
  QrCode,
  Eye,
  BarChart3,
  Download,
  Share2,
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../../features/auth/authSlice";
import { api } from "../../../utils/api";

export default function ReviewDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dark, setDark] = useState(false);
  const [businessId, setBusinessId] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);

  /* ================= FETCH BUSINESS ================= */

  useEffect(() => {
    fetchBusiness();
  }, []);

  const fetchBusiness = async () => {
    try {
      const res = await api.get("/api/v1/business/own");

      if (res.data?.businessId) {
        setBusinessId(res.data.businessId);
      }

      if (Array.isArray(res.data) && res.data.length > 0) {
        setBusinessId(res.data[0].businessId);
      }

    } catch (err) {
      console.error("Business fetch error:", err);
    }
  };

  /* ================= FETCH DASHBOARD ================= */

  useEffect(() => {
    if (businessId) {
      fetchDashboard();
    }
  }, [businessId]);

  const fetchDashboard = async () => {
    try {
      const res = await api.get(
        `/api/v1/business/dashboard/${businessId}`
      );
      setDashboardData(res.data);
    } catch (err) {
      console.error("Dashboard Error:", err);
    }
  };

  /* ================= EXPORT ================= */

  const exportReviews = async () => {
    if (!businessId) return;

    const res = await api.get(
      `/api/v1/business/export/${businessId}`,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reviews.csv");
    document.body.appendChild(link);
    link.click();
  };

  /* ================= SHARE ================= */

  const shareReviews = async () => {
    if (!businessId) return;

    const res = await api.get(
      `/api/v1/business/share/${businessId}`
    );

    navigator.clipboard.writeText(res.data);
    alert("Share link copied!");
  };

  /* ================= ANALYTICS ================= */

  const viewAnalytics = async () => {
    if (!businessId) return;

    const res = await api.get(
      `/api/v1/business/analytics/${businessId}`
    );

    setAnalyticsData(res.data);
  };

  /* ================= LOGOUT ================= */

  const logout = () => {
    dispatch(logoutThunk());
    navigate("/login");
  };

  return (
    <div className={`${dark ? "bg-[#05050f] text-gray-200" : "bg-[#f7f5ff] text-gray-800"} min-h-screen relative overflow-hidden`}>

      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className={`absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full blur-[120px] ${
          dark ? "bg-purple-600/20" : "bg-purple-400/20"
        }`} />
        <div className={`absolute bottom-[-150px] right-[-100px] w-[700px] h-[400px] rounded-full blur-[120px] ${
          dark ? "bg-indigo-500/20" : "bg-indigo-400/20"
        }`} />
      </div>

<header
  className={`sticky top-0 z-20 backdrop-blur h-16 border-b ${
    dark
      ? "bg-black/40 border-purple-500/20"
      : "bg-white/70 border-purple-200"
  }`}
>
  <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

    {/* Logo */}
    <div className="flex items-center gap-2 font-semibold">
      <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center">
        <QrCode size={18} />
      </div>
      <span>
        Qu<span className="text-purple-500">vouch</span>
      </span>
    </div>

    {/* Right Side Actions */}
    <div className="flex items-center gap-4">

      {/* Dark Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="p-2 rounded-lg hover:bg-purple-500/10 transition"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Client Dashboard Button */}
      <button
        className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
          dark
            ? "bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30"
            : "bg-purple-100 hover:bg-purple-200 border border-purple-200"
        }`}
      >
        <BarChart3 size={16} />
        Client Dashboard
      </button>

      {/* Settings Icon */}
      <button
        className="p-2 rounded-lg hover:bg-purple-500/10 transition"
      >
        <Settings size={18} />
      </button>

      {/* Logout */}
      <button
        onClick={logout}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
          dark
            ? "border-purple-500/30 hover:border-purple-500/60"
            : "border-purple-300 hover:border-purple-500"
        }`}
      >
        <LogOut size={16} />
        Logout
      </button>

    </div>
  </div>
</header>


      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        <div>
          <h1 className="text-4xl font-bold flex items-center gap-3">
            Your Review Dashboard
            <BarChart3 className="text-purple-500" />
          </h1>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Stat dark={dark} icon={<Star />} title="Total Reviews" value={dashboardData?.totalReviews ?? 0} />
          <Stat dark={dark} icon={<Star />} title="Average Rating" value={dashboardData?.averageRating ?? 0} />
          <Stat dark={dark} icon={<Eye />} title="Total Scans" value={dashboardData?.totalScans ?? 0} />
          <Stat dark={dark} icon={<QrCode />} title="Active QR Codes" value={dashboardData?.activeQrCodes ?? 0} />
        </div>

        {/* MIDDLE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className={`rounded-2xl p-6 border ${
            dark
              ? "bg-[#0f0f1f] border-purple-500/20"
              : "bg-white/70 backdrop-blur border-purple-200"
          }`}>
            <h3 className="font-semibold mb-6">Rating Distribution</h3>

            {dashboardData?.ratingDistribution?.map((r) => (
              <div key={r.stars} className="flex items-center gap-3 mb-3">
                <span className="w-6 text-purple-500">{r.stars}★</span>
                <div className={`flex-1 h-2 rounded ${dark ? "bg-white/10" : "bg-purple-100"}`}>
                  <div
                    className="h-2 rounded bg-purple-500"
                    style={{
                      width: `${(r.count /
                        Math.max(
                          ...dashboardData.ratingDistribution.map((d) => d.count),
                          1
                        )) *
                        100}%`,
                    }}
                  />
                </div>
                <span className="text-xs">{r.count}</span>
              </div>
            ))}
          </div>

          <div className={`lg:col-span-2 rounded-2xl p-6 border ${
            dark
              ? "bg-[#0f0f1f] border-purple-500/20"
              : "bg-white/70 backdrop-blur border-purple-200"
          }`}>
            <h3 className="font-semibold mb-6">Quick Actions</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Action dark={dark} icon={<Download />} title="Export Reviews" onClick={exportReviews} />
              <Action dark={dark} icon={<Share2 />} title="Share Reviews" onClick={shareReviews} />
              <Action dark={dark} icon={<BarChart3 />} title="View Analytics" highlight onClick={viewAnalytics} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* COMPONENTS */

function Stat({ icon, title, value, dark }) {
  return (
    <div className={`p-6 rounded-2xl border transition ${
      dark
        ? "bg-[#0f0f1f] border-purple-500/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]"
        : "bg-white/70 backdrop-blur border-purple-200 hover:shadow-[0_10px_40px_rgba(168,85,247,0.25)]"
    }`}>
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-4">
        {icon}
      </div>
      <p className="text-sm text-gray-400">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
}

function Action({ icon, title, highlight, onClick, dark }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-6 rounded-2xl border transition ${
        dark
          ? highlight
            ? "bg-gradient-to-br from-green-500/20 to-green-500/10 border-purple-500/20"
            : "bg-gradient-to-br from-purple-500/20 to-indigo-500/10 border-purple-500/20"
          : highlight
            ? "bg-gradient-to-br from-green-200/70 to-green-100 border-purple-200"
            : "bg-gradient-to-br from-purple-200/60 to-white border-purple-200"
      }`}
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-4">
        {icon}
      </div>
      <p className="font-semibold">{title}</p>
    </div>
  );
}
