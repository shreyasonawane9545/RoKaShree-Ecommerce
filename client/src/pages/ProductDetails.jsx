import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useContext, useMemo, useState } from "react";

import ProductCard from "../components/ProductCard";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

import products from "../data/products";

import { toast5 } from "../utils/toast";

import {
  FaHeart,
  FaRegHeart,
  FaTruck,
  FaShieldAlt,
  FaLeaf,
  FaUndoAlt,
  FaMinus,
  FaPlus,
  FaBolt,
  FaStar,
  FaHandSparkles,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";

export default function ProductDetails() {
  const { state } = useLocation();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const productName = searchParams.get("name");

  const productFromUrl = products.find(
    (item) => item.name === productName
  );

  const product = productFromUrl || state || products[0];

  const { addToCart } = useContext(CartContext);

  const {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlistItems.some(
    (item) => item.name === product.name
  );

  // =========================================================
  // WISHLIST
  // =========================================================

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.name);
    } else {
      addToWishlist(product);
    }
  };

  // =========================================================
  // RELATED PRODUCTS
  // =========================================================

  const relatedProducts = useMemo(() => {
    const sameCategory = products.filter(
      (item) =>
        item.category === product.category &&
        item.name !== product.name
    );

    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4);
    }

    return products
      .filter((item) => item.name !== product.name)
      .slice(0, 4);
  }, [product]);

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    toast5.success("Added to Cart");
  };

  // =========================================================
  // BUY NOW
  // =========================================================

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
    });

    navigate("/checkout");
  };

  return (
    <section className="min-h-screen bg-[#F8F4EF] text-[#4B352A]">

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div
        className="
          max-w-[1400px]
          mx-auto
          px-4
          sm:px-6
          lg:px-10
          xl:px-12
          py-6
          sm:py-8
          lg:py-10
        "
      >

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <div className="mb-6 sm:mb-8">

          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="
              group
              w-9
              h-9
              sm:w-10
              sm:h-10
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
            <FaArrowLeft className="text-[11px]" />
          </button>

        </div>


        {/* =====================================================
            PREMIUM PRODUCT HERO
        ===================================================== */}

        <div
          className="
            bg-white
            border
            border-[#E7DDD2]
            rounded-[22px]
            sm:rounded-[26px]
            lg:rounded-[30px]
            p-3
            sm:p-5
            lg:p-7
            shadow-[0_18px_60px_rgba(75,53,42,0.07)]
          "
        >

          {/* =========================================
              TOP PRODUCT AREA
          ========================================= */}

          <div
            className="
              grid
              lg:grid-cols-[0.78fr_1.22fr]
              gap-6
              lg:gap-10
              xl:gap-12
              items-center
            "
          >

            {/* =========================================
                LEFT — PRODUCT IMAGE
            ========================================= */}

            <div>

              <div
                className="
                  relative
                  bg-[#FAF7F3]
                  border
                  border-[#E8DED3]
                  rounded-[20px]
                  overflow-hidden
                  flex
                  items-center
                  justify-center
                  h-[280px]
                  sm:h-[340px]
                  lg:h-[390px]
                  xl:h-[420px]
                "
              >

                {/* Bestseller */}

                <div
                  className="
                    absolute
                    top-3
                    left-3
                    sm:top-4
                    sm:left-4
                    z-10
                    bg-[#8B5E3C]
                    text-white
                    px-2.5
                    py-1.5
                    sm:px-3
                    sm:py-1.5
                    rounded-full
                    text-[8px]
                    sm:text-[9px]
                    uppercase
                    tracking-[1.3px]
                    font-semibold
                    shadow-[0_6px_18px_rgba(75,53,42,0.15)]
                  "
                >
                  Bestseller
                </div>


                {/* Product Image */}

                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    w-full
                    h-full
                    object-contain
                    transition-transform
                    duration-700
                    hover:scale-[1.02]
                  "
                />
              </div>

            </div>


            {/* =========================================
                RIGHT — PRODUCT INFORMATION
            ========================================= */}

            <div className="relative">

              {/* Wishlist */}

              <button
                type="button"
                onClick={handleWishlist}
                aria-label="Add to wishlist"
                className="
                  absolute
                  top-0
                  right-0
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-[#8B5E3C]
                  hover:bg-[#F8F3ED]
                  transition-all
                  duration-300
                "
              >
                {isWishlisted ? (
                  <FaHeart className="text-red-500 text-base sm:text-lg" />
                ) : (
                  <FaRegHeart className="text-base sm:text-lg" />
                )}
              </button>


              {/* Collection */}

              <div className="flex items-center gap-2.5">

                <span className="w-7 h-px bg-[#8B5E3C]" />

                <p
                  className="
                    text-[8px]
                    sm:text-[9px]
                    uppercase
                    tracking-[2.5px]
                    sm:tracking-[3px]
                    text-[#8B5E3C]
                    font-bold
                  "
                >
                  RoKaShree Collection
                </p>

              </div>


              {/* Product Name */}

              <h1
                className="
                  mt-3
                  pr-10
                  text-2xl
                  sm:text-3xl
                  lg:text-[40px]
                  xl:text-[44px]
                  font-serif
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.5px]
                  text-[#402E25]
                "
              >
                {product.name}
              </h1>


              {/* Rating */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  sm:gap-2.5
                  mt-3
                "
              >

                <div className="flex gap-0.5 text-[#C99554]">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className="text-[10px] sm:text-[11px]"
                    />
                  ))}

                </div>

                <span className="text-xs font-semibold text-[#5E514A]">
                  4.9
                </span>

                <span className="text-[#C9B9AB]">
                  •
                </span>

                <span className="text-[10px] sm:text-xs text-[#8A7B70]">
                  248 Reviews
                </span>

              </div>


              {/* Divider */}

              <div className="w-full h-px bg-[#E8DDD3] mt-4 sm:mt-5" />


              {/* Price */}

              <div
                className="
                  flex
                  items-center
                  flex-wrap
                  gap-2.5
                  sm:gap-3
                  mt-4
                  sm:mt-5
                "
              >

                <span
                  className="
                    text-2xl
                    sm:text-3xl
                    lg:text-[34px]
                    font-semibold
                    text-[#8B5E3C]
                  "
                >
                  {product.price}
                </span>

                <span
                  className="
                    text-xs
                    sm:text-sm
                    text-[#A99A8F]
                    line-through
                  "
                >
                  ₹1,699
                </span>

                <span
                  className="
                    text-[8px]
                    sm:text-[9px]
                    uppercase
                    tracking-[1px]
                    font-bold
                    text-[#667653]
                    bg-[#EEF3E9]
                    px-2
                    sm:px-2.5
                    py-1
                    rounded-full
                  "
                >
                  Save 24%
                </span>

              </div>


              {/* Description */}

              <p
                className="
                  mt-3
                  sm:mt-4
                  text-xs
                  sm:text-sm
                  leading-6
                  text-[#6C6058]
                  max-w-2xl
                "
              >
                Beautiful handcrafted macrame décor made using
                premium cotton rope. Every piece is carefully
                handmade to bring warmth, texture and timeless
                elegance into your living space.
              </p>


              {/* Product Highlights */}

              <div
                className="
                  grid
                  grid-cols-2
                  xl:grid-cols-3
                  gap-2
                  sm:gap-2.5
                  mt-4
                  sm:mt-5
                "
              >

                {/* Material */}

                <div
                  className="
                    border
                    border-[#E5D9CE]
                    bg-white
                    rounded-xl
                    px-3
                    py-2.5
                    sm:py-3
                  "
                >

                  <FaLeaf className="text-[#8B5E3C] text-xs sm:text-sm mb-1.5 sm:mb-2" />

                  <p
                    className="
                      text-[8px]
                      sm:text-[9px]
                      uppercase
                      tracking-[1.3px]
                      text-[#A09287]
                    "
                  >
                    Material
                  </p>

                  <p className="text-[11px] sm:text-xs font-semibold mt-1">
                    Premium Cotton
                  </p>

                </div>


                {/* Finish */}

                <div
                  className="
                    border
                    border-[#E5D9CE]
                    bg-white
                    rounded-xl
                    px-3
                    py-2.5
                    sm:py-3
                  "
                >

                  <FaHandSparkles className="text-[#8B5E3C] text-xs sm:text-sm mb-1.5 sm:mb-2" />

                  <p
                    className="
                      text-[8px]
                      sm:text-[9px]
                      uppercase
                      tracking-[1.3px]
                      text-[#A09287]
                    "
                  >
                    Finish
                  </p>

                  <p className="text-[11px] sm:text-xs font-semibold mt-1">
                    Handcrafted
                  </p>

                </div>


                {/* Quality */}

                <div
                  className="
                    hidden
                    xl:block
                    border
                    border-[#E5D9CE]
                    bg-white
                    rounded-xl
                    px-3
                    py-2.5
                    sm:py-3
                  "
                >

                  <FaShieldAlt className="text-[#8B5E3C] text-xs sm:text-sm mb-1.5 sm:mb-2" />

                  <p
                    className="
                      text-[8px]
                      uppercase
                      tracking-[1.3px]
                      text-[#A09287]
                    "
                  >
                    Quality
                  </p>

                  <p className="text-xs font-semibold mt-1">
                    Durable & Long Lasting
                  </p>

                </div>

              </div>


              {/* Stock */}

              <div
                className="
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  mt-4
                  sm:mt-5
                "
              >

                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    sm:gap-2
                    text-[10px]
                    sm:text-xs
                    font-semibold
                    text-[#55704A]
                  "
                >

                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#6E9A5D]" />

                  In Stock

                </span>

                <span className="text-[#D3C5BA]">
                  |
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-1.5
                    sm:gap-2
                    text-[10px]
                    sm:text-xs
                    text-[#8B5E3C]
                  "
                >
                  <FaTruck />

                  Ready to ship
                </span>

              </div>

            </div>

          </div>


          {/* =====================================================
              PURCHASE BAR
          ===================================================== */}

          <div
            className="
              mt-5
              sm:mt-6
              bg-[#FCFAF7]
              border
              border-[#E7DDD2]
              rounded-[18px]
              sm:rounded-[20px]
              p-3
              sm:p-4
            "
          >

            <div
              className="
                grid
                lg:grid-cols-[190px_1fr_1fr]
                gap-2.5
                sm:gap-3
                items-center
              "
            >

              {/* Quantity */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  lg:justify-center
                  gap-4
                "
              >

                <div>

                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[2px]
                      text-[#9A8A7E]
                      font-bold
                    "
                  >
                    Quantity
                  </p>

                </div>


                <div
                  className="
                    flex
                    items-center
                    rounded-full
                    border
                    border-[#E0D4C9]
                    bg-white
                    overflow-hidden
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                    className="
                      w-9
                      h-9
                      flex
                      items-center
                      justify-center
                      text-[#8B5E3C]
                      hover:bg-[#F4ECE5]
                      transition
                    "
                    aria-label="Decrease quantity"
                  >
                    <FaMinus className="text-[9px]" />
                  </button>

                  <span
                    className="
                      w-9
                      text-center
                      text-sm
                      font-semibold
                    "
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="
                      w-9
                      h-9
                      flex
                      items-center
                      justify-center
                      text-[#8B5E3C]
                      hover:bg-[#F4ECE5]
                      transition
                    "
                    aria-label="Increase quantity"
                  >
                    <FaPlus className="text-[9px]" />
                  </button>

                </div>

              </div>


              {/* Add To Cart */}

              <button
                type="button"
                onClick={handleAddToCart}
                className="
                  h-11
                  sm:h-12
                  rounded-xl
                  bg-[#8B5E3C]
                  text-white
                  font-semibold
                  text-xs
                  sm:text-sm
                  shadow-[0_8px_22px_rgba(139,94,60,0.18)]
                  hover:bg-[#70472F]
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                Add to Cart

                <span>
                  →
                </span>

              </button>


              {/* Buy Now */}

              <button
                type="button"
                onClick={handleBuyNow}
                className="
                  h-11
                  sm:h-12
                  rounded-xl
                  bg-[#403027]
                  text-white
                  font-semibold
                  text-xs
                  sm:text-sm
                  shadow-[0_8px_22px_rgba(64,48,39,0.15)]
                  hover:bg-[#2E211B]
                  hover:-translate-y-0.5
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <FaBolt className="text-[#D5A45F] text-[10px] sm:text-xs" />

                Buy Now

              </button>

            </div>


            
          </div>


          {/* =====================================================
              SERVICE BENEFITS
          ===================================================== */}

          <div
            className="
              mt-3
              bg-white
              border
              border-[#E7DDD2]
              rounded-[17px]
              sm:rounded-[18px]
              px-3
              sm:px-4
              py-3
              sm:py-4
            "
          >

            <div
              className="
                grid
                grid-cols-2
                lg:grid-cols-4
                gap-3
                lg:gap-0
              "
            >

              {/* Free Shipping */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  lg:border-r
                  border-[#E8DED3]
                  gap-2
                  sm:gap-3
                "
              >

                <FaTruck className="text-[#8B5E3C] text-xs sm:text-sm" />

                <div>

                  <p className="text-[10px] sm:text-xs font-semibold text-[#4B352A]">
                    Free Shipping
                  </p>

                  <p className="text-[9px] sm:text-[10px] text-[#9A8D83] mt-0.5">
                    On all orders
                  </p>

                </div>

              </div>


              {/* Secure Payment */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  lg:border-r
                  border-[#E8DED3]
                  gap-2
                  sm:gap-3
                "
              >

                <FaShieldAlt className="text-[#8B5E3C] text-xs sm:text-sm" />

                <div>

                  <p className="text-[10px] sm:text-xs font-semibold text-[#4B352A]">
                    Secure Payment
                  </p>

                  <p className="text-[9px] sm:text-[10px] text-[#9A8D83] mt-0.5">
                    100% safe & trusted
                  </p>

                </div>

              </div>


              {/* Easy Returns */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  lg:border-r
                  border-[#E8DED3]
                  gap-2
                  sm:gap-3
                "
              >

                <FaUndoAlt className="text-[#8B5E3C] text-xs sm:text-sm" />

                <div>

                  <p className="text-[10px] sm:text-xs font-semibold text-[#4B352A]">
                    Easy Returns
                  </p>

                  <p className="text-[9px] sm:text-[10px] text-[#9A8D83] mt-0.5">
                    7-day return policy
                  </p>

                </div>

              </div>


              {/* Handmade */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  sm:gap-3
                "
              >

                <FaLeaf className="text-[#8B5E3C] text-xs sm:text-sm" />

                <div>

                  <p className="text-[10px] sm:text-xs font-semibold text-[#4B352A]">
                    Handmade
                  </p>

                  <p className="text-[9px] sm:text-[10px] text-[#9A8D83] mt-0.5">
                    With love in India
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            PRODUCT DETAILS
        ===================================================== */}

        <div className="mt-20 sm:mt-24 md:mt-28">

          {/* Heading */}

          <div className="max-w-2xl mb-9 sm:mb-12">

            <p
              className="
                text-[9px]
                sm:text-[10px]
                uppercase
                tracking-[3px]
                sm:tracking-[4px]
                text-[#8B5E3C]
                font-bold
              "
            >
              The RoKaShree Experience
            </p>

            <h2
              className="
                mt-3
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-serif
                font-semibold
                text-[#402E25]
              "
            >
              Made Slowly.
              <span className="text-[#8B5E3C] italic">
                {" "}Made Beautifully.
              </span>
            </h2>

            <p
              className="
                mt-3
                sm:mt-4
                text-xs
                sm:text-sm
                md:text-base
                leading-7
                text-[#766960]
              "
            >
              Every RoKaShree creation is thoughtfully handcrafted
              using quality materials and traditional techniques.
            </p>

          </div>


          {/* Details Grid */}

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">

            {/* =================================================
                CRAFT
            ================================================= */}

            <div
              className="
                bg-white
                rounded-[20px]
                sm:rounded-[24px]
                border
                border-[#E6DBD0]
                p-5
                sm:p-7
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(75,53,42,0.08)]
                transition-all
                duration-500
              "
            >

              <div
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  rounded-xl
                  bg-[#F5EADF]
                  flex
                  items-center
                  justify-center
                  text-[#8B5E3C]
                "
              >
                <FaHandSparkles />
              </div>

              <p className="text-[9px] sm:text-[10px] uppercase tracking-[2px] text-[#8B5E3C] font-bold mt-5 sm:mt-6">
                Our Craft
              </p>

              <h3 className="text-lg sm:text-xl font-serif font-semibold mt-2">
                Crafted With Care
              </h3>

              <div className="w-full h-px bg-[#EEE5DC] my-4 sm:my-5" />

              <div className="space-y-3 sm:space-y-4">

                {[
                  "Each piece is carefully handmade.",
                  "Premium quality cotton rope.",
                  "Timeless bohemian design.",
                  "Designed to complement your space.",
                ].map((text) => (

                  <div
                    key={text}
                    className="flex items-start gap-3"
                  >

                    <span
                      className="
                        w-6
                        h-6
                        rounded-full
                        bg-[#F7EEE7]
                        flex
                        items-center
                        justify-center
                        text-[#8B5E3C]
                        text-[10px]
                        flex-shrink-0
                      "
                    >
                      <FaCheck />
                    </span>

                    <p className="text-xs sm:text-sm leading-6 text-[#6E625A]">
                      {text}
                    </p>

                  </div>

                ))}

              </div>

            </div>


            {/* =================================================
                SPECIFICATIONS
            ================================================= */}

            <div
              className="
                bg-[#FBF8F4]
                rounded-[20px]
                sm:rounded-[24px]
                border
                border-[#E6DBD0]
                p-5
                sm:p-7
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(75,53,42,0.08)]
                transition-all
                duration-500
              "
            >

              <div
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  rounded-xl
                  bg-white
                  border
                  border-[#E8DED3]
                  flex
                  items-center
                  justify-center
                  text-[#8B5E3C]
                  text-lg
                "
              >
                ⚜
              </div>

              <p className="text-[9px] sm:text-[10px] uppercase tracking-[2px] text-[#8B5E3C] font-bold mt-5 sm:mt-6">
                Product Information
              </p>

              <h3 className="text-lg sm:text-xl font-serif font-semibold mt-2">
                Specifications
              </h3>

              <div className="w-full h-px bg-[#E6DBD0] my-4 sm:my-5" />

              <div className="space-y-2">

                {[
                  ["Material", "Premium Cotton Rope"],
                  ["Color", "Natural Beige"],
                  ["Style", "Bohemian Luxury"],
                  ["Made In", "India"],
                ].map(([label, value]) => (

                  <div
                    key={label}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                      py-2.5
                      sm:py-3
                      border-b
                      border-[#E8DED3]
                      last:border-0
                    "
                  >

                    <span className="text-[11px] sm:text-xs text-[#95877D]">
                      {label}
                    </span>

                    <span className="text-[11px] sm:text-xs font-semibold text-[#4B352A] text-right">
                      {value}
                    </span>

                  </div>

                ))}

              </div>

            </div>


            {/* =================================================
                CARE
            ================================================= */}

            <div
              className="
                bg-white
                rounded-[20px]
                sm:rounded-[24px]
                border
                border-[#E6DBD0]
                p-5
                sm:p-7
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(75,53,42,0.08)]
                transition-all
                duration-500
              "
            >

              <div
                className="
                  w-10
                  h-10
                  sm:w-11
                  sm:h-11
                  rounded-xl
                  bg-[#EEF4EA]
                  flex
                  items-center
                  justify-center
                  text-[#607755]
                  text-lg
                "
              >
                🌿
              </div>

              <p className="text-[9px] sm:text-[10px] uppercase tracking-[2px] text-[#607755] font-bold mt-5 sm:mt-6">
                Keep It Beautiful
              </p>

              <h3 className="text-lg sm:text-xl font-serif font-semibold mt-2">
                Care Guide
              </h3>

              <div className="w-full h-px bg-[#EEE5DC] my-4 sm:my-5" />

              <div className="space-y-3 sm:space-y-4">

                {[
                  ["Cleaning", "Dust gently using a soft brush."],
                  ["Protection", "Keep away from excessive moisture."],
                  ["Washing", "Do not machine wash."],
                  ["Storage", "Store in a dry place."],
                ].map(([label, text]) => (

                  <div
                    key={label}
                    className="
                      bg-[#F8FBF6]
                      border
                      border-[#E2EBDD]
                      rounded-xl
                      px-3
                      sm:px-4
                      py-2.5
                      sm:py-3
                    "
                  >

                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[1.5px] text-[#91A087]">
                      {label}
                    </p>

                    <p className="text-[11px] sm:text-xs font-medium text-[#4B5A46] mt-1 leading-5">
                      {text}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            RELATED PRODUCTS
        ===================================================== */}

        <div className="mt-24 sm:mt-28 md:mt-36">

          <div className="text-center max-w-2xl mx-auto mb-9 sm:mb-12">

            <p
              className="
                text-[9px]
                sm:text-[10px]
                uppercase
                tracking-[3px]
                sm:tracking-[4px]
                text-[#8B5E3C]
                font-bold
              "
            >
              You May Also Like
            </p>

            <h2
              className="
                mt-3
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-serif
                font-semibold
                text-[#402E25]
              "
            >
              Complete Your Space
            </h2>

            <div className="flex items-center justify-center gap-3 mt-4 sm:mt-5">

              <span className="w-8 sm:w-10 h-px bg-[#CDB7A3]" />

              <span className="text-[#8B5E3C] text-xs">
                ✦
              </span>

              <span className="w-8 sm:w-10 h-px bg-[#CDB7A3]" />

            </div>

            <p
              className="
                text-xs
                sm:text-sm
                leading-6
                text-[#786C63]
                mt-4
                sm:mt-5
              "
            >
              Discover handcrafted pieces that beautifully
              complement your chosen design.
            </p>

          </div>


          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-2
              lg:grid-cols-4
              gap-3
              sm:gap-5
              lg:gap-6
            "
          >

            {relatedProducts.map((item) => (

              <div
                key={item.id}
                className="
                  hover:-translate-y-1
                  transition-transform
                  duration-500
                "
              >

                <ProductCard
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />

              </div>

            ))}

          </div>

        </div>


        {/* =====================================================
            FINAL BRAND STATEMENT
        ===================================================== */}

        <div className="mt-20 sm:mt-24 md:mt-32 text-center">

          <div className="flex items-center justify-center gap-3 sm:gap-4">

            <span className="w-10 sm:w-16 h-px bg-[#D7C8BA]" />

            <span className="text-[#8B5E3C]">
              ✦
            </span>

            <span className="w-10 sm:w-16 h-px bg-[#D7C8BA]" />

          </div>

          <p
            className="
              mt-4
              sm:mt-5
              text-[9px]
              sm:text-[10px]
              uppercase
              tracking-[3px]
              sm:tracking-[4px]
              text-[#8B5E3C]
              font-semibold
            "
          >
            RoKaShree
          </p>

          <p
            className="
              mt-2
              text-xs
              sm:text-sm
              italic
              text-[#8A7B70]
            "
          >
            Handmade for beautiful spaces.
          </p>

        </div>

      </div>

    </section>
  );
}