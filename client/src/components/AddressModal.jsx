import { useState, useEffect, useRef } from "react";
import { toast5 } from "../utils/toast";

import {
  FaTimes,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaHome,
  FaCity,
  FaMapPin,
  FaCheck,
  FaBuilding,
} from "react-icons/fa";

import CustomDropdown from "./CustomDropdown";

export default function AddressModal({
  isOpen,
  onClose,
  onSave,
  address,
}) {
  const modalRef = useRef(null);

  const [addressType, setAddressType] = useState("Home");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    house: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    address: "",
  });

  // =========================================================
  // CLOSE WITH ESCAPE
  // =========================================================

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  // =========================================================
// LOAD EXISTING ADDRESS WHEN EDITING
// =========================================================

useEffect(() => {
  if (!isOpen) return;

  if (address) {
    setForm({
      name: address.name || "",
      phone: address.phone || "",
      house: address.house || "",
      area: address.area || "",
      landmark: address.landmark || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      address: address.address || "",
    });

    setAddressType(address.type || "Home");
  } else {
    setForm({
      name: "",
      phone: "",
      house: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
      address: "",
    });

    setAddressType("Home");
  }
}, [isOpen, address]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // STATE
  // =========================================================

  const handleStateChange = (value) => {
    setForm((prev) => ({
      ...prev,
      state: value,
    }));
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSave = () => {
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.house.trim() ||
      !form.city.trim() ||
      !form.state ||
      !form.pincode.trim() ||
      !form.address.trim()
    ) {
      toast5.error("Please fill all required fields.");
      return;
    }

    onSave({
      ...form,
      type: addressType,
    });

    onClose();
  };

  if (!isOpen) return null;

  // =========================================================
  // INDIAN STATES
  // =========================================================

  const states = [
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
    "Delhi",
    "Jammu & Kashmir",
  ];

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        p-3
        sm:p-5
        bg-[#241812]/55
        backdrop-blur-[8px]
        animate-[fadeIn_.2s_ease-out]
      "
      onClick={onClose}
    >

      {/* =====================================================
          MODAL
      ===================================================== */}

      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-[570px]
          max-h-[92vh]
          overflow-hidden
          rounded-[24px]
          bg-[#FFFEFC]
          border
          border-white/70
          shadow-[0_30px_80px_rgba(36,24,16,0.28)]
          animate-[modalUp_.3s_cubic-bezier(.22,1,.36,1)]
        "
      >

        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            relative
            px-5
            sm:px-6
            py-5
            bg-gradient-to-br
            from-[#FFFDFC]
            via-[#FAF3EB]
            to-[#F2E5D7]
            border-b
            border-[#E9DED4]
          "
        >

          {/* Subtle decoration */}

          <div
            className="
              absolute
              -right-16
              -top-20
              w-40
              h-40
              rounded-full
              bg-[#C9A783]/10
              blur-3xl
              pointer-events-none
            "
          />

          <div
            className="
              relative
              flex
              items-center
              justify-between
              gap-4
            "
          >

            {/* LEFT */}

            <div className="flex items-center gap-3.5">

              {/* Icon */}

              <div
                className="
                  relative
                  w-11
                  h-11
                  rounded-[14px]
                  bg-white
                  border
                  border-[#E4D5C5]
                  shadow-[0_5px_16px_rgba(75,53,42,0.08)]
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >

                <div
                  className="
                    absolute
                    inset-[4px]
                    rounded-[10px]
                    bg-[#F5E9DC]
                  "
                />

                <FaMapMarkerAlt
                  className="
                    relative
                    text-[#8B5E3C]
                    text-[14px]
                  "
                />

              </div>

              {/* TITLE */}

              <div>

                <div className="flex items-center gap-2">

                  <span
                    className="
                      uppercase
                      text-[7px]
                      tracking-[2.5px]
                      font-bold
                      text-[#8B5E3C]
                    "
                  >
                    ROKASHREE
                  </span>

                  <span
                    className="
                      w-1
                      h-1
                      rounded-full
                      bg-[#C7A98D]
                    "
                  />

                  <span
                    className="
                      uppercase
                      text-[7px]
                      tracking-[1.5px]
                      text-[#A28B78]
                    "
                  >
                    DELIVERY
                  </span>

                </div>

                <h2
                  className="
                    font-serif
                    text-[20px]
                    sm:text-[22px]
                    font-semibold
                    tracking-[-0.3px]
                    text-[#3F2C22]
                    mt-0.5
                  "
                >
                  Delivery Address
                </h2>

                <p
                  className="
                    text-[10px]
                    sm:text-[11px]
                    text-[#907E70]
                    mt-0.5
                  "
                >
                  Where should we deliver your order?
                </p>

              </div>

            </div>

            {/* CLOSE */}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="
                w-8
                h-8
                rounded-full
                bg-white/80
                border
                border-[#E4D7CC]
                text-[#8B5E3C]
                flex
                items-center
                justify-center
                flex-shrink-0
                hover:bg-[#8B5E3C]
                hover:text-white
                hover:border-[#8B5E3C]
                hover:rotate-90
                transition-all
                duration-300
              "
            >
              <FaTimes className="text-[10px]" />
            </button>

          </div>

        </div>


        {/* ===================================================
            CONTENT
        =================================================== */}

        <div
          className="
            max-h-[64vh]
            overflow-y-auto
            px-5
            sm:px-6
            py-5
            scrollbar-thin
            scrollbar-thumb-[#C9AD92]
            scrollbar-track-[#F7F0E9]
          "
        >

          {/* =================================================
              SECTION TITLE
          ================================================= */}

          <div className="flex items-center gap-3 mb-4">

            <div className="flex-shrink-0">

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[2.5px]
                  font-bold
                  text-[#8B5E3C]
                "
              >
                Address Details
              </p>

              <p
                className="
                  text-[10px]
                  text-[#9A897A]
                  mt-0.5
                "
              >
                Enter your delivery information
              </p>

            </div>

            <div
              className="
                flex-1
                h-px
                bg-gradient-to-r
                from-[#E6D9CD]
                to-transparent
              "
            />

          </div>


          {/* =================================================
              FORM
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-x-4
              gap-y-3.5
            "
          >

            {/* FULL NAME */}

            <div>
              <PremiumLabel
                text="Full Name"
                required
              />

              <PremiumInput
                icon={<FaUser />}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>


            {/* PHONE */}

            <div>
              <PremiumLabel
                text="Phone Number"
                required
              />

              <PremiumInput
                icon={<FaPhone />}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
              />
            </div>


            {/* HOUSE */}

            <div>
              <PremiumLabel
                text="House / Flat No."
                required
              />

              <PremiumInput
                icon={<FaHome />}
                name="house"
                value={form.house}
                onChange={handleChange}
                placeholder="Flat 201"
              />
            </div>


            {/* AREA */}

            <div>
              <PremiumLabel
                text="Area / Locality"
              />

              <PremiumInput
                icon={<FaMapPin />}
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="Area / Locality"
              />
            </div>


            {/* LANDMARK */}

            <div>
              <PremiumLabel
                text="Landmark"
                optional
              />

              <PremiumInput
                icon={<FaMapMarkerAlt />}
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                placeholder="Near..."
              />
            </div>


            {/* CITY */}

            <div>
              <PremiumLabel
                text="City"
                required
              />

              <PremiumInput
                icon={<FaCity />}
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Your city"
              />
            </div>


            {/* STATE */}

            <div className="relative z-[50]">

              <PremiumLabel
                text="State"
                required
              />

              <CustomDropdown
                options={states}
                value={form.state}
                onChange={handleStateChange}
                placeholder="Select your state"
              />

            </div>


            {/* PINCODE */}

            <div>

              <PremiumLabel
                text="Pincode"
                required
              />

              <PremiumInput
                icon={<FaMapPin />}
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="411057"
              />

            </div>

          </div>


          {/* =================================================
              COMPLETE ADDRESS
          ================================================= */}

          <div className="mt-4">

            <PremiumLabel
              text="Complete Address"
              required
            />

            <div
              className="
                group
                relative
                rounded-[15px]
                bg-[#FCFAF8]
                border
                border-[#E7DDD3]
                transition-all
                duration-300
                focus-within:bg-white
                focus-within:border-[#8B5E3C]
                focus-within:shadow-[0_0_0_3px_rgba(139,94,60,0.05)]
              "
            >

              <textarea
                rows={2}
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House, street, locality..."
                className="
                  w-full
                  min-h-[70px]
                  bg-transparent
                  outline-none
                  resize-none
                  px-4
                  py-3
                  text-[12px]
                  leading-5
                  text-[#4B352A]
                  placeholder:text-[#B4A79D]
                "
              />

            </div>

          </div>


          {/* =================================================
              ADDRESS TYPE
          ================================================= */}

          <div className="mt-4">

            <div
              className="
                flex
                items-center
                justify-between
                mb-2
              "
            >

              <div>

                <PremiumLabel
                  text="Address Type"
                />

              </div>

              <span
                className="
                  text-[8px]
                  font-semibold
                  text-[#9B8776]
                  px-2.5
                  py-1
                  rounded-full
                  bg-[#F7F1EB]
                  border
                  border-[#E9DED4]
                "
              >
                {addressType}
              </span>

            </div>


            <div className="
              grid
              grid-cols-3
              gap-2.5
            ">

              {[
                {
                  name: "Home",
                  icon: <FaHome />,
                },
                {
                  name: "Office",
                  icon: <FaBuilding />,
                },
                {
                  name: "Other",
                  icon: <FaMapMarkerAlt />,
                },
              ].map((item) => {

                const active =
                  addressType === item.name;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() =>
                      setAddressType(item.name)
                    }
                    className={`
                      relative
                      h-[48px]
                      rounded-[14px]
                      border
                      flex
                      items-center
                      justify-center
                      gap-2
                      text-[11px]
                      font-semibold
                      transition-all
                      duration-250
                      active:scale-[0.97]

                      ${
                        active
                          ? `
                            bg-[#8B5E3C]
                            border-[#8B5E3C]
                            text-white
                            shadow-[0_6px_18px_rgba(139,94,60,0.18)]
                          `
                          : `
                            bg-[#FCFAF8]
                            border-[#E7DDD3]
                            text-[#5B4638]
                            hover:bg-[#FAF5EF]
                            hover:border-[#CBB39D]
                          `
                      }
                    `}
                  >

                    <span
                      className={`
                        w-6
                        h-6
                        rounded-[8px]
                        flex
                        items-center
                        justify-center
                        text-[9px]

                        ${
                          active
                            ? "bg-white/15 text-white"
                            : "bg-[#F3E8DA] text-[#8B5E3C]"
                        }
                      `}
                    >
                      {item.icon}
                    </span>

                    {item.name}

                    {active && (
                      <span
                        className="
                          absolute
                          top-1.5
                          right-1.5
                          w-3.5
                          h-3.5
                          rounded-full
                          bg-white/15
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <FaCheck className="text-[5px]" />
                      </span>
                    )}

                  </button>
                );
              })}

            </div>

          </div>


          {/* =================================================
              TRUST MESSAGE
          ================================================= */}

          <div
            className="
              mt-4
              rounded-[14px]
              bg-gradient-to-r
              from-[#F8F2EB]
              to-[#FCF8F3]
              border
              border-[#E9DED3]
              px-3
              py-2.5
              flex
              items-center
              gap-2.5
            "
          >

            <div
              className="
                w-7
                h-7
                rounded-full
                bg-[#F0E1D1]
                border
                border-[#E4D1BD]
                flex
                items-center
                justify-center
                text-[#8B5E3C]
                flex-shrink-0
              "
            >
              <FaCheck className="text-[9px]" />
            </div>

            <div>

              <p
                className="
                  text-[9px]
                  font-semibold
                  text-[#5D493B]
                "
              >
                Your information is safe
              </p>

              <p
                className="
                  text-[8px]
                  text-[#9A897B]
                  mt-0.5
                "
              >
                Saved securely for a faster checkout.
              </p>

            </div>

          </div>

        </div>


        {/* ===================================================
            FOOTER
        =================================================== */}

        <div
          className="
            border-t
            border-[#EDE4DA]
            bg-[#FFFEFC]
            px-5
            sm:px-6
            py-3.5
            flex
            items-center
            justify-between
            gap-4
          "
        >

          {/* CANCEL */}

          <button
            type="button"
            onClick={onClose}
            className="
              px-4
              py-2.5
              rounded-full
              text-[11px]
              font-semibold
              text-[#8D7B6D]
              hover:text-[#4B352A]
              hover:bg-[#F8F3ED]
              transition-all
              duration-300
            "
          >
            Cancel
          </button>


          {/* SAVE */}

          <button
            type="button"
            onClick={handleSave}
            className="
              group
              relative
              overflow-hidden
              min-w-[140px]
              px-6
              py-2.5
              rounded-full
              bg-[#8B5E3C]
              hover:bg-[#744B32]
              text-white
              text-[11px]
              font-semibold
              tracking-wide
              shadow-[0_8px_22px_rgba(139,94,60,0.20)]
              hover:-translate-y-[1px]
              hover:shadow-[0_12px_28px_rgba(139,94,60,0.27)]
              active:translate-y-0
              transition-all
              duration-300
            "
          >

            <span
              className="
                relative
                flex
                items-center
                justify-center
                gap-2
              "
            >
              Save Address

              <FaCheck className="text-[8px]" />

            </span>

          </button>

        </div>

      </div>


      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>{`

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes modalUp {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: #f7f0e9;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: #c9ad92;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #a8896e;
        }

      `}</style>

    </div>
  );
}


/* ============================================================
   PREMIUM LABEL
============================================================ */

function PremiumLabel({
  text,
  optional = false,
  required = false,
}) {
  return (
    <label
      className="
        flex
        items-center
        gap-1.5
        mb-1.5
        text-[9px]
        font-semibold
        tracking-wide
        text-[#655246]
      "
    >

      {text}

      {required && (
        <span className="
          text-[#B47755]
          text-[8px]
        ">
          *
        </span>
      )}

      {optional && (
        <span
          className="
            text-[7px]
            font-medium
            text-[#A7988C]
            bg-[#F6F1EC]
            border
            border-[#E9DFD6]
            px-1.5
            py-0.5
            rounded-full
          "
        >
          Optional
        </span>
      )}

    </label>
  );
}


/* ============================================================
   PREMIUM INPUT
============================================================ */

function PremiumInput({
  icon,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div
      className="
        group
        relative
        flex
        items-center
        h-[48px]
        bg-[#FCFAF8]
        border
        border-[#E7DDD3]
        rounded-[14px]
        px-3
        transition-all
        duration-300
        hover:border-[#D2BDA8]
        focus-within:bg-white
        focus-within:border-[#8B5E3C]
        focus-within:shadow-[0_0_0_3px_rgba(139,94,60,0.045)]
      "
    >

      {/* ICON */}

      <span
        className="
          w-7
          h-7
          rounded-[9px]
          bg-[#F3E8DA]
          flex
          items-center
          justify-center
          text-[#8B5E3C]
          text-[9px]
          mr-2.5
          flex-shrink-0
          group-focus-within:bg-[#8B5E3C]
          group-focus-within:text-white
          transition-all
          duration-300
        "
      >
        {icon}
      </span>


      {/* INPUT */}

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="on"
        className="
          w-full
          h-full
          bg-transparent
          outline-none
          text-[12px]
          text-[#4B352A]
          placeholder:text-[#B4A79D]
        "
      />


      {/* FOCUS LINE */}

      <span
        className="
          absolute
          bottom-0
          left-5
          right-5
          h-px
          bg-[#8B5E3C]
          scale-x-0
          group-focus-within:scale-x-100
          transition-transform
          duration-300
          origin-center
        "
      />

    </div>
  );
}