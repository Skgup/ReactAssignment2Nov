import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithOtp } from "../api";
import { ArrowLeft, Star } from "lucide-react";

export default function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const mobile = localStorage.getItem("fastor_mobile") || "";

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      // Auto move to next box
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const submitOtp = async () => {
    const otpValue = otp.join("");
    if (!mobile) {
      alert("Mobile number missing — start again");
      navigate("/login");
      return;
    }
    if (otpValue.length < 6) {
      alert("Enter complete 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithOtp(mobile, otpValue);
      const token =
        res?.data?.token || res?.data?.data?.token || res?.data?.accessToken;
      if (token) {
        localStorage.setItem("fastor_token", token);
        navigate("/restaurants");
      } else {
        localStorage.setItem("fastor_token", JSON.stringify(res.data));
        navigate("/restaurants");
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Invalid OTP or login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      

      {/* Main Content */}
      <div className="w-full max-w-sm mt-10 text-center">
        <button
          onClick={() => navigate(-1)}
          className=" left-4 flex bg-white/90 backdrop-blur-sm p-2 rounded-full shadow"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          OTP Verification
        </h1>
        <p className="text-gray-400 mb-8 text-sm">
          Enter the verification code we just sent on your Mobile Number.
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              className="w-12 h-12 text-center text-lg font-semibold border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-400 focus:outline-none"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={submitOtp}
          disabled={loading}
          className="w-full bg-[#FF6B6B] text-white py-4 rounded-xl font-medium text-base shadow-sm active:scale-[0.98] transition-transform disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        {/* Resend Text */}
        <p className="mt-6 text-sm text-gray-500">
          Didn’t receive code?{" "}
          <button
            onClick={() => alert("Resent! (For demo, use 123456)")}
            className="text-indigo-600 font-medium hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
