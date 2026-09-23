import {
  FaStar,
  FaQuoteLeft,
  FaCheckCircle,
} from "react-icons/fa";

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    review:
      "Absolutely loved the macrame wall hanging. The quality is outstanding and it completely transformed my living room.",
  },
  {
    name: "Ananya Patel",
    city: "Ahmedabad",
    review:
      "Beautiful craftsmanship and premium quality. Delivery was quick and the packaging was elegant.",
  },
  {
    name: "Riya Kapoor",
    city: "Delhi",
    review:
      "RoKaShree products are simply amazing. Every guest who visits my home asks where I bought them.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-[#FBF8F4] py-20 md:py-24 px-6 overflow-hidden">

      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}

      <div
        className="
          absolute
          -top-32
          left-1/2
          -translate-x-1/2
          w-80
          h-60
          rounded-full
          bg-[#E8D6C3]/15
          blur-3xl
          pointer-events-none
        "
      />


      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative max-w-6xl mx-auto">


        {/* =================================================
            HEADER
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
            Customer Stories
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
              leading-tight
            "
          >
            Loved by Our
            <span className="block text-[#8B5E3C] italic font-medium mt-1">
              Customers
            </span>
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
              text-sm
              md:text-base
              leading-7
              mt-5
              max-w-xl
              mx-auto
            "
          >
            Thoughtful words from customers who have welcomed
            RoKaShree into their homes.
          </p>

        </div>


        {/* =================================================
            TESTIMONIALS
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            md:gap-6
          "
        >

          {testimonials.map((item) => (

            <article
              key={item.name}
              className="
                group
                relative
                bg-white
                rounded-[26px]
                border
                border-[#E8DED5]
                px-7
                py-7
                shadow-[0_8px_30px_rgba(75,53,42,0.045)]
                hover:-translate-y-1
                hover:shadow-[0_16px_40px_rgba(75,53,42,0.08)]
                transition-all
                duration-400
              "
            >

              {/* =================================================
                  QUOTE
              ================================================= */}

              <div className="flex items-start justify-between">

                <div
                  className="
                    w-9
                    h-9
                    rounded-xl
                    bg-[#F6EEE6]
                    text-[#8B5E3C]
                    flex
                    items-center
                    justify-center
                    group-hover:bg-[#8B5E3C]
                    group-hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <FaQuoteLeft className="text-xs" />
                </div>


                {/* Verified */}

                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-[10px]
                    text-[#7A8A72]
                    font-semibold
                  "
                >
                  <FaCheckCircle className="text-[11px]" />
                  Verified
                </div>

              </div>


              {/* =================================================
                  RATING
              ================================================= */}

              <div className="flex items-center gap-1 mt-6">

                {[...Array(5)].map((_, starIndex) => (

                  <FaStar
                    key={starIndex}
                    className="text-[#C9975B] text-[11px]"
                  />

                ))}

              </div>


              {/* =================================================
                  REVIEW
              ================================================= */}

              <p
                className="
                  text-[#5F554F]
                  text-sm
                  leading-7
                  mt-5
                  min-h-[120px]
                "
              >
                “{item.review}”
              </p>


              {/* =================================================
                  DIVIDER
              ================================================= */}

              <div className="h-px bg-[#EEE5DD] mt-6" />


              {/* =================================================
                  CUSTOMER
              ================================================= */}

              <div className="flex items-center gap-3 mt-5">

                {/* Initial */}

                <div
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-[#8B5E3C]
                    text-white
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-semibold
                  "
                >
                  {item.name.charAt(0)}
                </div>


                <div>

                  <h3
                    className="
                      text-sm
                      font-bold
                      text-[#4B352A]
                    "
                  >
                    {item.name}
                  </h3>

                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.city}
                  </p>

                </div>

              </div>

            </article>

          ))}

        </div>


        {/* =================================================
            BOTTOM BRAND MESSAGE
        ================================================= */}

        <div
          className="
            border-t
            border-[#E4D9CF]
            mt-12
            pt-7
            flex
            flex-col
            sm:flex-row
            items-center
            justify-between
            gap-3
          "
        >

          <p
            className="
              text-[10px]
              uppercase
              tracking-[3px]
              text-[#8B5E3C]
              font-bold
            "
          >
            The RoKaShree Experience
          </p>


          <p
            className="
              text-xs
              text-gray-500
              italic
            "
          >
            Crafted with love. Loved by many.
          </p>

        </div>

      </div>

    </section>
  );
}