import ProductCard from "./ProductCard";

import wallHanging from "../assets/Products/wall-hanging2.jpg";
import plantHanger from "../assets/Products/plant-hanger2.jpg";
import curtain from "../assets/Products/curtain-2.jpg";
import mirror from "../assets/Products/mirror6.jpg";

const products = [
  {
    name: "Luxury Wall Hanging",
    price: "₹1299",
    image: wallHanging,
  },
  {
    name: "Cotton Plant Hanger",
    price: "₹899",
    image: plantHanger,
  },
  {
    name: "Macrame Curtain",
    price: "₹2499",
    image: curtain,
  },
  {
    name: "Decorative Mirror",
    price: "₹1599",
    image: mirror,
  },
];

export default function BestSellers() {
  return (
    <section className="relative bg-[#FCFAF7] py-20 md:py-24 overflow-hidden">

      {/* =====================================================
          SUBTLE AMBIENT DETAIL
      ===================================================== */}

      <div
        className="
          absolute
          top-0
          right-0
          w-80
          h-80
          rounded-full
          bg-[#E8D5C2]/15
          blur-3xl
          translate-x-1/3
          -translate-y-1/3
          pointer-events-none
        "
      />


      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative max-w-7xl mx-auto px-6">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">

          {/* Label */}

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
            Best Sellers
          </p>


          {/* Heading */}

          <h2
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
            Our Most Loved
            <span className="block text-[#8B5E3C] italic font-medium mt-1">
              Creations
            </span>
          </h2>


          {/* Elegant Divider */}

          <div className="flex items-center justify-center gap-3 mt-5">

            <span className="w-10 h-px bg-[#CDB7A3]" />

            <span className="text-[#8B5E3C] text-xs">
              ✦
            </span>

            <span className="w-10 h-px bg-[#CDB7A3]" />

          </div>


          {/* Description */}

          <p
            className="
              text-gray-500
              text-sm
              md:text-base
              leading-7
              mt-5
              max-w-2xl
              mx-auto
            "
          >
            Discover the handcrafted pieces our customers love most —
            thoughtfully created to bring warmth, texture and timeless
            elegance into your home.
          </p>

        </div>


        {/* =================================================
            PRODUCT COLLECTION
        ================================================= */}

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

          {products.map((product) => (

            <div
              key={product.name}
              className="
                group
                transition-transform
                duration-500
                hover:-translate-y-1
              "
            >

              <ProductCard
                name={product.name}
                price={product.price}
                image={product.image}
              />

            </div>

          ))}

        </div>


        {/* =================================================
            BOTTOM BRAND STATEMENT
        ================================================= */}

        <div className="mt-14 md:mt-16">

          <div
            className="
              border-t
              border-[#E5DBD1]
              pt-7
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-4
            "
          >

            {/* Left */}

            <div className="text-center sm:text-left">

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[3px]
                  text-[#8B5E3C]
                  font-bold
                "
              >
                The RoKaShree Promise
              </p>

              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Thoughtfully handcrafted. Beautifully made.
              </p>

            </div>


            {/* Right */}

            <p
              className="
                text-[10px]
                uppercase
                tracking-[2px]
                text-gray-400
                font-medium
              "
            >
              Handmade • Natural • Timeless
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}