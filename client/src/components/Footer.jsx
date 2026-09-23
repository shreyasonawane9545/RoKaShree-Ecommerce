import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaWhatsapp,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import logo from "../assets/logo/logo1.png";

export default function Footer() {
  return (
    <footer className="bg-[#3E2C23] text-white mt-12 relative">

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-7">

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-[1.5fr_0.8fr_0.9fr_1fr]
            gap-8
            lg:gap-10
            items-start
          "
        >

          {/* =================================================
              BRAND
          ================================================= */}

          <div>

            <Link
              to="/"
              className="
                inline-flex
                items-center
                gap-3
                group
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-[#F8F3ED]
                  flex
                  items-center
                  justify-center
                  p-2
                  shadow-[0_6px_18px_rgba(0,0,0,0.12)]
                  group-hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
              >
                <img
                  src={logo}
                  alt="RoKaShree"
                  className="h-9 w-auto object-contain"
                />
              </div>

              <div>

                <h2
                  className="
                    text-xl
                    font-semibold
                    tracking-wide
                  "
                >
                  RoKaShree
                </h2>

                <p
                  className="
                    uppercase
                    tracking-[3px]
                    text-[#D6B48B]
                    text-[8px]
                    mt-0.5
                  "
                >
                  Handmade Luxury
                </p>

              </div>

            </Link>


            {/* Description */}

            <p
              className="
                mt-4
                text-[#D2C4BB]
                text-sm
                leading-6
                max-w-xs
              "
            >
              Thoughtfully handcrafted macramé décor
              designed to bring warmth, texture and
              timeless beauty into your home.
            </p>


            {/* Social */}

            <div className="flex gap-2.5 mt-5">

              {[
                {
                  icon: <FaInstagram />,
                  label: "Instagram",
                },
                {
                  icon: <FaFacebookF />,
                  label: "Facebook",
                },
                {
                  icon: <FaPinterestP />,
                  label: "Pinterest",
                },
                {
                  icon: <FaWhatsapp />,
                  label: "WhatsApp",
                },
              ].map((social) => (

                <button
                  key={social.label}
                  type="button"
                  aria-label={social.label}
                  className="
                    w-8
                    h-8
                    rounded-full
                    border
                    border-white/15
                    text-[#D8C8BC]
                    flex
                    items-center
                    justify-center
                    text-xs
                    hover:bg-[#8B5E3C]
                    hover:border-[#8B5E3C]
                    hover:text-white
                    hover:-translate-y-0.5
                    transition-all
                    duration-300
                  "
                >
                  {social.icon}
                </button>

              ))}

            </div>

          </div>


          {/* =================================================
              EXPLORE
          ================================================= */}

          <div>

            <h3
              className="
                text-[11px]
                uppercase
                tracking-[3px]
                text-[#D6B48B]
                font-semibold
                mb-5
              "
            >
              Explore
            </h3>


            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  to="/"
                  className="
                    text-[#D2C4BB]
                    hover:text-white
                    transition
                  "
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="
                    text-[#D2C4BB]
                    hover:text-white
                    transition
                  "
                >
                  Shop Collection
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="
                    text-[#D2C4BB]
                    hover:text-white
                    transition
                  "
                >
                  Our Story
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="
                    text-[#D2C4BB]
                    hover:text-white
                    transition
                  "
                >
                  Contact Us
                </Link>
              </li>

            </ul>

          </div>


          {/* =================================================
              CUSTOMER CARE
          ================================================= */}

          <div>

            <h3
              className="
                text-[11px]
                uppercase
                tracking-[3px]
                text-[#D6B48B]
                font-semibold
                mb-5
              "
            >
              Customer Care
            </h3>


            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  to="/shipping"
                  className="
                    text-[#D2C4BB]
                    hover:text-white
                    transition
                  "
                >
                  Shipping Information
                </Link>
              </li>

              <li>
                <Link
                  to="/returns"
                  className="
                    text-[#D2C4BB]
                    hover:text-white
                    transition
                  "
                >
                  Returns & Exchanges
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="
                    text-[#D2C4BB]
                    hover:text-white
                    transition
                  "
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="
                    text-[#D2C4BB]
                    hover:text-white
                    transition
                  "
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="
                    text-[#D2C4BB]
                    hover:text-white
                    transition
                  "
                >
                  FAQs
                </Link>
              </li>

            </ul>

          </div>


          {/* =================================================
              CONTACT
          ================================================= */}

          <div>

            <h3
              className="
                text-[11px]
                uppercase
                tracking-[3px]
                text-[#D6B48B]
                font-semibold
                mb-5
              "
            >
              Contact
            </h3>


            <div className="space-y-3 text-sm">

              {/* Location */}

              <p className="text-[#D2C4BB] leading-5">
                Pune, Maharashtra
              </p>


              {/* Email */}

              <a
                href="mailto:hello@rokashree.in"
                className="
                  block
                  text-[#D2C4BB]
                  hover:text-white
                  transition
                "
              >
                hello@rokashree.in
              </a>


              {/* Working Hours */}

              <p className="text-[#D2C4BB] leading-5">
             Available Anytime
                      <br />
                      24/7 Customer Support
              </p>


              {/* Small Brand Note */}

              <p
                className="
                  text-[#8F8179]
                  text-[10px]
                  leading-4
                  pt-1
                "
              >
                Made with care in India.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM BAR
      ===================================================== */}

      <div className="border-t border-white/10">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            lg:px-8
            py-3
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-3
          "
        >

          {/* Copyright */}

          <p
            className="
              text-[#9D8E85]
              text-[11px]
            "
          >
            © 2026 RoKaShree. All rights reserved.
          </p>


          {/* Secure Payments */}

          <div className="flex items-center gap-3">

            <span
              className="
                text-[#8F8179]
                text-[9px]
                uppercase
                tracking-[2px]
              "
            >
              Secure Payments
            </span>

            <FaCcVisa
              className="text-lg text-[#C9BCB4]"
            />

            <FaCcMastercard
              className="text-lg text-[#C9BCB4]"
            />

            <FaCcPaypal
              className="text-lg text-[#C9BCB4]"
            />

          </div>

        </div>

      </div>

    </footer>
  );
}