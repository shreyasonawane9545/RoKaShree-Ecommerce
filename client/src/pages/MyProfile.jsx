import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast5 } from "../utils/toast";

import { AuthContext } from "../context/AuthContext";
import AddressModal from "../components/AddressModal";
import CustomDropdown from "../components/CustomDropdown";
import DatePicker from "../components/DatePicker";

import { db } from "../firebase/firebase";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

export default function MyProfile() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [country, setCountry] = useState("India");

  const [address, setAddress] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // =========================================================
  // LOAD PROFILE
  // =========================================================

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          setFullName(data.fullName || user.displayName || "");
          setPhone(data.phone || "");
          setGender(data.gender || "");
          setDob(data.dob || "");
          setCountry(data.country || "India");
          setAddress(data.address || null);
        } else {
          setFullName(user.displayName || "");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const saveProfile = async () => {
    if (!user) return;

    if (phone && phone.length !== 10) {
      toast5.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setSaving(true);

      await setDoc(
        doc(db, "users", user.uid),
        {
          fullName: fullName.trim(),
          phone: phone.trim(),
          gender,
          dob,
          country,
          address,
          email: user.email || "",
          updatedAt: new Date(),
        },
        { merge: true }
      );

     toast5.success("Profile saved successfully.");
    } catch (error) {
      console.error("Error saving profile:", error);
      toast5.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // ADDRESS
  // =========================================================

 const handleAddressSave = async (newAddress) => {
  setAddress(newAddress);
  setShowModal(false);

  if (!user) return;

  try {
    const userRef = doc(db, "users", user.uid);

    await setDoc(
      userRef,
      {
        address: newAddress,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    console.log("Address saved to Firebase successfully");
  } catch (error) {
    console.error("Error saving address to Firebase:", error);
  }
};

  // =========================================================
  // AVATAR
  // =========================================================

  const avatarLetter =
    fullName?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F8F3ED] flex items-center justify-center">
        <div className="text-center">
          <div
            className="
              w-9
              h-9
              mx-auto
              rounded-full
              border-[3px]
              border-[#E7D8C8]
              border-t-[#8B5E3C]
              animate-spin
            "
          />

          <p className="text-xs text-[#8B5E3C] mt-4 tracking-wide">
            Loading your profile...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F8F3ED] min-h-screen py-8 md:py-10">

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <div className="mb-8">

          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="
              group
              w-11
              h-11
              rounded-full
              bg-white
              border
              border-[#E7D8C8]
              flex
              items-center
              justify-center
              text-[#8B5E3C]
              shadow-sm
              hover:bg-[#8B5E3C]
              hover:text-white
              hover:border-[#8B5E3C]
              hover:-translate-x-1
              transition-all
              duration-300
            "
          >
            <FaArrowLeft className="text-sm" />
          </button>

        </div>


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="text-center max-w-3xl mx-auto mt-10">

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
            Your RoKaShree Collection
          </p>

          <h1
            className="
              font-serif
              text-4xl
              md:text-5xl
              lg:text-[52px]
              font-semibold
              text-[#4B352A]
              mt-4
              leading-[1.08]
            "
          >
            My Profile
          </h1>

          <div className="flex items-center justify-center gap-3 mt-5">

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
              mt-5
              max-w-xl
              mx-auto
            "
          >
            Manage your personal details and delivery information
            for a smoother RoKaShree shopping experience.
          </p>

        </div>


        {/* =====================================================
            PROFILE SUMMARY
        ===================================================== */}

        <div
          className="
            max-w-4xl
            mx-auto
            mt-12
            bg-white
            border
            border-[#E6DDD4]
            rounded-[26px]
            px-6
            py-6
            md:px-8
            shadow-[0_10px_35px_rgba(75,53,42,0.05)]
          "
        >

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            justify-between
            gap-5
          ">

            <div className="flex items-center gap-4">

              <div
                className="
                  w-16
                  h-16
                  rounded-full
                  bg-[#F3E8DC]
                  border
                  border-[#DECBB9]
                  p-1
                  flex-shrink-0
                "
              >

                <div
                  className="
                    w-full
                    h-full
                    rounded-full
                    bg-[#8B5E3C]
                    flex
                    items-center
                    justify-center
                    text-white
                    text-xl
                    font-serif
                  "
                >
                  {avatarLetter}
                </div>

              </div>


              <div className="min-w-0">

                <p
                  className="
                    uppercase
                    tracking-[3px]
                    text-[#8B5E3C]
                    text-[9px]
                    font-semibold
                  "
                >
                  My Account
                </p>

                <h2
                  className="
                    font-serif
                    text-2xl
                    font-semibold
                    text-[#4B352A]
                    mt-1
                  "
                >
                  {fullName || "Welcome to RoKaShree"}
                </h2>

                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                  truncate
                ">
                  {user?.email || ""}
                </p>

              </div>

            </div>


            <div className="
              flex
              items-center
              gap-2
              self-start
              sm:self-center
              px-3
              py-1.5
              rounded-full
              bg-[#F5F9F5]
              border
              border-[#DCE9DC]
              text-[10px]
              text-green-700
              font-medium
            ">
              <FaCheckCircle className="text-[9px]" />
              Account Active
            </div>

          </div>

        </div>


        {/* =====================================================
            PERSONAL DETAILS
        ===================================================== */}

        <div
          className="
            max-w-4xl
            mx-auto
            mt-6
            bg-white
            border
            border-[#E6DDD4]
            rounded-[26px]
            p-6
            md:p-8
            shadow-[0_10px_35px_rgba(75,53,42,0.05)]
          "
        >

          {/* HEADER */}

          <div className="flex items-center gap-3">

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-[#F3E8DC]
                border
                border-[#E8D7C5]
                flex
                items-center
                justify-center
                text-[#8B5E3C]
              "
            >
              <FaUser className="text-sm" />
            </div>

            <div>

              <p
                className="
                  uppercase
                  tracking-[3px]
                  text-[#8B5E3C]
                  text-[9px]
                  font-semibold
                "
              >
                Personal Details
              </p>

              <h2
                className="
                  font-serif
                  text-xl
                  md:text-2xl
                  font-semibold
                  text-[#4B352A]
                  mt-0.5
                "
              >
                Profile Information
              </h2>

            </div>

          </div>


          <div className="h-px bg-[#EEE5DC] my-7" />


          {/* FORM */}

          <div className="grid md:grid-cols-2 gap-6">


            {/* FULL NAME */}

            <div>

              <label
                htmlFor="fullName"
                className="
                  block
                  text-xs
                  font-semibold
                  text-[#4B352A]
                  mb-2
                "
              >
                Full Name
              </label>

              <div
                className="
                  flex
                  items-center
                  h-[48px]
                  rounded-xl
                  border
                  border-[#E6DDD4]
                  bg-[#FCFAF8]
                  px-3
                  focus-within:border-[#8B5E3C]
                  focus-within:bg-white
                  transition-all
                "
              >

                <FaUser className="
                  text-[#8B5E3C]
                  text-xs
                  mr-3
                  flex-shrink-0
                " />

                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-sm
                    text-[#4B352A]
                    placeholder:text-gray-400
                  "
                />

              </div>

            </div>


            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="
                  block
                  text-xs
                  font-semibold
                  text-[#4B352A]
                  mb-2
                "
              >
                Email Address
              </label>

              <div
                className="
                  flex
                  items-center
                  h-[48px]
                  rounded-xl
                  border
                  border-[#E6DDD4]
                  bg-[#F5F2EF]
                  px-3
                "
              >

                <FaEnvelope className="
                  text-[#9A806C]
                  text-xs
                  mr-3
                  flex-shrink-0
                " />

                <input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  autoComplete="email"
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-sm
                    text-gray-500
                  "
                />

              </div>

            </div>


            {/* PHONE */}

            <div>

              <label
                htmlFor="phone"
                className="
                  block
                  text-xs
                  font-semibold
                  text-[#4B352A]
                  mb-2
                "
              >
                Phone Number
              </label>

              <div
                className="
                  flex
                  items-center
                  h-[48px]
                  rounded-xl
                  border
                  border-[#E6DDD4]
                  bg-[#FCFAF8]
                  px-3
                  focus-within:border-[#8B5E3C]
                  focus-within:bg-white
                  transition-all
                "
              >

                <FaPhone className="
                  text-[#8B5E3C]
                  text-xs
                  mr-3
                  flex-shrink-0
                " />

                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  className="
                    w-full
                    bg-transparent
                    outline-none
                    text-sm
                    text-[#4B352A]
                    placeholder:text-gray-400
                  "
                />

              </div>

            </div>


            {/* GENDER */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-[#4B352A]
                mb-2
              ">
                Gender
              </label>

              <CustomDropdown
                options={[
                  "Female",
                  "Male",
                  "Other",
                ]}
                value={gender}
                onChange={setGender}
                placeholder="Select Gender"
              />

            </div>


            {/* DOB */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-[#4B352A]
                mb-2
              ">
                Date of Birth
              </label>

              <DatePicker
                value={dob}
                onChange={setDob}
                placeholder="Select date of birth"
              />

            </div>


            {/* COUNTRY */}

            <div>

              <label className="
                block
                text-xs
                font-semibold
                text-[#4B352A]
                mb-2
              ">
                Country / Region
              </label>

              <CustomDropdown
                options={[
                  "India",
                  "United States",
                  "United Kingdom",
                  "Canada",
                  "Australia",
                  "Germany",
                  "France",
                  "Japan",
                ]}
                value={country}
                onChange={setCountry}
                placeholder="Select Country"
              />

            </div>

          </div>


          {/* =================================================
              ADDRESS
          ================================================= */}

          <div className="
            mt-8
            pt-7
            border-t
            border-[#EEE5DC]
          ">

            <div className="
              flex
              items-center
              justify-between
              gap-4
              mb-5
            ">

              <div>

                <p className="
                  uppercase
                  tracking-[3px]
                  text-[#8B5E3C]
                  text-[9px]
                  font-semibold
                ">
                  Shipping
                </p>

                <h2 className="
                  font-serif
                  text-xl
                  font-semibold
                  text-[#4B352A]
                  mt-1
                ">
                  Delivery Address
                </h2>

              </div>

              {address && (
                <span className="
                  flex
                  items-center
                  gap-1.5
                  text-[10px]
                  text-green-700
                  bg-green-50
                  border
                  border-green-100
                  px-2.5
                  py-1.5
                  rounded-full
                ">
                  <FaCheckCircle className="text-[9px]" />
                  Saved
                </span>
              )}

            </div>


            {address ? (

              <div className="
                rounded-2xl
                border
                border-[#E7DED4]
                bg-[#FCFAF8]
                p-4
                flex
                flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-4
              ">

                <div className="flex items-start gap-3">

                  <div className="
                    w-9
                    h-9
                    rounded-xl
                    bg-[#F3E8DC]
                    flex
                    items-center
                    justify-center
                    text-[#8B5E3C]
                    flex-shrink-0
                  ">
                    <FaMapMarkerAlt className="text-xs" />
                  </div>

                  <div>

                    <p className="
                      text-sm
                      font-semibold
                      text-[#4B352A]
                    ">
                      {address.name || "Delivery Address"}
                    </p>

                    <p className="
  text-xs
  text-gray-500
  leading-6
  mt-1
">
  {[
    address.house,
    address.area,
    address.address,
    address.landmark,
    address.city,
    address.state,
    address.pincode,
  ]
    .filter(Boolean)
    .join(", ")}
</p>
                    {address.phone && (
                      <p className="
                        text-xs
                        text-gray-400
                        mt-1
                      ">
                        {address.phone}
                      </p>
                    )}

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="
                    px-5
                    py-2
                    rounded-full
                    border
                    border-[#D5C0AA]
                    text-[#8B5E3C]
                    text-xs
                    font-semibold
                    hover:bg-[#8B5E3C]
                    hover:text-white
                    hover:border-[#8B5E3C]
                    transition-all
                  "
                >
                  Edit Address
                </button>

              </div>

            ) : (

              <div className="
                rounded-2xl
                border
                border-dashed
                border-[#D8C5B2]
                bg-[#FCFAF8]
                px-5
                py-5
                flex
                flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-4
              ">

                <div className="flex items-center gap-3">

                  <div className="
                    w-9
                    h-9
                    rounded-full
                    bg-[#F3E8DC]
                    flex
                    items-center
                    justify-center
                    text-[#8B5E3C]
                  ">
                    <FaMapMarkerAlt className="text-xs" />
                  </div>

                  <div>

                    <p className="
                      text-sm
                      font-semibold
                      text-[#4B352A]
                    ">
                      No delivery address saved
                    </p>

                    <p className="
                      text-xs
                      text-gray-500
                      mt-1
                    ">
                      Add your address for faster checkout.
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="
                    px-5
                    py-2.5
                    rounded-full
                    bg-[#8B5E3C]
                    text-white
                    text-xs
                    font-semibold
                    hover:bg-[#6D472D]
                    hover:-translate-y-0.5
                    transition-all
                  "
                >
                  Add Address
                </button>

              </div>

            )}

          </div>


          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="
            mt-8
            pt-6
            border-t
            border-[#EEE5DC]
            flex
            flex-col-reverse
            sm:flex-row
            justify-end
            gap-3
          ">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                px-6
                py-2.5
                rounded-full
                border
                border-[#DCCFC2]
                text-[#6D594B]
                text-xs
                font-semibold
                hover:bg-[#F8F3ED]
                transition-all
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={saveProfile}
              disabled={saving}
              className="
                px-7
                py-2.5
                rounded-full
                bg-[#8B5E3C]
                hover:bg-[#6D472D]
                text-white
                text-xs
                font-semibold
                shadow-[0_8px_22px_rgba(139,94,60,0.16)]
                hover:-translate-y-0.5
                transition-all
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </div>


        {/* =====================================================
            SECURITY
        ===================================================== */}

        <div className="
          max-w-4xl
          mx-auto
          mt-5
          flex
          items-center
          gap-3
          px-5
          py-3.5
          rounded-2xl
          bg-[#F3E8DC]/50
          border
          border-[#E5D5C3]
        ">

          <div className="
            w-8
            h-8
            rounded-full
            bg-white
            flex
            items-center
            justify-center
            text-[#8B5E3C]
            flex-shrink-0
          ">
            <FaShieldAlt className="text-xs" />
          </div>

          <div>

            <p className="
              text-xs
              font-semibold
              text-[#4B352A]
            ">
              Your information is secure
            </p>

            <p className="
              text-[10px]
              text-gray-500
              mt-0.5
            ">
              Your profile information is securely stored with Firebase.
            </p>

          </div>

        </div>


        {/* =====================================================
            BRAND SIGNATURE
        ===================================================== */}

        <div className="text-center mt-7 pb-5">

          <p className="
            uppercase
            tracking-[4px]
            text-[9px]
            text-[#A28770]
            font-semibold
          ">
            RoKaShree
          </p>

          <p className="
            font-serif
            italic
            text-sm
            text-[#8B5E3C]
            mt-1.5
          ">
            Thoughtfully handcrafted. Beautifully made.
          </p>

        </div>

      </div>


      {/* =====================================================
          ADDRESS MODAL
      ===================================================== */}

      <AddressModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSave={handleAddressSave}
  address={address}
/>

    </section>
  );
}