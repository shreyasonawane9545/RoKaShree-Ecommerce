import { useContext, useEffect, useState } from "react";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";

import { toast5 } from "../utils/toast";

import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

export default function Contact() {
  // =========================================================
  // AUTH
  // =========================================================

  const { user } = useContext(AuthContext);

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // =========================================================
  // LOAD PROFILE INFORMATION
  // =========================================================

  useEffect(() => {
    const loadProfileInformation = async () => {
      if (!user) {
        setProfileLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          setFormData((previous) => ({
            ...previous,
            name: data.fullName || user.displayName || "",
            email: user.email || data.email || "",
            phone: data.phone || "",
          }));
        } else {
          setFormData((previous) => ({
            ...previous,
            name: user.displayName || "",
            email: user.email || "",
          }));
        }
      } catch (error) {
        console.error("Error loading contact profile:", error);

        setFormData((previous) => ({
          ...previous,
          name: user.displayName || "",
          email: user.email || "",
        }));
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfileInformation();
  }, [user]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((previous) => ({
        ...previous,
        phone: value.replace(/\D/g, "").slice(0, 10),
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    // =====================================================
    // REQUIRED VALIDATION
    // =====================================================

    if (!name || !email || !phone || !subject || !message) {
      toast5.error("Please fill in all the required fields.");
      return;
    }

    // =====================================================
    // PHONE VALIDATION
    // =====================================================

    if (phone.length !== 10) {
      toast5.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast5.error("Please enter a valid email address.");
      return;
    }

    // =====================================================
    // MESSAGE VALIDATION
    // =====================================================

    if (message.length < 10) {
      toast5.error("Please tell us a little more about your enquiry.");
      return;
    }

    try {
      setLoading(true);

      // =====================================================
      // SAVE MESSAGE TO FIRESTORE
      // =====================================================

      await addDoc(collection(db, "contactMessages"), {
        userId: user?.uid || null,
        name,
        email,
        phone,
        subject,
        message,
        status: "new",
        createdAt: serverTimestamp(),
      });

      // =====================================================
      // CLEAR ONLY SUBJECT + MESSAGE
      // =====================================================

      setFormData((previous) => ({
        ...previous,
        subject: "",
        message: "",
      }));

      // =====================================================
      // SUCCESS TOAST
      // =====================================================

      toast5.success(
        "Thank you for reaching out to RoKaShree. We'll get back to you soon."
      );
    } catch (error) {
      console.error("Contact message error:", error);

      // =====================================================
      // ERROR TOAST
      // =====================================================

      toast5.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#FAF7F3] min-h-screen text-[#4B352A]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <div className="max-w-6xl mx-auto px-6 pt-14 md:pt-18 pb-10">

        <div className="max-w-2xl mx-auto text-center">

          <p
            className="
              uppercase
              tracking-[5px]
              text-[#8B5E3C]
              text-[10px]
              md:text-xs
              font-bold
            "
          >
            Connect With RoKaShree
          </p>

          <h1
            className="
              font-serif
              text-4xl
              md:text-5xl
              lg:text-[54px]
              font-semibold
              text-[#4B352A]
              mt-4
              leading-[1.08]
            "
          >
            Let's Bring Beauty

            <span className="block text-[#8B5E3C] italic font-medium mt-1">
              Into Your Home
            </span>
          </h1>

          <div className="flex items-center justify-center gap-3 mt-4">

            <span className="w-9 h-px bg-[#CDB7A3]" />

            <span className="text-[#8B5E3C] text-xs">
              ✦
            </span>

            <span className="w-9 h-px bg-[#CDB7A3]" />

          </div>

          <p
            className="
              text-gray-500
              text-sm
              md:text-base
              leading-7
              mt-4
            "
          >
            Questions, custom orders, or simply curious about our
            handcrafted collection? We'd love to hear from you.
          </p>

        </div>

      </div>

      {/* =====================================================
          CONTACT AREA
      ===================================================== */}

      <div className="max-w-6xl mx-auto px-6 pb-18 md:pb-22">

        <div
          className="
            grid
            lg:grid-cols-[0.85fr_1.35fr]
            gap-6
            lg:gap-7
          "
        >

          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div
            className="
              relative
              bg-[#3E2C23]
              text-white
              rounded-[28px]
              p-7
              md:p-8
              overflow-hidden
              shadow-[0_18px_50px_rgba(62,44,35,0.13)]
            "
          >

            <div
              className="
                absolute
                -top-24
                -right-24
                w-56
                h-56
                rounded-full
                border
                border-white/5
                pointer-events-none
              "
            />

            <div
              className="
                absolute
                -bottom-28
                -left-20
                w-60
                h-60
                rounded-full
                border
                border-[#D6B48B]/10
                pointer-events-none
              "
            />

            <div className="relative">

              <p
                className="
                  uppercase
                  tracking-[4px]
                  text-[#D6B48B]
                  text-[9px]
                  font-bold
                "
              >
                Get In Touch
              </p>

              <h2
                className="
                  font-serif
                  text-3xl
                  md:text-4xl
                  font-semibold
                  mt-3
                "
              >
                Contact Information
              </h2>

              <p
                className="
                  text-white/55
                  text-sm
                  leading-6
                  mt-3
                  max-w-sm
                "
              >
                We're here to help with questions, custom pieces,
                orders and everything RoKaShree.
              </p>

              {/* =================================================
                  CONTACT DETAILS
              ================================================= */}

              <div className="mt-8 space-y-6">

                {/* PHONE */}

                <div className="flex items-center gap-4 group">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-white/5
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      text-[#D6B48B]
                      group-hover:bg-[#8B5E3C]
                      group-hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    <FaPhoneAlt className="text-xs" />
                  </div>

                  <div>

                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[2px]
                        text-white/35
                      "
                    >
                      Phone
                    </p>

                    <p className="text-sm font-semibold mt-1">
                      9876543210
                    </p>

                  </div>

                </div>

                {/* EMAIL */}

                <div className="flex items-center gap-4 group">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-white/5
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      text-[#D6B48B]
                      group-hover:bg-[#8B5E3C]
                      group-hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    <FaEnvelope className="text-xs" />
                  </div>

                  <div className="min-w-0">

                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[2px]
                        text-white/35
                      "
                    >
                      Email
                    </p>

                    <p className="text-sm font-semibold mt-1 break-all">
                      hello@rokashree.com
                    </p>

                  </div>

                </div>

                {/* STUDIO */}

                <div className="flex items-center gap-4 group">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-white/5
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      text-[#D6B48B]
                      group-hover:bg-[#8B5E3C]
                      group-hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    <FaMapMarkerAlt className="text-xs" />
                  </div>

                  <div>

                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[2px]
                        text-white/35
                      "
                    >
                      Studio
                    </p>

                    <p className="text-sm font-semibold mt-1 leading-5">
                      Pune,
                      <br />
                      Maharashtra
                    </p>

                  </div>

                </div>

                {/* WORKING HOURS */}

                <div className="flex items-center gap-4 group">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-white/5
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                      text-[#D6B48B]
                      group-hover:bg-[#8B5E3C]
                      group-hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    <FaClock className="text-xs" />
                  </div>

                  <div>

                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[2px]
                        text-white/35
                      "
                    >
                      Working Hours
                    </p>

                    <p className="text-sm font-semibold mt-1 leading-5">
                      Available Anytime
                      <br />
                      24/7 Customer Support
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  SOCIAL
              ================================================= */}

              <div
                className="
                  mt-8
                  pt-6
                  border-t
                  border-white/10
                "
              >

                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[3px]
                    text-white/35
                    font-semibold
                  "
                >
                  Follow Our Journey
                </p>

                <div className="flex gap-2.5 mt-4">

                  {[
                    <FaInstagram />,
                    <FaFacebookF />,
                    <FaPinterestP />,
                    <FaWhatsapp />,
                  ].map((icon, index) => (

                    <button
                      key={index}
                      type="button"
                      className="
                        w-9
                        h-9
                        rounded-full
                        border
                        border-white/10
                        text-[#D6B48B]
                        flex
                        items-center
                        justify-center
                        hover:bg-[#8B5E3C]
                        hover:text-white
                        hover:border-[#8B5E3C]
                        hover:-translate-y-0.5
                        transition-all
                        duration-300
                      "
                    >
                      <span className="text-xs">
                        {icon}
                      </span>
                    </button>

                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              MESSAGE FORM
          ================================================= */}

          <div
            className="
              bg-white
              rounded-[28px]
              border
              border-[#E6DDD4]
              p-7
              md:p-9
              shadow-[0_15px_45px_rgba(75,53,42,0.06)]
            "
          >

            <div>

              <p
                className="
                  uppercase
                  tracking-[4px]
                  text-[#8B5E3C]
                  text-[9px]
                  font-bold
                "
              >
                Send A Message
              </p>

              <h2
                className="
                  font-serif
                  text-3xl
                  md:text-4xl
                  font-semibold
                  text-[#4B352A]
                  mt-3
                "
              >
                Let's Start a Conversation
              </h2>

              <p className="text-gray-500 text-sm leading-6 mt-3">
                Tell us what you need and we'll get back to you
                as soon as possible.
              </p>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="mt-7"
            >

              {/* NAME + EMAIL */}

              <div className="grid md:grid-cols-2 gap-5">

                {/* NAME */}

                <div>

                  <label
                    className="
                      block
                      text-[11px]
                      font-semibold
                      text-[#6D5A4E]
                      mb-2
                    "
                  >
                    Your Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={
                      profileLoading
                        ? "Loading your profile..."
                        : "Enter your name"
                    }
                    disabled={loading || profileLoading}
                    autoComplete="name"
                    className="
                      w-full
                      bg-[#FCFAF8]
                      border
                      border-[#E4D9CF]
                      rounded-xl
                      px-4
                      py-3.5
                      text-sm
                      text-[#4B352A]
                      placeholder:text-gray-400
                      outline-none
                      focus:bg-white
                      focus:border-[#8B5E3C]
                      focus:ring-4
                      focus:ring-[#8B5E3C]/8
                      transition-all
                      duration-300
                      disabled:opacity-60
                    "
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label
                    className="
                      block
                      text-[11px]
                      font-semibold
                      text-[#6D5A4E]
                      mb-2
                    "
                  >
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    disabled={loading || profileLoading}
                    autoComplete="email"
                    className="
                      w-full
                      bg-[#FCFAF8]
                      border
                      border-[#E4D9CF]
                      rounded-xl
                      px-4
                      py-3.5
                      text-sm
                      text-[#4B352A]
                      placeholder:text-gray-400
                      outline-none
                      focus:bg-white
                      focus:border-[#8B5E3C]
                      focus:ring-4
                      focus:ring-[#8B5E3C]/8
                      transition-all
                      duration-300
                      disabled:opacity-60
                    "
                  />

                </div>

              </div>

              {/* PHONE */}

              <div className="mt-4">

                <label
                  className="
                    block
                    text-[11px]
                    font-semibold
                    text-[#6D5A4E]
                    mb-2
                  "
                >
                  Phone Number *
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your 10-digit phone number"
                  disabled={loading || profileLoading}
                  autoComplete="tel"
                  inputMode="numeric"
                  maxLength={10}
                  className="
                    w-full
                    bg-[#FCFAF8]
                    border
                    border-[#E4D9CF]
                    rounded-xl
                    px-4
                    py-3.5
                    text-sm
                    text-[#4B352A]
                    placeholder:text-gray-400
                    outline-none
                    focus:bg-white
                    focus:border-[#8B5E3C]
                    focus:ring-4
                    focus:ring-[#8B5E3C]/8
                    transition-all
                    duration-300
                    disabled:opacity-60
                  "
                />

              </div>

              {/* SUBJECT */}

              <div className="mt-4">

                <label
                  className="
                    block
                    text-[11px]
                    font-semibold
                    text-[#6D5A4E]
                    mb-2
                  "
                >
                  Subject *
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What can we help you with?"
                  disabled={loading}
                  className="
                    w-full
                    bg-[#FCFAF8]
                    border
                    border-[#E4D9CF]
                    rounded-xl
                    px-4
                    py-3.5
                    text-sm
                    text-[#4B352A]
                    placeholder:text-gray-400
                    outline-none
                    focus:bg-white
                    focus:border-[#8B5E3C]
                    focus:ring-4
                    focus:ring-[#8B5E3C]/8
                    transition-all
                    duration-300
                    disabled:opacity-60
                  "
                />

              </div>

              {/* MESSAGE */}

              <div className="mt-4">

                <div className="flex items-center justify-between mb-2">

                  <label
                    className="
                      text-[11px]
                      font-semibold
                      text-[#6D5E4A]
                    "
                  >
                    Your Message *
                  </label>

                  <span className="text-[10px] text-gray-400">
                    Minimum 10 characters
                  </span>

                </div>

                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  disabled={loading}
                  className="
                    w-full
                    bg-[#FCFAF8]
                    border
                    border-[#E4D9CF]
                    rounded-xl
                    px-4
                    py-3.5
                    text-sm
                    text-[#4B352A]
                    placeholder:text-gray-400
                    resize-none
                    outline-none
                    focus:bg-white
                    focus:border-[#8B5E3C]
                    focus:ring-4
                    focus:ring-[#8B5E3C]/8
                    transition-all
                    duration-300
                    disabled:opacity-60
                  "
                />

              </div>

              {/* =================================================
                  SEND BUTTON
              ================================================= */}

              <button
                type="submit"
                disabled={loading || profileLoading}
                className="
                  group
                  mt-5
                  ml-auto
                  bg-[#8B5E3C]
                  hover:bg-[#6D472D]
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  text-white
                  px-6
                  py-3
                  rounded-lg
                  font-semibold
                  text-sm
                  flex
                  items-center
                  justify-center
                  gap-3
                  shadow-[0_8px_20px_rgba(139,94,60,0.16)]
                  hover:-translate-y-0.5
                  hover:shadow-[0_12px_25px_rgba(139,94,60,0.22)]
                  transition-all
                  duration-300
                "
              >

                {loading ? (
                  <>
                    <span
                      className="
                        w-4
                        h-4
                        border-2
                        border-white/40
                        border-t-white
                        rounded-full
                        animate-spin
                      "
                    />

                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message

                    <FaArrowRight
                      className="
                        text-[10px]
                        group-hover:translate-x-1
                        transition-transform
                      "
                    />
                  </>
                )}

              </button>

              <p
                className="
                  text-center
                  text-[10px]
                  text-gray-400
                  mt-4
                  leading-5
                "
              >
                Your information is kept private and used only
                to respond to your enquiry.
              </p>

            </form>

          </div>

        </div>

      </div>

      {/* =====================================================
          BRAND STATEMENT
      ===================================================== */}

      <div className="border-t border-[#E4D9CE] bg-[#FCF9F5]">

        <div className="max-w-3xl mx-auto px-6 py-14 md:py-18 text-center">

          {/* Elegant Accent */}

          <div className="flex items-center justify-center gap-3 mb-5">

            <span className="w-10 h-px bg-[#CDB7A3]" />

            <span className="text-[#8B5E3C] text-[11px]">
              ✦
            </span>

            <span className="w-10 h-px bg-[#CDB7A3]" />

          </div>

          {/* Eyebrow */}

          <p
            className="
              uppercase
              tracking-[4px]
              text-[#8B5E3C]
              text-[9px]
              md:text-[10px]
              font-semibold
            "
          >
            Our Philosophy
          </p>

          {/* Heading */}

          <h2
            className="
              font-serif
              text-2xl
              md:text-3xl
              lg:text-[34px]
              font-semibold
              text-[#4B352A]
              mt-3
              leading-tight
            "
          >
            Handmade With Intention
          </h2>

          {/* Description */}

          <p
            className="
              text-[#7A6A60]
              text-sm
              md:text-[15px]
              leading-7
              mt-4
              max-w-2xl
              mx-auto
            "
          >
            Every RoKaShree creation begins with a simple idea —
            to bring warmth, character and handcrafted beauty
            into your everyday space.
          </p>

          {/* Signature */}

          <div className="mt-7">

            <p
              className="
                font-serif
                italic
                text-[#8B5E3C]
                text-base
                md:text-lg
              "
            >
              Made slowly. Made thoughtfully.
            </p>

            <p
              className="
                uppercase
                tracking-[3px]
                text-[#B9A496]
                text-[8px]
                font-semibold
                mt-2
              "
            >
              RoKaShree
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}