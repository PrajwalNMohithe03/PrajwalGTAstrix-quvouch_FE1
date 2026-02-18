import { useState } from "react";
import { publicApi } from "../../../utils/publicApi";
import {
  Briefcase,
  QrCode,
  Star,
  User,
  Mail,
  Phone,
  Tag,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";

export default function CustomerReview() {
  const [dark, setDark] = useState(false);
  const [success, setSuccess] = useState(false);

  const [businessId, setBusinessId] = useState("");
  const [qrCodeId, setQrCodeId] = useState("");
  const [rating, setRating] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!businessId || !qrCodeId || !rating) {
      alert("Business ID, QR Code ID and Rating are required");
      return;
    }

    const payload = {
      businessId: parseInt(businessId),
      qrCodeId,
      rating: parseInt(rating),
      customerName,
      customerEmail,
      customerPhone,
      feedbackText,
      feedbackCategory: feedbackCategory
        ? parseInt(feedbackCategory)
        : 0,
    };

    try {
      setLoading(true);
      await publicApi.post(`/api/v1/qr/${qrCodeId}/rate`, payload);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-black flex items-center justify-center px-4 transition-colors duration-500">

        {/* 🔵 Glow Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/70 dark:bg-gray-700 backdrop-blur shadow-md hover:scale-110 transition"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative w-full max-w-lg">

          {/* 🌈 Glass Neon Card */}
          <div className="relative bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-indigo-300/40 dark:border-indigo-500/20 shadow-2xl">

            {/* Neon Border Effect */}
            <div className="absolute inset-0 rounded-3xl border border-indigo-400/40 blur-sm pointer-events-none"></div>

            {!success ? (
              <>
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                  Leave Your Review
                </h2>

                <div className="space-y-6">

                  <FloatingInput icon={<Briefcase />} label="Business ID" value={businessId} setValue={setBusinessId} type="number" />
                  <FloatingInput icon={<QrCode />} label="QR Code ID" value={qrCodeId} setValue={setQrCodeId} />
                  <FloatingInput icon={<Star />} label="Rating (1-5)" value={rating} setValue={setRating} type="number" />
                  <FloatingInput icon={<User />} label="Your Name" value={customerName} setValue={setCustomerName} />
                  <FloatingInput icon={<Mail />} label="Email Address" value={customerEmail} setValue={setCustomerEmail} type="email" />
                  <FloatingInput icon={<Phone />} label="Phone Number" value={customerPhone} setValue={setCustomerPhone} />
                  <FloatingInput icon={<Tag />} label="Feedback Category" value={feedbackCategory} setValue={setFeedbackCategory} />

                  <div className="relative">
                    <textarea
                      rows={4}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="peer w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl px-4 pt-5 pb-2 focus:outline-none focus:border-indigo-500"
                      placeholder=" "
                    />
                    <label className="absolute left-4 top-2 text-sm text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400">
                      Feedback
                    </label>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold transition duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-indigo-400/40"
                  >
                    {loading ? "Submitting..." : "Submit Review"}
                  </button>

                </div>
              </>
            ) : (
              /* ✅ Success Animation */
              <div className="flex flex-col items-center justify-center text-center py-10 animate-fadeIn">
                <CheckCircle className="text-green-500 w-20 h-20 animate-bounce" />
                <h3 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">
                  Review Submitted!
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Thank you for your feedback ❤️
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

/* 🔥 Floating Input Component */

function FloatingInput({ icon, label, value, setValue, type = "text" }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-4 text-indigo-500">
        {icon}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="peer w-full bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl pl-10 pr-4 pt-5 pb-2 focus:outline-none focus:border-indigo-500 transition"
        placeholder=" "
      />
      <label className="absolute left-10 top-2 text-sm text-gray-500 dark:text-gray-400 transition-all 
        peer-placeholder-shown:top-4 
        peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-400">
        {label}
      </label>
    </div>
  );
}
