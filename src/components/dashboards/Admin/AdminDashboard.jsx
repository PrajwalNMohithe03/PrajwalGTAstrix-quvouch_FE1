import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  Users,
  Star,
  DollarSign,
  Building2,
  QrCode,
  Sun,
  Moon,
  MoreVertical,
  Download,
  Copy,
  Eye,
} from "lucide-react";
import { ROUTES } from "@/constants";
import { clearAuth } from "@/features/auth/authSlice";
import AddNew from "./AddNew";
import { useDispatch } from "react-redux";
import SaleRepresentativeList from "./SaleRepresentativeList";
// import ClientDetails from "./ClientDetails";
// Placeholder icons — replace with your real custom icons if you have them

const ClientsIcon = (props) => <Users {...props} />;
const QrIcon = (props) => <QrCode {...props} />;
const StarIcon = (props) => <Star {...props} />;
const BriefcaseIcon = (props) => <Briefcase {...props} />;
const ChartIcon = (props) => (
  <svg
    {...props}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState("sales-reps");
  const [search, setSearch] = useState("");
  const [openAddNew, setOpenAddNew] = useState(false);
  const dispatch = useDispatch();
  // const [clientDetailsOpen, setClientDetailsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    dispatch(clearAuth());

    navigate(ROUTES.LOGIN);
    // Optionally, you can also dispatch the logoutThunk to clear any server-side session if needed
    // dispatch(logoutThunk()); // commenting as its not workin at the momnet and causing errors. We can revisit this when logout logic is fixed.
  };

  // ── DUMMY DATA ───────────────────────────────────────────────────────────────
  const stats = [
    {
      label: "Total Sales Reps",
      value: "12",
      growth: "+2 this month",
      bg: "bg-gradient-to-br from-purple-500 to-pink-500",
      icon: <Briefcase size={22} strokeWidth={2.2} className="text-white" />,
    },
    {
      label: "Total Clients",
      value: "42",
      growth: "+8 this week",
      bg: "bg-gradient-to-br from-indigo-500 to-purple-500",
      icon: <Users size={22} className="text-white" />,
    },
    {
      label: "Total Reviews",
      value: "8,429",
      growth: "+287 this month",
      bg: "bg-gradient-to-br from-green-400 to-emerald-500",
      icon: <Star size={22} className="text-white" />,
    },
    {
      label: "Platform Revenue",
      value: "$125K",
      growth: "+18.3%",
      bg: "bg-gradient-to-br from-orange-500 to-red-500",
      icon: <DollarSign size={22} className="text-white" />,
    },
  ];
  const clients = [
    {
      id: "C-001",
      name: "Bella Vista Restaurant",
      type: "Restaurant",
      rep: "John Anderson",
      qr: 5,
      reviews: 287,
      mrr: "$2,400",
      status: "active",
      icon: <Building2 size={20} />,
      gradient: "linear-gradient(135deg, #f97316, #ef4444)",
    },
    {
      id: "C-002",
      name: "Bright Smile Dental",
      type: "Healthcare",
      rep: "Emily Watson",
      qr: 3,
      reviews: 156,
      mrr: "$1,800",
      status: "active",
      icon: <Building2 size={20} />,
      gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    },
    {
      id: "C-003",
      name: "Luxe Hair Studio",
      type: "Beauty",
      rep: "Michael Brown",
      qr: 4,
      reviews: 198,
      mrr: "$2,100",
      status: "active",
      icon: <Building2 size={20} />,
      gradient: "linear-gradient(135deg, #a855f7, #ec4899)",
    },
    {
      id: "C-004",
      name: "Premium Auto Care",
      type: "Automotive",
      rep: "Sarah Miller",
      qr: 2,
      reviews: 89,
      mrr: "$1,200",
      status: "pending",
      icon: <Building2 size={20} />,
      gradient: "linear-gradient(135deg, #fb7185, #f97316)",
    },
  ];

  const qrCodes = [
    {
      id: "QR-001",
      name: "Downtown Restaurant",
      location: "Main Entrance",
      scans: 342,
      reviews: 28,
      date: "2 days ago",
      status: "active",
    },
    {
      id: "QR-002",
      name: "Dental Clinic - Reception",
      location: "Front Desk",
      scans: 189,
      reviews: 15,
      date: "5 days ago",
      status: "active",
    },
    {
      id: "QR-003",
      name: "Hair Salon VIP",
      location: "Checkout Counter",
      scans: 267,
      reviews: 22,
      date: "1 week ago",
      status: "active",
    },
    {
      id: "QR-004",
      name: "Coffee Shop North",
      location: "Table Tent",
      scans: 95,
      reviews: 8,
      date: "3 days ago",
      status: "pending",
    },
    {
      id: "QR-005",
      name: "Auto Repair Center",
      location: "Waiting Area",
      scans: 156,
      reviews: 12,
      date: "1 week ago",
      status: "active",
    },
  ];

  const recentReviews = [
    {
      business: "Downtown Restaurant",
      rating: 5,
      text: "Excellent service and amazing food!",
      author: "John D.",
      time: "2 hours ago",
    },
    {
      business: "Luxe Hair Studio",
      rating: 5,
      text: "Best haircut I've had in years. Highly recommend!",
      author: "Sarah M.",
      time: "4 hours ago",
    },
    {
      business: "Bright Smile Dental",
      rating: 4,
      text: "Very professional staff, but the wait was a bit long.",
      author: "Mike T.",
      time: "1 day ago",
    },
  ];

  const tabTitles = {
    "sales-reps": "Sales Representatives",
    clients: "Clients",
    "qr-codes": "QR Codes",
    reviews: "Reviews",
    analytics: "Analytics",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 relative font-sans transition-colors duration-200">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.08),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(59,130,246,0.08),transparent_40%)] pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
            <div className="relative w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-500/50 blur-lg rounded-lg -z-10" />
              <QrCode size={18} />
            </div>
            <span className="text-lg">
              Qu<span className="text-purple-600">vouch</span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Settings icon restored */}
            <button className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            <button className="hidden sm:flex items-center gap-2 px-4 py-2 border bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-purple-100 transition">
              Admin Panel
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-purple-100 transition"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div
                  className={`w-11 sm:w-12 h-11 sm:h-12 rounded-xl flex items-center justify-center ${stat.bg}`}
                >
                  {stat.icon}
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-600">
                  {stat.growth}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Add button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 sm:mt-10 mb-6">
          <div className="flex items-center gap-1 bg-white dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-x-auto scrollbar-thin">
            {[
              {
                id: "sales-reps",
                label: "Sales Reps",
                icon: <BriefcaseIcon className="w-4 h-4" />,
              },
              {
                id: "clients",
                label: "Clients",
                icon: <ClientsIcon className="w-4 h-4" />,
              },
              {
                id: "qr-codes",
                label: "QR Codes",
                icon: <QrIcon className="w-4 h-4" />,
              },
              {
                id: "reviews",
                label: "Reviews",
                icon: <StarIcon className="w-4 h-4" />,
              },
              {
                id: "analytics",
                label: "Analytics",
                icon: <ChartIcon className="w-4 h-4" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setOpenAddNew(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            Add New
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden min-h-[400px]">
          <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {tabTitles[activeTab] || activeTab.replace("-", " ")}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage and monitor your {activeTab.replace("-", " ")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1 min-w-[200px]">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Search ${activeTab.replace("-", " ")}...`}
                  className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-purple-500 outline-none w-full"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 whitespace-nowrap">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {/* ── SALES REPS ─────────────────────────────────────────────────────── */}
            {activeTab === "sales-reps" && <SaleRepresentativeList />}

            {/* ── CLIENTS ────────────────────────────────────────────────────────── */}
            {activeTab === "clients" && (
              <div className="space-y-4">
                {clients.map((client) => (
                  <div
                    key={client.id}
                    className="flex flex-col gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-purple-200 transition bg-white dark:bg-gray-900"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className="relative group">
                          <div
                            className="absolute inset-0 rounded-xl blur-lg opacity-60 group-hover:opacity-90 transition"
                            style={{ background: client.gradient }}
                          />
                          <div
                            className="relative w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                            style={{ background: client.gradient }}
                          >
                            {client.icon}
                          </div>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-gray-900 dark:text-white truncate max-w-[240px] sm:max-w-none">
                            {client.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded border dark:border-gray-700">
                              {client.type}
                            </span>
                            <span className="text-xs text-gray-400">
                              {client.id}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center">
                        <button className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg border border-purple-200 text-sm font-medium text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                          <Eye size={14} />
                          <span className="hidden sm:inline">View Details</span>
                        </button>
                        <button className="p-2 rounded-lg text-gray-400 hover:bg-purple-600 hover:text-white transition">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs">Sales Rep</p>
                        <p className="font-medium dark:text-white truncate">
                          {client.rep}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">QR Codes</p>
                        <p className="font-medium dark:text-white">
                          {client.qr} Active
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Reviews</p>
                        <p className="font-medium text-yellow-600 flex items-center gap-1">
                          ⭐ {client.reviews}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">MRR</p>
                        <p className="font-bold text-gray-900 dark:text-white">
                          {client.mrr}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── QR CODES ───────────────────────────────────────────────────────── */}
            {activeTab === "qr-codes" && (
              <div className="space-y-4">
                {qrCodes.map((qr) => (
                  <div
                    key={qr.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-purple-300 transition bg-white dark:bg-gray-900"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center flex-shrink-0">
                        <QrIcon className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center flex-wrap gap-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate max-w-[220px] sm:max-w-none">
                            {qr.name}
                          </h3>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${
                              qr.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {qr.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5 truncate">
                          {qr.location} • {qr.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        👁️{" "}
                        <strong className="text-gray-900 dark:text-white">
                          {qr.scans}
                        </strong>{" "}
                        scans
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        ⭐{" "}
                        <strong className="text-gray-900 dark:text-white">
                          {qr.reviews}
                        </strong>{" "}
                        reviews
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-300 text-sm font-medium bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition">
                        <Download size={14} /> Download
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-purple-300 text-sm font-medium bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white transition">
                        <Copy size={14} /> Copy Link
                      </button>
                      <button className="p-2 rounded-lg text-gray-400 hover:bg-purple-600 hover:text-white transition">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── REVIEWS ────────────────────────────────────────────────────────── */}
            {activeTab === "reviews" && (
              <div className="space-y-4">
                {recentReviews.map((review, i) => (
                  <div
                    key={i}
                    className="p-5 sm:p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                  >
                    <div className="flex justify-between mb-3">
                      <div className="flex gap-1 text-purple-500 text-xl">
                        {[...Array(5)].map((_, idx) => (
                          <span
                            key={idx}
                            className={
                              idx < review.rating ? "opacity-100" : "opacity-30"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {review.time}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {review.business}
                    </h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-400 italic">
                      "{review.text}"
                    </p>
                    <p className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
                      — {review.author}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* ── ANALYTICS ──────────────────────────────────────────────────────── */}
            {activeTab === "analytics" && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-6">
                  <ChartIcon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Analytics Dashboard
                </h3>
                <p className="text-gray-500 mt-2 max-w-md">
                  Detailed performance metrics and growth charts coming soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <AddNew
        open={openAddNew}
        onClose={() => setOpenAddNew(false)}
        onCreate={(client) => {
          console.log("Admin created client:", client);
          setOpenAddNew(false);
        }}
      />

      {/* <ClientDetails
        open={clientDetailsOpen}
        onClose={() => setClientDetailsOpen(false)}
      /> */}
    </div>
  );
}
