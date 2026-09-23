import { Link } from "react-router-dom";

import {
  FaLeaf,
  FaHeart,
  FaTruck,
  FaGem,
  FaQuoteLeft,
  FaArrowRight,
  FaStar,
  FaCheck,
} from "react-icons/fa";

export default function About() {
  const features = [
    {
      icon: <FaLeaf />,
      title: "Eco Friendly",
      description:
        "We use premium quality natural cotton cords that are safe and sustainable.",
    },
    {
      icon: <FaHeart />,
      title: "100% Handmade",
      description:
        "Every macrame product is handcrafted with passion and attention to detail.",
    },
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      description:
        "Quick and secure delivery across India with careful packaging.",
    },
    {
      icon: <FaGem />,
      title: "Premium Quality",
      description:
        "Luxury handcrafted home décor designed to last for years.",
    },
  ];

  const stats = [
    {
      number: "5000+",
      title: "Happy Customers",
    },
    {
      number: "300+",
      title: "Unique Designs",
    },
    {
      number: "15+",
      title: "Product Categories",
    },
    {
      number: "4.9★",
      title: "Customer Rating",
    },
  ];

  const reviews = [
    {
      name: "Priya",
      review:
        "Beautiful craftsmanship and amazing quality. Highly recommended!",
    },
    {
      name: "Sneha",
      review:
        "Exactly as shown in the pictures. Premium finishing and elegant design.",
    },
    {
      name: "Anjali",
      review:
        "Every macrame piece feels unique. I'm in love with RoKaShree.",
    },
  ];

  return (
    <section className="bg-[#FAF7F3] min-h-screen text-[#4B352A]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <div className="max-w-6xl mx-auto px-6 pt-14 md:pt-18 pb-16">

        <div className="max-w-3xl mx-auto text-center">

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
            The RoKaShree Story
          </p>


          <h1
            className="
              font-serif
              text-4xl
              md:text-5xl
              lg:text-[54px]
              font-semibold
              leading-[1.08]
              text-[#4B352A]
              mt-4
            "
          >
            Handmade Luxury
            <span className="block text-[#8B5E3C] italic font-medium mt-1">
              Crafted With Love
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
              max-w-2xl
              mx-auto
            "
          >
            RoKaShree is a handcrafted macrame home décor brand dedicated
            to bringing elegance, warmth and creativity into every home.
            Every piece is carefully handmade using premium cotton cords,
            combining traditional craftsmanship with modern design.
          </p>

        </div>

      </div>


      {/* =====================================================
          STORY
      ===================================================== */}

      <div className="max-w-6xl mx-auto px-6 pb-20 md:pb-24">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* =================================================
              STORY ART
          ================================================= */}

          <div
            className="
              relative
              min-h-[340px]
              md:min-h-[390px]
              rounded-[28px]
              overflow-hidden
              bg-[#E9D9C8]
              border
              border-[#DDC8B3]
              shadow-[0_15px_45px_rgba(75,53,42,0.07)]
              flex
              items-center
              justify-center
            "
          >

            {/* Elegant rings */}

            <div
              className="
                absolute
                w-64
                h-64
                rounded-full
                border
                border-[#8B5E3C]/10
              "
            />

            <div
              className="
                absolute
                w-48
                h-48
                rounded-full
                border
                border-[#8B5E3C]/10
              "
            />

            <div
              className="
                absolute
                w-32
                h-32
                rounded-full
                border
                border-[#8B5E3C]/10
              "
            />


            <div className="relative z-10 text-center px-8">

              <p
                className="
                  uppercase
                  tracking-[4px]
                  text-[#8B5E3C]
                  text-[9px]
                  font-bold
                "
              >
                Since Day One
              </p>


              <h2
                className="
                  font-serif
                  text-4xl
                  md:text-5xl
                  font-semibold
                  text-[#4B352A]
                  mt-3
                  leading-tight
                "
              >
                Made
                <span className="block text-[#8B5E3C] italic">
                  By Hand
                </span>
              </h2>


              <div className="w-10 h-px bg-[#8B5E3C] mx-auto mt-5" />


              <p
                className="
                  text-[#6D5546]
                  text-sm
                  mt-5
                  max-w-xs
                  mx-auto
                  leading-6
                "
              >
                Every knot carries a little piece of patience,
                creativity and love.
              </p>

            </div>

          </div>


          {/* =================================================
              STORY CONTENT
          ================================================= */}

          <div>

            <p
              className="
                uppercase
                tracking-[4px]
                text-[#8B5E3C]
                text-[10px]
                font-bold
              "
            >
              Our Story
            </p>


            <h2
              className="
                font-serif
                text-3xl
                md:text-4xl
                font-semibold
                text-[#4B352A]
                mt-3
                leading-tight
              "
            >
              Where Every Knot
              <span className="block text-[#8B5E3C] italic">
                Tells A Story
              </span>
            </h2>


            <div className="w-10 h-[2px] bg-[#8B5E3C] mt-5" />


            <div
              className="
                text-gray-500
                text-sm
                md:text-base
                leading-7
                mt-6
                space-y-4
              "
            >

              <p>
                RoKaShree started with a simple dream — creating
                beautiful handcrafted macrame décor that makes every
                house feel warm, peaceful and unique.
              </p>

              <p>
                Every knot represents patience, creativity and dedication.
                We believe handmade products carry emotions that machines
                can never create.
              </p>

              <p>
                Our mission is to deliver timeless handcrafted décor
                that makes your home truly special.
              </p>

            </div>


            {/* Signature details */}

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">

              {[
                "Handcrafted",
                "Made With Care",
                "Made In India",
              ].map((item) => (

                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    font-semibold
                    text-[#8B5E3C]
                  "
                >

                  <span
                    className="
                      w-5
                      h-5
                      rounded-full
                      bg-[#F0E3D6]
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                    "
                  >
                    <FaCheck className="text-[7px]" />
                  </span>

                  {item}

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          BRAND PROMISE
      ===================================================== */}

      <div
        className="
          border-y
          border-[#E4D9CE]
          bg-[#FCF9F5]
        "
      >

        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">

          <div className="text-center max-w-2xl mx-auto mb-10">

            <p
              className="
                uppercase
                tracking-[4px]
                text-[#8B5E3C]
                text-[10px]
                font-bold
              "
            >
              Why RoKaShree
            </p>


            <h2
              className="
                font-serif
                text-3xl
                md:text-4xl
                font-semibold
                text-[#4B352A]
                mt-3
              "
            >
              The RoKaShree Promise
            </h2>


            <p className="text-gray-500 text-sm mt-3 leading-6">
              Thoughtfully created pieces where craftsmanship,
              quality and timeless design come together.
            </p>

          </div>


          {/* Features */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {features.map((feature) => (

              <div
                key={feature.title}
                className="
                  group
                  bg-white
                  border
                  border-[#E8DED3]
                  rounded-[22px]
                  p-6
                  shadow-[0_6px_25px_rgba(75,53,42,0.035)]
                  hover:-translate-y-1
                  hover:shadow-[0_12px_32px_rgba(75,53,42,0.07)]
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-[#F4EADF]
                    flex
                    items-center
                    justify-center
                    text-[#8B5E3C]
                    text-sm
                    group-hover:bg-[#8B5E3C]
                    group-hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  {feature.icon}
                </div>


                <h3
                  className="
                    text-base
                    font-bold
                    text-[#4B352A]
                    mt-5
                  "
                >
                  {feature.title}
                </h3>


                <p
                  className="
                    text-gray-500
                    text-xs
                    leading-6
                    mt-2
                  "
                >
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* =====================================================
          MISSION
      ===================================================== */}

      <div className="max-w-6xl mx-auto px-6 py-18 md:py-20">

        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            bg-[#7E5337]
            px-7
            py-12
            md:px-14
            md:py-14
            text-center
            shadow-[0_15px_45px_rgba(139,94,60,0.12)]
          "
        >

          {/* Subtle decoration */}

          <div
            className="
              absolute
              -top-24
              -right-20
              w-52
              h-52
              rounded-full
              border
              border-white/10
            "
          />

          <div
            className="
              absolute
              -bottom-28
              -left-20
              w-60
              h-60
              rounded-full
              border
              border-white/10
            "
          />


          <div className="relative z-10 max-w-2xl mx-auto">

            <p
              className="
                uppercase
                tracking-[4px]
                text-white/60
                text-[9px]
                font-bold
              "
            >
              Our Purpose
            </p>


            <h2
              className="
                font-serif
                text-3xl
                md:text-4xl
                font-semibold
                text-white
                mt-3
              "
            >
              Crafted For Beautiful Living
            </h2>


            <div className="w-10 h-px bg-white/50 mx-auto mt-5" />


            <p
              className="
                text-white/75
                text-sm
                md:text-base
                leading-7
                mt-5
              "
            >
              To create premium handcrafted macrame décor that inspires
              beautiful living spaces while supporting traditional handmade
              craftsmanship and sustainable practices.
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="max-w-6xl mx-auto px-6 pb-18">

        <div
          className="
            bg-white
            border-y
            border-[#E4D9CE]
            grid
            grid-cols-2
            lg:grid-cols-4
          "
        >

          {stats.map((item, index) => (

            <div
              key={item.title}
              className={`
                text-center
                py-7
                px-4

                ${
                  index !== 0
                    ? "lg:border-l border-[#E5D9CC]"
                    : ""
                }

                ${
                  index >= 2
                    ? "border-t lg:border-t-0 border-[#E5D9CC]"
                    : ""
                }
              `}
            >

              <h2
                className="
                  font-serif
                  text-3xl
                  md:text-4xl
                  font-semibold
                  text-[#8B5E3C]
                "
              >
                {item.number}
              </h2>


              <p
                className="
                  mt-2
                  text-[9px]
                  md:text-[10px]
                  uppercase
                  tracking-[2px]
                  text-gray-500
                  font-semibold
                "
              >
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <div
        className="
          bg-[#FCF9F5]
          border-y
          border-[#E4D9CE]
        "
      >

        <div className="max-w-6xl mx-auto px-6 py-18 md:py-20">

          <div className="text-center">

            <p
              className="
                uppercase
                tracking-[4px]
                text-[#8B5E3C]
                text-[10px]
                font-bold
              "
            >
              Testimonials
            </p>


            <h2
              className="
                font-serif
                text-3xl
                md:text-4xl
                font-semibold
                text-[#4B352A]
                mt-3
              "
            >
              Loved By Our Customers
            </h2>


            <p className="text-gray-500 text-sm mt-3">
              A few words from the people who welcomed RoKaShree
              into their homes.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-5 mt-10">

            {reviews.map((review) => (

              <div
                key={review.name}
                className="
                  bg-white
                  rounded-[22px]
                  border
                  border-[#E8DED4]
                  p-6
                  shadow-[0_6px_25px_rgba(75,53,42,0.035)]
                  hover:-translate-y-1
                  hover:shadow-[0_12px_32px_rgba(75,53,42,0.07)]
                  transition-all
                  duration-300
                "
              >

                <FaQuoteLeft className="text-[#E4D0BE] text-lg" />


                <div className="flex gap-1 text-[#B6875D] mt-4 text-[10px]">

                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} />
                  ))}

                </div>


                <p
                  className="
                    text-gray-600
                    text-sm
                    leading-7
                    mt-4
                    italic
                  "
                >
                  “{review.review}”
                </p>


                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mt-5
                    pt-5
                    border-t
                    border-[#EEE4D8]
                  "
                >

                  <div
                    className="
                      w-9
                      h-9
                      rounded-full
                      bg-[#F4EADF]
                      flex
                      items-center
                      justify-center
                      text-[#8B5E3C]
                      text-sm
                      font-bold
                    "
                  >
                    {review.name.charAt(0)}
                  </div>


                  <div>

                    <h3
                      className="
                        text-sm
                        font-bold
                        text-[#4B352A]
                      "
                    >
                      {review.name}
                    </h3>

                    <p className="text-[10px] text-gray-400 mt-0.5">
                      Verified Customer
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <div className="max-w-6xl mx-auto px-6 py-18 md:py-20">

        <div className="text-center max-w-2xl mx-auto">

          <p
            className="
              uppercase
              tracking-[5px]
              text-[#8B5E3C]
              text-[10px]
              font-bold
            "
          >
            Discover The Collection
          </p>


          <h2
            className="
              font-serif
              text-3xl
              md:text-4xl
              lg:text-5xl
              font-semibold
              text-[#4B352A]
              mt-4
              leading-tight
            "
          >
            Bring Handmade Beauty
            <span className="block text-[#8B5E3C] italic">
              Into Your Home
            </span>
          </h2>


          <p
            className="
              text-gray-500
              text-sm
              md:text-base
              mt-5
              leading-7
            "
          >
            Discover handcrafted macrame pieces designed to make
            your space feel warm, elegant and truly yours.
          </p>


         <Link
  to="/shop"
  className="
    group
    inline-flex
    items-center
    gap-3
    mt-7
    text-[#8B5E3C]
    text-sm
    font-semibold
    tracking-[0.3px]
    transition-all
    duration-300
  "
>
  <span className="relative py-1">
    Explore Collection

    <span
      className="
        absolute
        left-0
        -bottom-1
        w-full
        h-px
        bg-[#8B5E3C]
        origin-left
        transition-transform
        duration-300
        group-hover:scale-x-0
      "
    />

    <span
      className="
        absolute
        left-0
        -bottom-1
        w-0
        h-px
        bg-[#6D472D]
        transition-all
        duration-500
        group-hover:w-full
      "
    />
  </span>

  <span
    className="
      text-base
      font-normal
      transition-all
      duration-300
      group-hover:translate-x-1
    "
  >
    →
  </span>
</Link>

        </div>

      </div>

    </section>
  );
}