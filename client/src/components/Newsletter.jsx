import { useState } from "react";

import {
  FaPaperPlane,
  FaEnvelope,
} from "react-icons/fa";

import { toast5 } from "../utils/toast";

import { db } from "../firebase/firebase";

import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function Newsletter() {
  // =====================================================
  // STATE
  // =====================================================

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // SUBSCRIBE
  // =====================================================

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    // ===================================================
    // EMPTY EMAIL
    // ===================================================

    if (!cleanEmail) {
      toast5.error("Please enter your email address.");
      return;
    }

    // ===================================================
    // EMAIL VALIDATION
    // ===================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      toast5.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // SAVE SUBSCRIBER TO FIRESTORE
      // =================================================

      const subscribersRef = collection(
        db,
        "newsletterSubscribers"
      );

      // Use encoded email as unique document ID
      const subscriberId =
        encodeURIComponent(cleanEmail);

      const subscriberRef = doc(
        subscribersRef,
        subscriberId
      );

      await setDoc(subscriberRef, {
        email: cleanEmail,
        status: "subscribed",
        source: "newsletter",
        subscribedAt: serverTimestamp(),
      });

      // =================================================
      // SUCCESS
      // =================================================

      setEmail("");

      toast5.success(
        "Welcome to the RoKaShree Journal."
      );

    } catch (error) {
      console.error(
        "Newsletter subscription error:",
        error
      );

      // =================================================
      // ALREADY SUBSCRIBED / PERMISSION
      // =================================================

      if (error.code === "permission-denied") {
        toast5.info(
          "This email is already subscribed."
        );
      } else {
        toast5.error(
          "Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-[#F8F3ED] py-16 md:py-20 px-6 overflow-hidden">

      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}

      <div
        className="
          absolute
          -top-24
          -left-24
          w-64
          h-64
          rounded-full
          bg-[#E8D6C3]/20
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-24
          -right-24
          w-64
          h-64
          rounded-full
          bg-[#E8D6C3]/15
          blur-3xl
          pointer-events-none
        "
      />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative max-w-4xl mx-auto">

        <div
          className="
            relative
            bg-white
            rounded-[28px]
            border
            border-[#E5D9CE]
            px-6
            py-9
            md:px-12
            md:py-11
            text-center
            shadow-[0_12px_45px_rgba(75,53,42,0.055)]
            overflow-hidden
          "
        >

          {/* =================================================
              TOP ACCENT
          ================================================= */}

          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-20
              h-[2px]
              bg-[#8B5E3C]
            "
          />

          {/* =================================================
              LABEL
          ================================================= */}

          <div className="flex items-center justify-center gap-2">

            <FaEnvelope className="text-[#8B5E3C] text-[11px]" />

            <p
              className="
                uppercase
                tracking-[4px]
                text-[#8B5E3C]
                font-bold
                text-[10px]
              "
            >
              The RoKaShree Journal
            </p>

          </div>

          {/* =================================================
              HEADING
          ================================================= */}

          <h2
            className="
              font-serif
              text-3xl
              md:text-4xl
              font-semibold
              text-[#4B352A]
              mt-3
              leading-tight
            "
          >
            Stay Inspired
          </h2>

          <p
            className="
              font-serif
              text-xl
              md:text-2xl
              text-[#8B5E3C]
              italic
              mt-1
            "
          >
            With RoKaShree
          </p>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="flex items-center justify-center gap-3 mt-4">

            <span className="w-8 h-px bg-[#D8C6B5]" />

            <span className="text-[#8B5E3C] text-[10px]">
              ✦
            </span>

            <span className="w-8 h-px bg-[#D8C6B5]" />

          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              text-gray-500
              text-sm
              leading-6
              mt-4
              max-w-lg
              mx-auto
            "
          >
            Discover new handcrafted collections, exclusive
            offers and beautiful inspiration for your home.
          </p>

          {/* =================================================
              EMAIL FORM
          ================================================= */}

          <form
            onSubmit={handleSubscribe}
            className="max-w-lg mx-auto mt-6"
          >

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-2
                p-1.5
                bg-[#F8F3ED]
                border
                border-[#E3D5C8]
                rounded-[18px]
                focus-within:border-[#8B5E3C]
                focus-within:shadow-[0_8px_25px_rgba(139,94,60,0.08)]
                transition-all
                duration-300
              "
            >

              {/* EMAIL INPUT */}

              <div className="flex items-center flex-1">

                <FaEnvelope
                  className="
                    ml-4
                    mr-2
                    text-[#B79A83]
                    text-xs
                    flex-shrink-0
                  "
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  disabled={loading}
                  autoComplete="email"
                  className="
                    w-full
                    bg-transparent
                    px-2
                    py-3
                    text-sm
                    text-[#4B352A]
                    placeholder:text-gray-400
                    outline-none
                    disabled:opacity-60
                  "
                />

              </div>

              {/* SUBSCRIBE BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  bg-[#8B5E3C]
                  hover:bg-[#6D472D]
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  text-white
                  px-6
                  py-3
                  rounded-[13px]
                  text-sm
                  font-semibold
                  shadow-[0_6px_18px_rgba(139,94,60,0.18)]
                  hover:shadow-[0_10px_24px_rgba(139,94,60,0.22)]
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                "
              >

                <FaPaperPlane
                  className="
                    text-[10px]
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                    transition-transform
                  "
                />

                {loading
                  ? "Subscribing..."
                  : "Subscribe"}

              </button>

            </div>

          </form>

          {/* =================================================
              PRIVACY
          ================================================= */}

          <div className="flex items-center justify-center gap-2 mt-4">

            <span className="w-1 h-1 rounded-full bg-[#CDB7A3]" />

            <p className="text-gray-400 text-[11px]">
              No spam. Just beautiful handmade inspiration.
            </p>

            <span className="w-1 h-1 rounded-full bg-[#CDB7A3]" />

          </div>

          {/* =================================================
              BRAND SIGNATURE
          ================================================= */}

          <p
            className="
              text-[8px]
              uppercase
              tracking-[3px]
              text-[#C3AD99]
              font-semibold
              mt-6
            "
          >
            Handmade • Thoughtful • Timeless
          </p>

        </div>

      </div>

    </section>
  );
}