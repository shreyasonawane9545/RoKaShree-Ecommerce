import { Link } from "react-router-dom";
import heroImage from "../assets/hero/Photo-hero.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F8F3ED]">

      {/* =====================================================
          HERO IMAGE
      ===================================================== */}

      <div className="absolute inset-0">

        <img
          src={heroImage}
          alt="RoKaShree handcrafted macrame luxury home decor"
          className="
            w-full
            h-full
            object-cover
            object-center
            scale-[1.02]
          "
        />

        {/* Premium soft overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#F8F3ED]/[0.97]
            via-[#F8F3ED]/[0.82]
            via-[48%]
            to-[#F8F3ED]/[0.08]
          "
        />

        {/* Bottom fade */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-24
            sm:h-32
            bg-gradient-to-t
            from-[#F8F3ED]/50
            to-transparent
          "
        />

      </div>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          max-w-[1380px]
          mx-auto
          px-5
          sm:px-8
          lg:px-12
          min-h-[520px]
          sm:min-h-[570px]
          lg:min-h-[610px]
          flex
          items-center
        "
      >

        <div
          className="
            w-full
            lg:w-[54%]
            py-10
            sm:py-14
            lg:py-16
          "
        >

          {/* =================================================
              BRAND LABEL
          ================================================= */}

          <div className="flex items-center gap-3 mb-5 sm:mb-7">

            <span className="w-8 sm:w-10 h-px bg-[#8B5E3C]" />

            <p
              className="
                uppercase
                tracking-[3.5px]
                sm:tracking-[5px]
                text-[#8B5E3C]
                text-[9px]
                sm:text-xs
                font-bold
              "
            >
              RoKaShree
            </p>

          </div>


          {/* =================================================
              EYEBROW
          ================================================= */}

          <p
            className="
              uppercase
              tracking-[2px]
              sm:tracking-[3px]
              text-[#9A7355]
              text-[9px]
              sm:text-xs
              font-semibold
              mb-3
              sm:mb-4
            "
          >
            Handmade • Natural • Timeless
          </p>


          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <h1
            className="
              font-serif
              font-semibold
              text-[#422F26]
              text-[38px]
              leading-[1]
              tracking-[-1px]
              sm:text-[48px]
              sm:tracking-[-1.2px]
              lg:text-[68px]
              lg:leading-[0.98]
              lg:tracking-[-1.5px]
              xl:text-[74px]
            "
          >

            Handcrafted

            <span
              className="
                block
                text-[#8B5E3C]
                italic
                font-medium
                mt-1
              "
            >
              Luxury
            </span>

            <span className="block mt-1">
              for Your Home
            </span>

          </h1>


          {/* =================================================
              REFINED DIVIDER
          ================================================= */}

          <div className="flex items-center gap-2.5 sm:gap-3 mt-5 sm:mt-7">

            <span className="w-9 sm:w-12 h-px bg-[#B99575]" />

            <span className="text-[#8B5E3C] text-[10px] sm:text-xs">
              ✦
            </span>

            <span className="w-5 sm:w-6 h-px bg-[#D8C6B5]" />

          </div>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mt-5
              sm:mt-6
              max-w-lg
              text-[13px]
              sm:text-sm
              lg:text-lg
              leading-6
              sm:leading-7
              text-[#5E514A]
            "
          >
            Thoughtfully handcrafted macramé pieces that bring natural
            warmth, quiet beauty, and timeless elegance to your home.
          </p>


          {/* =================================================
              PREMIUM CTA
          ================================================= */}

          <div
            className="
              mt-6
              sm:mt-8
              flex
              items-center
              gap-5
              sm:gap-6
            "
          >

            {/* Explore Collection */}

            <Link
              to="/shop"
              className="
                group
                relative
                inline-flex
                items-center
                gap-3
                text-[#8B5E3C]
                text-[13px]
                sm:text-sm
                font-semibold
                tracking-[0.2px]
                transition-colors
                duration-300
              "
            >

              {/* Text + animated underline */}

              <span className="relative py-1">

                Explore Collection

                {/* Base underline */}

                <span
                  className="
                    absolute
                    left-0
                    -bottom-1
                    w-full
                    h-px
                    bg-[#C8AD97]
                    transition-all
                    duration-300
                    group-hover:bg-[#8B5E3C]
                  "
                />

                {/* Premium hover underline */}

                <span
                  className="
                    absolute
                    left-0
                    -bottom-1
                    w-full
                    h-px
                    bg-[#8B5E3C]
                    origin-left
                    scale-x-0
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-x-100
                  "
                />

              </span>


              {/* Arrow */}

              <span
                className="
                  flex
                  items-center
                  justify-center
                  w-7
                  h-7
                  rounded-full
                  border
                  border-[#CDB7A3]
                  text-[#8B5E3C]
                  text-sm
                  font-normal
                  transition-all
                  duration-300
                  group-hover:border-[#8B5E3C]
                  group-hover:bg-[#8B5E3C]
                  group-hover:text-white
                  group-hover:translate-x-1
                "
              >
                →
              </span>

            </Link>


            {/* Our Story */}

            <Link
              to="/about"
              className="
                hidden
                sm:inline-flex
                items-center
                text-sm
                font-semibold
                text-[#6D4A35]
                border-b
                border-[#B99575]
                pb-1
                hover:text-[#8B5E3C]
                hover:border-[#8B5E3C]
                transition-all
                duration-300
              "
            >
              Our Story
            </Link>

          </div>


          {/* =================================================
              TRUST DETAILS
          ================================================= */}

          <div
            className="
              mt-7
              sm:mt-10
              pt-5
              sm:pt-6
              border-t
              border-[#CDB7A3]/60
              max-w-xl
            "
          >

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-6
                sm:gap-x-8
                gap-y-3
                sm:gap-y-4
              "
            >

              {/* Customers */}

              <div>

                <p
                  className="
                    font-serif
                    text-xl
                    sm:text-2xl
                    md:text-3xl
                    font-semibold
                    text-[#422F26]
                  "
                >
                  500+
                </p>

                <p className="text-[10px] sm:text-[11px] text-[#75665C] mt-0.5">
                  Happy Customers
                </p>

              </div>


              <span className="hidden sm:block h-9 w-px bg-[#CDB7A3]" />


              {/* Designs */}

              <div>

                <p
                  className="
                    font-serif
                    text-xl
                    sm:text-2xl
                    md:text-3xl
                    font-semibold
                    text-[#422F26]
                  "
                >
                  100+
                </p>

                <p className="text-[10px] sm:text-[11px] text-[#75665C] mt-0.5">
                  Handmade Designs
                </p>

              </div>


              <span className="hidden sm:block h-9 w-px bg-[#CDB7A3]" />


              {/* Rating */}

              <div>

                <p
                  className="
                    font-serif
                    text-xl
                    sm:text-2xl
                    md:text-3xl
                    font-semibold
                    text-[#422F26]
                  "
                >
                  4.9

                  <span className="text-[#8B5E3C] text-xs sm:text-sm ml-1">
                    ★
                  </span>

                </p>

                <p className="text-[10px] sm:text-[11px] text-[#75665C] mt-0.5">
                  Customer Rating
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          SMALL PREMIUM DETAIL
      ===================================================== */}

      <div
        className="
          absolute
          bottom-7
          right-8
          hidden
          xl:flex
          items-center
          gap-3
          text-[#6D4A35]
          text-[9px]
          uppercase
          tracking-[3px]
          font-semibold
          z-20
        "
      >

        <span className="w-7 h-px bg-[#8B5E3C]" />

        Handcrafted With Love

      </div>

    </section>
  );
}