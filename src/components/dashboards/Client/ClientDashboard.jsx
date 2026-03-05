import {
  Star,
  Eye,
  BarChart3,
  Download,
  Share2,
  Settings,
  LogOut,
  Sun,
  Moon,
  QrCode,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../../features/auth/authSlice";

import {
  fetchOwnBusiness,
  fetchDashboard,
  fetchReviews,
  fetchAnalytics,
  exportBusinessReviews,
  shareBusinessReviews,
  downloadBusinessQr,
} from "../../../features/clientBusiness/clientBusinessThunk";

export default function ReviewDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const [qrPreview, setQrPreview] = useState(null);
  const [qrId, setQrId] = useState(null);
  const [showQrSection, setShowQrSection] = useState(false);

  const {
    ownBusiness,
    dashboard,
    reviews,
    analytics,
    loading,
  } = useSelector((state) => state.clientBusiness);

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    dispatch(fetchOwnBusiness());
  }, [dispatch]);

  useEffect(() => {
    if (ownBusiness?.businessId) {
      dispatch(fetchDashboard(ownBusiness.businessId));
      dispatch(fetchReviews());
    }
  }, [ownBusiness, dispatch]);

  /* ================= ACTIONS ================= */

  const handleExport = async () => {
    if (!ownBusiness?.businessId) return;

    const blob = await dispatch(
      exportBusinessReviews(ownBusiness.businessId)
    ).unwrap();

    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "reviews.csv");
    link.click();
  };

  const handleShare = async () => {
    if (!ownBusiness?.businessId) return;

    const link = await dispatch(
      shareBusinessReviews(ownBusiness.businessId)
    ).unwrap();

    navigator.clipboard.writeText(link);
    alert("Share link copied!");
  };

  const handleAnalytics = async () => {
    if (!ownBusiness?.businessId) return;

    await dispatch(
      fetchAnalytics(ownBusiness.businessId)
    ).unwrap();

    setShowAnalytics(true);
  };

  const handleActiveQrClick = async () => {
    if (!ownBusiness?.businessId) return;

    const blob = await dispatch(
      downloadBusinessQr(ownBusiness.businessId)
    ).unwrap();

    const imageUrl = URL.createObjectURL(new Blob([blob]));

    setQrPreview(imageUrl);
    setQrId(ownBusiness.businessId); // replace if backend returns qrId
    setShowQrSection(true);
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <div className="min-h-screen bg-[#faf7ff] dark:bg-[#0b0b14] text-gray-800 dark:text-gray-100">

        {/* ================= HEADER ================= */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-black/40 backdrop-blur border-b border-purple-200/40 dark:border-white/10 h-16">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-2 font-semibold text-lg">
              <QrCode className="text-purple-600" size={20} />
              Qu<span className="text-purple-600">vouch</span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">

              <button
                onClick={() => setDark(!dark)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-700 text-sm font-medium">
                Client Dashboard
              </button>

              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10">
                <Settings size={18} />
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-purple-200 text-purple-600 text-sm font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>

            </div>
          </div>
        </header>

        {/* ================= MAIN ================= */}
        <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">

          {/* TITLE */}
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Your Review Dashboard
              <BarChart3 className="text-purple-600" />
            </h1>
            <p className="text-gray-500">
              Monitor and manage all customer reviews collected via Quvouch
            </p>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <Stat
              title="Total Reviews"
              value={dashboard?.totalReviews ?? 0}
              icon={<Star />}
            />

            <Stat
              title="Average Rating"
              value={dashboard?.averageRating ?? 0}
              icon={<Star />}
            />

            <Stat
              title="Total Scans"
              value={dashboard?.totalScans ?? 0}
              icon={<Eye />}
            />

            <Stat
              title="Active QR Codes"
              value={dashboard?.activeQrCodes ?? 0}
              icon={<QrCode />}
              onClick={handleActiveQrClick}
            />

          </div>

          {/* ================= MIDDLE SECTION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Rating Distribution */}
            <div className="bg-white/70 dark:bg-white/5 p-6 rounded-xl border">
              <h3 className="font-semibold mb-4">
                Rating Distribution
              </h3>

              {[5,4,3,2,1].map((star) => (
                <RatingRow
                  key={star}
                  star={star}
                  value={dashboard?.[`${["","one","two","three","four","five"][star]}Star`] ?? 0}
                />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-2 bg-white/70 dark:bg-white/5 p-6 rounded-xl border">
              <h3 className="font-semibold mb-4">
                Quick Actions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Action title="Export Reviews" icon={<Download />} onClick={handleExport} />
                <Action title="Share Reviews" icon={<Share2 />} onClick={handleShare} />
                <Action title="View Analytics" icon={<BarChart3 />} onClick={handleAnalytics} />
              </div>
            </div>
          </div>

          {/* ================= QR SECTION ================= */}
          {showQrSection && qrPreview && (
            <div className="bg-white/70 dark:bg-white/5 p-8 rounded-xl border text-center">
              <h3 className="text-xl font-semibold mb-4">
                Active QR Code
              </h3>

              <img
                src={qrPreview}
                alt="QR Code"
                className="mx-auto w-56 h-56 rounded-lg border"
              />

              <p className="mt-4 text-sm text-gray-500">
                QR Code ID: <span className="font-medium">{qrId}</span>
              </p>

              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = qrPreview;
                  link.download = "qrcode.png";
                  link.click();
                }}
                className="mt-6 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Download QR Code
              </button>
            </div>
          )}

        </main>

        {/* ================= ANALYTICS MODAL ================= */}
        {showAnalytics && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white dark:bg-[#0f0f1f] p-8 rounded-xl w-[500px]">
              <h2 className="text-xl font-bold mb-6">
                Analytics
              </h2>
              <p>Total Reviews: {analytics?.totalReviews}</p>
              <p>Average Rating: {analytics?.averageRating}</p>
              <p>Total Scans: {analytics?.totalScans}</p>

              <button
                onClick={() => setShowAnalytics(false)}
                className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ title, value, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-6 rounded-xl border bg-white/70 dark:bg-white/5 ${
        onClick ? "cursor-pointer hover:shadow-md" : ""
      }`}
    >
      <div className="mb-3 text-purple-600">{icon}</div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}

function Action({ title, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-5 rounded-xl border bg-gradient-to-br from-purple-100 to-white dark:from-white/10 dark:to-white/5 hover:shadow-md"
    >
      <div className="mb-3 text-purple-600">{icon}</div>
      <p className="font-medium">{title}</p>
    </div>
  );
}

function RatingRow({ star, value }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="w-6">{star}★</span>
      <div className="flex-1 h-2 rounded bg-gray-200 dark:bg-white/10">
        <div
          className="h-2 rounded bg-purple-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs w-8 text-right">{value}</span>
    </div>
  );
}