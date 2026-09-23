import { useState, useRef, useEffect } from "react";
import {
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";

export default function CustomDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select",
}) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  // =========================================================
  // CLOSE WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =========================================================
  // SELECT OPTION
  // =========================================================

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
    >

      {/* =====================================================
          DROPDOWN BUTTON
      ===================================================== */}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`
          group
          w-full
          h-[48px]
          rounded-xl
          border
          px-3.5
          flex
          items-center
          justify-between
          gap-3
          text-left
          bg-[#FCFAF8]
          transition-all
          duration-300
          focus:outline-none

          ${
            open
              ? `
                border-[#8B5E3C]
                bg-white
                shadow-[0_6px_20px_rgba(139,94,60,0.08)]
              `
              : `
                border-[#E6DDD4]
                hover:border-[#CBAF91]
              `
          }
        `}
        aria-haspopup="listbox"
        aria-expanded={open}
      >

        {/* =================================================
            VALUE
        ================================================= */}

        <span
          className={`
            flex-1
            truncate
            text-sm

            ${
              value
                ? "text-[#4B352A]"
                : "text-[#B7AAA0]"
            }
          `}
        >
          {value || placeholder}
        </span>


        {/* =================================================
            CHEVRON
        ================================================= */}

        <span
          className={`
            w-7
            h-7
            rounded-lg
            flex
            items-center
            justify-center
            flex-shrink-0
            transition-all
            duration-300

            ${
              open
                ? "bg-[#8B5E3C] rotate-180"
                : "bg-[#F3E8DA]"
            }
          `}
        >

          <FaChevronDown
            className={`
              text-[9px]
              transition-colors
              duration-300

              ${
                open
                  ? "text-white"
                  : "text-[#8B5E3C]"
              }
            `}
          />

        </span>

      </button>


      {/* =====================================================
          DROPDOWN MENU
      ===================================================== */}

      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[54px]
            z-[100]

            bg-white

            border
            border-[#E7DDD4]

            rounded-[16px]

            shadow-[0_14px_40px_rgba(75,53,42,0.13)]

            overflow-hidden

            animate-[fadeIn_.18s_ease-out]
          "
          role="listbox"
        >

          {/* =================================================
              OPTIONS
          ================================================= */}

          <div
            className="
              max-h-[190px]
              overflow-y-auto
              py-1.5

              scrollbar-thin
              scrollbar-thumb-[#CDB7A3]
              scrollbar-track-[#F8F3ED]
            "
          >

            {options.length === 0 ? (

              <div className="
                px-4
                py-4
                text-center
                text-xs
                text-gray-400
              ">
                No options available
              </div>

            ) : (

              options.map((option, index) => {

                const isSelected =
                  value === option;

                return (
                  <button
                    key={`${option}-${index}`}
                    type="button"
                    onClick={() =>
                      handleSelect(option)
                    }
                    className={`
                      w-full
                      min-h-[40px]

                      px-4
                      py-2

                      flex
                      items-center
                      justify-between
                      gap-3

                      text-left
                      text-sm

                      transition-all
                      duration-200

                      ${
                        isSelected
                          ? `
                            bg-[#8B5E3C]
                            text-white
                            font-medium
                          `
                          : `
                            text-[#4B352A]
                            hover:bg-[#F8F3ED]
                            hover:text-[#8B5E3C]
                          `
                      }
                    `}
                    role="option"
                    aria-selected={isSelected}
                  >

                    {/* OPTION TEXT */}

                    <span className="truncate">
                      {option}
                    </span>


                    {/* CHECK */}

                    {isSelected && (
                      <span
                        className="
                          w-5
                          h-5
                          rounded-full
                          bg-white/20
                          flex
                          items-center
                          justify-center
                          flex-shrink-0
                        "
                      >
                        <FaCheck className="text-[8px]" />
                      </span>
                    )}

                  </button>
                );
              })

            )}

          </div>

        </div>
      )}

    </div>
  );
}