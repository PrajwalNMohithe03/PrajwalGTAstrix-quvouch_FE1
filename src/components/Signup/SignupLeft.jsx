
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { QrCode } from "lucide-react";
import { useDispatch } from "react-redux";
import { ROUTES, USER_ROLES } from "../../constants";
import { loginThunk } from "../../features/auth/authSlice";

const roles = [
  {
    id: "sales",
    key: USER_ROLES.SALE_REPRESENTATIVE,
    label: "Sales Rep",
    placeholder: "salesrep@company.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M3 7h18M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7" />
        <path d="M9 7V5a3 3 0 016 0v2" />
      </svg>
    ),
  },
  {
    id: "client",
    key: USER_ROLES.CLIENT,
    label: "Client",
    placeholder: "client@company.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    ),
  },
  {
    id: "admin",
    key: USER_ROLES.ADMIN,
    label: "Admin",
    placeholder: "admin@company.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 3l7 4v5c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V7l7-4z" />
      </svg>
    ),
  },
];

export default function SignupLeft() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [role, setRole] = useState(USER_ROLES.SALE_REPRESENTATIVE);
  const [dark, setDark] = useState(false);

  /* 🔹 ADDED STATES */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  /* 🔐 VALIDATION ADDED */
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
      // const activeUserRole = res.payload.roles[0];
      if (role === USER_ROLES.SALE_REPRESENTATIVE)
        navigate(ROUTES.SALES_DASHBOARD, { replace: true });
      else if (role === USER_ROLES.CLIENT)
        navigate(ROUTES.CLIENT_DASHBOARD, { replace: true });
      else if (role === USER_ROLES.ADMIN)
        navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 relative overflow-hidden">

      {/* 💜 PAGE GLOW */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(55%_40%_at_50%_20%,rgba(168,85,247,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_50%_80%,rgba(196,181,253,0.22),transparent_70%)]" />
      </div>

      {/* NAVBAR */}
      <header className="h-16 w-full border-b border-gray-200/70 dark:border-gray-800">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
            <div className="relative w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center">
              <div className="absolute inset-0 bg-purple-500/40 blur-lg rounded-lg -z-10" />
              <QrCode size={18} />
            </div>
            <span className="text-lg">
              Qu<span className="text-purple-600">vouch</span>
            </span>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {dark ? (
              <MdOutlineLightMode size={22} className="text-yellow-400" />
            ) : (
              <MdOutlineDarkMode size={22} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div className="flex items-center justify-center py-16">
        <div
          className="relative w-[420px] rounded-2xl bg-white dark:bg-gray-900 overflow-hidden
                     shadow-[0_30px_120px_-25px_rgba(168,85,247,0.55)]"
        >
          {/* 💜 CARD GLOW */}
          <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2
                          w-[520px] h-[520px] bg-purple-500/30 blur-[160px]" />

          <div className="px-8 py-12 text-center">

            <div className="px-8 py-12 text-center">
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                  bg-purple-100 dark:bg-purple-900/40
                  text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                ✨ Welcome Back
              </div>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Sign In
              </h1>

  <p className="mt-1 text-purple-600 font-medium">
    to Quvouch
  </p>



              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Access your dashboard
              </p>
            </div>

            {/* ROLE SWITCH */}
            <div className="mt-8 grid grid-cols-3 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              {roles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRole(r.key)}
                  className={`h-14 flex flex-col items-center justify-center gap-1 rounded-lg text-xs font-medium
                    ${
                      role === r.key
                        ? "bg-purple-600 text-white shadow-md"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  {r.icon}
                  {r.label}
                </button>
              ))}
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-left">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={roles.find((r) => r.key === role).placeholder}
                  className="w-full h-12 px-4 rounded-lg
           bg-gray-50 dark:bg-gray-800
           text-gray-900 dark:text-white
           placeholder-gray-400 dark:placeholder-gray-500
           border border-gray-200 dark:border-gray-700"

                />
                {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-12 px-4 rounded-lg
           bg-gray-50 dark:bg-gray-800
           text-gray-900 dark:text-white
           placeholder-gray-400 dark:placeholder-gray-500
           border border-gray-200 dark:border-gray-700"

                />
                {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600
                           text-white font-medium shadow-lg"
              >
                Sign in as {roles.find((r) => r.key === role).label} →
              </button>
            </form>

            {/* REGISTER LINK */}
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-purple-600 cursor-pointer font-medium hover:underline"
              >
                Register
              </span>
            </p>
            {/* SOCIAL LOGIN */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-xs text-gray-400">OR</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* GOOGLE */}
                <button
                  type="button"
                  className="h-12 flex items-center justify-center gap-2 rounded-lg
                 border border-gray-200 dark:border-gray-700
                 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium">Google</span>
                </button>

                {/* APPLE */}
                <button
                  type="button"
                  className="h-12 flex items-center justify-center gap-2 rounded-lg
                 border border-gray-200 dark:border-gray-700
                 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <img
                    src="https://www.svgrepo.com/show/511330/apple-173.svg"
                    alt="Apple"
                    className="w-5 h-5 dark:invert"
                  />
                  <span className="text-sm font-medium">Apple</span>
                </button>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
