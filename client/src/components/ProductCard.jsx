import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";

import {
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaStar,
  FaShoppingBag,
} from "react-icons/fa";

import { toast5 } from "../utils/toast";

export default function ProductCard({
  id,
  name,
  price,
  image,
}) {
  const { addToCart } = useContext(CartContext);

  const {
    wishlistItems,
    addToWishlist,
  } = useContext(WishlistContext);

  const isWishlisted = wishlistItems.some(
    (item) => item.name === name
  );

  // ==============================
  // SHARE PRODUCT
  // ==============================

  const handleShare = async () => {
    const shareUrl =
      `${window.location.origin}/product?id=${id}`;

    const shareData = {
      title: name,
      text: `Discover this beautiful handmade ${name} from RoKaShree.`,
      url: shareUrl,
    };

    // =========================================================
    // MOBILE / DESKTOP SHARE
    // =========================================================

    try {
      // Use the native Android/iPhone share sheet when available.
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
      ) {
        await navigator.share(shareData);
        return;
      }
    } catch (error) {
      // Closing the native share sheet is not an error.
      if (error?.name === "AbortError") {
        return;
      }

      console.warn(
        "Native share failed. Trying copy fallback...",
        error
      );
    }

    // =========================================================
    // COPY LINK FALLBACK
    // Works even when Clipboard API is unavailable on HTTP/LAN.
    // =========================================================

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(shareUrl);

        toast5.success("Product link copied!");
        return;
      }

      // Older/mobile browser fallback.
      const textArea =
        document.createElement("textarea");

      textArea.value = shareUrl;

      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      textArea.style.width = "1px";
      textArea.style.height = "1px";
      textArea.style.opacity = "0";
      textArea.style.pointerEvents = "none";

      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(
        0,
        textArea.value.length
      );

      const copied =
        document.execCommand("copy");

      document.body.removeChild(textArea);

      if (copied) {
        toast5.success("Product link copied!");
        return;
      }

      throw new Error("Copy command failed");
    } catch (error) {
      console.error(
        "Product link copy failed:",
        error
      );

      toast5.error(
        "Unable to copy product link"
      );
    }
  };

  // ==============================
  // ADD TO CART
  // ==============================

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
    });

    toast5.success("Added to Cart");
  };

  return (
    <div
      className="
        group
        relative
        bg-white
        rounded-[20px]
        sm:rounded-[26px]
        lg:rounded-[30px]
        overflow-hidden
        border
        border-[#EDE2D5]
        shadow-[0_8px_25px_rgba(75,53,42,0.07)]
        hover:shadow-[0_20px_55px_rgba(75,53,42,0.14)]
        hover:-translate-y-1
        lg:hover:-translate-y-2
        transition-all
        duration-500
      "
    >

      {/* =========================================
          BESTSELLER BADGE
      ========================================= */}

      <div
        className="
          absolute
          top-3
          left-3
          sm:top-4
          sm:left-4
          lg:top-5
          lg:left-5
          z-20
          bg-[#8B5E3C]
          text-white
          text-[8px]
          sm:text-[10px]
          lg:text-[11px]
          uppercase
          tracking-[1px]
          sm:tracking-[1.5px]
          font-semibold
          px-2.5
          py-1.5
          sm:px-3
          sm:py-2
          lg:px-4
          rounded-full
          shadow-[0_6px_16px_rgba(75,53,42,0.16)]
        "
      >
        Bestseller
      </div>


      {/* =========================================
          WISHLIST + SHARE
      ========================================= */}

      <div
        className="
          absolute
          top-3
          right-3
          sm:top-4
          sm:right-4
          lg:top-5
          lg:right-5
          z-20
          flex
          flex-col
          gap-2
          sm:gap-2.5
          lg:gap-3
        "
      >

        {/* Wishlist */}

        <button
          type="button"
          onClick={() =>
            addToWishlist({
              id,
              name,
              price,
              image,
            })
          }
          className="
            w-8
            h-8
            sm:w-10
            sm:h-10
            lg:w-11
            lg:h-11
            rounded-full
            bg-white/95
            backdrop-blur-sm
            flex
            items-center
            justify-center
            shadow-[0_6px_16px_rgba(0,0,0,0.12)]
            hover:scale-110
            hover:bg-white
            transition-all
            duration-300
          "
          aria-label="Add to wishlist"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500 text-sm sm:text-base lg:text-lg" />
          ) : (
            <FaRegHeart className="text-[#4B352A] text-sm sm:text-base lg:text-lg" />
          )}
        </button>


        {/* Share */}

        <button
          type="button"
          onClick={handleShare}
          className="
            w-8
            h-8
            sm:w-10
            sm:h-10
            lg:w-11
            lg:h-11
            rounded-full
            bg-white/95
            backdrop-blur-sm
            flex
            items-center
            justify-center
            shadow-[0_6px_16px_rgba(0,0,0,0.12)]
            hover:scale-110
            hover:bg-white
            transition-all
            duration-300
          "
          aria-label="Share product"
        >
          <FaShareAlt className="text-[#4B352A] text-[11px] sm:text-xs lg:text-sm" />
        </button>

      </div>


      {/* =========================================
          PRODUCT IMAGE
      ========================================= */}

      <Link
        to="/product"
        state={{
          id,
          name,
          price,
          image,
        }}
      >

        <div className="relative overflow-hidden bg-[#F5EEE7]">

          <img
            src={image}
            alt={name}
            className="
              w-full
              h-[220px]
              sm:h-[270px]
              md:h-[300px]
              lg:h-[330px]
              object-cover
              group-hover:scale-105
              transition-transform
              duration-700
            "
          />

          {/* Image Overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/15
              via-transparent
              to-transparent
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-500
            "
          />

        </div>

      </Link>


      {/* =========================================
          PRODUCT INFORMATION
      ========================================= */}

      <div className="p-3.5 sm:p-5 lg:p-6">

        {/* Small Category Label */}

        <p
          className="
            text-[8px]
            sm:text-[10px]
            lg:text-[11px]
            uppercase
            tracking-[1.5px]
            sm:tracking-[2px]
            lg:tracking-[2.5px]
            text-[#8B5E3C]
            font-semibold
          "
        >
          Handcrafted Collection
        </p>


        {/* Product Name */}

        <Link
          to="/product"
          state={{
            id,
            name,
            price,
            image,
          }}
        >

          <h3
            className="
              text-[15px]
              sm:text-lg
              lg:text-xl
              font-bold
              text-[#4B352A]
              mt-1.5
              sm:mt-2
              leading-snug
              hover:text-[#8B5E3C]
              transition-colors
              duration-300
              line-clamp-2
            "
          >
            {name}
          </h3>

        </Link>


        {/* =========================================
            RATING
        ========================================= */}

        <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">

          <div className="flex items-center gap-0.5 sm:gap-1">

            <FaStar className="text-[#C89B5A] text-[10px] sm:text-xs lg:text-sm" />
            <FaStar className="text-[#C89B5A] text-[10px] sm:text-xs lg:text-sm" />
            <FaStar className="text-[#C89B5A] text-[10px] sm:text-xs lg:text-sm" />
            <FaStar className="text-[#C89B5A] text-[10px] sm:text-xs lg:text-sm" />
            <FaStar className="text-[#C89B5A] text-[10px] sm:text-xs lg:text-sm" />

          </div>

          <span className="text-[10px] sm:text-xs lg:text-sm font-semibold text-[#4B352A]">
            4.9
          </span>

          <span className="hidden sm:inline text-xs text-gray-400">
            (128 reviews)
          </span>

        </div>


        {/* =========================================
            PRICE
        ========================================= */}

        <div className="flex flex-wrap items-end gap-2 sm:gap-3 mt-3 sm:mt-5">

          <span
            className="
              text-lg
              sm:text-xl
              lg:text-2xl
              font-bold
              text-[#8B5E3C]
            "
          >
            {price}
          </span>

          <span
            className="
              text-[10px]
              sm:text-xs
              lg:text-sm
              text-gray-400
              line-through
              mb-0.5
              sm:mb-1
            "
          >
            ₹1699
          </span>

          <span
            className="
              text-[8px]
              sm:text-[9px]
              lg:text-[10px]
              uppercase
              tracking-[0.5px]
              sm:tracking-[1px]
              font-bold
              text-green-700
              bg-green-50
              px-1.5
              sm:px-2
              py-0.5
              sm:py-1
              rounded-full
              mb-0.5
              sm:mb-1
            "
          >
            Save
          </span>

        </div>


        {/* =========================================
            PREMIUM INFORMATION
        ========================================= */}

        <div
          className="
            mt-3
            sm:mt-5
            pt-3
            sm:pt-5
            border-t
            border-[#EEE4D8]
            space-y-1.5
            sm:space-y-2
          "
        >

          <div className="flex items-center gap-1.5 sm:gap-2">

            <span className="text-[#8B5E3C] text-xs sm:text-sm">
              ✦
            </span>

            <span className="text-[9px] sm:text-[11px] lg:text-xs text-gray-500">
              Premium cotton craftsmanship
            </span>

          </div>


          <div className="flex items-center gap-1.5 sm:gap-2">

            <span className="text-[#8B5E3C] text-xs sm:text-sm">
              ✦
            </span>

            <span className="text-[9px] sm:text-[11px] lg:text-xs text-gray-500">
              Handmade with care in India
            </span>

          </div>

        </div>


        {/* =========================================
            ADD TO CART
        ========================================= */}

        <button
          type="button"
          onClick={handleAddToCart}
          className="
            w-full
            mt-4
            sm:mt-5
            lg:mt-6
            bg-[#8B5E3C]
            hover:bg-[#6D472D]
            text-white
            py-2.5
            sm:py-3
            lg:py-3.5
            rounded-full
            text-xs
            sm:text-sm
            lg:text-base
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            sm:gap-3
            shadow-[0_8px_20px_rgba(139,94,60,0.20)]
            hover:shadow-[0_14px_30px_rgba(139,94,60,0.28)]
            hover:-translate-y-0.5
            transition-all
            duration-300
          "
        >

          <FaShoppingBag className="text-[10px] sm:text-xs lg:text-sm" />

          Add to Cart

        </button>


        {/* =========================================
            VIEW DETAILS
        ========================================= */}

        <Link
          to="/product"
          state={{
            id,
            name,
            price,
            image,
          }}
          className="block"
        >

          <button
            type="button"
            className="
              w-full
              mt-2
              sm:mt-3
              border
              border-[#CDB7A3]
              text-[#8B5E3C]
              py-2.5
              sm:py-3
              rounded-full
              text-xs
              sm:text-sm
              lg:text-base
              font-semibold
              hover:bg-[#F8F3ED]
              hover:border-[#8B5E3C]
              transition-all
              duration-300
            "
          >
            View Details
          </button>

        </Link>

      </div>

    </div>
  );
}