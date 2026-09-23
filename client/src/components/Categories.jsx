import { useNavigate } from "react-router-dom";

import wallHanging from "../assets/Products/wall-hanging2.jpg";
import plantHanger from "../assets/Products/plant-hanger2.jpg";
import dreamCatcher from "../assets/Products/dream-catcher2.jpg";
import curtain from "../assets/Products/curtain-2.jpg";
import mirror from "../assets/Products/mirror6.jpg";
import swingHammock from "../assets/Products/swing-hammock1.jpg";
import weddingBackdrop from "../assets/Products/wedding-backdrop3.jpg";
import roomDivider from "../assets/Products/room-divider1.jpg";

const categories = [
  {
    name: "Wall Hanging",
    image: wallHanging,
    subtitle: "Art for your walls",
  },
  {
    name: "Plant Hanger",
    image: plantHanger,
    subtitle: "Bring nature indoors",
  },
  {
    name: "Dream Catcher",
    image: dreamCatcher,
    subtitle: "Dreams & serenity",
  },
  {
    name: "Curtain",
    image: curtain,
    subtitle: "Elegant natural textures",
  },
  {
    name: "Mirror",
    image: mirror,
    subtitle: "Reflect your style",
  },
  {
    name: "Swing Hammock",
    image: swingHammock,
    subtitle: "Handmade comfort",
  },
  {
    name: "Wedding Backdrop",
    image: weddingBackdrop,
    subtitle: "Made for special moments",
  },
  {
    name: "Room Divider",
    image: roomDivider,
    subtitle: "Define your space beautifully",
  },
];

export default function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="relative bg-[#F9F5F0] py-20 md:py-24 overflow-hidden">

      {/* =====================================================
          SUBTLE BACKGROUND DETAIL
      ===================================================== */}

      <div
        className="
          absolute
          -top-32
          left-1/2
          -translate-x-1/2
          w-[420px]
          h-[220px]
          rounded-full
          bg-[#E8D7C6]/20
          blur-3xl
          pointer-events-none
        "
      />


      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative max-w-7xl mx-auto px-6">

        {/* =================================================
            PREMIUM HEADER
        ================================================= */}

        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">

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
            The Collection
          </p>

          <h2
            className="
              font-serif
              text-3xl
              md:text-4xl
              lg:text-5xl
              font-semibold
              text-[#4B352A]
              mt-3
              tracking-tight
            "
          >
            Explore Our Collections
          </h2>

          {/* Elegant divider */}

          <div className="flex items-center justify-center gap-3 mt-5">

            <span className="w-10 h-px bg-[#CDB7A3]" />

            <span className="text-[#8B5E3C] text-xs">
              ✦
            </span>

            <span className="w-10 h-px bg-[#CDB7A3]" />

          </div>

          <p
            className="
              text-gray-500
              mt-5
              text-sm
              md:text-base
              leading-7
              max-w-2xl
              mx-auto
            "
          >
            Thoughtfully handcrafted macrame collections designed
            to bring warmth, texture and timeless beauty into your home.
          </p>

        </div>


        {/* =================================================
            CATEGORY GRID
        ================================================= */}

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-4
            md:gap-6
          "
        >

          {categories.map((item) => (

            <button
              key={item.name}
              type="button"
              onClick={() => handleCategoryClick(item.name)}
              className="
                group
                relative
                text-left
                overflow-hidden
                rounded-[24px]
                bg-white
                border
                border-[#E8DED4]
                shadow-[0_8px_30px_rgba(75,53,42,0.06)]
                hover:shadow-[0_18px_45px_rgba(75,53,42,0.12)]
                hover:-translate-y-1
                transition-all
                duration-500
                focus:outline-none
                focus:ring-2
                focus:ring-[#8B5E3C]/30
              "
            >

              {/* =================================================
                  IMAGE
              ================================================= */}

              <div className="relative aspect-[0.88] overflow-hidden">

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.05]
                  "
                />

                {/* Soft image overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#2B1D17]/70
                    via-transparent
                    to-transparent
                    opacity-70
                    group-hover:opacity-85
                    transition-opacity
                    duration-500
                  "
                />

              </div>


              {/* =================================================
                  CARD CONTENT
              ================================================= */}

              <div className="relative px-4 py-5 md:px-5 md:py-6">

                <p
                  className="
                    text-[9px]
                    md:text-[10px]
                    uppercase
                    tracking-[2.5px]
                    text-[#A17C60]
                    font-bold
                    mb-2
                  "
                >
                  Handmade
                </p>

                <h3
                  className="
                    font-serif
                    text-lg
                    md:text-xl
                    font-semibold
                    text-[#4B352A]
                    leading-tight
                  "
                >
                  {item.name}
                </h3>

                <div className="flex items-center justify-between mt-3">

                  <p
                    className="
                      text-xs
                      md:text-sm
                      text-gray-500
                    "
                  >
                    {item.subtitle}
                  </p>

                  {/* Arrow */}

                  <span
                    className="
                      flex-shrink-0
                      ml-2
                      w-8
                      h-8
                      rounded-full
                      border
                      border-[#DCCBB9]
                      flex
                      items-center
                      justify-center
                      text-[#8B5E3C]
                      text-sm
                      group-hover:bg-[#8B5E3C]
                      group-hover:border-[#8B5E3C]
                      group-hover:text-white
                      transition-all
                      duration-300
                    "
                  >
                    →
                  </span>

                </div>

              </div>

            </button>

          ))}

        </div>


        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <div className="mt-14 md:mt-16">

          <div
            className="
              border-t
              border-[#E2D7CC]
              pt-7
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-5
            "
          >

            {/* Text */}

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
                RoKaShree Collection
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Find something beautiful for every space.
              </p>

            </div>


            {/* Button */}

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="
                group
                inline-flex
                items-center
                gap-3
                px-7
                py-3
                rounded-full
                border
                border-[#8B5E3C]
                text-[#8B5E3C]
                text-sm
                font-semibold
                hover:bg-[#8B5E3C]
                hover:text-white
                transition-all
                duration-300
              "
            >

              View All Collections

              <span
                className="
                  group-hover:translate-x-1
                  transition-transform
                  duration-300
                "
              >
                →
              </span>

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}