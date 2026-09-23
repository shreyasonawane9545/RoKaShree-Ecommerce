import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import {
  FaNewspaper,
  FaSyncAlt,
  FaUsers,
  FaArrowUp,
} from "react-icons/fa";

import AdminNavbar from "./AdminNavbar";
import { db } from "../firebase/firebase";

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // =========================================================
  // FETCH SUBSCRIBERS
  // =========================================================
  const fetchSubscribers = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const subscribersQuery = query(
        collection(db, "newsletterSubscribers"),
        orderBy("subscribedAt", "desc")
      );

      const snapshot = await getDocs(subscribersQuery);

      const subscriberList = snapshot.docs.map((subscriberDoc) => ({
        id: subscriberDoc.id,
        ...subscriberDoc.data(),
      }));

      setSubscribers(subscriberList);
    } catch (error) {
      console.error(
        "Error fetching newsletter subscribers:",
        error
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================
  useEffect(() => {
    fetchSubscribers();
  }, []);

  // =========================================================
  // FORMAT DATE
  // =========================================================
  const formatDate = (timestamp) => {
    if (!timestamp) return "—";

    try {
      const date = timestamp.toDate
        ? timestamp.toDate()
        : new Date(timestamp);

      return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F3ED]">
        <AdminNavbar />

        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="flex flex-col items-center">

            <div
              className="
                h-7
                w-7
                animate-spin
                rounded-full
                border-2
                border-[#D8C9BD]
                border-t-[#8B5E3C]
              "
            />

            <p className="mt-4 text-[11px] tracking-wide text-[#8C7A6E]">
              Loading subscribers
            </p>

          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================
  return (
    <div className="min-h-screen bg-[#F8F3ED] text-[#4B352A]">

      <AdminNavbar />

      <main className="mx-auto max-w-[1120px] px-5 py-8 md:px-8 md:py-10">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p
              className="
                mb-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.32em]
                text-[#9A6848]
              "
            >
              Newsletter
            </p>

            <div className="flex items-center gap-3">

              <h1
                className="
                  font-serif
                  text-[32px]
                  font-semibold
                  leading-none
                  text-[#4B352A]
                  md:text-[38px]
                "
              >
                Subscribers
              </h1>

              {/* TOTAL COUNT */}
              <span
                className="
                  flex
                  h-7
                  min-w-7
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D8C8BB]
                  bg-white
                  px-2.5
                  text-[11px]
                  font-semibold
                  text-[#765640]
                "
              >
                {subscribers.length}
              </span>

            </div>

            <div className="mt-3 flex items-center gap-2">

              <FaUsers
                size={9}
                className="text-[#A0806A]"
              />

              <span className="text-[11px] text-[#8C7A6E]">
                {subscribers.length === 1
                  ? "1 subscriber"
                  : `${subscribers.length} subscribers`}
              </span>

            </div>

          </div>

          {/* =================================================
              REFRESH BUTTON
          ================================================= */}
          <button
            type="button"
            onClick={() => fetchSubscribers(true)}
            disabled={refreshing}
            className="
              group
              self-start
              sm:self-auto
              flex
              h-10
              items-center
              gap-2
              rounded-full
              border
              border-[#D8C8BB]
              bg-white
              px-4
              text-[11px]
              font-semibold
              tracking-wide
              text-[#6D5546]
              shadow-[0_4px_16px_rgba(75,53,42,0.045)]
              transition-all
              duration-200
              hover:-translate-y-[1px]
              hover:border-[#CDB8A8]
              hover:bg-[#FBF8F4]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <FaSyncAlt
              size={10}
              className={`
                transition-transform
                duration-500
                ${
                  refreshing
                    ? "animate-spin"
                    : "group-hover:rotate-180"
                }
              `}
            />

            {refreshing ? "Refreshing" : "Refresh"}
          </button>

        </div>

       

        {/* =====================================================
            SUBSCRIBER LIST
        ===================================================== */}
        <div
          className="
            overflow-hidden
            rounded-[18px]
            border
            border-[#D8C8BB]
            bg-white
            shadow-[0_10px_32px_rgba(75,53,42,0.055)]
          "
        >

          {/* ===================================================
              LIST HEADER
          =================================================== */}
          {subscribers.length > 0 && (
            <div
              className="
                flex
                h-11
                items-center
                justify-between
                border-b
                border-[#E8DED6]
                bg-[#FCFAF7]
                px-5
              "
            >

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-[#9A6848]
                "
              >
                Subscriber List
              </span>

              <span className="text-[10px] text-[#A08F84]">
                Latest first
              </span>

            </div>
          )}

          {/* ===================================================
              EMPTY STATE
          =================================================== */}
          {subscribers.length === 0 ? (

            <div className="px-6 py-20 text-center">

              <div
                className="
                  mx-auto
                  mb-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#E1D1C3]
                  bg-[#F3E8DE]
                "
              >
                <FaNewspaper
                  size={17}
                  className="text-[#9A6848]"
                />
              </div>

              <h2
                className="
                  font-serif
                  text-[22px]
                  text-[#4B352A]
                "
              >
                No subscribers yet
              </h2>

              <p
                className="
                  mt-2
                  text-[11px]
                  text-[#988980]
                "
              >
                Newsletter subscribers will appear here.
              </p>

            </div>

          ) : (

            /* =================================================
               SUBSCRIBERS
            ================================================= */
            subscribers.map((subscriber) => {

              const initial =
                subscriber.email
                  ?.charAt(0)
                  ?.toUpperCase() || "N";

              return (
                <div
                  key={subscriber.id}
                  className="
                    group
                    relative
                    flex
                    items-center
                    gap-4
                    border-b
                    border-[#EAE2DB]
                    px-5
                    py-4
                    last:border-b-0
                    transition-all
                    duration-200
                    hover:bg-[#FCFAF8]
                  "
                >

                  {/* =================================================
                      LEFT ACCENT
                  ================================================= */}
                  <span
                    className="
                      absolute
                      left-0
                      top-1/2
                      h-8
                      w-[3px]
                      -translate-y-1/2
                      rounded-r-full
                      bg-transparent
                      transition-colors
                      duration-200
                      group-hover:bg-[#B28A6D]
                    "
                  />

                  {/* =================================================
                      AVATAR
                  ================================================= */}
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#DECABB]
                      bg-[#F1E3D7]
                      font-serif
                      text-[17px]
                      text-[#8B5E3C]
                      transition-all
                      duration-200
                      group-hover:border-[#CDB5A4]
                    "
                  >
                    {initial}
                  </div>

                  {/* =================================================
                      EMAIL
                  ================================================= */}
                  <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-2.5">

                      <p
                        className="
                          truncate
                          text-[13px]
                          font-semibold
                          text-[#4B352A]
                        "
                      >
                        {subscriber.email || "—"}
                      </p>

                      <span
                        className="
                          hidden
                          shrink-0
                          rounded-full
                          border
                          border-[#D6C8BD]
                          bg-[#F5F0EC]
                          px-2
                          py-[3px]
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[0.12em]
                          text-[#88776B]
                          sm:inline-flex
                        "
                      >
                        Subscribed
                      </span>

                    </div>

                    <p
                      className="
                        mt-1
                        text-[10px]
                        text-[#9A8B82]
                      "
                    >
                      Joined the RoKaShree newsletter
                    </p>

                  </div>

                  {/* =================================================
                      DATE
                  ================================================= */}
                  <div
                    className="
                      hidden
                      shrink-0
                      text-right
                      md:block
                      md:w-[155px]
                    "
                  >
                    <p className="text-[10px] text-[#8F8077]">
                      {formatDate(
                        subscriber.subscribedAt
                      )}
                    </p>

                    <p className="mt-1 text-[8px] uppercase tracking-[0.14em] text-[#B09F94]">
                      Joined
                    </p>
                  </div>

                </div>
              );
            })
          )}

        </div>

        {/* =====================================================
            BOTTOM NOTE
        ===================================================== */}
        {subscribers.length > 0 && (
          <div className="mt-4 flex items-center justify-between px-1">

            <p className="text-[10px] text-[#A08F84]">
              Newsletter audience is stored securely.
            </p>

            <p className="text-[10px] text-[#B09F94]">
              {subscribers.length} total
            </p>

          </div>
        )}

      </main>
    </div>
  );
}