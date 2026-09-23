import { Link, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaCheck,
  FaShoppingBag,
  FaTruck,
  FaHeart,
  FaHome,
} from "react-icons/fa";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#F9F5F0] text-[#4B352A]">

      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <header className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-6">

        <div className="flex items-center justify-between">

          {/* Back */}

          <button
            onClick={() => navigate("/shop")}
            aria-label="Continue shopping"
            className="
              group
              w-10
              h-10
              rounded-full
              bg-white
              border
              border-[#E6DCD2]
              flex
              items-center
              justify-center
              text-[#8B5E3C]
              shadow-[0_4px_16px_rgba(75,53,42,0.04)]
              hover:bg-[#8B5E3C]
              hover:text-white
              hover:border-[#8B5E3C]
              hover:-translate-x-0.5
              transition-all
              duration-300
            "
          >
            <FaArrowLeft className="text-xs" />
          </button>


          {/* Brand */}

          <div className="text-right">

            <p className="
              text-[10px]
              uppercase
              tracking-[5px]
              font-bold
              text-[#8B5E3C]
            ">
              ROKASHREE
            </p>

            <p className="
              text-[8px]
              uppercase
              tracking-[2.5px]
              text-[#A79587]
              mt-1
            ">
              Handmade Luxury
            </p>

          </div>

        </div>

      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="max-w-5xl mx-auto px-5 sm:px-8 pb-16 pt-12 md:pt-16">

        {/* =================================================
            SUCCESS INTRO
        ================================================= */}

        <div className="text-center">

          {/* Elegant Check */}

          <div className="flex justify-center">

            <div className="relative">

              {/* Outer ring */}

              <div className="
                absolute
                -inset-3
                rounded-full
                border
                border-[#D9C7B6]
                opacity-60
              " />

              {/* Icon */}

              <div className="
                relative
                w-[76px]
                h-[76px]
                rounded-full
                bg-[#8B5E3C]
                flex
                items-center
                justify-center
                shadow-[0_14px_35px_rgba(139,94,60,0.20)]
              ">

                <FaCheck className="text-white text-xl" />

              </div>

            </div>

          </div>


          {/* Label */}

          <p className="
            mt-10
            text-[9px]
            sm:text-[10px]
            uppercase
            tracking-[5px]
            font-bold
            text-[#8B5E3C]
          ">
            Order Confirmed
          </p>


          {/* Main heading */}

          <h1 className="
            mt-4
            text-[42px]
            sm:text-[52px]
            md:text-[60px]
            font-serif
            font-medium
            tracking-[-1.5px]
            text-[#463329]
            leading-[1.05]
          ">
            Thank you.
          </h1>


          {/* Elegant statement */}

          <p className="
            mt-4
            text-xl
            sm:text-2xl
            md:text-[28px]
            font-serif
            italic
            text-[#8B5E3C]
            leading-snug
          ">
            Something beautiful is being made for you.
          </p>


          {/* Divider */}

          <div className="flex items-center justify-center gap-4 mt-7">

            <span className="w-12 sm:w-20 h-px bg-[#D5C4B3]" />

            <span className="text-[#8B5E3C] text-[10px]">
              ✦
            </span>

            <span className="w-12 sm:w-20 h-px bg-[#D5C4B3]" />

          </div>


          <p className="
            max-w-lg
            mx-auto
            mt-6
            text-sm
            text-[#7B6D63]
            leading-7
          ">
            Your order has been successfully placed. We will carefully
            prepare your handcrafted pieces and keep you updated
            throughout their journey to your home.
          </p>

        </div>


        {/* =====================================================
            ORDER JOURNEY
        ===================================================== */}

        <div className="
          mt-14
          bg-white
          border
          border-[#E9DED4]
          rounded-[26px]
          shadow-[0_18px_55px_rgba(75,53,42,0.055)]
          px-5
          sm:px-8
          md:px-12
          py-8
          md:py-10
        ">

          {/* Header */}

          <div className="flex items-end justify-between gap-4 mb-9">

            <div>

              <p className="
                text-[9px]
                uppercase
                tracking-[3px]
                text-[#A58C77]
                font-semibold
              ">
                Your Order
              </p>

              <h2 className="
                text-xl
                md:text-2xl
                font-serif
                font-semibold
                text-[#463329]
                mt-1.5
              ">
                The journey begins
              </h2>

            </div>


            <span className="
              hidden
              sm:block
              text-[9px]
              uppercase
              tracking-[1.5px]
              text-[#8B5E3C]
              bg-[#F7F0E9]
              px-3
              py-2
              rounded-full
              font-bold
            ">
              Confirmed
            </span>

          </div>


          {/* Timeline */}

          <div className="relative">

            {/* Connecting line */}

            <div className="
              absolute
              left-[16.66%]
              right-[16.66%]
              top-5
              h-px
              bg-[#DCCFC3]
            " />


            <div className="grid grid-cols-3 gap-2">

              {/* STEP 1 */}

              <div className="relative z-10 text-center">

                <div className="flex justify-center">

                  <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-[#8B5E3C]
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-[0_7px_20px_rgba(139,94,60,0.18)]
                    ring-4
                    ring-white
                  ">
                    <FaCheck className="text-[10px]" />
                  </div>

                </div>

                <h3 className="
                  mt-4
                  text-xs
                  sm:text-sm
                  font-semibold
                  text-[#4B352A]
                ">
                  Order Placed
                </h3>

                <p className="
                  mt-1
                  text-[9px]
                  sm:text-[10px]
                  text-[#A19790]
                ">
                  Confirmed
                </p>

              </div>


              {/* STEP 2 */}

              <div className="relative z-10 text-center">

                <div className="flex justify-center">

                  <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-[#F5EEE7]
                    border
                    border-[#D8C8B9]
                    text-[#8B5E3C]
                    flex
                    items-center
                    justify-center
                    ring-4
                    ring-white
                  ">
                    <FaHeart className="text-[10px]" />
                  </div>

                </div>

                <h3 className="
                  mt-4
                  text-xs
                  sm:text-sm
                  font-semibold
                  text-[#4B352A]
                ">
                  Being Crafted
                </h3>

                <p className="
                  mt-1
                  text-[9px]
                  sm:text-[10px]
                  text-[#A19790]
                ">
                  Coming next
                </p>

              </div>


              {/* STEP 3 */}

              <div className="relative z-10 text-center">

                <div className="flex justify-center">

                  <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-[#F5EEE7]
                    border
                    border-[#D8C8B9]
                    text-[#8B5E3C]
                    flex
                    items-center
                    justify-center
                    ring-4
                    ring-white
                  ">
                    <FaTruck className="text-[10px]" />
                  </div>

                </div>

                <h3 className="
                  mt-4
                  text-xs
                  sm:text-sm
                  font-semibold
                  text-[#4B352A]
                ">
                  On Its Way
                </h3>

                <p className="
                  mt-1
                  text-[9px]
                  sm:text-[10px]
                  text-[#A19790]
                ">
                  We'll notify you
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            BRAND MESSAGE
        ===================================================== */}

        <div className="
          max-w-3xl
          mx-auto
          text-center
          mt-12
          md:mt-14
        ">

          <p className="
            text-[9px]
            uppercase
            tracking-[4px]
            font-bold
            text-[#A0846B]
          ">
            The RoKaShree Promise
          </p>

          <h3 className="
            mt-3
            text-2xl
            sm:text-3xl
            font-serif
            italic
            font-medium
            text-[#4B352A]
          ">
            Handmade with intention.
          </h3>

          <p className="
            max-w-xl
            mx-auto
            mt-3
            text-sm
            text-[#817269]
            leading-7
          ">
            Every piece is thoughtfully handcrafted with patience,
            care and attention to detail — made to bring warmth
            and beauty into your space.
          </p>

        </div>


        {/* =====================================================
            ACTIONS
        ===================================================== */}

        <div className="
          max-w-xl
          mx-auto
          grid
          sm:grid-cols-2
          gap-3
          mt-9
        ">

          {/* VIEW MY ORDER */}

          <Link
            to="/my-orders"
            className="
              group
              h-[52px]
              rounded-xl
              bg-[#8B5E3C]
              text-white
              flex
              items-center
              justify-center
              gap-2.5
              text-sm
              font-semibold
              shadow-[0_10px_25px_rgba(139,94,60,0.18)]
              hover:bg-[#6D472D]
              hover:-translate-y-0.5
              hover:shadow-[0_15px_30px_rgba(139,94,60,0.23)]
              transition-all
              duration-300
            "
          >

            <FaShoppingBag className="text-[10px]" />

            View My Order

            <span className="
              text-sm
              group-hover:translate-x-1
              transition-transform
            ">
              →
            </span>

          </Link>


          {/* CONTINUE SHOPPING */}

          <Link
            to="/shop"
            className="
              group
              h-[52px]
              rounded-xl
              bg-white
              border
              border-[#DCCFC2]
              text-[#6D5849]
              flex
              items-center
              justify-center
              gap-2.5
              text-sm
              font-semibold
              hover:border-[#8B5E3C]
              hover:text-[#8B5E3C]
              hover:-translate-y-0.5
              transition-all
              duration-300
            "
          >

            <FaShoppingBag className="text-[10px]" />

            Continue Shopping

          </Link>

        </div>


        {/* =====================================================
            HOME LINK
        ===================================================== */}

        <div className="text-center mt-6">

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              text-[#94857A]
              hover:text-[#8B5E3C]
              transition-colors
            "
          >

            <FaHome className="text-[9px]" />

            Back to RoKaShree Home

          </Link>

        </div>


        {/* =====================================================
            SUPPORT
        ===================================================== */}

        <div className="
          text-center
          mt-10
        ">

          <p className="
            text-[11px]
            text-[#9B8E85]
          ">
            Need help with your order?
            <span className="
              ml-1
              text-[#8B5E3C]
              font-semibold
            ">
              We're always here for you.
            </span>
          </p>

        </div>


        {/* =====================================================
            BRAND SIGNATURE
        ===================================================== */}

        <div className="
          text-center
          mt-12
          pt-7
          border-t
          border-[#E4D8CE]
        ">

          <p className="
            text-[9px]
            uppercase
            tracking-[5px]
            font-bold
            text-[#A58C77]
          ">
            RoKaShree
          </p>

          <p className="
            mt-2
            text-xs
            font-serif
            italic
            text-[#8B5E3C]
          ">
            Thoughtfully handcrafted. Beautifully made.
          </p>

          <div className="
            flex
            items-center
            justify-center
            gap-3
            mt-3
          ">

            <span className="w-6 h-px bg-[#D1BBA7]" />

            <span className="text-[#8B5E3C] text-[8px]">
              ✦
            </span>

            <span className="w-6 h-px bg-[#D1BBA7]" />

          </div>

        </div>

      </main>

    </section>
  );
}