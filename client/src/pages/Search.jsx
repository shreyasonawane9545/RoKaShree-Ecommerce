import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";

import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Search() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // =========================================================
  // FILTER PRODUCTS
  // =========================================================

  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <section className="min-h-screen bg-[#FAF7F3] text-[#4B352A]">

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-6 pt-8 md:pt-10 pb-20">

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
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
            Explore RoKaShree
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
            Find Something
            <span className="block text-[#8B5E3C] italic font-medium">
              Beautiful
            </span>
          </h1>


          {/* Elegant divider */}

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
            Discover handcrafted pieces created to bring
            warmth, texture and timeless character to your home.
          </p>

        </div>


        {/* =================================================
            SEARCH AREA
        ================================================= */}

        <div className="max-w-2xl mx-auto mt-9">

          <div
            className="
              group
              flex
              items-center
              bg-white
              border
              border-[#E2D7CD]
              rounded-2xl
              px-4
              py-1.5
              shadow-[0_8px_28px_rgba(75,53,42,0.055)]
              focus-within:border-[#8B5E3C]
              focus-within:shadow-[0_10px_32px_rgba(139,94,60,0.10)]
              transition-all
              duration-300
            "
          >

            {/* Search icon */}

            <div
              className="
                w-9
                h-9
                flex
                items-center
                justify-center
                text-[#8B5E3C]
                flex-shrink-0
              "
            >
              <FaSearch className="text-sm" />
            </div>


            {/* Input */}

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your collection..."
              autoComplete="off"
              className="
                flex-1
                min-w-0
                bg-transparent
                px-3
                py-3.5
                text-sm
                text-[#4B352A]
                placeholder:text-gray-400
                outline-none
              "
            />


            {/* Clear */}

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                  mr-2
                  px-2
                  text-xs
                  text-gray-400
                  hover:text-[#8B5E3C]
                  transition
                "
              >
                Clear
              </button>
            )}

          </div>


          <p
            className="
              text-center
              text-[11px]
              text-gray-400
              mt-3
            "
          >
            Try “wall hanging”, “plant hanger”, “mirror” or “curtain”
          </p>

        </div>


        {/* =================================================
            RESULTS HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
            mt-14
            mb-7
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
              Collection
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
              {search
                ? `Results for “${search}”`
                : "All Handcrafted Pieces"}
            </h2>

          </div>


          {/* Result count */}

          <div
            className="
              self-start
              sm:self-center
              px-3.5
              py-1.5
              rounded-full
              bg-[#F2E7DC]
              text-[#8B5E3C]
              text-[10px]
              font-semibold
              tracking-wide
            "
          >
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "Piece"
              : "Pieces"}
          </div>

        </div>


        {/* =================================================
            PRODUCTS
        ================================================= */}

        {filteredProducts.length > 0 ? (

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-6
              lg:gap-7
            "
          >

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="
                  group
                  transition-transform
                  duration-300
                  hover:-translate-y-1
                "
              >

                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />

              </div>

            ))}

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div
            className="
              max-w-2xl
              mx-auto
              mt-10
              bg-white
              border
              border-[#E6DDD4]
              rounded-[24px]
              px-6
              py-14
              text-center
              shadow-[0_8px_30px_rgba(75,53,42,0.045)]
            "
          >

            <div
              className="
                w-12
                h-12
                mx-auto
                rounded-full
                bg-[#F3E8DC]
                flex
                items-center
                justify-center
                text-[#8B5E3C]
              "
            >
              <FaSearch className="text-sm" />
            </div>


            <p
              className="
                uppercase
                tracking-[3px]
                text-[#8B5E3C]
                text-[9px]
                font-bold
                mt-5
              "
            >
              Nothing Found
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
              We couldn't find that piece
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
              Try a different search or explore our complete
              collection of handcrafted décor.
            </p>


            <button
              type="button"
              onClick={() => {
                setSearch("");
                navigate("/shop");
              }}
              className="
                group
                inline-flex
                items-center
                gap-3
                mt-6
                bg-[#8B5E3C]
                hover:bg-[#6D472D]
                text-white
                px-6
                py-3
                rounded-full
                text-sm
                font-semibold
                shadow-[0_8px_20px_rgba(139,94,60,0.16)]
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

            </button>

          </div>

        )}


        {/* =================================================
            BOTTOM BRAND DETAIL
        ================================================= */}

        {filteredProducts.length > 0 && (

          <div
            className="
              flex
              items-center
              justify-center
              gap-4
              mt-14
            "
          >

            <span className="w-10 h-px bg-[#D8C6B5]" />

            <p
              className="
                text-[9px]
                uppercase
                tracking-[3px]
                text-[#A58D79]
                font-semibold
              "
            >
              Handmade • Thoughtful • Timeless
            </p>

            <span className="w-10 h-px bg-[#D8C6B5]" />

          </div>

        )}

      </div>

    </section>
  );
}