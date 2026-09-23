import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import localProducts from "../data/products";
import CustomDropdown from "../components/CustomDropdown";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

// =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    "All",
    "Wall Hanging",
    "Plant Hanger",
    "Dream Catcher",
    "Curtain",
    "Mirror",
    "Room Divider",
    "Shelf Decor",
    "Table Runner",
    "Swing Hammock",
    "Wedding Backdrop",
    "Lampshade",
    "Key Holder",
  ];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");

  const filterSectionRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
   // =====================================================
  // LOAD PRODUCTS FROM FIRESTORE
  // =====================================================

 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "products")
      );

      const productList = snapshot.docs.map((productDoc) => ({
        id: productDoc.id,
        ...productDoc.data(),
      }));

      setProducts(productList);
    } catch (error) {
      console.error("Shop Firestore error:", error);

      // Fallback to local products
      // so the Shop never becomes empty
      setProducts(localProducts);
    }
  };

  fetchProducts();
}, []);

// =====================================================
// READ CATEGORY FROM URL
// =====================================================

useEffect(() => {
  const categoryFromUrl = searchParams.get("category");

  if (!categoryFromUrl) {
    return;
  }

  const decodedCategory = decodeURIComponent(categoryFromUrl);

 if (categories.includes(decodedCategory)) {
  setTimeout(() => {
    setSelectedCategory(decodedCategory);
    setVisibleCount(12);
  }, 0);

    // Wait for the page to render, then scroll
    setTimeout(() => {
      if (filterSectionRef.current) {
        const elementTop =
          filterSectionRef.current.getBoundingClientRect().top +
          window.scrollY;

        window.scrollTo({
          top: elementTop - 90,
          behavior: "smooth",
        });
      }
    }, 150);
  }
}, [searchParams, products.length]);

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  let filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" ||
      product.category === selectedCategory
  );

  // =====================================================
  // SORT PRODUCTS
  // =====================================================

  if (sortBy === "Price Low to High") {
    filteredProducts.sort(
      (a, b) =>
        Number(a.price.replace(/[₹,]/g, "")) -
        Number(b.price.replace(/[₹,]/g, ""))
    );
  }

  if (sortBy === "Price High to Low") {
    filteredProducts.sort(
      (a, b) =>
        Number(b.price.replace(/[₹,]/g, "")) -
        Number(a.price.replace(/[₹,]/g, ""))
    );
  }

  const visibleProducts = filteredProducts.slice(
    0,
    visibleCount
  );

  // =====================================================
  // LOAD MORE
  // =====================================================

  const handleLoadMore = () => {
    setIsLoading(true);

    setTimeout(() => {
      setVisibleCount(
        (previousCount) => previousCount + 12
      );

      setIsLoading(false);
    }, 700);
  };

  // =====================================================
  // CATEGORY
  // =====================================================

 const handleCategoryChange = (category) => {
  setSelectedCategory(category);
  setVisibleCount(12);

  if (category === "All") {
    setSearchParams({});
  } else {
    setSearchParams({
      category,
    });
  }
};

  // =====================================================
  // SORT
  // =====================================================

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setVisibleCount(12);
  };

  

  return (
    <section className="relative bg-[#FAF7F3] min-h-screen py-14 md:py-18 overflow-hidden">

      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}

      <div
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          w-[420px]
          h-[180px]
          bg-[#E8D6C3]/10
          blur-3xl
          rounded-full
          pointer-events-none
        "
      />


      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative max-w-7xl mx-auto px-6">


        {/* =================================================
            PREMIUM PAGE HEADER
        ================================================= */}

        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">

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
            The RoKaShree Collection
          </p>


          <h1
            className="
              font-serif
              text-3xl
              md:text-4xl
              lg:text-5xl
              font-semibold
              text-[#4B352A]
              mt-3
              leading-tight
            "
          >
            Discover Handmade
            <span className="block text-[#8B5E3C] italic font-medium">
              Luxury
            </span>
          </h1>


          {/* Divider */}

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
            Explore thoughtfully handcrafted macrame pieces
            created to bring warmth, texture and timeless beauty
            into your home.
          </p>

        </div>


        {/* =================================================
            FILTER SECTION
        ================================================= */}

        <div
         ref={filterSectionRef}
          className="
            bg-white
            rounded-[26px]
            border
            border-[#E7DDD4]
            shadow-[0_10px_35px_rgba(75,53,42,0.045)]
            p-5
            md:p-6
            mb-12
          "
        >

          {/* Filter top */}

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
              mb-5
            "
          >

            <div>

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[3px]
                  text-[#8B5E3C]
                  font-bold
                "
              >
                Explore
              </p>

              <h2
                className="
                  text-lg
                  md:text-xl
                  font-semibold
                  text-[#4B352A]
                  mt-1
                "
              >
                Shop by Category
              </h2>

            </div>


            {/* Selected category */}

            <div
              className="
                text-xs
                text-gray-400
                bg-[#FAF7F3]
                border
                border-[#E9DED4]
                px-4
                py-2
                rounded-full
                self-start
                md:self-center
              "
            >
              {selectedCategory === "All"
                ? "All Creations"
                : selectedCategory}
            </div>

          </div>


          {/* =================================================
              CATEGORY PILLS
          ================================================= */}

          <div
            className="
              flex
              gap-2.5
              overflow-x-auto
              pb-2
              category-scroll
            "
          >

            {categories.map((category) => (

              <button
                key={category}
                type="button"
                onClick={() =>
                  handleCategoryChange(category)
                }
                className={`
                  whitespace-nowrap
                  px-4
                  py-2.5
                  rounded-full
                  text-xs
                  font-semibold
                  border
                  transition-all
                  duration-300

                  ${
                    selectedCategory === category
                      ? `
                        bg-[#8B5E3C]
                        text-white
                        border-[#8B5E3C]
                        shadow-[0_5px_15px_rgba(139,94,60,0.18)]
                      `
                      : `
                        bg-[#FCFAF8]
                        text-[#6D574A]
                        border-[#E8DDD4]
                        hover:border-[#C9AF9A]
                        hover:bg-[#F8F1EA]
                      `
                  }
                `}
              >
                {category}
              </button>

            ))}

          </div>


          {/* =================================================
              SORT
          ================================================= */}

          <div
            className="
              border-t
              border-[#EEE6DE]
              mt-5
              pt-5
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
            "
          >

            <p className="text-xs text-gray-400">
              {filteredProducts.length} handcrafted{" "}
              {filteredProducts.length === 1
                ? "piece"
                : "pieces"}{" "}
              available
            </p>


            <div className="w-full sm:w-52">

              <CustomDropdown
                value={sortBy}
                onChange={handleSortChange}
                placeholder="Sort Products"
                options={[
                  "Featured",
                  "Price Low to High",
                  "Price High to Low",
                ]}
              />

            </div>

          </div>

        </div>


        {/* =================================================
            COLLECTION HEADER
        ================================================= */}

        <div
          className="
            flex
            items-end
            justify-between
            mb-7
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
              Curated For You
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
              Our Collection
            </h2>

          </div>


          <p
            className="
              hidden
              md:block
              text-xs
              text-gray-400
            "
          >
            Showing {visibleProducts.length} of{" "}
            {filteredProducts.length}
          </p>

        </div>


        {/* =================================================
            PRODUCTS
        ================================================= */}

        {filteredProducts.length === 0 ? (

          <div
            className="
              bg-white
              rounded-[26px]
              border
              border-[#E8DED5]
              py-20
              text-center
              shadow-[0_8px_30px_rgba(75,53,42,0.04)]
            "
          >

            <div className="text-2xl text-[#8B5E3C] mb-4">
              ✦
            </div>

            <h2
              className="
                font-serif
                text-2xl
                font-semibold
                text-[#4B352A]
              "
            >
              No Products Found
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Try exploring another category.
            </p>

          </div>

        ) : (

          <>

            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-4
                md:gap-6
              "
            >

              {visibleProducts.map((product) => (

                <div
                  key={product.id}
                  className="
                    transition-transform
                    duration-400
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


            {/* =================================================
                LOAD MORE
            ================================================= */}

            <div className="mt-14 text-center">

              {visibleCount < filteredProducts.length ? (

                <>

                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="
                      group
                      inline-flex
                      items-center
                      justify-center
                      gap-2.5
                      min-w-[190px]
                      bg-[#8B5E3C]
                      hover:bg-[#6D472D]
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                      text-white
                      px-7
                      py-3
                      rounded-full
                      text-sm
                      font-semibold
                      shadow-[0_8px_22px_rgba(139,94,60,0.18)]
                      hover:shadow-[0_12px_28px_rgba(139,94,60,0.22)]
                      hover:-translate-y-0.5
                      transition-all
                      duration-300
                    "
                  >

                    {isLoading ? (

                      <>
                        <span
                          className="
                            w-4
                            h-4
                            border-2
                            border-white
                            border-t-transparent
                            rounded-full
                            animate-spin
                          "
                        />

                        Loading...

                      </>

                    ) : (

                      <>
                        Load More

                        <span
                          className="
                            group-hover:translate-y-0.5
                            transition-transform
                          "
                        >
                          ↓
                        </span>
                      </>

                    )}

                  </button>


                  <p
                    className="
                      text-[11px]
                      text-gray-400
                      mt-3
                    "
                  >
                    More handcrafted pieces await
                  </p>

                </>

              ) : (

                <div className="flex flex-col items-center">

                  <div className="flex items-center gap-3">

                    <span className="w-8 h-px bg-[#D8C6B5]" />

                    <span className="text-[#8B5E3C] text-xs">
                      ✦
                    </span>

                    <span className="w-8 h-px bg-[#D8C6B5]" />

                  </div>

                  <p
                    className="
                      text-[#8B5E3C]
                      text-xs
                      font-semibold
                      tracking-wide
                      mt-3
                    "
                  >
                    You've discovered the entire collection
                  </p>

                  <p
                    className="
                      text-gray-400
                      text-[11px]
                      mt-1
                    "
                  >
                    Every handcrafted piece is now displayed.
                  </p>

                </div>

              )}

            </div>

          </>

        )}

      </div>

    </section>
  );
}