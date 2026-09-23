import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

import wallhanging1 from "../assets/products/wall-hanging1.jpg";
import planthanger1 from "../assets/products/plant-hanger4.jpg";
import curtain1 from "../assets/products/curtain-1.jpg";
import dreamcatcher1 from "../assets/products/dream-catcher5.jpg";

export default function FeaturedProducts() {
  const products = [
    {
      name: "Boho Wall Hanging",
      price: "₹1,299",
      image: wallhanging1,
    },
    {
      name: "Plant Hanger",
      price: "₹799",
      image: planthanger1,
    },
    {
      name: "Macrame Curtain",
      price: "₹3,999",
      image: curtain1,
    },
    {
      name: "Dream Catcher",
      price: "₹699",
      image: dreamcatcher1,
    },
  ];

  return (
    <section className="relative bg-[#FBF9F6] py-20 md:py-24 overflow-hidden">

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-6">


        {/* =================================================
            PREMIUM HEADER
        ================================================= */}

        <div className="max-w-2xl mx-auto text-center mb-12 md:mb-14">

          {/* Eyebrow */}

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
            Curated Collection
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
            Featured Pieces
          </h2>


          {/* Elegant divider */}

          <div className="flex items-center justify-center gap-3 mt-5">

            <span className="w-9 h-px bg-[#CDB7A3]" />

            <span className="text-[#8B5E3C] text-xs">
              ✦
            </span>

            <span className="w-9 h-px bg-[#CDB7A3]" />

          </div>


          {/* Description */}

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
            A refined selection of handcrafted pieces,
            thoughtfully designed to bring warmth, texture
            and timeless beauty into your home.
          </p>

        </div>


        {/* =================================================
            PRODUCTS
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
            PREMIUM COLLECTION CTA
        ================================================= */}

        <div className="mt-14 md:mt-16">

          <div
            className="
              border-t
              border-[#E4DAD1]
              pt-7
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-5
            "
          >

            {/* Brand message */}

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
                More To Discover
              </p>

              <p
                className="
                  text-xs
                  md:text-sm
                  text-gray-500
                  mt-1
                "
              >
                Explore every handcrafted creation by RoKaShree.
              </p>

            </div>


            {/* Collection Button */}

           <Link
  to="/shop"
  className="
    group
    inline-flex
    items-center
    gap-3
    text-[#8B5E3C]
    text-sm
    md:text-base
    font-medium
    hover:text-[#6D472D]
    transition-colors
    duration-300
  "
>
  View Collection

  <span
    className="
      text-lg
      font-normal
      group-hover:translate-x-1
      transition-transform
      duration-300
    "
  >
    →
  </span>
</Link>

          </div>

        </div>


        {/* =================================================
            BRAND SIGNATURE
        ================================================= */}

        <div className="text-center mt-9">

          <p
            className="
              text-[9px]
              uppercase
              tracking-[3px]
              text-[#B9A496]
              font-semibold
            "
          >
            Handmade • Natural • Timeless
          </p>

        </div>

      </div>

    </section>
  );
}