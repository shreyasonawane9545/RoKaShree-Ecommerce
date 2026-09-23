import {
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";

import wallHanging from "../assets/Products/wall-hanging7.jpg";
import plantHanger from "../assets/Products/plant-hanger5.jpg";
import curtain from "../assets/Products/curtain-4.jpg";
import dreamCatcher from "../assets/Products/dream-catcher4.jpg";
import mirror from "../assets/Products/mirror1.jpg";
import roomDivider from "../assets/Products/room-divider1.jpg";

const images = [
  wallHanging,
  plantHanger,
  curtain,
  dreamCatcher,
  mirror,
  roomDivider,
];

export default function InstagramGallery() {
  return (
    <section className="relative bg-[#F8F3ED] py-16 md:py-20 overflow-hidden">

      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}

      <div
        className="
          absolute
          -top-24
          left-1/2
          -translate-x-1/2
          w-72
          h-40
          rounded-full
          bg-[#E8D6C3]/15
          blur-3xl
          pointer-events-none
        "
      />


      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative max-w-6xl mx-auto px-6">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="max-w-xl mx-auto text-center mb-9 md:mb-11">

          <p
            className="
              uppercase
              tracking-[4px]
              text-[#8B5E3C]
              text-[10px]
              font-bold
            "
          >
            Follow Our Journey
          </p>


          <div className="flex items-center justify-center gap-2.5 mt-2">

            <FaInstagram className="text-[#8B5E3C] text-sm" />

            <h2
              className="
                font-serif
                text-2xl
                md:text-3xl
                font-semibold
                text-[#4B352A]
              "
            >
              @RoKaShree
            </h2>

          </div>


          {/* Small divider */}

          <div className="flex items-center justify-center gap-3 mt-4">

            <span className="w-8 h-px bg-[#CDB7A3]" />

            <span className="text-[#8B5E3C] text-[10px]">
              ✦
            </span>

            <span className="w-8 h-px bg-[#CDB7A3]" />

          </div>


          <p
            className="
              text-gray-500
              text-xs
              md:text-sm
              leading-6
              mt-4
              max-w-md
              mx-auto
            "
          >
            A glimpse into our world of handmade beauty,
            natural textures and timeless décor.
          </p>

        </div>


        {/* =================================================
            SMALL PREMIUM GALLERY
        ================================================= */}

        <div
          className="
            max-w-4xl
            mx-auto
            grid
            grid-cols-2
            md:grid-cols-3
            gap-3
            md:gap-4
          "
        >

          {images.map((img, index) => (

            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-[16px]
                md:rounded-[20px]
                aspect-square
                bg-white
                border
                border-[#E6DBD1]
                shadow-[0_5px_18px_rgba(75,53,42,0.045)]
                hover:shadow-[0_12px_28px_rgba(75,53,42,0.09)]
                transition-shadow
                duration-500
              "
            >

              {/* Image */}

              <img
                src={img}
                alt={`RoKaShree handmade macrame ${index + 1}`}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.04]
                "
              />


              {/* Premium hover overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-[#3E2C23]/25
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-500
                "
              />


              {/* Instagram icon */}

              <div
                className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-500
                "
              >

                <div
                  className="
                    w-8
                    h-8
                    md:w-9
                    md:h-9
                    rounded-full
                    bg-white/95
                    flex
                    items-center
                    justify-center
                    text-[#8B5E3C]
                    shadow-lg
                    scale-90
                    group-hover:scale-100
                    transition-transform
                    duration-500
                  "
                >
                  <FaInstagram className="text-xs md:text-sm" />
                </div>

              </div>

            </div>

          ))}

        </div>


        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <div className="mt-8 md:mt-10">

          <div
            className="
              border-t
              border-[#E2D7CC]
              pt-6
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-4
            "
          >

            {/* Brand message */}

            <div className="text-center sm:text-left">

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[2.5px]
                  text-[#8B5E3C]
                  font-bold
                "
              >
                From Our Home To Yours
              </p>

              <p className="text-xs text-gray-500 mt-1">
                New creations, inspiration & handmade stories.
              </p>

            </div>


            {/* Follow button */}

            <button
              type="button"
              className="
                group
                inline-flex
                items-center
                gap-2.5
                px-6
                py-2.5
                rounded-full
                border
                border-[#8B5E3C]
                text-[#8B5E3C]
                text-xs
                font-semibold
                hover:bg-[#8B5E3C]
                hover:text-white
                transition-all
                duration-300
              "
            >

              <FaInstagram className="text-xs" />

              Follow @RoKaShree

              <FaArrowRight
                className="
                  text-[10px]
                  group-hover:translate-x-1
                  transition-transform
                  duration-300
                "
              />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}