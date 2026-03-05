export default function SignupRightPanel({ role }) {

  const roleColors = {
    SALE_REPRESENTATIVE: {
      gradient: "from-[#8B5CF6] to-[#6366F1]",
      box1: "bg-[#8B5CF6]",
      box2: "bg-[#C4B5FD]",
      glow: "bg-[#8B5CF6]/40",
    },
    CLIENT: {
      gradient: "from-[#6366F1] to-[#8B5CF6]",
      box1: "bg-[#6366F1]",
      box2: "bg-[#A5B4FC]",
      glow: "bg-[#6366F1]/40",
    },
    ADMIN: {
      gradient: "from-[#9333EA] to-[#6366F1]",
      box1: "bg-[#9333EA]",
      box2: "bg-[#C084FC]",
      glow: "bg-[#9333EA]/40",
    },
  };

  const active = roleColors[role] || roleColors.SALE_REPRESENTATIVE;

  const features = [
    {
      text: "Increase reviews by 300%",
      iconBg: "from-green-500 to-emerald-400",
      icon: "↗",
    },
    {
      text: "Join 25,000+ businesses",
      iconBg: "from-[#8B5CF6] to-[#6366F1]",
      icon: "👥",
    },
    {
      text: "Boost your star rating",
      iconBg: "from-pink-500 to-rose-500",
      icon: "★",
    },
    {
      text: "Enterprise-grade security",
      iconBg: "from-[#8B5CF6] to-[#6366F1]",
      icon: "🛡",
    },
  ];

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden
                    bg-gradient-to-br 
                    from-[#faf9ff] via-white to-[#f3f0ff]
                    dark:from-[#05050f] dark:via-[#0f0f1f] dark:to-[#05050f]
                    transition-colors duration-500">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(139,92,246,0.35),transparent_70%)]" />
      </div>

      <div className="relative max-w-md w-full space-y-14 px-8">

        {/* QR SECTION */}
        <div className="relative flex items-center justify-center">

          {/* Role Based Glow */}
          <div className={`absolute w-[320px] h-[320px] rounded-full blur-3xl ${active.glow} transition-all duration-500`} />

          {/* QR Card */}
          <div className={`relative w-[250px] h-[250px] rounded-2xl 
                          bg-gradient-to-br ${active.gradient}
                          p-5 shadow-xl transition-all duration-500`}>

            <div className="grid grid-cols-3 gap-2 bg-white rounded-xl p-3">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`rounded-md ${
                    i % 2 === 0 ? active.box1 : active.box2
                  } transition-all duration-500`}
                  style={{ aspectRatio: "1 / 1" }}
                />
              ))}
            </div>
          </div>

          {/* Rating Badge */}
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#0f0f1f]
                          rounded-xl shadow-lg px-4 py-2 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#8B5CF6] text-white flex items-center justify-center">
              ★
            </div>
            <div>
              <p className="font-bold text-xs text-gray-900 dark:text-white">4.9</p>
              <p className="text-xs text-gray-500">Rating</p>
            </div>
          </div>

          {/* Growth Badge */}
          <div className="absolute -top-6 -right-6 bg-white dark:bg-[#0f0f1f]
                          rounded-xl shadow-lg px-4 py-2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center">
              ↗
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900 dark:text-white">+287%</p>
              <p className="text-xs text-gray-500">Growth</p>
            </div>
          </div>
        </div>

        {/* HEADING */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Why Businesses <span className="text-[#8B5CF6]">Choose Quvouch</span>
        </h2>

        {/* FEATURES */}
        <div className="space-y-5">
          {features.map((item, index) => (
            <div
              key={index}
              className="group flex items-center justify-between p-5 rounded-2xl
                         bg-white dark:bg-[#0f0f1f]
                         border border-gray-200 dark:border-gray-800
                         hover:border-[#8B5CF6]
                         hover:shadow-[0_20px_60px_-15px_rgba(139,92,246,0.35)]
                         transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.iconBg}
                              flex items-center justify-center text-white font-bold`}
                >
                  {item.icon}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.text}
                </span>
              </div>

              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600
                               flex items-center justify-center
                               group-hover:bg-[#8B5CF6] group-hover:text-white transition">
                ✓
              </span>
            </div>
          ))}
        </div>
      </div>
    
  

      {/* ✨ Animations */}
      <style>{`
        @keyframes qrPulse {
          0%,100% { opacity:0.6; transform:scale(1); }
          50% { opacity:1; transform:scale(1.15); }
        }

        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounceSlow {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes bounceSlow2 {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-bounceSlow { animation: bounceSlow 3s ease-in-out infinite; }
        .animate-bounceSlow2 { animation: bounceSlow2 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
