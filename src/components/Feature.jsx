export default function Features() {
  const features = [
    {
      icon: "🔲",
      title: "Smart QR Codes",
      desc: "Create beautiful, scannable QR codes that make leaving reviews effortless. One scan, instant access to Google Reviews.",
    },
    {
      icon: "⭐",
      title: "Trusted Reviews",
      desc: "Help customers vouch for your business authentically. Build social proof that drives real business growth.",
    },
    {
      icon: "📊",
      title: "Premium Analytics",
      desc: "Track QR scans, review conversion rates, and customer feedback. Get insights that matter for your business.",
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      desc: "Optimized for all devices so customers can leave reviews seamlessly on any screen.",
    },
    {
      icon: "🛡️",
      title: "Secure & Reliable",
      desc: "Enterprise-grade security ensures your data and customer interactions stay protected.",
    },
    {
      icon: "⚡",
      title: "Instant Setup",
      desc: "Get started in minutes with no technical knowledge required. Simple, fast, and powerful.",
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-200/30 via-purple-100/10 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 mb-4">
            ✨ Powerful Features ✨
          </span>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Quvouch combines simplicity with powerful features to help
            businesses collect authentic reviews that drive growth.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-purple-200/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-8 shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-purple-200/70 flex items-center justify-center text-purple-700 text-xl mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
