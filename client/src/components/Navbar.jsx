import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";

import logo from "../assets/logo/logo1.png";

import {
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineMagnifyingGlass,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineEnvelope,
} from "react-icons/hi2";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);

  // =========================================================
  // CLOSE PROFILE MENU WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // CLOSE MOBILE MENU WHEN SCREEN BECOMES DESKTOP
  // =========================================================

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =========================================================
  // NAVIGATION
  // =========================================================

 const navItems = [
  {
    name: "Home",
    path: "/",
    icon: HiOutlineHome,
  },
  {
    name: "Shop",
    path: "/shop",
    icon: HiOutlineShoppingBag,
  },
  {
    name: "About",
    path: "/about",
    icon: HiOutlineInformationCircle,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: HiOutlineEnvelope,
  },
];

  // =========================================================
  // MOBILE NAVIGATION CLICK
  // =========================================================

  const handleMobileNavigation = () => {
    setMobileMenuOpen(false);
    setShowProfileMenu(false);
  };

  // =========================================================
  // PROFILE TOGGLE
  // =========================================================

  const handleProfileClick = () => {
    setShowProfileMenu((prev) => !prev);
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfileMenu(false);
      setMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        w-full
        bg-[#FBF8F4]/95
        backdrop-blur-xl
        border-b
        border-[#E8DED4]
      "
    >
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div
        className="
          max-w-[1500px]
          mx-auto
          h-[68px]
          sm:h-[76px]
          lg:h-[82px]
          px-4
          sm:px-7
          lg:px-12
          flex
          items-center
          justify-between
        "
      >
        {/* ===================================================
            LOGO
        =================================================== */}

        <Link
          to="/"
          onClick={() => {
            setMobileMenuOpen(false);
            setShowProfileMenu(false);
          }}
          className="
            group
            flex
            items-center
            gap-2.5
            sm:gap-3
            shrink-0
          "
        >
          {/* Logo Circle */}

          <div
            className="
              relative
              flex
              items-center
              justify-center
              w-11
              h-11
              sm:w-[50px]
              sm:h-[50px]
              lg:w-[54px]
              lg:h-[54px]
              rounded-full
              bg-[#F3EAE1]
              border
              border-[#DCCABD]
              overflow-hidden
              transition-all
              duration-500
              group-hover:border-[#A47758]
              group-hover:shadow-[0_8px_25px_rgba(89,58,39,0.12)]
            "
          >
            <img
              src={logo}
              alt="RoKaShree"
              className="
                w-[35px]
                h-[35px]
                sm:w-[40px]
                sm:h-[40px]
                lg:w-[43px]
                lg:h-[43px]
                object-contain
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          </div>

          {/* Brand Text */}

          <div className="leading-none">
            <h1
              className="
                font-serif
                text-[20px]
                sm:text-[23px]
                lg:text-[26px]
                font-semibold
                tracking-[-0.5px]
                text-[#3F2B22]
              "
            >
              RoKaShree
            </h1>

            <div
              className="
                flex
                items-center
                gap-1.5
                sm:gap-2
                mt-1.5
                sm:mt-2
              "
            >
              <span className="w-4 sm:w-5 h-px bg-[#B99476]" />

              <p
                className="
                  text-[6px]
                  sm:text-[8px]
                  lg:text-[9px]
                  tracking-[2px]
                  sm:tracking-[3px]
                  uppercase
                  text-[#8A7567]
                  font-medium
                "
              >
                Handmade Luxury
              </p>
            </div>
          </div>
        </Link>

        {/* ===================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-9
            xl:gap-10
            ml-8
            xl:ml-10
          "
        >
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                [
                  "group",
                  "relative",
                  "py-3",
                  "text-[14px]",
                  "tracking-[0.4px]",
                  "font-medium",
                  "transition-colors",
                  "duration-300",
                  isActive
                    ? "text-[#8B5E3C]"
                    : "text-[#4B392F] hover:text-[#8B5E3C]",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  <span
                    className={[
                      "absolute",
                      "left-0",
                      "bottom-0",
                      "h-px",
                      "bg-[#8B5E3C]",
                      "transition-all",
                      "duration-300",
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full",
                    ].join(" ")}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* ===================================================
            RIGHT SIDE
        =================================================== */}

        <div
          className="
            flex
            items-center
            justify-end
            gap-0.5
            sm:gap-2
            lg:gap-3
            shrink-0
          "
        >
          {/* =================================================
              SEARCH
          ================================================= */}

          <Link
            to="/search"
            aria-label="Search"
            onClick={() => setMobileMenuOpen(false)}
            className="
              group
              flex
              shrink-0
              w-9
              h-9
              sm:w-10
              sm:h-10
              items-center
              justify-center
              rounded-full
              text-[#4B392F]
              hover:bg-[#F0E7DE]
              hover:text-[#8B5E3C]
              active:bg-[#F0E7DE]
              transition-all
              duration-300
            "
          >
            <HiOutlineMagnifyingGlass
              className="
                text-[20px]
                sm:text-[22px]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />
          </Link>

          {/* =================================================
              WISHLIST
          ================================================= */}

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="
              group
              relative
              flex
              shrink-0
              w-9
              h-9
              sm:w-10
              sm:h-10
              items-center
              justify-center
              rounded-full
              text-[#4B392F]
              hover:bg-[#F0E7DE]
              hover:text-[#9B514B]
              active:bg-[#F0E7DE]
              transition-all
              duration-300
            "
          >
            <HiOutlineHeart
              className="
                text-[21px]
                sm:text-[23px]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            {wishlistItems.length > 0 && (
              <span
                className="
                  absolute
                  top-0
                  right-0
                  min-w-[15px]
                  h-[15px]
                  sm:min-w-[17px]
                  sm:h-[17px]
                  px-1
                  rounded-full
                  bg-[#9B514B]
                  text-white
                  text-[8px]
                  sm:text-[9px]
                  font-bold
                  flex
                  items-center
                  justify-center
                  border-2
                  border-[#FBF8F4]
                "
              >
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* =================================================
              CART
          ================================================= */}

          <Link
            to="/cart"
            aria-label="Shopping bag"
            onClick={() => setMobileMenuOpen(false)}
            className="
              group
              relative
              flex
              shrink-0
              w-9
              h-9
              sm:w-10
              sm:h-10
              items-center
              justify-center
              rounded-full
              text-[#4B392F]
              hover:bg-[#F0E7DE]
              hover:text-[#8B5E3C]
              active:bg-[#F0E7DE]
              transition-all
              duration-300
            "
          >
            <HiOutlineShoppingBag
              className="
                text-[21px]
                sm:text-[23px]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            />

            {cartItems.length > 0 && (
              <span
                className="
                  absolute
                  top-0
                  right-0
                  min-w-[15px]
                  h-[15px]
                  sm:min-w-[17px]
                  sm:h-[17px]
                  px-1
                  rounded-full
                  bg-[#8B5E3C]
                  text-white
                  text-[8px]
                  sm:text-[9px]
                  font-bold
                  flex
                  items-center
                  justify-center
                  border-2
                  border-[#FBF8F4]
                "
              >
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <span
            className="
              hidden
              sm:block
              h-7
              w-px
              bg-[#DED1C6]
              mx-1
            "
          />

          {/* =================================================
              USER PROFILE
          ================================================= */}

          {user ? (
            <div
              className="relative shrink-0"
              ref={profileRef}
            >
              <button
                type="button"
                onClick={handleProfileClick}
                aria-label="Open profile menu"
                aria-expanded={showProfileMenu}
                className="
                  group
                  flex
                  items-center
                  justify-center
                  focus:outline-none
                  rounded-full
                "
              >
                <div
                  className="
                    w-9
                    h-9
                    sm:w-10
                    sm:h-10
                    rounded-full
                    bg-[#8B5E3C]
                    text-white
                    flex
                    items-center
                    justify-center
                    font-serif
                    text-[14px]
                    sm:text-[15px]
                    border-2
                    border-[#E9DCCF]
                    shadow-[0_4px_15px_rgba(89,58,39,0.15)]
                    transition-all
                    duration-300
                    group-hover:scale-105
                    group-hover:shadow-[0_7px_20px_rgba(89,58,39,0.22)]
                  "
                >
                  {(
                    user.displayName?.charAt(0) ||
                    user.email?.charAt(0) ||
                    "U"
                  ).toUpperCase()}
                </div>
              </button>

              {/* PROFILE POPUP */}

              {showProfileMenu && (
                <ProfileMenu
                  user={user}
                  logout={handleLogout}
                />
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="
                hidden
                sm:inline-flex
                items-center
                justify-center
                px-5
                lg:px-6
                py-2.5
                rounded-full
                border
                border-[#A47758]
                text-[#6D4A35]
                text-[13px]
                font-semibold
                tracking-[0.3px]
                hover:bg-[#8B5E3C]
                hover:text-white
                hover:border-[#8B5E3C]
                hover:shadow-[0_8px_22px_rgba(107,71,45,0.18)]
                transition-all
                duration-300
              "
            >
              Login
            </Link>
          )}

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              setShowProfileMenu(false);
            }}
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="
              lg:hidden
              flex
              shrink-0
              w-9
              h-9
              sm:w-10
              sm:h-10
              items-center
              justify-center
              rounded-full
              text-[#4B392F]
              hover:bg-[#F0E7DE]
              hover:text-[#8B5E3C]
              active:bg-[#F0E7DE]
              transition-all
              duration-300
            "
          >
            {mobileMenuOpen ? (
              <HiOutlineXMark className="text-[19px] sm:text-[21px] stroke-[3]" />
            ) : (
              <HiOutlineBars3 className="text-[22px] sm:text-[24px]" />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      <div
        className={[
          "lg:hidden",
          "overflow-hidden",
          "border-t",
          "border-[#EFE7DF]",
          "bg-[#FBF8F4]",
          "transition-all",
          "duration-300",
          mobileMenuOpen
            ? "max-h-[360px] opacity-100"
            : "max-h-0 opacity-0 border-t-0",
        ].join(" ")}
      >
        <div className="px-5 sm:px-7 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={handleMobileNavigation}
              className={({ isActive }) =>
                [
                  "group",
                  "flex",
                  "items-center",
                  "gap-3",
                  "py-3",
                  "text-[13px]",
                  "font-semibold",
                  "tracking-[0.1px]",
                  "transition-colors",
                  "duration-200",
                  "border-b",
                  "border-[#E8DED4]",
                  isActive
                    ? "text-[#8B5E3C]"
                    : "text-[#4B392F] hover:text-[#8B5E3C]",
                ].join(" ")
              }
            >
              {({ isActive }) => {
                const Icon = item.icon;

                return (
                  <>
                    <Icon
                      className={`
                        shrink-0
                        text-[17px]
                        transition-colors
                        duration-200
                        ${
                          isActive
                            ? "text-[#8B5E3C]"
                            : "text-[#5E4B40]"
                        }
                      `}
                    />

                    <span className="relative py-0.5">
                      {item.name}

                      {isActive && (
                        <span
                          className="
                            absolute
                            left-0
                            bottom-[-3px]
                            h-[2px]
                            w-full
                            rounded-full
                            bg-[#8B5E3C]
                          "
                        />
                      )}
                    </span>
                  </>
                );
              }}
            </NavLink>
          ))}

          {/* MOBILE LOGIN WHEN USER IS NOT LOGGED IN */}

          {!user && (
            <Link
              to="/login"
              onClick={handleMobileNavigation}
              className="
                flex
                items-center
                justify-center
                mt-3
                mb-1
                py-2.5
                rounded-xl
                bg-[#8B5E3C]
                text-white
                text-[12px]
                font-semibold
                tracking-[0.4px]
                hover:bg-[#6D472D]
                transition-all
                duration-300
              "
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}