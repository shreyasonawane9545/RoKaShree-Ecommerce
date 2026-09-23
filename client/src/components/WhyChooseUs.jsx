import {
  FaTruck,
  FaLeaf,
  FaGift,
  FaLock,
  FaHeart,
} from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Free Shipping",
      desc: "Complimentary delivery on orders above ₹999.",
    },
    {
      icon: <FaLeaf />,
      title: "100% Handmade",
      desc: "Premium macrame crafted with natural cotton cords.",
    },
    {
      icon: <FaGift />,
      title: "Gift Ready",
      desc: "Thoughtfully packaged and ready to make someone smile.",
    },
    {
      icon: <FaLock />,
      title: "Secure Payments",
      desc: "A safe and seamless checkout experience.",
    },
    {
      icon: <FaHeart />,
      title: "Made With Love",
      desc: "Every piece is created with patience and passion.",
    },
  ];

  return (
    <section className="relative bg-[#FBF8F4] py-20 md:py-24 px-6 overflow-hidden">

      {/* =====================================================
          SUBTLE BACKGROUND
      ===================================================== */}

      <div
        className="
          absolute
          -top-32
          -left-32
          w-72
          h-72
          rounded-full
          bg-[#E8D6C3]/20
          blur-3xl
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-32
          -right-32
          w-72
          h-72
          rounded-full
          bg-[#E8D6C3]/15
          blur-3xl
          pointer-events-none
        "
      />


      {/* =====================================================
          CONTAINER
      ===================================================== */}

      <div className="relative max-w-7xl mx-auto">


        {/* =================================================
            HEADER
        ================================================= */}

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
            The RoKaShree Promise
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
            Crafted With Passion
            <span className="block text-[#8B5E3C] italic font-medium mt-1">
              Designed For Elegance
            </span>
          </h2>


          {/* Refined divider */}

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
              max-w-2xl
              mx-auto
            "
          >
            Every RoKaShree creation is thoughtfully handcrafted using
            premium cotton rope and timeless craftsmanship, bringing
            warmth and natural elegance into your home.
          </p>

        </div>


        {/* =================================================
            FEATURES
        ================================================= */}

        <div
          className="
            mt-12
            md:mt-14
            bg-white
            border
            border-[#E8DED4]
            rounded-[28px]
            shadow-[0_12px_40px_rgba(75,53,42,0.05)]
            overflow-hidden
          "
        >

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-5
            "
          >

            {features.map((item, index) => (

              <div
                key={item.title}
                className={`
                  group
                  relative
                  px-6
                  py-7
                  md:px-5
                  md:py-8
                  text-center
                  hover:bg-[#FCF9F5]
                  transition-all
                  duration-300
                  ${
                    index !== 0
                      ? "border-t sm:border-t-0 sm:border-l border-[#EEE5DC]"
                      : ""
                  }
                  ${
                    index === 2
                      ? "lg:border-l"
                      : ""
                  }
                `}
              >

                {/* =================================================
                    ICON
                ================================================= */}

                <div
                  className="
                    w-11
                    h-11
                    mx-auto
                    rounded-2xl
                    bg-[#F5EADF]
                    text-[#8B5E3C]
                    flex
                    items-center
                    justify-center
                    text-sm
                    group-hover:bg-[#8B5E3C]
                    group-hover:text-white
                    group-hover:-translate-y-1
                    transition-all
                    duration-300
                  "
                >
                  {item.icon}
                </div>


                {/* =================================================
                    TITLE
                ================================================= */}

                <h3
                  className="
                    text-sm
                    md:text-base
                    font-bold
                    text-[#4B352A]
                    mt-4
                  "
                >
                  {item.title}
                </h3>


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <p
                  className="
                    text-gray-500
                    text-xs
                    leading-5
                    mt-2
                    max-w-[190px]
                    mx-auto
                  "
                >
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>


        {/* =================================================
            BOTTOM BRAND STATEMENT
        ================================================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-3
            sm:gap-5
            mt-10
          "
        >

          <span className="w-8 h-px bg-[#D8C6B5]" />

          <p
            className="
              text-[#8B5E3C]
              text-[10px]
              md:text-xs
              font-bold
              uppercase
              tracking-[3px]
              text-center
            "
          >
            Handmade • Thoughtful • Timeless
          </p>

          <span className="w-8 h-px bg-[#D8C6B5]" />

        </div>

      </div>

    </section>
  );
}