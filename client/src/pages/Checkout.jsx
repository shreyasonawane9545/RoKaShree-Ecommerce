import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../components/CustomDropdown";

import {
  FaArrowLeft,
  FaArrowRight,
  FaTruck,
  FaShieldAlt,
  FaHeart,
  FaLock,
  FaCheck,
  FaMoneyBillWave,
  FaMobileAlt,
  FaCreditCard,
} from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast5 } from "../utils/toast";

import { db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore";

export default function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [paymentMethod, setPaymentMethod] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  /* =========================================================
     INDIAN STATES
  ========================================================= */

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  /* =========================================================
     LOAD USER PROFILE
  ========================================================= */

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) return;

        const data = snapshot.data();
        const savedAddress = data.address || {};

        const nameParts = (data.fullName || "")
          .trim()
          .split(/\s+/)
          .filter(Boolean);

        setFormData((previous) => ({
          ...previous,

          firstName: nameParts[0] || "",

          lastName:
            nameParts.slice(1).join(" ") || "",

          email:
            data.email || user.email || "",

          phone:
            data.phone ||
            savedAddress.phone ||
            "",

          address: [
            savedAddress.house,
            savedAddress.area,
            savedAddress.address,
            savedAddress.landmark,
          ]
            .filter(Boolean)
            .join(", "),

          city:
            savedAddress.city || "",

          state:
            savedAddress.state || "",

          pincode:
            savedAddress.pincode || "",

          country:
            data.country || "India",
        }));
      } catch (error) {
        console.error(
          "Error loading checkout profile:",
          error
        );
      }
    };

    loadProfile();
  }, [user]);

  /* =========================================================
     SUBTOTAL
  ========================================================= */

  const subtotal = cartItems.reduce(
    (total, item) => {
      const price = Number(
        String(item.price)
          .replace("₹", "")
          .replace(/,/g, "")
      );

      return (
        total +
        price * Number(item.quantity || 1)
      );
    },
    0
  );

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =========================================================
     PAYMENT
  ========================================================= */

  const handlePayment = (method) => {
    setPaymentMethod(method);
  };

  /* =========================================================
     PLACE ORDER
  ========================================================= */

  const handlePlaceOrder = async () => {
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state ||
      !formData.pincode.trim()
    ) {
      toast5.error(
        "Please complete your delivery details."
      );
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      toast5.error(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      toast5.error(
        "Please enter a valid email address."
      );
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      toast5.error(
        "Please enter a valid 6-digit PIN code."
      );
      return;
    }

    if (!paymentMethod) {
      toast5.error(
        "Please select a payment method."
      );
      return;
    }

    if (!user) {
      toast5.error(
        "Please login before placing an order."
      );
      return;
    }

    if (cartItems.length === 0) {
      toast5.error(
        "Your shopping bag is empty."
      );
      return;
    }

    try {
      const orderData = {
        userId: user.uid,

        customer: {
          firstName:
            formData.firstName.trim(),

          lastName:
            formData.lastName.trim(),

          email:
            formData.email.trim(),

          phone:
            formData.phone.trim(),
        },

        deliveryAddress: {
          address:
            formData.address.trim(),

          city:
            formData.city.trim(),

          state:
            formData.state,

          pincode:
            formData.pincode.trim(),

          country:
            formData.country || "India",
        },

        items: cartItems,

        paymentMethod,

        subtotal,

        shipping: 0,

        total: subtotal,

        status: "Placed",

        createdAt: new Date(),
      };

      const ordersRef =
        collection(db, "orders");

      const orderDoc = await addDoc(
        ordersRef,
        orderData
      );

      console.log(
        "Order created:",
        orderDoc.id
      );

      clearCart();

      navigate("/order-success");
    } catch (error) {
      console.error(
        "Error creating order:",
        error
      );

      toast5.error(
        "Unable to place order. Please try again."
      );
    }
  };

  /* =========================================================
     INPUT STYLE
  ========================================================= */

  const inputClass =
    "w-full h-[48px] bg-[#FCFAF7] border border-[#E4D9CF] rounded-[9px] px-3.5 text-[12px] md:text-[13px] text-[#49352B] placeholder:text-[#AAA098] outline-none transition-all duration-300 hover:border-[#CDB7A6] focus:bg-white focus:border-[#8B5E3C] focus:ring-4 focus:ring-[#8B5E3C]/[0.055]";

  /* =========================================================
     PAYMENT OPTION
  ========================================================= */

  const PaymentOption = ({
    method,
    icon,
    title,
    description,
  }) => {
    const selected =
      paymentMethod === method;

    return (
      <button
        type="button"
        onClick={() =>
          handlePayment(method)
        }
        className={
          selected
            ? "w-full text-left rounded-[11px] border border-[#8B5E3C] bg-[#FBF7F2] px-3.5 py-3 flex items-center justify-between gap-3 transition-all duration-300"
            : "w-full text-left rounded-[11px] border border-[#E8DED6] bg-white px-3.5 py-3 flex items-center justify-between gap-3 transition-all duration-300 hover:border-[#CDB9A8] hover:bg-[#FCFAF7]"
        }
      >

        <div className="flex items-center gap-3 min-w-0">

          <div
            className={
              selected
                ? "w-9 h-9 rounded-[9px] bg-[#8B5E3C] text-white flex items-center justify-center flex-shrink-0"
                : "w-9 h-9 rounded-[9px] bg-[#F5ECE4] text-[#8B5E3C] flex items-center justify-center flex-shrink-0"
            }
          >
            {icon}
          </div>

          <div className="min-w-0">

            <p className="text-[11px] md:text-[12px] font-semibold text-[#49352B]">
              {title}
            </p>

            <p className="text-[8px] md:text-[9px] text-[#9B8F87] mt-0.5 truncate">
              {description}
            </p>

          </div>

        </div>

        <div
          className={
            selected
              ? "w-[18px] h-[18px] rounded-full border border-[#8B5E3C] bg-[#8B5E3C] flex items-center justify-center flex-shrink-0"
              : "w-[18px] h-[18px] rounded-full border border-[#CFC4BB] flex-shrink-0"
          }
        >
          {selected && (
            <FaCheck className="text-white text-[6px]" />
          )}
        </div>

      </button>
    );
  };

  /* =========================================================
     EMPTY BAG
  ========================================================= */

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-[#F7F2EC]">

        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-7">

          <button
            type="button"
            onClick={() =>
              navigate("/shop")
            }
            aria-label="Back to shop"
            className="w-10 h-10 rounded-full bg-white border border-[#E5D9CE] flex items-center justify-center text-[#8B5E3C] shadow-[0_6px_20px_rgba(75,53,42,0.05)] hover:bg-[#8B5E3C] hover:text-white hover:border-[#8B5E3C] transition-all duration-300"
          >
            <FaArrowLeft className="text-[11px]" />
          </button>

        </div>

        <div className="max-w-xl mx-auto px-5 pt-28 pb-24 text-center">

          <p className="uppercase tracking-[5px] text-[9px] font-semibold text-[#9A7355]">
            RoKaShree
          </p>

          <h1 className="font-serif text-[40px] sm:text-[46px] font-semibold text-[#463329] mt-3">
            Your Bag is Empty
          </h1>

          <div className="flex items-center justify-center gap-3 mt-5">

            <span className="w-8 h-px bg-[#CDB7A3]" />

            <span className="text-[#8B5E3C] text-[9px]">
              ✦
            </span>

            <span className="w-8 h-px bg-[#CDB7A3]" />

          </div>

          <p className="text-[13px] leading-6 text-[#8E8178] mt-5 max-w-md mx-auto">
            Your collection is waiting.
            Discover handcrafted pieces
            designed to bring natural warmth
            into your home.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/shop")
            }
            className="group inline-flex items-center gap-3 mt-7 text-[#8B5E3C] text-[13px] font-semibold"
          >
            Explore Collection

            <FaArrowRight className="text-[8px] group-hover:translate-x-1 transition-transform duration-300" />
          </button>

        </div>

      </section>
    );
  }

  /* =========================================================
     MAIN CHECKOUT
  ========================================================= */

  return (
    <section className="min-h-screen bg-[#F7F2EC] text-[#4B352A]">

      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <div className="max-w-[1280px] mx-auto px-5 sm:px-7 lg:px-9 pt-7">

        <button
          type="button"
          onClick={() =>
            navigate("/cart")
          }
          aria-label="Back to shopping bag"
          className="group w-10 h-10 rounded-full bg-white border border-[#E5D9CE] flex items-center justify-center text-[#8B5E3C] shadow-[0_6px_20px_rgba(75,53,42,0.05)] hover:bg-[#8B5E3C] hover:text-white hover:border-[#8B5E3C] hover:-translate-x-0.5 transition-all duration-300"
        >
          <FaArrowLeft className="text-[11px]" />
        </button>

      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="max-w-4xl mx-auto px-5 text-center pt-9 md:pt-10">

        <p className="uppercase tracking-[5px] text-[9px] md:text-[10px] font-semibold text-[#9A7355]">
          Y O U R &nbsp; R O K A S H R E E &nbsp; O R D E R
        </p>

        <h1 className="font-serif text-[40px] sm:text-[46px] md:text-[54px] font-semibold text-[#463329] mt-3 leading-[1.04] tracking-[-1px]">
          Secure Checkout
        </h1>

        <div className="flex items-center justify-center gap-3 mt-5">

          <span className="w-9 h-px bg-[#CDB7A3]" />

          <span className="text-[#8B5E3C] text-[9px]">
            ✦
          </span>

          <span className="w-9 h-px bg-[#CDB7A3]" />

        </div>

        <p className="text-[#897C73] text-[13px] md:text-[14px] leading-6 mt-5">
          Complete your order with confidence.
        </p>

      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="max-w-[1280px] mx-auto px-5 sm:px-7 lg:px-9 pt-10 md:pt-12 pb-16">

        <div className="grid lg:grid-cols-[1.58fr_0.78fr] gap-7 lg:gap-10 items-start">

          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-7">

            {/* =================================================
                DELIVERY DETAILS
            ================================================= */}

            <div>

              <div className="flex items-center justify-between pb-3 border-b border-[#DED2C8]">

                <div>

                  <p className="uppercase tracking-[3.2px] text-[8px] md:text-[9px] font-semibold text-[#9A7355]">
                    01 / Your Information
                  </p>

                  <h2 className="font-serif text-[25px] md:text-[29px] font-semibold text-[#463329] mt-1.5 leading-tight">
                    Delivery Details
                  </h2>

                </div>

                <FaTruck className="hidden sm:block text-[#C9B4A2] text-base" />

              </div>

              {/* DELIVERY CARD */}

              <div className="bg-white rounded-[17px] border border-[#E5DAD1] mt-4 p-4.5 sm:p-5 md:p-6 shadow-[0_12px_38px_rgba(75,53,42,0.04)]">

                {/* NAME */}

                <div className="grid sm:grid-cols-2 gap-3.5">

                  <div>

                    <label className="block text-[9px] uppercase tracking-[0.6px] font-semibold text-[#62534A] mb-1.5">
                      First Name *
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      autoComplete="given-name"
                      className={inputClass}
                    />

                  </div>

                  <div>

                    <label className="block text-[9px] uppercase tracking-[0.6px] font-semibold text-[#62534A] mb-1.5">
                      Last Name *
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      autoComplete="family-name"
                      className={inputClass}
                    />

                  </div>

                </div>

                {/* EMAIL / PHONE */}

                <div className="grid sm:grid-cols-2 gap-3.5 mt-3.5">

                  <div>

                    <label className="block text-[9px] uppercase tracking-[0.6px] font-semibold text-[#62534A] mb-1.5">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={inputClass}
                    />

                  </div>

                  <div>

                    <label className="block text-[9px] uppercase tracking-[0.6px] font-semibold text-[#62534A] mb-1.5">
                      Phone Number *
                    </label>

                    <div className="flex">

                      <div className="h-[48px] px-3 bg-[#F4EEE8] border border-r-0 border-[#E4D9CF] rounded-l-[9px] flex items-center text-[10px] font-semibold text-[#6D5A4E]">
                        +91
                      </div>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit number"
                        autoComplete="tel"
                        inputMode="numeric"
                        maxLength="10"
                        className="w-full h-[48px] bg-[#FCFAF7] border border-[#E4D9CF] rounded-r-[9px] px-3.5 text-[12px] md:text-[13px] text-[#49352B] placeholder:text-[#AAA098] outline-none focus:bg-white focus:border-[#8B5E3C] focus:ring-4 focus:ring-[#8B5E3C]/[0.055] transition-all duration-300"
                      />

                    </div>

                  </div>

                </div>

                {/* ADDRESS */}

                <div className="mt-3.5">

                  <label className="block text-[9px] uppercase tracking-[0.6px] font-semibold text-[#62534A] mb-1.5">
                    Full Address *
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Flat / Building, Street, Area, Landmark"
                    autoComplete="street-address"
                    rows="2"
                    className="w-full bg-[#FCFAF7] border border-[#E4D9CF] rounded-[9px] px-3.5 py-3 text-[12px] md:text-[13px] text-[#49352B] placeholder:text-[#AAA098] outline-none resize-none transition-all duration-300 hover:border-[#CDB7A6] focus:bg-white focus:border-[#8B5E3C] focus:ring-4 focus:ring-[#8B5E3C]/[0.055]"
                  />

                </div>

                {/* CITY / STATE */}

                <div className="grid sm:grid-cols-2 gap-3.5 mt-3.5">

                  <div>

                    <label className="block text-[9px] uppercase tracking-[0.6px] font-semibold text-[#62534A] mb-1.5">
                      City *
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      autoComplete="address-level2"
                      className={inputClass}
                    />

                  </div>

                  <div>

                    <label className="block text-[9px] uppercase tracking-[0.6px] font-semibold text-[#62534A] mb-1.5">
                      State *
                    </label>

                    <CustomDropdown
                      options={indianStates}
                      value={formData.state}
                      placeholder="Select your state"
                      onChange={(selectedState) => {
                        setFormData((previous) => ({
                          ...previous,
                          state: selectedState,
                        }));
                      }}
                    />

                  </div>

                </div>

                {/* PIN / COUNTRY */}

                <div className="grid sm:grid-cols-2 gap-3.5 mt-3.5">

                  <div>

                    <label className="block text-[9px] uppercase tracking-[0.6px] font-semibold text-[#62534A] mb-1.5">
                      PIN Code *
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6-digit PIN"
                      autoComplete="postal-code"
                      inputMode="numeric"
                      maxLength="6"
                      className={inputClass}
                    />

                  </div>

                  <div>

                    <label className="block text-[9px] uppercase tracking-[0.6px] font-semibold text-[#62534A] mb-1.5">
                      Country
                    </label>

                    <div className="w-full h-[48px] bg-[#F4EEE8] border border-[#E4D9CF] rounded-[9px] px-3.5 flex items-center text-[12px] text-[#6D5A4E]">
                      India
                    </div>

                  </div>

                </div>

                {/* SMALL SECURITY NOTE */}

                <div className="mt-5 pt-4 border-t border-[#EEE6DF] flex items-center gap-2.5">

                  <FaShieldAlt className="text-[#8B5E3C] text-[10px] flex-shrink-0" />

                  <p className="text-[8px] md:text-[9px] text-[#9A8C82]">
                    Your delivery information is used only to process your RoKaShree order.
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                PAYMENT
            ================================================= */}

            <div>

              <div className="flex items-center justify-between pb-3 border-b border-[#DED2C8]">

                <div>

                  <p className="uppercase tracking-[3.2px] text-[8px] md:text-[9px] font-semibold text-[#9A7355]">
                    02 / Payment
                  </p>

                  <h2 className="font-serif text-[25px] md:text-[29px] font-semibold text-[#463329] mt-1.5 leading-tight">
                    Payment Method
                  </h2>

                </div>

                <FaLock className="hidden sm:block text-[#C9B4A2] text-sm" />

              </div>

              {/* PAYMENT CARD */}

              <div className="bg-white rounded-[17px] border border-[#E5DAD1] mt-4 p-4.5 sm:p-5 md:p-6 shadow-[0_12px_38px_rgba(75,53,42,0.04)]">

                <div className="space-y-2">

                  <PaymentOption
                    method="cod"
                    icon={
                      <FaMoneyBillWave className="text-[12px]" />
                    }
                    title="Cash on Delivery"
                    description="Pay when your order arrives."
                  />

                  <PaymentOption
                    method="upi"
                    icon={
                      <FaMobileAlt className="text-[12px]" />
                    }
                    title="UPI Payment"
                    description="Google Pay • PhonePe • Paytm"
                  />

                  <PaymentOption
                    method="card"
                    icon={
                      <FaCreditCard className="text-[12px]" />
                    }
                    title="Credit / Debit Card"
                    description="Visa • MasterCard • RuPay"
                  />

                </div>

                {/* SECURITY */}

                <div className="mt-4 pt-4 border-t border-[#EEE6DF] flex items-center gap-2.5">

                  <div className="w-7 h-7 rounded-full bg-[#F4EAE1] flex items-center justify-center text-[#8B5E3C] flex-shrink-0">
                    <FaLock className="text-[8px]" />
                  </div>

                  <div>

                    <p className="text-[9px] font-semibold text-[#4B352A]">
                      Secure payment experience
                    </p>

                    <p className="text-[8px] text-[#9A8C82] mt-0.5">
                      Your payment details are handled securely.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT — ORDER SUMMARY
          ================================================= */}

          <aside className="lg:sticky lg:top-7">

            <div className="bg-white rounded-[20px] border border-[#E3D6CB] shadow-[0_18px_55px_rgba(75,53,42,0.075)] overflow-hidden">

              {/* =================================================
                  SUMMARY HEADER
              ================================================= */}

              <div className="px-5 sm:px-6 pt-6 pb-5">

                <p className="uppercase tracking-[3px] text-[8px] font-semibold text-[#9A7355]">
                  Your Selection
                </p>

                <div className="flex items-center justify-between gap-3 mt-2">

                  <h2 className="font-serif text-[25px] sm:text-[27px] md:text-[29px] font-semibold text-[#463329] leading-none whitespace-nowrap">
                    Order Summary
                  </h2>

                  <span className="text-[8px] uppercase tracking-[1.5px] text-[#91847B] whitespace-nowrap flex-shrink-0">
                    {cartItems.length}{" "}
                    {cartItems.length === 1
                      ? "ITEM"
                      : "ITEMS"}
                  </span>

                </div>

              </div>

              {/* =================================================
                  PRODUCTS — EXACTLY 3 VISIBLE
              ================================================= */}

              <div className="border-t border-[#EEE5DD] px-5 sm:px-6 py-5">

                <div className="space-y-3 max-h-[225px] overflow-y-auto pr-2 checkout-products-scroll">

                  {cartItems.map(
                    (item, index) => (
                      <div
                        key={`${item.name}-${index}`}
                        className="flex items-center gap-3 min-h-[62px]"
                      >

                        {/* IMAGE */}

                        <div className="relative w-[58px] h-[58px] rounded-[10px] bg-[#FAF6F1] border border-[#EDE2D9] flex items-center justify-center flex-shrink-0">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-contain"
                          />

                          <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#8B5E3C] text-white text-[7px] font-bold flex items-center justify-center border-2 border-white">
                            {item.quantity}
                          </span>

                        </div>

                        {/* INFO */}

                        <div className="flex-1 min-w-0">

                          <p className="text-[11px] md:text-[12px] font-semibold text-[#4B352A] truncate leading-5">
                            {item.name}
                          </p>

                          <p className="text-[8px] uppercase tracking-[0.7px] text-[#A0948B] mt-0.5">
                            Handmade Collection
                          </p>

                        </div>

                        {/* PRICE */}

                        <span className="text-[11px] md:text-[12px] font-semibold text-[#6D4A35] flex-shrink-0">
                          {item.price}
                        </span>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  PRICE SUMMARY
              ================================================= */}

              <div className="border-t border-[#EEE5DD] px-5 sm:px-6 py-5">

                <div className="space-y-3">

                  {/* SUBTOTAL */}

                  <div className="flex items-center justify-between">

                    <span className="text-[11px] text-[#83766D]">
                      Subtotal
                    </span>

                    <span className="text-[11px] font-semibold text-[#4B352A]">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>

                  </div>

                  {/* SHIPPING */}

                  <div className="flex items-center justify-between">

                    <span className="text-[11px] text-[#83766D]">
                      Shipping
                    </span>

                    <span className="text-[9px] uppercase tracking-[0.8px] font-semibold text-[#66835F]">
                      Free
                    </span>

                  </div>

                  {/* DELIVERY */}

                  <div className="flex items-center justify-between">

                    <span className="text-[11px] text-[#83766D]">
                      Delivery
                    </span>

                    <span className="text-[10px] text-[#4B352A]">
                      3–5 Days
                    </span>

                  </div>

                </div>

                {/* TOTAL */}

                <div className="mt-5 pt-5 border-t border-[#EEE5DD] flex items-end justify-between gap-3">

                  <div>

                    <p className="uppercase tracking-[2px] text-[8px] text-[#9A8C82]">
                      Total Amount
                    </p>

                    <p className="font-serif text-[16px] font-semibold text-[#463329] mt-1">
                      Grand Total
                    </p>

                  </div>

                  <p className="font-serif text-[27px] font-semibold text-[#8B5E3C] leading-none">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </p>

                </div>

                {/* PLACE ORDER */}

                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="group w-full mt-6 h-[50px] rounded-[10px] bg-[#8B5E3C] text-white text-[11px] font-semibold tracking-[0.3px] flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(139,94,60,0.18)] hover:bg-[#6D472D] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(139,94,60,0.23)] transition-all duration-300"
                >

                  <FaLock className="text-[8px]" />

                  Place Secure Order

                  <FaArrowRight className="text-[8px] group-hover:translate-x-1 transition-transform duration-300" />

                </button>

              </div>

              {/* =================================================
                  TRUST STRIP
              ================================================= */}

              <div className="border-t border-[#EEE5DD] bg-[#FCFAF7] px-5 sm:px-6 py-5">

                <div className="grid grid-cols-3 divide-x divide-[#E5DAD1]">

                  {/* SECURE */}

                  <div className="px-2 text-center">

                    <FaShieldAlt className="mx-auto text-[#8B5E3C] text-[10px]" />

                    <p className="text-[8px] font-semibold text-[#4B352A] mt-1.5">
                      Secure
                    </p>

                    <p className="text-[7px] text-[#9A8C82] mt-0.5">
                      Checkout
                    </p>

                  </div>

                  {/* SHIPPING */}

                  <div className="px-2 text-center">

                    <FaTruck className="mx-auto text-[#8B5E3C] text-[10px]" />

                    <p className="text-[8px] font-semibold text-[#4B352A] mt-1.5">
                      Free
                    </p>

                    <p className="text-[7px] text-[#9A8C82] mt-0.5">
                      Shipping
                    </p>

                  </div>

                  {/* HANDMADE */}

                  <div className="px-2 text-center">

                    <FaHeart className="mx-auto text-[#8B5E3C] text-[10px]" />

                    <p className="text-[8px] font-semibold text-[#4B352A] mt-1.5">
                      Handmade
                    </p>

                    <p className="text-[7px] text-[#9A8C82] mt-0.5">
                      With Love
                    </p>

                  </div>

                </div>

              </div>

              {/* TERMS */}

              <div className="px-5 sm:px-6 pb-5 pt-1 bg-[#FCFAF7]">

                <p className="text-center text-[8px] leading-5 text-[#A0968E]">
                  By placing your order, you agree to our
                  terms of service and privacy policy.
                </p>

              </div>

            </div>

          </aside>

        </div>

        {/* =====================================================
            PREMIUM BRAND SIGNATURE
        ===================================================== */}

        <div className="mt-16 md:mt-20 pt-9 md:pt-11 border-t border-[#DED2C8]">

          <div className="max-w-xl mx-auto text-center">

            {/* BRAND LABEL */}

            <div className="flex items-center justify-center gap-4">

              <span className="w-10 md:w-14 h-px bg-[#CDB7A3]" />

              <span className="
                text-[8px]
                md:text-[9px]
                uppercase
                tracking-[4px]
                font-semibold
                text-[#9A7355]
              ">
                The RoKaShree Promise
              </span>

              <span className="w-10 md:w-14 h-px bg-[#CDB7A3]" />

            </div>

            {/* MAIN STATEMENT */}

            <h3 className="
              font-serif
              text-[19px]
              sm:text-[21px]
              md:text-[23px]
              italic
              font-medium
              text-[#4B352A]
              mt-5
              leading-relaxed
            ">
              Thoughtfully handcrafted.
              <br className="sm:hidden" />
              <span className="sm:ml-2">
                Beautifully made.
              </span>
            </h3>

            {/* SUBTLE SUPPORTING LINE */}

            <p className="
              text-[9px]
              md:text-[10px]
              text-[#A0968E]
              tracking-[0.5px]
              mt-3
            ">
              Made with patience, intention and love.
            </p>

            {/* PREMIUM ORNAMENT */}

            <div className="flex items-center justify-center gap-3 mt-5">

              <span className="
                w-1.5
                h-1.5
                rotate-45
                border
                border-[#CDB7A3]
              " />

              <span className="w-14 h-px bg-[#CDB7A3]" />

              <span className="
                text-[8px]
                text-[#8B5E3C]
              ">
                ✦
              </span>

              <span className="w-14 h-px bg-[#CDB7A3]" />

              <span className="
                w-1.5
                h-1.5
                rotate-45
                border
                border-[#CDB7A3]
              " />

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          THIN PREMIUM SCROLLBAR
      ===================================================== */}

      <style>
        {`
          .checkout-products-scroll {
            scrollbar-width: thin;
            scrollbar-color: #CDB7A3 transparent;
          }

          .checkout-products-scroll::-webkit-scrollbar {
            width: 3px;
          }

          .checkout-products-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .checkout-products-scroll::-webkit-scrollbar-thumb {
            background: #CDB7A3;
            border-radius: 999px;
          }

          .checkout-products-scroll::-webkit-scrollbar-thumb:hover {
            background: #A98A72;
          }
        `}
      </style>

    </section>
  );
}