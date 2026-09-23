import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebase";
import { toast5 } from "../utils/toast";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast5.error("Please fill all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast5.error("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      toast5.error("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      toast5.success("Account created successfully ✨");
      navigate("/");
    } catch (error) {
      console.error(error);

      let message = "Unable to create account.";

      if (error.code === "auth/email-already-in-use") {
        message = "An account already exists with this email.";
      }

      if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      }

      if (error.code === "auth/weak-password") {
        message = "Password is too weak.";
      }

      toast5.error(message);
    } finally {
      setLoading(false);
    }
  };

  const inputWrapper =
    "group flex items-center w-full bg-[#FCFAF7] border border-[#E8DED3] rounded-2xl px-4 h-[52px] transition-all duration-300 hover:border-[#D5C0AA] focus-within:bg-white focus-within:border-[#8B5E3C] focus-within:shadow-[0_8px_24px_rgba(139,94,60,0.08)]";

  const inputClass =
    "w-full min-w-0 bg-transparent outline-none border-none text-sm text-[#4B352A] placeholder:text-[#A99A8E]";

  return (
    <section className="relative min-h-screen bg-[#F8F3ED] px-4 py-5 sm:px-5 sm:py-10 overflow-hidden">
     
      {/* Subtle Background */}
      <div className="absolute top-0 left-0 w-40 h-40 border-l border-t border-[#DCC8B5]/50 rounded-tl-[70px]" />

      <div className="absolute bottom-0 right-0 w-48 h-48 border-r border-b border-[#DCC8B5]/50 rounded-br-[80px]" />

      <div className="absolute top-24 right-[12%] w-1.5 h-1.5 rounded-full bg-[#B58A5A]/50" />

      <div className="absolute bottom-28 left-[12%] w-1.5 h-1.5 rounded-full bg-[#8B5E3C]/40" />

      {/* Back Button */}
 <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#E7DDD3] text-[#6D4A35] flex items-center justify-center shadow-[0_6px_20px_rgba(75,53,42,0.07)] hover:bg-[#8B5E3C] hover:text-white hover:-translate-x-0.5 transition-all duration-300"
      >
        <FaArrowLeft className="text-[10px] sm:text-xs" />
      </button>


      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-[440px] mx-auto bg-white border border-[#E9DED3] rounded-[28px] shadow-[0_24px_70px_rgba(75,53,42,0.10)] px-5 py-7 sm:px-9 sm:py-9">
        {/* Brand */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#F8F3ED] border border-[#DCC8B5] flex items-center justify-center">
            <span className="text-[#8B5E3C] text-lg">✦</span>
          </div>

          <p className="mt-3 text-[10px] uppercase tracking-[4px] text-[#8B5E3C] font-bold">
            ROKASHREE
          </p>

          <p className="mt-1 text-[8px] uppercase tracking-[3px] text-[#A49385] font-medium">
            Handmade Luxury
          </p>
        </div>

        {/* Heading */}
        <div className="text-center mt-6 sm:mt-7">
          <p className="text-[10px] uppercase tracking-[3px] text-[#8B5E3C] font-semibold">
            Create Account
          </p>

          <h1 className="mt-2 text-[29px] sm:text-[36px] font-serif font-semibold tracking-tight text-[#4B352A]">
            Join RoKaShree
          </h1>

          <p className="mt-2 text-sm text-[#8A7A6E] leading-6">
            Create your account and begin your handcrafted journey.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="mt-6 sm:mt-7 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-[11px] uppercase tracking-[1.5px] font-semibold text-[#6D5A4E] mb-2">
              Full Name
            </label>

            <div className={inputWrapper}>
              <FaUser className="flex-shrink-0 text-[#9A7255] text-sm mr-3 group-focus-within:text-[#8B5E3C] transition-colors" />

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] uppercase tracking-[1.5px] font-semibold text-[#6D5A4E] mb-2">
              Email Address
            </label>

            <div className={inputWrapper}>
              <FaEnvelope className="flex-shrink-0 text-[#9A7255] text-sm mr-3 group-focus-within:text-[#8B5E3C] transition-colors" />

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

          {/* Password */}
          <div>
            <label className="block text-[11px] uppercase tracking-[1.5px] font-semibold text-[#6D5A4E] mb-2">
              Password
            </label>

            <div className={inputWrapper}>
              <FaLock className="flex-shrink-0 text-[#9A7255] text-sm mr-3 group-focus-within:text-[#8B5E3C] transition-colors" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className={inputClass}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="flex-shrink-0 ml-2 text-[#A08D7D] hover:text-[#6D4935] transition-colors"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-sm" />
                ) : (
                  <FaEye className="text-sm" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[11px] uppercase tracking-[1.5px] font-semibold text-[#6D5A4E] mb-2">
              Confirm Password
            </label>

            <div className={inputWrapper}>
              <FaLock className="flex-shrink-0 text-[#9A7255] text-sm mr-3 group-focus-within:text-[#8B5E3C] transition-colors" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className={inputClass}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="flex-shrink-0 ml-2 text-[#A08D7D] hover:text-[#6D4935] transition-colors"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-sm" />
                ) : (
                  <FaEye className="text-sm" />
                )}
              </button>
            </div>
          </div>

          {/* Create Account */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] mt-1 rounded-2xl bg-[#7B5138] hover:bg-[#65412D] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold tracking-wide shadow-[0_10px_25px_rgba(123,81,56,0.20)] hover:shadow-[0_14px_30px_rgba(123,81,56,0.25)] hover:-translate-y-0.5 transition-all duration-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login */}
          <div className="text-center pt-1">
            <p className="text-xs text-[#8A7A6E]">
              Already have an account?
              <Link
                to="/login"
                className="ml-1.5 font-semibold text-[#8B5E3C] hover:text-[#6D472D] transition"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>

        {/* Trust Line */}
        <div className="mt-6 pt-5 border-t border-[#F0E8E1] flex items-center justify-center gap-2">
          <FaShieldAlt className="text-[#A88A70] text-[10px]" />

          <p className="text-[9px] uppercase tracking-[1.5px] text-[#A49385]">
            Secure & Private
          </p>

          <span className="text-[#C4A88F] text-[9px]">•</span>

          <p className="text-[9px] uppercase tracking-[1.5px] text-[#A49385]">
            Crafted With Care
          </p>
        </div>
      </div>
    </section>
  );
}