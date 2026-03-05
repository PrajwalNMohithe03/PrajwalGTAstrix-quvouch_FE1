import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import {
  QrCode,
  Briefcase,
  User,
  Shield,
  Mail,
  Lock,
  Eye,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { ROUTES, USER_ROLES } from "../../constants";
import { loginThunk } from "../../features/auth/authSlice";

const roles = [
  {
    key: USER_ROLES.SALE_REPRESENTATIVE,
    label: "Sales Rep",
    icon: <Briefcase size={18} />,
    placeholder: "salesrep@quvouch.com",
  },
  {
    key: USER_ROLES.CLIENT,
    label: "Client",
    icon: <User size={18} />,
    placeholder: "client@quvouch.com",
  },
  {
    key: USER_ROLES.ADMIN,
    label: "Admin",
    icon: <Shield size={18} />,
    placeholder: "admin@quvouch.com",
  },
];
export default function SignupLeft({ role, setRole }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dark, setDark] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (!email.trim()) {
      setEmailError("This field is required");
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError("This field is required");
      valid = false;
    }

    if (!valid) return;

    const res = await dispatch(loginThunk({ email, password }));

    if (res.meta.requestStatus === "fulfilled") {
      if (role === USER_ROLES.SALE_REPRESENTATIVE)
        navigate(ROUTES.SALES_DASHBOARD, { replace: true });
      else if (role === USER_ROLES.CLIENT)
        navigate(ROUTES.CLIENT_DASHBOARD, { replace: true });
      else if (role === USER_ROLES.ADMIN)
        navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9ff] dark:bg-[#05050f] transition-colors duration-500">

      {/* HEADER */}
      <header className="h-16 border-b border-gray-200 dark:border-gray-800">
        <div className="w-[360px] max-w-full mx-auto h-full flex items-center justify-between px-2">
          <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
            <QrCode size={20} className="text-[#8B5CF6]" />
            <span className="text-sm">
              Qu<span className="text-[#8B5CF6]">vouch</span>
            </span>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-white dark:bg-black hover:scale-105 transition"
          >
            {dark ? (
              <MdOutlineLightMode size={18} className="text-yellow-400" />
            ) : (
              <MdOutlineDarkMode size={18} className="text-[#8B5CF6]" />
            )}
          </button>
        </div>
      </header>

      {/* CENTER */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">

        <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white text-sm font-medium shadow-lg mb-6">
          Welcome Back
        </div>

        <h1 className="text-[36px] font-bold text-gray-900 dark:text-white">
          Sign In
        </h1>

        <p className="text-[#8B5CF6] text-sm font-medium mt-2">
          to Quvouch
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Access your dashboard
        </p>

        {/* ROLE SELECTOR */}
        <div className="mt-6 flex bg-white dark:bg-[#0f0f1f] rounded-xl p-2 border border-gray-200 dark:border-gray-700 w-[360px] shadow-sm">
          {roles.map((r) => (
            <button
              key={r.key}
              onClick={() => setRole(r.key)}
              className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 rounded-lg text-xs font-medium transition ${
                role === r.key
                  ? "bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white shadow-md"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {r.icon}
              {r.label}
            </button>
          ))}
        </div>

      {/* LOGIN CARD WITH FIGMA GLOW */}
<div
  className="mt-6 w-[360px] 
             bg-white dark:bg-[#0f0f1f] 
             rounded-xl p-6 
             border border-gray-200 dark:border-gray-800
             shadow-[0_0_100px_rgba(139,92,246,0.35)]
             dark:shadow-[0_0_140px_rgba(139,92,246,0.55)]"
>


          <form onSubmit={handleSubmit} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>

              <div className="mt-2 relative">
                <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <input
                  type="email"
                  placeholder={roles.find(r => r.key === role).placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
              </div>
              {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-[#8B5CF6] cursor-pointer"
                >
                  Forgot password?
                </span>
              </div>

              <div className="mt-2 relative">
                <Lock size={16} className="absolute left-3 top-3.5 text-gray-400" />
                <Eye size={16} className="absolute right-3 top-3.5 text-gray-400 cursor-pointer" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                />
              </div>
              {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white text-sm font-medium shadow-md"
            >
              Sign In as {roles.find(r => r.key === role).label} →
            </button>

            <div className="text-center text-xs text-gray-400">
              Or continue with
            </div>

            {/* GOOGLE + APPLE */}
            <div className="flex justify-center gap-6">

              <button
                type="button"
                onClick={() => window.open("https://www.google.com", "_blank")}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Google
              </button>

              <button
                type="button"
                onClick={() => window.open("https://www.apple.com", "_blank")}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/511330/apple-173.svg"
                  alt="Apple"
                  className="w-5 h-5 dark:invert"
                />
                Apple
              </button>

            </div>

          </form>
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/contact")}
            className="text-[#8B5CF6] cursor-pointer"
          >
            Contact sales
          </span>
        </div>

      </div>
    </div>
  );
}
