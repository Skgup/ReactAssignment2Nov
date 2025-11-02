import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerMobile } from "../api";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!/^\d{10}$/.test(mobile)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      await registerMobile(mobile);
      localStorage.setItem("fastor_mobile", mobile);
      navigate("/otp");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      {/* Main Container */}
      <div className="w-full max-w-sm">
        {/* Title Section */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Enter Your Mobile Number
        </h1>
        <p className="text-gray-400 mb-8 text-sm">
          We will send you the 4 digit verification code
        </p>

        {/* Input Field */}
        <input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter your mobile number"
          className="w-full p-4 border border-gray-200 rounded-xl mb-6 text-gray-700 focus:ring-2 focus:ring-red-400 focus:outline-none placeholder:text-gray-400 bg-gray-50"
          inputMode="numeric"
          maxLength={10}
        />

        {/* Send Code Button */}
        <button
          onClick={sendOtp}
          disabled={loading}
          className="w-full bg-[#FF6B6B] text-white py-4 rounded-xl font-medium text-base shadow-sm active:scale-[0.98] transition-transform disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Code"}
        </button>

       
      </div>
    </div>
  );
}
