import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { WishlistContext } from "../context/WishlistContext";

import {
  FaArrowLeft,
  FaTimes,
  FaHeart,
  FaStar,
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";

export default function Wishlist() {
  const navigate = useNavigate();

  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);

  return (
    <section className="min-h-screen bg-[#FAF7F3] text-[#4B352A]">

      {/* =====================================================
          PAGE
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-10 pb-20">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

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


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="max-w-3xl mx-auto text-center mt-12">

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
            Saved Collection
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
            My Wishlist
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
            Keep the pieces you love close and return to them
            whenever you're ready.
          </p>

        </div>


        {/* =================================================
            WISHLIST COUNT
        ================================================= */}

        <div className="flex justify-center mt-7">

          <div
            className="
              inline-flex
              items-center
              gap-2
              bg-[#F1E7DC]
              border
              border-[#E4D4C5]
              rounded-full
              px-4
              py-2
              text-[#8B5E3C]
              text-[10px]
              font-semibold
              tracking-wide
            "
          >

            <FaHeart className="text-[9px]" />

            {wishlistItems.length}{" "}
            {wishlistItems.length === 1
              ? "Saved Piece"
              : "Saved Pieces"}

          </div>

        </div>


        {/* =================================================
            EMPTY WISHLIST
        ================================================= */}

        {wishlistItems.length === 0 ? (

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

            {/* Icon */}

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
              "
            >
              <FaHeart className="text-lg" />
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
              Your Collection
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
              Your Wishlist is Empty
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
              Discover handcrafted pieces and save the ones
              that feel perfect for your home.
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
                px-6
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

          /* =================================================
             WISHLIST PRODUCTS
          ================================================= */

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
              mt-12
            "
          >

            {wishlistItems.map((item) => (

              <article
                key={item.name}
                className="
                  group
                  bg-white
                  border
                  border-[#E6DDD4]
                  rounded-[22px]
                  overflow-hidden
                  shadow-[0_7px_25px_rgba(75,53,42,0.045)]
                  hover:-translate-y-1
                  hover:shadow-[0_15px_40px_rgba(75,53,42,0.09)]
                  transition-all
                  duration-400
                "
              >

                {/* =================================================
                    IMAGE
                ================================================= */}

                <div
                  className="
                    relative
                    overflow-hidden
                    bg-[#F6F0E9]
                  "
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-full
                      h-[260px]
                      sm:h-[270px]
                      object-cover
                      group-hover:scale-[1.035]
                      transition-transform
                      duration-700
                    "
                  />


                  {/* Subtle image overlay */}

                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#3E2C23]/10
                      via-transparent
                      to-transparent
                      pointer-events-none
                    "
                  />


                  {/* Handmade */}

                  <div
                    className="
                      absolute
                      bottom-3
                      left-3
                      bg-white/95
                      backdrop-blur-sm
                      border
                      border-white
                      rounded-full
                      px-3
                      py-1.5
                      text-[9px]
                      uppercase
                      tracking-[2px]
                      font-bold
                      text-[#8B5E3C]
                    "
                  >
                    Handmade
                  </div>


                  {/* Remove */}

                  <button
                    type="button"
                    onClick={() =>
                      removeFromWishlist(item.name)
                    }
                    aria-label={`Remove ${item.name} from wishlist`}
                    className="
                      absolute
                      top-3
                      right-3
                      w-9
                      h-9
                      rounded-full
                      bg-white/95
                      backdrop-blur-sm
                      border
                      border-white
                      flex
                      items-center
                      justify-center
                      text-[#6D5A4E]
                      shadow-sm
                      hover:bg-[#8B5E3C]
                      hover:text-white
                      hover:border-[#8B5E3C]
                      transition-all
                      duration-300
                    "
                  >
                    <FaTimes className="text-xs" />
                  </button>

                </div>


                {/* =================================================
                    PRODUCT INFORMATION
                ================================================= */}

                <div className="p-5">

                  <p
                    className="
                      uppercase
                      tracking-[2.5px]
                      text-[#A48A75]
                      text-[8px]
                      font-bold
                    "
                  >
                    RoKaShree Collection
                  </p>


                  <h2
                    className="
                      font-serif
                      text-xl
                      font-semibold
                      text-[#4B352A]
                      mt-2
                      leading-snug
                    "
                  >
                    {item.name}
                  </h2>


                  {/* Rating */}

                  <div className="flex items-center gap-2 mt-3">

                    <div className="flex gap-0.5">

                      {[...Array(5)].map((_, index) => (

                        <FaStar
                          key={index}
                          className="text-[#B8895A] text-[9px]"
                        />

                      ))}

                    </div>


                    <span className="text-[10px] font-semibold text-[#5E514A]">
                      4.9
                    </span>

                  </div>


                  {/* Price */}

                  <div className="flex items-center gap-2 mt-4">

                    <p
                      className="
                        text-lg
                        font-bold
                        text-[#8B5E3C]
                      "
                    >
                      {item.price}
                    </p>


                    <p
                      className="
                        text-xs
                        text-gray-400
                        line-through
                      "
                    >
                      ₹1699
                    </p>

                  </div>


                  {/* Details */}

                  <div
                    className="
                      mt-4
                      pt-4
                      border-t
                      border-[#EEE5DC]
                    "
                  >

                    <p className="text-[10px] text-gray-500">
                      ✦ Premium cotton craftsmanship
                    </p>

                    <p className="text-[10px] text-gray-500 mt-1.5">
                      ✦ Handmade with care in India
                    </p>

                  </div>


                  {/* =================================================
                      VIEW PRODUCT
                  ================================================= */}

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/product", {
                        state: {
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          image: item.image,
                        },
                      })
                    }
                    className="
                      group/button
                      w-full
                      mt-5
                      bg-[#8B5E3C]
                      hover:bg-[#6D472D]
                      text-white
                      py-3
                      rounded-xl
                      font-semibold
                      text-xs
                      flex
                      items-center
                      justify-center
                      gap-2
                      shadow-[0_7px_18px_rgba(139,94,60,0.15)]
                      hover:-translate-y-0.5
                      transition-all
                      duration-300
                    "
                  >

                    <FaShoppingBag className="text-[9px]" />

                    View Product

                    <FaArrowRight
                      className="
                        text-[8px]
                        group-hover/button:translate-x-1
                        transition-transform
                      "
                    />

                  </button>

                </div>

              </article>

            ))}

          </div>

        )}


        {/* =================================================
            BOTTOM BRAND STATEMENT
        ================================================= */}

        {wishlistItems.length > 0 && (

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
              Beautiful things are worth keeping close.
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
              Handmade • Thoughtful • Timeless
            </p>

          </div>

        )}

      </div>

    </section>
  );
}