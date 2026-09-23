import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast5 } from "../utils/toast";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================================================
  // LOGIN
  // =========================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast5.error("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      // =====================================================
      // SIGN IN
      // =====================================================

      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // =====================================================
      // FORCE REFRESH TOKEN
      // Gets latest admin custom claim
      // =====================================================

      const tokenResult = await user.getIdTokenResult(true);

      // =====================================================
      // CHECK ADMIN
      // =====================================================

      const isAdmin = tokenResult.claims.admin === true;

      toast5.success(
        isAdmin
          ? "Welcome to the RoKaShree Admin Panel ✨"
          : "Welcome back to RoKaShree ✨"
      );

      // =====================================================
      // REDIRECT
      // =====================================================

      if (isAdmin) {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else {
        navigate("/", {
          replace: true,
        });
      }
    } catch (error) {
      console.error(error);

      let message = "Unable to login. Please try again.";

      if (error.code === "auth/invalid-credential") {
        message = "Incorrect email or password.";
      }

      if (error.code === "auth/user-not-found") {
        message = "No account found with this email.";
      }

      if (error.code === "auth/wrong-password") {
        message = "Incorrect password.";
      }

      if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      }

      if (error.code === "auth/too-many-requests") {
        message = "Too many attempts. Please try again later.";
      }

      toast5.error(message);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INPUT STYLES
  // =========================================================

  const inputWrapper =
    "group flex items-center w-full bg-[#FCFAF7] border border-[#E8DED3] rounded-xl px-3.5 sm:px-4 h-[50px] sm:h-[52px] transition-all duration-300 hover:border-[#D5C0AA] focus-within:bg-white focus-within:border-[#8B5E3C] focus-within:shadow-[0_8px_24px_rgba(139,94,60,0.08)]";

  const inputClass =
    "w-full min-w-0 bg-transparent outline-none border-none text-[13px] sm:text-sm text-[#4B352A] placeholder:text-[#A99A8E]";

  return (
    <section className="relative min-h-screen bg-[#F8F3ED] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10 overflow-hidden">
      {/* =====================================================
          SUBTLE BACKGROUND DETAILS
      ===================================================== */}

      <div className="absolute top-0 left-0 w-28 h-28 sm:w-40 sm:h-40 border-l border-t border-[#DCC8B5]/50 rounded-tl-[50px] sm:rounded-tl-[70px]" />

      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 border-r border-b border-[#DCC8B5]/50 rounded-br-[60px] sm:rounded-br-[80px]" />

      <div className="absolute top-20 right-[10%] w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#B58A5A]/50" />

      <div className="absolute bottom-24 left-[10%] w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#8B5E3C]/40" />

      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#E7DDD3] text-[#6D4A35] flex items-center justify-center shadow-[0_6px_20px_rgba(75,53,42,0.07)] hover:bg-[#8B5E3C] hover:text-white hover:-translate-x-0.5 transition-all duration-300"
      >
        <FaArrowLeft className="text-[10px] sm:text-xs" />
      </button>

      {/* =====================================================
          LOGIN CARD
      ===================================================== */}

      <div className="relative z-10 w-full max-w-[440px] bg-white border border-[#E9DED3] rounded-[22px] sm:rounded-[28px] shadow-[0_20px_60px_rgba(75,53,42,0.09)] px-5 py-6 sm:px-8 sm:py-8 md:px-9 md:py-9">
       
        {/* ===================================================
            BRAND
        =================================================== */}

        <div className="text-center">
          <div className="mx-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F8F3ED] border border-[#DCC8B5] flex items-center justify-center">
            <span className="text-[#8B5E3C] text-base sm:text-lg">
              ✦
            </span>
          </div>

          <p className="mt-2.5 sm:mt-3 text-[9px] sm:text-[10px] uppercase tracking-[3px] sm:tracking-[4px] text-[#8B5E3C] font-bold">
            ROKASHREE
          </p>

          <p className="mt-1 text-[7px] sm:text-[8px] uppercase tracking-[2.5px] sm:tracking-[3px] text-[#A49385] font-medium">
            Handmade Luxury
          </p>
        </div>

        {/* ===================================================
            HEADING
        =================================================== */}

        <div className="text-center mt-6 sm:mt-7">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[2.5px] sm:tracking-[3px] text-[#8B5E3C] font-semibold">
            Welcome Back
          </p>

          <h1 className="mt-1.5 sm:mt-2 text-[27px] sm:text-[32px] md:text-[36px] font-serif font-semibold tracking-tight text-[#4B352A] leading-tight">
            Login to RoKaShree
          </h1>

          <p className="mt-2 text-[12px] sm:text-sm text-[#8A7A6E] leading-5 sm:leading-6 max-w-[290px] mx-auto">
            Welcome back. Continue your handcrafted journey.
          </p>
        </div>

        {/* ===================================================
            FORM
        =================================================== */}

        <form
          onSubmit={handleLogin}
          className="mt-6 sm:mt-7 space-y-4 sm:space-y-5"
        >
          {/* =================================================
              EMAIL
          ================================================= */}

          <div>
            <label className="block text-[10px] sm:text-[11px] uppercase tracking-[1.3px] sm:tracking-[1.5px] font-semibold text-[#6D5A4E] mb-1.5 sm:mb-2">
              Email Address
            </label>

            <div className={inputWrapper}>
              <FaEnvelope className="flex-shrink-0 text-[#9A7255] text-xs sm:text-sm mr-2.5 sm:mr-3 group-focus-within:text-[#8B5E3C] transition-colors" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* =================================================
              PASSWORD
          ================================================= */}

          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2 gap-2">
              <label className="text-[10px] sm:text-[11px] uppercase tracking-[1.3px] sm:tracking-[1.5px] font-semibold text-[#6D5A4E]">
                Password
              </label>

            </div>

            <div className={inputWrapper}>
              <FaLock className="flex-shrink-0 text-[#9A7255] text-xs sm:text-sm mr-2.5 sm:mr-3 group-focus-within:text-[#8B5E3C] transition-colors" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className={inputClass}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="flex-shrink-0 ml-2 text-[#A08D7D] hover:text-[#6D4935] transition-colors p-1"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-xs sm:text-sm" />
                ) : (
                  <FaEye className="text-xs sm:text-sm" />
                )}
              </button>
            </div>
          </div>

          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[50px] sm:h-[52px] mt-1 rounded-xl sm:rounded-2xl bg-[#7B5138] hover:bg-[#65412D] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13px] sm:text-sm font-semibold tracking-wide shadow-[0_10px_25px_rgba(123,81,56,0.18)] hover:shadow-[0_14px_30px_rgba(123,81,56,0.23)] hover:-translate-y-0.5 transition-all duration-300"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          {/* =================================================
              CREATE ACCOUNT
          ================================================= */}

          <div className="text-center pt-0.5">
            <p className="text-[11px] sm:text-xs text-[#8A7A6E]">
              New to RoKaShree?

              <Link
                to="/signup"
                className="ml-1.5 font-semibold text-[#8B5E3C] hover:text-[#6D472D] transition"
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>

        {/* ===================================================
            TRUST LINE
        =================================================== */}

        <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#F0E8E1] flex items-center justify-center gap-1.5 sm:gap-2">
          <FaShieldAlt className="text-[#A88A70] text-[9px] sm:text-[10px]" />

          <p className="text-[8px] sm:text-[9px] uppercase tracking-[1.2px] sm:tracking-[1.5px] text-[#A49385]">
            Secure & Private
          </p>

          <span className="text-[#C4A88F] text-[8px] sm:text-[9px]">
            •
          </span>

          <p className="text-[8px] sm:text-[9px] uppercase tracking-[1.2px] sm:tracking-[1.5px] text-[#A49385]">
            Crafted With Care
          </p>
        </div>
      </div>
    </section>
  );
}