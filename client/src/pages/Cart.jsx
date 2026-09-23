import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaHeart,
  FaRegHeart,
  FaTrashAlt,
  FaMinus,
  FaPlus,
  FaShieldAlt,
  FaTruck,
  FaArrowRight,
  FaLock,
} from "react-icons/fa";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const {
    wishlistItems,
    addToWishlist,
  } = useContext(WishlistContext);

  const ratings = [4.9, 4.8, 4.7, 5.0, 4.6];

  // =========================================================
  // SUBTOTAL
  // =========================================================

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(
      String(item.price)
        .replace("₹", "")
        .replace(/,/g, "")
    );

    return total + price * item.quantity;
  }, 0);

  return (
    <section className="min-h-screen bg-[#FAF7F3] text-[#4B352A]">

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8 md:pt-10 pb-20">

        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() => navigate("/shop")}
          aria-label="Back to shop"
          className="
            group
            w-10
            h-10
            rounded-full
            bg-white
            border
            border-[#E5D9CE]
            flex
            items-center
            justify-center
            text-[#8B5E3C]
            shadow-[0_4px_15px_rgba(75,53,42,0.05)]
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


        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="text-center max-w-3xl mx-auto mt-12">

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
            Shopping Bag
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
            Handcrafted pieces selected to bring warmth,
            texture and timeless beauty into your home.
          </p>

        </div>


        {/* =====================================================
            EMPTY CART
        ===================================================== */}

        {cartItems.length === 0 ? (

          <div
            className="
              max-w-2xl
              mx-auto
              mt-12
              bg-white
              border
              border-[#E6DDD4]
              rounded-[26px]
              px-6
              py-14
              md:py-16
              text-center
              shadow-[0_10px_35px_rgba(75,53,42,0.05)]
            "
          >

            <div
              className="
                w-14
                h-14
                mx-auto
                rounded-full
                bg-[#F3E8DC]
                flex
                items-center
                justify-center
                text-[#8B5E3C]
                text-xl
              "
            >
              ♡
            </div>


            <p
              className="
                uppercase
                tracking-[3px]
                text-[#8B5E3C]
                text-[9px]
                font-bold
                mt-6
              "
            >
              Your Collection Awaits
            </p>


            <h2
              className="
                font-serif
                text-2xl
                md:text-3xl
                font-semibold
                text-[#4B352A]
                mt-2
              "
            >
              Your Shopping Bag is Empty
            </h2>


            <p
              className="
                text-gray-500
                text-sm
                leading-6
                mt-3
                max-w-md
                mx-auto
              "
            >
              Discover handcrafted pieces created with
              patience, care and love.
            </p>


            <Link
              to="/shop"
              className="
                group
                inline-flex
                items-center
                gap-3
                mt-7
                bg-[#8B5E3C]
                hover:bg-[#6D472D]
                text-white
                px-7
                py-3
                rounded-full
                text-sm
                font-semibold
                shadow-[0_8px_22px_rgba(139,94,60,0.16)]
                hover:-translate-y-0.5
                transition-all
                duration-300
              "
            >
              Explore Collection

              <FaArrowRight
                className="
                  text-[9px]
                  group-hover:translate-x-1
                  transition-transform
                "
              />

            </Link>

          </div>

        ) : (

          /* =====================================================
             CART CONTENT
          ===================================================== */

          <div
            className="
              grid
              lg:grid-cols-[1.65fr_0.9fr]
              gap-8
              lg:gap-10
              items-start
              mt-12
            "
          >

            {/* =================================================
                LEFT — PRODUCTS
            ================================================= */}

            <div>

              {/* Selection heading */}

              <div
                className="
                  flex
                  items-end
                  justify-between
                  pb-4
                  border-b
                  border-[#E4D9CF]
                "
              >

                <div>

                  <p
                    className="
                      uppercase
                      tracking-[3px]
                      text-[#8B5E3C]
                      text-[9px]
                      font-bold
                    "
                  >
                    Your Selection
                  </p>

                  <h2
                    className="
                      font-serif
                      text-2xl
                      md:text-3xl
                      font-semibold
                      text-[#4B352A]
                      mt-1
                    "
                  >
                    Handcrafted Pieces
                  </h2>

                </div>


                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-[2px]
                    text-gray-400
                    font-semibold
                  "
                >
                  {cartItems.length}{" "}
                  {cartItems.length === 1 ? "Item" : "Items"}
                </span>

              </div>


              {/* Products */}

              <div className="space-y-4 mt-5">

                {cartItems.map((item, index) => {

                  const rating =
                    ratings[index % ratings.length];

                  const isWishlisted =
                    wishlistItems.some(
                      (wishlistItem) =>
                        wishlistItem.name === item.name
                    );

                  return (

                    <article
                      key={item.name}
                      className="
                        group
                        bg-white
                        border
                        border-[#E6DDD4]
                        rounded-[22px]
                        p-4
                        md:p-5
                        shadow-[0_7px_25px_rgba(75,53,42,0.045)]
                        hover:shadow-[0_14px_38px_rgba(75,53,42,0.08)]
                        transition-all
                        duration-400
                      "
                    >

                      <div
                        className="
                          flex
                          flex-col
                          sm:flex-row
                          gap-5
                        "
                      >

                        {/* =====================================
                            IMAGE
                        ===================================== */}

                        <div
                          className="
                            relative
                            w-full
                            sm:w-40
                            h-40
                            flex-shrink-0
                            rounded-[18px]
                            overflow-hidden
                            bg-[#F7F1EA]
                          "
                        >

                          <img
                            src={item.image}
                            alt={item.name}
                            className="
                              w-full
                              h-full
                              object-cover
                              group-hover:scale-[1.035]
                              transition-transform
                              duration-700
                            "
                          />


                          <div
                            className="
                              absolute
                              bottom-2.5
                              left-2.5
                              bg-white/95
                              backdrop-blur-sm
                              rounded-full
                              px-2.5
                              py-1
                              text-[8px]
                              uppercase
                              tracking-[1.5px]
                              text-[#8B5E3C]
                              font-bold
                            "
                          >
                            Handmade
                          </div>

                        </div>


                        {/* =====================================
                            INFORMATION
                        ===================================== */}

                        <div className="flex-1 min-w-0">

                          <div
                            className="
                              flex
                              items-start
                              justify-between
                              gap-4
                            "
                          >

                            <div className="min-w-0">

                              <p
                                className="
                                  text-[8px]
                                  uppercase
                                  tracking-[2.5px]
                                  text-[#A48A75]
                                  font-bold
                                "
                              >
                                RoKaShree Collection
                              </p>


                              <h3
                                className="
                                  font-serif
                                  text-xl
                                  font-semibold
                                  text-[#4B352A]
                                  mt-1.5
                                  leading-snug
                                "
                              >
                                {item.name}
                              </h3>


                              {/* Rating */}

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  mt-2.5
                                "
                              >

                                <div className="flex gap-0.5">

                                  {[...Array(5)].map(
                                    (_, starIndex) => (

                                      <span
                                        key={starIndex}
                                        className="
                                          text-[#B8895A]
                                          text-[9px]
                                        "
                                      >
                                        ★
                                      </span>

                                    )
                                  )}

                                </div>

                                <span className="text-[10px] text-gray-400">
                                  {rating}
                                </span>

                              </div>

                            </div>


                            {/* Price */}

                            <div className="text-right flex-shrink-0">

                              <p
                                className="
                                  text-xl
                                  md:text-2xl
                                  font-bold
                                  text-[#8B5E3C]
                                "
                              >
                                {item.price}
                              </p>

                              <p
                                className="
                                  text-[9px]
                                  text-gray-400
                                  mt-0.5
                                "
                              >
                                per piece
                              </p>

                            </div>

                          </div>


                          {/* Stock */}

                          <div className="mt-3">

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                bg-[#EFF6ED]
                                text-[#4F7747]
                                rounded-full
                                px-2.5
                                py-1
                                text-[9px]
                                font-semibold
                              "
                            >

                              <span
                                className="
                                  w-1.5
                                  h-1.5
                                  rounded-full
                                  bg-[#6D9A63]
                                "
                              />

                              In Stock

                            </span>

                          </div>


                          {/* =====================================
                              ACTION ROW
                          ===================================== */}

                          <div
                            className="
                              flex
                              flex-wrap
                              items-center
                              justify-between
                              gap-4
                              mt-5
                              pt-4
                              border-t
                              border-[#EEE5DC]
                            "
                          >

                            {/* Quantity */}

                            <div>

                              <p
                                className="
                                  text-[8px]
                                  uppercase
                                  tracking-[2px]
                                  text-gray-400
                                  font-bold
                                  mb-1.5
                                "
                              >
                                Quantity
                              </p>


                              <div
                                className="
                                  flex
                                  items-center
                                  h-9
                                  bg-[#FBF8F4]
                                  border
                                  border-[#E4D8CC]
                                  rounded-full
                                  overflow-hidden
                                "
                              >

                                <button
                                  type="button"
                                  onClick={() =>
                                    decreaseQuantity(item.name)
                                  }
                                  className="
                                    w-9
                                    h-9
                                    flex
                                    items-center
                                    justify-center
                                    text-[#8B5E3C]
                                    hover:bg-[#F1E7DC]
                                    transition
                                  "
                                >
                                  <FaMinus className="text-[9px]" />
                                </button>


                                <span
                                  className="
                                    w-8
                                    text-center
                                    text-xs
                                    font-bold
                                    text-[#4B352A]
                                  "
                                >
                                  {item.quantity}
                                </span>


                                <button
                                  type="button"
                                  onClick={() =>
                                    increaseQuantity(item.name)
                                  }
                                  className="
                                    w-9
                                    h-9
                                    flex
                                    items-center
                                    justify-center
                                    text-[#8B5E3C]
                                    hover:bg-[#F1E7DC]
                                    transition
                                  "
                                >
                                  <FaPlus className="text-[9px]" />
                                </button>

                              </div>

                            </div>


                            {/* Actions */}

                            <div className="flex items-center gap-4">

                              <button
                                type="button"
                                onClick={() =>
                                  addToWishlist(item)
                                }
                                className="
                                  flex
                                  items-center
                                  gap-1.5
                                  text-[10px]
                                  font-semibold
                                  text-[#8B5E3C]
                                  hover:text-red-500
                                  transition
                                "
                              >

                                {isWishlisted ? (
                                  <FaHeart className="text-red-500" />
                                ) : (
                                  <FaRegHeart />
                                )}

                                Wishlist

                              </button>


                              <button
                                type="button"
                                onClick={() =>
                                  removeFromCart(item.name)
                                }
                                className="
                                  flex
                                  items-center
                                  gap-1.5
                                  text-[10px]
                                  font-semibold
                                  text-gray-400
                                  hover:text-red-500
                                  transition
                                "
                              >

                                <FaTrashAlt />

                                Remove

                              </button>

                            </div>

                          </div>

                        </div>

                      </div>

                    </article>

                  );
                })}

              </div>

            </div>


            {/* =================================================
                RIGHT — ORDER SUMMARY
            ================================================= */}

            <aside className="lg:sticky lg:top-24">

              <div
                className="
                  bg-white
                  border
                  border-[#E4D8CC]
                  rounded-[24px]
                  p-6
                  md:p-7
                  shadow-[0_10px_35px_rgba(75,53,42,0.06)]
                "
              >

                {/* Summary header */}

                <div>

                  <p
                    className="
                      uppercase
                      tracking-[3px]
                      text-[#8B5E3C]
                      text-[9px]
                      font-bold
                    "
                  >
                    Your Order
                  </p>


                  <h2
                    className="
                      font-serif
                      text-2xl
                      md:text-3xl
                      font-semibold
                      text-[#4B352A]
                      mt-1.5
                    "
                  >
                    Order Summary
                  </h2>

                </div>


                {/* Price details */}

                <div className="mt-7 space-y-4">

                  <div className="flex justify-between items-center">

                    <span className="text-sm text-gray-500">
                      Subtotal
                    </span>

                    <span className="text-sm font-semibold text-[#4B352A]">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>

                  </div>


                  <div className="flex justify-between items-center">

                    <span className="text-sm text-gray-500">
                      Shipping
                    </span>

                    <span className="text-xs font-bold text-[#5D8A55]">
                      FREE
                    </span>

                  </div>


                  <div className="flex justify-between items-center">

                    <span className="text-sm text-gray-500">
                      Estimated Delivery
                    </span>

                    <span className="text-xs font-medium text-[#4B352A]">
                      3–5 Days
                    </span>

                  </div>

                </div>


                {/* Divider */}

                <div className="h-px bg-[#EDE3DA] my-6" />


                {/* Total */}

                <div className="flex items-end justify-between">

                  <div>

                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[2px]
                        text-gray-400
                        font-bold
                      "
                    >
                      Total
                    </p>

                    <p
                      className="
                        font-serif
                        text-lg
                        font-semibold
                        text-[#4B352A]
                        mt-0.5
                      "
                    >
                      Grand Total
                    </p>

                  </div>


                  <span
                    className="
                      text-2xl
                      font-bold
                      text-[#8B5E3C]
                    "
                  >
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>

                </div>


                {/* Checkout */}

                <button
                  type="button"
                  onClick={() => navigate("/checkout")}
                  className="
                    group
                    w-full
                    mt-7
                    bg-[#8B5E3C]
                    hover:bg-[#6D472D]
                    text-white
                    py-3.5
                    rounded-xl
                    font-semibold
                    text-sm
                    flex
                    items-center
                    justify-center
                    gap-2
                    shadow-[0_8px_22px_rgba(139,94,60,0.16)]
                    hover:-translate-y-0.5
                    transition-all
                    duration-300
                  "
                >

                  Proceed to Checkout

                  <FaArrowRight
                    className="
                      text-[9px]
                      group-hover:translate-x-1
                      transition-transform
                    "
                  />

                </button>


                {/* Secure checkout */}

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    mt-4
                    text-[9px]
                    text-gray-400
                  "
                >

                  <FaLock className="text-[#8B5E3C]" />

                  Secure & protected checkout

                </div>


                {/* Trust */}

                <div
                  className="
                    mt-6
                    pt-5
                    border-t
                    border-[#EEE5DC]
                    space-y-3
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-8
                        h-8
                        rounded-full
                        bg-[#F3E8DC]
                        flex
                        items-center
                        justify-center
                        text-[#8B5E3C]
                        text-xs
                      "
                    >
                      <FaShieldAlt />
                    </div>

                    <div>

                      <p className="text-[10px] font-bold text-[#4B352A]">
                        Secure Checkout
                      </p>

                      <p className="text-[9px] text-gray-400 mt-0.5">
                        Safe & protected payment
                      </p>

                    </div>

                  </div>


                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-8
                        h-8
                        rounded-full
                        bg-[#F3E8DC]
                        flex
                        items-center
                        justify-center
                        text-[#8B5E3C]
                        text-xs
                      "
                    >
                      <FaTruck />
                    </div>

                    <div>

                      <p className="text-[10px] font-bold text-[#4B352A]">
                        Free Shipping
                      </p>

                      <p className="text-[9px] text-gray-400 mt-0.5">
                        Across India
                      </p>

                    </div>

                  </div>

                </div>


                <p
                  className="
                    text-center
                    font-serif
                    italic
                    text-sm
                    text-[#8B5E3C]
                    mt-5
                  "
                >
                  Handmade with love for your home.
                </p>

              </div>

            </aside>

          </div>

        )}


        {/* =====================================================
            BOTTOM BRAND MESSAGE
        ===================================================== */}

        {cartItems.length > 0 && (

          <div className="mt-14 text-center">

            <div className="flex items-center justify-center gap-3">

              <span className="w-8 h-px bg-[#D8C6B5]" />

              <span className="text-[#8B5E3C] text-xs">
                ✦
              </span>

              <span className="w-8 h-px bg-[#D8C6B5]" />

            </div>


            <p
              className="
                font-serif
                text-lg
                italic
                text-[#8B5E3C]
                mt-4
              "
            >
              Thoughtfully handcrafted. Beautifully made.
            </p>


            <p
              className="
                text-[9px]
                uppercase
                tracking-[3px]
                text-[#A48A75]
                mt-2
                font-semibold
              "
            >
              The RoKaShree Promise
            </p>

          </div>

        )}

      </div>

    </section>
  );
}