import { Link } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";

export default function ProfileMenu({ user, logout }) {
  const firstLetter =
    user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <div className="absolute right-0 mt-4 w-80 bg-white rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden animate-[fadeIn_.25s_ease] z-50">

      {/* Top */}

      <div className="px-5 py-4 bg-[#FCFAF7]">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center text-lg font-bold shadow">

            {firstLetter}

          </div>

          <div>

            

            <h3 className="font-semibold text-[#4B352A] text-mt-base 1">
              {user?.displayName || "User"}
            </h3>

            <p className="text-gray-500 text-[11px] mt-0.5 break-all">
              {user?.email}
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <div className="py-3">

        <Link
          to="/profile"
          className="flex items-center justify-between px-5 py-2.5 hover:bg-[#F8F3ED] transition"
        >
          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-[#F8F3ED] flex items-center justify-center">

              <FaUser className="text-[#8B5E3C]" />

            </div>

            <span className="font-medium text-[#4B352A]">
              My Profile
            </span>

          </div>

          <span className="text-gray-400">›</span>

        </Link>

        <Link
          to="/my-orders"
          className="flex items-center justify-between px-5 py-2.5 hover:bg-[#F8F3ED] transition"
        >
          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-[#F8F3ED] flex items-center justify-center">

              <FaBoxOpen className="text-[#8B5E3C]" />

            </div>

            <span className="font-medium text-[#4B352A]">
              My Orders
            </span>

          </div>

          <span className="text-gray-400">›</span>

        </Link>

        <hr className="my-1 border-gray-200" />

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-[#F8F3ED] transition text-left"
        >

          <div className="w-9 h-9 rounded-full bg-[#F8F3ED] flex items-center justify-center">

            <FaSignOutAlt className="text-[#8B5E3C]" />

          </div>

          <span className="font-medium text-[#8B5E3C]">
            Logout
          </span>

        </button>

      </div>

    </div>
  );
}