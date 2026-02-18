import { useState, useEffect } from "react";
import { Star, Camera } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { rateQrCodeThunk } from "../../../features/review/reviewThunk";
import { resetReviewState } from "../../../features/review/reviewSlice";
import { getQrDetailsApi } from "../../../features/review/reviewService";

export default function CustomerReview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { qrCodeId } = useParams(); // ✅ from URL

  const { loading, success, error } = useSelector(
    (state) => state.review
  );

  const [businessId, setBusinessId] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [image, setImage] = useState(null);

  /* ================= FETCH QR DETAILS ================= */
  useEffect(() => {
    const fetchQrDetails = async () => {
      try {
        const data = await getQrDetailsApi(qrCodeId);
        setBusinessId(data.businessId); // ✅ dynamic businessId
      } catch (err) {
        console.error("QR fetch error:", err);
        alert("Invalid QR Code");
      }
    };

    if (qrCodeId) {
      fetchQrDetails();
    }
  }, [qrCodeId]);

  /* ================= SUBMIT ================= */
  const handleSubmit = () => {
    if (!rating || !feedbackText) {
      alert("Rating and feedback are required");
      return;
    }

    if (!businessId) {
      alert("Business not found");
      return;
    }

    const payload = {
      businessId,
      qrCodeId,
      rating,
      customerName: "Customer",
      customerEmail: "customer@gmail.com",
      customerPhone: "9999999999",
      feedbackText,
      feedbackCategory: "GENERAL", // use string if backend expects string
    };

    dispatch(
      rateQrCodeThunk({
        qrCode: qrCodeId,
        payload,
      })
    );
  };

  /* ================= SUCCESS / ERROR ================= */
  useEffect(() => {
    if (success) {
      alert("Thank you for your review ❤️");
      dispatch(resetReviewState());
      navigate("/customer");
    }

    if (error) {
      alert(error);
      dispatch(resetReviewState());
    }
  }, [success, error, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Leave a Review</h2>
        <p className="text-gray-500 mb-6">
          Your feedback helps us improve
        </p>

        {/* ⭐ STAR RATING */}
        <div className="flex gap-2 mb-5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              size={28}
              onClick={() => setRating(s)}
              className={`cursor-pointer ${
                s <= rating
                  ? "fill-purple-600 text-purple-600"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* 📝 FEEDBACK */}
        <textarea
          rows={4}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full border rounded-lg p-3 mb-4"
        />

        {/* 📸 CAMERA */}
        <label className="flex items-center justify-center gap-2 cursor-pointer border border-dashed rounded-lg p-4 mb-5 text-purple-600">
          <Camera />
          {image ? image.name : "Add photo (optional)"}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {/* 🚀 SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          Camera opens automatically on mobile devices
        </p>
      </div>
    </div>
  );
}


