import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select your date of birth",
}) {
  const pickerRef = useRef(null);

  const today = useMemo(() => new Date(), []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  /* =========================================================
     INITIAL DATE
  ========================================================= */

  const getInitialDate = () => {
    if (value) {
      const date = new Date(`${value}T00:00:00`);

      if (!Number.isNaN(date.getTime())) {
        return date;
      }
    }

    return today;
  };

  const initialDate = getInitialDate();

  const [open, setOpen] = useState(false);

  const [currentDate, setCurrentDate] = useState(
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      1
    )
  );

  const [view, setView] = useState("calendar");

  const [yearPage, setYearPage] = useState(
    Math.floor(initialDate.getFullYear() / 12) * 12
  );

  /* =========================================================
     SYNC WITH VALUE
  ========================================================= */

  useEffect(() => {
    if (!value) return;

    const date = new Date(`${value}T00:00:00`);

    if (Number.isNaN(date.getTime())) return;

    setCurrentDate(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      )
    );

    setYearPage(
      Math.floor(date.getFullYear() / 12) * 12
    );
  }, [value]);

  /* =========================================================
     CLOSE OUTSIDE + ESCAPE
  ========================================================= */

  useEffect(() => {
    const handleOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setOpen(false);
        setView("calendar");
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setView("calendar");
      }
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* =========================================================
     DATE VALUES
  ========================================================= */

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  /* =========================================================
     YEAR RANGE
  ========================================================= */

  const minYear = 1900;
  const maxYear = todayYear;

  const years = [];

  for (
    let currentYear = yearPage;
    currentYear < yearPage + 12;
    currentYear++
  ) {
    if (
      currentYear >= minYear &&
      currentYear <= maxYear
    ) {
      years.push(currentYear);
    }
  }

  const canPreviousYearPage =
    yearPage > minYear;

  const canNextYearPage =
    yearPage + 11 < maxYear;

  /* =========================================================
     FORMAT
  ========================================================= */

  const formatDate = (date) => {
    const day = String(
      date.getDate()
    ).padStart(2, "0");

    const monthValue = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const yearValue =
      date.getFullYear();

    return `${yearValue}-${monthValue}-${day}`;
  };

  const displayValue = value
    ? new Date(
        `${value}T00:00:00`
      ).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "";

  /* =========================================================
     SELECT DATE
  ========================================================= */

  const selectDate = (day) => {
    if (!day) return;

    const selected = new Date(
      year,
      month,
      day
    );

    if (selected > today) return;

    onChange(formatDate(selected));

    setCurrentDate(
      new Date(
        selected.getFullYear(),
        selected.getMonth(),
        1
      )
    );

    setOpen(false);
    setView("calendar");
  };

  /* =========================================================
     MONTH NAVIGATION
  ========================================================= */

  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const nextMonth = () => {
    const next = new Date(
      year,
      month + 1,
      1
    );

    if (
      next.getFullYear() > todayYear ||
      (
        next.getFullYear() === todayYear &&
        next.getMonth() > todayMonth
      )
    ) {
      return;
    }

    setCurrentDate(next);
  };

  /* =========================================================
     YEAR SELECTION
  ========================================================= */

  const selectYear = (selectedYear) => {
    let selectedMonth = month;

    if (
      selectedYear === todayYear &&
      selectedMonth > todayMonth
    ) {
      selectedMonth = todayMonth;
    }

    setCurrentDate(
      new Date(
        selectedYear,
        selectedMonth,
        1
      )
    );

    setView("calendar");
  };

  /* =========================================================
     MONTH SELECTION
  ========================================================= */

  const selectMonth = (selectedMonth) => {
    if (
      year === todayYear &&
      selectedMonth > todayMonth
    ) {
      return;
    }

    setCurrentDate(
      new Date(
        year,
        selectedMonth,
        1
      )
    );

    setView("calendar");
  };

  /* =========================================================
     YEAR PAGE NAVIGATION
  ========================================================= */

  const previousYearPage = () => {
    if (!canPreviousYearPage) return;

    setYearPage((previous) =>
      Math.max(
        minYear,
        previous - 12
      )
    );
  };

  const nextYearPage = () => {
    if (!canNextYearPage) return;

    setYearPage((previous) =>
      Math.min(
        Math.floor(maxYear / 12) * 12,
        previous + 12
      )
    );
  };

  /* =========================================================
     CLEAR
  ========================================================= */

  const clearDate = (event) => {
    event.stopPropagation();

    onChange("");

    setCurrentDate(
      new Date(
        todayYear,
        todayMonth,
        1
      )
    );

    setYearPage(
      Math.floor(todayYear / 12) * 12
    );

    setOpen(false);
    setView("calendar");
  };

  /* =========================================================
     OPEN
  ========================================================= */

  const handleOpen = () => {
    if (!open) {
      if (value) {
        const selected = new Date(
          `${value}T00:00:00`
        );

        if (!Number.isNaN(selected.getTime())) {
          setCurrentDate(
            new Date(
              selected.getFullYear(),
              selected.getMonth(),
              1
            )
          );

          setYearPage(
            Math.floor(
              selected.getFullYear() / 12
            ) * 12
          );
        }
      } else {
        setCurrentDate(
          new Date(
            todayYear,
            todayMonth,
            1
          )
        );

        setYearPage(
          Math.floor(todayYear / 12) * 12
        );
      }
    }

    setOpen((previous) => !previous);
    setView("calendar");
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      ref={pickerRef}
      className="relative w-full"
    >
      {/* =====================================================
          INPUT
      ===================================================== */}

      <button
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`
          group
          w-full
          h-[48px]
          rounded-[14px]
          border
          px-3
          flex
          items-center
          gap-3
          text-left
          bg-[#FCFAF8]
          transition-all
          duration-300

          ${
            open
              ? "border-[#8B5E3C] bg-white shadow-[0_6px_22px_rgba(139,94,60,0.08)]"
              : "border-[#E6DDD4] hover:border-[#CBAF91]"
          }
        `}
      >
        {/* ICON */}

        <span
          className={`
            w-7
            h-7
            rounded-[9px]
            flex
            items-center
            justify-center
            flex-shrink-0
            transition-all
            duration-300

            ${
              open
                ? "bg-[#8B5E3C] text-white"
                : "bg-[#F3E8DA] text-[#8B5E3C]"
            }
          `}
        >
          <FaCalendarAlt className="text-[10px]" />
        </span>

        {/* VALUE */}

        <span
          className={`
            flex-1
            min-w-0
            text-sm
            truncate

            ${
              displayValue
                ? "text-[#4B352A]"
                : "text-[#B7AAA0]"
            }
          `}
        >
          {displayValue || placeholder}
        </span>

        {/* CLEAR */}

        {value && (
          <span
            role="button"
            tabIndex={0}
            aria-label="Clear date"
            onClick={clearDate}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                clearDate(event);
              }
            }}
            className="
              w-6
              h-6
              rounded-full
              flex
              items-center
              justify-center
              text-[#A28770]
              hover:bg-[#F3E8DA]
              hover:text-[#8B5E3C]
              transition-all
              duration-200
              flex-shrink-0
            "
          >
            <FaTimes className="text-[8px]" />
          </span>
        )}
      </button>

      {/* =====================================================
          PICKER
      ===================================================== */}

      {open && (
        <div
          role="dialog"
          aria-label="Date of birth picker"
          className="
            absolute
            z-[100]
            left-0
            top-[54px]
            w-[260px]
            max-w-[calc(100vw-24px)]
            bg-[#FFFEFC]
            border
            border-[#E5DAD0]
            rounded-[18px]
            shadow-[0_20px_50px_rgba(60,42,31,0.14)]
            overflow-hidden
            animate-[datePickerIn_.22s_cubic-bezier(.22,1,.36,1)]
          "
        >
          {/* =================================================
              MONTH + YEAR SELECTORS
          ================================================= */}

          <div
            className="
              px-3.5
              pt-3
              pb-2.5
              bg-gradient-to-br
              from-[#FFFDFC]
              via-[#FAF4EE]
              to-[#F4E8DC]
              border-b
              border-[#EDE2D8]
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              {/* MONTH */}

              <button
                type="button"
                onClick={() =>
                  setView("month")
                }
                className="
                  flex-1
                  h-8
                  px-2.5
                  rounded-[10px]
                  bg-white
                  border
                  border-[#E5D9CE]
                  text-left
                  transition-all
                  duration-200
                  hover:border-[#C8AA8E]
                "
              >
                <span
                  className="
                    flex
                    items-center
                    justify-between
                    gap-2
                    text-[10px]
                    font-semibold
                    text-[#4B352A]
                  "
                >
                  {months[month]}

                  <FaChevronDown
                    className="
                      text-[6px]
                      text-[#8B5E3C]
                    "
                  />
                </span>
              </button>

              {/* YEAR */}

              <button
                type="button"
                onClick={() => {
                  setYearPage(
                    Math.floor(
                      year / 12
                    ) * 12
                  );

                  setView("year");
                }}
                className="
                  w-[82px]
                  h-8
                  px-2.5
                  rounded-[10px]
                  bg-white
                  border
                  border-[#E5D9CE]
                  text-left
                  transition-all
                  duration-200
                  hover:border-[#C8AA8E]
                "
              >
                <span
                  className="
                    flex
                    items-center
                    justify-between
                    gap-2
                    text-[10px]
                    font-semibold
                    text-[#4B352A]
                  "
                >
                  {year}

                  <FaChevronDown
                    className="
                      text-[6px]
                      text-[#8B5E3C]
                    "
                  />
                </span>
              </button>
            </div>
          </div>

          {/* =================================================
              YEAR VIEW
          ================================================= */}

          {view === "year" && (
            <div className="p-3.5">
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-2.5
                "
              >
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[1.4px]
                    font-semibold
                    text-[#8B5E3C]
                  "
                >
                  Select Year
                </p>

                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={
                      previousYearPage
                    }
                    disabled={
                      !canPreviousYearPage
                    }
                    aria-label="Previous years"
                    className="
                      w-7
                      h-7
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-[#8B5E3C]
                      hover:bg-[#F7EFE7]
                      disabled:opacity-25
                      disabled:cursor-not-allowed
                      transition
                    "
                  >
                    <FaChevronLeft className="text-[8px]" />
                  </button>

                  <button
                    type="button"
                    onClick={
                      nextYearPage
                    }
                    disabled={
                      !canNextYearPage
                    }
                    aria-label="Next years"
                    className="
                      w-7
                      h-7
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-[#8B5E3C]
                      hover:bg-[#F7EFE7]
                      disabled:opacity-25
                      disabled:cursor-not-allowed
                      transition
                    "
                  >
                    <FaChevronRight className="text-[8px]" />
                  </button>
                </div>
              </div>

              <div
                className="
                  grid
                  grid-cols-3
                  gap-1.5
                "
              >
                {years.map(
                  (yearValue) => {
                    const selected =
                      yearValue === year;

                    return (
                      <button
                        key={yearValue}
                        type="button"
                        onClick={() =>
                          selectYear(
                            yearValue
                          )
                        }
                        className={`
                          h-8
                          rounded-[9px]
                          text-[10px]
                          font-semibold
                          transition-all
                          duration-200

                          ${
                            selected
                              ? "bg-[#8B5E3C] text-white shadow-[0_4px_10px_rgba(139,94,60,0.16)]"
                              : "bg-[#FCFAF8] text-[#5E4A3D] border border-[#EEE5DE] hover:bg-[#F7EFE7] hover:border-[#DCC6B2] hover:text-[#8B5E3C]"
                          }
                        `}
                      >
                        {yearValue}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* =================================================
              MONTH VIEW
          ================================================= */}

          {view === "month" && (
            <div className="p-3.5">
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-2.5
                "
              >
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[1.4px]
                    font-semibold
                    text-[#8B5E3C]
                  "
                >
                  Select Month
                </p>

                <span
                  className="
                    text-[9px]
                    font-semibold
                    text-[#A28770]
                  "
                >
                  {year}
                </span>
              </div>

              <div
                className="
                  grid
                  grid-cols-3
                  gap-1.5
                "
              >
                {months.map(
                  (monthName, index) => {
                    const selected =
                      index === month;

                    const disabled =
                      year === todayYear &&
                      index > todayMonth;

                    return (
                      <button
                        key={monthName}
                        type="button"
                        disabled={disabled}
                        onClick={() =>
                          selectMonth(
                            index
                          )
                        }
                        className={`
                          h-8
                          rounded-[9px]
                          text-[9px]
                          font-semibold
                          transition-all
                          duration-200

                          ${
                            selected
                              ? "bg-[#8B5E3C] text-white shadow-[0_4px_10px_rgba(139,94,60,0.16)]"
                              : disabled
                              ? "bg-[#FAF7F4] text-[#D8D0C9] cursor-not-allowed"
                              : "bg-[#FCFAF8] text-[#5E4A3D] border border-[#EEE5DE] hover:bg-[#F7EFE7] hover:border-[#DCC6B2] hover:text-[#8B5E3C]"
                          }
                        `}
                      >
                        {monthName}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* =================================================
              CALENDAR VIEW
          ================================================= */}

          {view === "calendar" && (
            <div className="p-3">
              {/* MONTH HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-1.5
                "
              >
                <button
                  type="button"
                  onClick={
                    previousMonth
                  }
                  aria-label="Previous month"
                  className="
                    w-7
                    h-7
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[#8B5E3C]
                    hover:bg-[#F7EFE7]
                    transition-all
                    duration-200
                  "
                >
                  <FaChevronLeft className="text-[8px]" />
                </button>

                <div className="text-center">
                  <p
                    className="
                      font-serif
                      text-[13px]
                      font-semibold
                      text-[#4B352A]
                    "
                  >
                    {months[month]}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setView("year")
                    }
                    className="
                      flex
                      items-center
                      justify-center
                      gap-1
                      mx-auto
                      mt-0.5
                      text-[8px]
                      font-semibold
                      tracking-[0.8px]
                      text-[#A28770]
                      hover:text-[#8B5E3C]
                      transition
                    "
                  >
                    {year}

                    <FaChevronDown
                      className="text-[5px]"
                    />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={nextMonth}
                  disabled={
                    year === todayYear &&
                    month === todayMonth
                  }
                  aria-label="Next month"
                  className="
                    w-7
                    h-7
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-[#8B5E3C]
                    hover:bg-[#F7EFE7]
                    disabled:opacity-25
                    disabled:cursor-not-allowed
                    transition-all
                    duration-200
                  "
                >
                  <FaChevronRight className="text-[8px]" />
                </button>
              </div>

              {/* WEEKDAYS */}

              <div
                className="
                  grid
                  grid-cols-7
                  border-t
                  border-[#F0E8E0]
                  border-b
                  py-0.5
                "
              >
                {weekDays.map(
                  (day, index) => (
                    <div
                      key={`${day}-${index}`}
                      className="
                        h-5
                        flex
                        items-center
                        justify-center
                        text-[7px]
                        font-bold
                        text-[#A28770]
                      "
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* DAYS */}

              <div
                className="
                  grid
                  grid-cols-7
                  gap-y-0
                  mt-0.5
                "
              >
                {days.map(
                  (day, index) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${index}`}
                          className="h-6"
                        />
                      );
                    }

                    const selected =
                      value &&
                      new Date(
                        `${value}T00:00:00`
                      ).getFullYear() ===
                        year &&
                      new Date(
                        `${value}T00:00:00`
                      ).getMonth() ===
                        month &&
                      new Date(
                        `${value}T00:00:00`
                      ).getDate() ===
                        day;

                    const todayDate =
                      todayYear === year &&
                      todayMonth === month &&
                      todayDay === day;

                    const future =
                      new Date(
                        year,
                        month,
                        day
                      ) > today;

                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={future}
                        onClick={() =>
                          selectDate(day)
                        }
                        aria-label={`${months[month]} ${day}, ${year}`}
                        className={`
                          relative
                          w-[22px]
                          h-[22px]
                          mx-auto
                          rounded-full
                          flex
                          items-center
                          justify-center
                          text-[8px]
                          transition-all
                          duration-150

                          ${
                            selected
                              ? "bg-[#8B5E3C] text-white font-bold shadow-[0_3px_8px_rgba(139,94,60,0.18)]"
                              : future
                              ? "text-[#D9D1CA] cursor-not-allowed"
                              : todayDate
                              ? "bg-[#F3E8DA] text-[#8B5E3C] font-bold"
                              : "text-[#5E4A3D] hover:bg-[#F7EFE7] hover:text-[#8B5E3C]"
                          }
                        `}
                      >
                        {day}

                        {todayDate &&
                          !selected && (
                            <span
                              className="
                                absolute
                                bottom-[2px]
                                w-[3px]
                                h-[3px]
                                rounded-full
                                bg-[#8B5E3C]
                              "
                            />
                          )}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>{`
        @keyframes datePickerIn {
          from {
            opacity: 0;
            transform: translateY(-4px) scale(0.985);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}