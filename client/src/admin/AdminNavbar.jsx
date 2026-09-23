import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";

import { collection, getDocs } from "firebase/firestore";

import {
  FaChartLine,
  FaClipboardList,
  FaBoxOpen,
  FaSignOutAlt,
  FaEnvelope,
  FaNewspaper,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { auth, db } from "../firebase/firebase";

export default function AdminNavbar() {
  const navigate = useNavigate();

  // =========================================================
  // MOBILE MENU
  // =========================================================
  const [mobileOpen, setMobileOpen] = useState(false);

  // =========================================================
  // NEW MESSAGE COUNT
  // =========================================================
  const [newMessageCount, setNewMessageCount] = useState(0);

  // =========================================================
  // FETCH NEW MESSAGE COUNT
  // =========================================================
  useEffect(() => {
    const fetchMessageCount = async () => {
      try {
        const messagesSnapshot = await getDocs(
          collection(db, "contactMessages")
        );

        const newMessages = messagesSnapshot.docs.filter(
          (messageDoc) =>
            messageDoc.data().status === "new"
        ).length;

        setNewMessageCount(newMessages);
      } catch (error) {
        console.error(
          "Error fetching message count:",
          error
        );
      }
    };

    fetchMessageCount();
  }, []);

  // =========================================================
  // LOGOUT
  // =========================================================
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(
        "Admin logout failed:",
        error
      );
    }
  };

  // =========================================================
  // CLOSE MOBILE MENU
  // =========================================================
  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // =========================================================
  // MAIN NAVIGATION STYLE
  // ACTIVE PAGE = PREMIUM UNDERLINE
  // =========================================================
  const navLinkClass = ({ isActive }) =>
    `
      group
      relative
      flex
      items-center
      gap-2
      whitespace-nowrap
      py-2
      text-[15px]
      font-medium
      transition-all
      duration-200

      ${
        isActive
          ? "text-[#3E2C23]"
          : "text-[#604F44] hover:text-[#3E2C23]"
      }

      after:absolute
      after:left-0
      after:right-0
      after:-bottom-[1px]
      after:h-[2px]
      after:rounded-full
      after:bg-[#8B5E3C]
      after:origin-center
      after:transition-all
      after:duration-300

      ${
        isActive
          ? "after:scale-x-100 after:opacity-100"
          : "after:scale-x-0 after:opacity-0"
      }
    `;

  // =========================================================
  // MESSAGE BADGE
  // =========================================================
  const MessageBadge = () => {
    if (newMessageCount <= 0) {
      return null;
    }

    return (
      <span
        className="
          absolute
          -right-1
          -top-1.5
          z-10
          flex
          h-[18px]
          min-w-[18px]
          items-center
          justify-center
          rounded-full
          bg-[#9A6848]
          px-1
          text-[9px]
          font-semibold
          leading-none
          text-white
          shadow-[0_2px_6px_rgba(75,53,42,0.16)]
        "
      >
        {newMessageCount > 99
          ? "99+"
          : newMessageCount}
      </span>
    );
  };

  // =========================================================
  // ICON NAVIGATION STYLE
  // ACTIVE PAGE = SMALL UNDERLINE
  // =========================================================
  const iconNavClass = ({ isActive }) =>
    `
      group
      relative
      flex
      h-11
      w-11
      items-center
      justify-center
      transition-all
      duration-200

      ${
        isActive
          ? "text-[#3E2C23]"
          : "text-[#5F4B40] hover:text-[#3E2C23]"
      }

      after:absolute
      after:left-2
      after:right-2
      after:bottom-0
      after:h-[2px]
      after:rounded-full
      after:bg-[#8B5E3C]
      after:origin-center
      after:transition-all
      after:duration-300

      ${
        isActive
          ? "after:scale-x-100 after:opacity-100"
          : "after:scale-x-0 after:opacity-0"
      }
    `;

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-[#E7DED5]
        bg-[#FBF8F4]
      "
    >
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div
        className="
          mx-auto
          flex
          min-h-[86px]
          max-w-[1400px]
          items-center
          px-7
          lg:px-10
        "
      >
        {/* ===================================================
            BRAND
        =================================================== */}

        <button
          type="button"
          onClick={() =>
            navigate("/admin/dashboard")
          }
          className="
            shrink-0
            text-left
          "
        >
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.30em]
              text-[#987A66]
            "
          >
            RoKaShree
          </p>

          <h1
            className="
              mt-0.5
              font-serif
              text-[25px]
              font-semibold
              leading-none
              tracking-[-0.02em]
              text-[#3E2C23]
            "
          >
            Admin Panel
          </h1>
        </button>

        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <nav
          className="
            ml-auto
            hidden
            items-center
            gap-9
            md:flex
          "
        >
          {/* =================================================
              DASHBOARD
          ================================================= */}

          <NavLink
            to="/admin/dashboard"
            className={navLinkClass}
          >
            <FaChartLine
              className="
                text-[14px]
                text-[#5B473B]
              "
            />

            <span>
              Dashboard
            </span>
          </NavLink>

          {/* =================================================
              ORDERS
          ================================================= */}

          <NavLink
            to="/admin/orders"
            className={navLinkClass}
          >
            <FaClipboardList
              className="
                text-[14px]
                text-[#5B473B]
              "
            />

            <span>
              Orders
            </span>
          </NavLink>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <NavLink
            to="/admin/products"
            className={navLinkClass}
          >
            <FaBoxOpen
              className="
                text-[14px]
                text-[#5B473B]
              "
            />

            <span>
              Products
            </span>
          </NavLink>

          {/* =================================================
              MESSAGES
          ================================================= */}

          <NavLink
            to="/admin/messages"
            aria-label="Messages"
            className={iconNavClass}
          >
            <FaEnvelope
              className="text-[20px]"
            />

            <MessageBadge />
          </NavLink>

          {/* =================================================
              NEWSLETTER
          ================================================= */}

          <NavLink
            to="/admin/newsletter"
            aria-label="Newsletter"
            className={iconNavClass}
          >
            <FaNewspaper
              className="text-[20px]"
            />
          </NavLink>

          {/* =================================================
              LOGOUT
          ================================================= */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              whitespace-nowrap
              text-[15px]
              font-medium
              text-[#604F44]
              transition-all
              duration-200
              hover:text-[#3E2C23]
            "
          >
            <FaSignOutAlt
              className="text-[15px]"
            />

            <span>
              Logout
            </span>
          </button>
        </nav>

        {/* ===================================================
            MOBILE CONTROLS
        =================================================== */}

        <div
          className="
            ml-auto
            flex
            items-center
            gap-3
            md:hidden
          "
        >
          {/* =================================================
              MOBILE MESSAGES
          ================================================= */}

          <NavLink
            to="/admin/messages"
            aria-label="Messages"
            className={({ isActive }) => `
              group
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              transition-all
              duration-200

              ${
                isActive
                  ? "text-[#3E2C23]"
                  : "text-[#5F4B40]"
              }

              after:absolute
              after:left-2
              after:right-2
              after:bottom-0
              after:h-[2px]
              after:rounded-full
              after:bg-[#8B5E3C]
              after:origin-center
              after:transition-all
              after:duration-300

              ${
                isActive
                  ? "after:scale-x-100 after:opacity-100"
                  : "after:scale-x-0 after:opacity-0"
              }
            `}
          >
            <FaEnvelope
              className="text-[19px]"
            />

            <MessageBadge />
          </NavLink>

          {/* =================================================
              MOBILE NEWSLETTER
          ================================================= */}

          <NavLink
            to="/admin/newsletter"
            aria-label="Newsletter"
            className={({ isActive }) => `
              group
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              transition-all
              duration-200

              ${
                isActive
                  ? "text-[#3E2C23]"
                  : "text-[#5F4B40]"
              }

              after:absolute
              after:left-2
              after:right-2
              after:bottom-0
              after:h-[2px]
              after:rounded-full
              after:bg-[#8B5E3C]
              after:origin-center
              after:transition-all
              after:duration-300

              ${
                isActive
                  ? "after:scale-x-100 after:opacity-100"
                  : "after:scale-x-0 after:opacity-0"
              }
            `}
          >
            <FaNewspaper
              className="text-[19px]"
            />
          </NavLink>

          {/* =================================================
              MOBILE MENU
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setMobileOpen(
                (previous) => !previous
              )
            }
            aria-label="Menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              text-[#5F4B40]
              transition-colors
              duration-200
              hover:text-[#3E2C23]
            "
          >
            {mobileOpen ? (
              <FaTimes className="text-[18px]" />
            ) : (
              <FaBars className="text-[18px]" />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      {mobileOpen && (
        <div
          className="
            border-t
            border-[#EAE1D9]
            bg-[#FBF8F4]
            px-6
            py-4
            md:hidden
          "
        >
          <nav
            className="
              flex
              flex-col
              gap-1
            "
          >
            {/* =================================================
                DASHBOARD
            ================================================= */}

            <NavLink
              to="/admin/dashboard"
              onClick={closeMobileMenu}
              className={navLinkClass}
            >
              <FaChartLine
                className="text-[14px]"
              />

              Dashboard
            </NavLink>

            {/* =================================================
                ORDERS
            ================================================= */}

            <NavLink
              to="/admin/orders"
              onClick={closeMobileMenu}
              className={navLinkClass}
            >
              <FaClipboardList
                className="text-[14px]"
              />

              Orders
            </NavLink>

            {/* =================================================
                PRODUCTS
            ================================================= */}

            <NavLink
              to="/admin/products"
              onClick={closeMobileMenu}
              className={navLinkClass}
            >
              <FaBoxOpen
                className="text-[14px]"
              />

              Products
            </NavLink>

            {/* =================================================
                LOGOUT
            ================================================= */}

            <button
              type="button"
              onClick={handleLogout}
              className="
                mt-1
                flex
                items-center
                gap-2
                py-2
                text-left
                text-[15px]
                font-medium
                text-[#604F44]
                transition-all
                duration-200
                hover:text-[#3E2C23]
              "
            >
              <FaSignOutAlt
                className="text-[14px]"
              />

              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}