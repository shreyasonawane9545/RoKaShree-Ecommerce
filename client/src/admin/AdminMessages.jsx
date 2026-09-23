import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaSyncAlt,
  FaEye,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

import AdminNavbar from "./AdminNavbar";
import { db } from "../firebase/firebase";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  // =========================================================
  // FETCH MESSAGES
  // =========================================================
  const fetchMessages = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const messagesQuery = query(
        collection(db, "contactMessages"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(messagesQuery);

      const messageList = snapshot.docs.map((messageDoc) => ({
        id: messageDoc.id,
        ...messageDoc.data(),
      }));

      setMessages(messageList);

      // =====================================================
      // OPEN MESSAGE FROM NAVBAR
      // /admin/messages?message=abc123
      // =====================================================
      const messageId = searchParams.get("message");

      if (messageId) {
        const foundMessage = messageList.find(
          (message) => message.id === messageId
        );

        if (foundMessage) {
          setSelectedMessage(foundMessage);

          // Automatically mark New → Read
          if (foundMessage.status === "new") {
            try {
              await updateDoc(
                doc(db, "contactMessages", foundMessage.id),
                {
                  status: "read",
                }
              );

              setMessages((previous) =>
                previous.map((message) =>
                  message.id === foundMessage.id
                    ? {
                        ...message,
                        status: "read",
                      }
                    : message
                )
              );

              setSelectedMessage((previous) =>
                previous
                  ? {
                      ...previous,
                      status: "read",
                    }
                  : previous
              );
            } catch (error) {
              console.error(
                "Error marking message as read:",
                error
              );
            }
          }

          setSearchParams({});
        }
      }
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================
  useEffect(() => {
    fetchMessages();
  }, []);

  // =========================================================
  // FORMAT DATE
  // =========================================================
  const formatDate = (timestamp) => {
    if (!timestamp) return "—";

    try {
      return timestamp.toDate().toLocaleString("en-IN", {
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
  // OPEN MESSAGE
  // NEW → READ AUTOMATICALLY
  // =========================================================
  const openMessage = async (message) => {
    setSelectedMessage(message);

    if (message.status === "new") {
      try {
        await updateDoc(
          doc(db, "contactMessages", message.id),
          {
            status: "read",
          }
        );

        setMessages((previous) =>
          previous.map((item) =>
            item.id === message.id
              ? {
                  ...item,
                  status: "read",
                }
              : item
          )
        );

        setSelectedMessage((previous) =>
          previous
            ? {
                ...previous,
                status: "read",
              }
            : previous
        );
      } catch (error) {
        console.error(
          "Error marking message as read:",
          error
        );
      }
    }
  };

  // =========================================================
  // CLOSE MESSAGE
  // =========================================================
  const closeMessage = () => {
    setSelectedMessage(null);
  };

  // =========================================================
  // COUNTS
  // =========================================================
  const newCount = messages.filter(
    (message) => message.status === "new"
  ).length;

  const readCount = messages.filter(
    (message) => message.status === "read"
  ).length;

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F3ED]">
        <AdminNavbar />

        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="flex flex-col items-center">
            <div
              className="
                w-7 h-7
                border-2
                border-[#D8C9BD]
                border-t-[#8B5E3C]
                rounded-full
                animate-spin
              "
            />

            <p className="mt-4 text-[11px] tracking-wide text-[#8C7A6E]">
              Loading messages
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

      <main className="max-w-[1120px] mx-auto px-5 md:px-8 py-8 md:py-10">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-7">

          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.32em]
                text-[#9A6848]
                font-medium
                mb-2
              "
            >
              Customer Enquiry
            </p>

            <div className="flex items-center gap-3">
              <h1
                className="
                  font-serif
                  text-[32px]
                  md:text-[38px]
                  leading-none
                  font-semibold
                  text-[#4B352A]
                "
              >
                Messages
              </h1>

              {/* TOTAL COUNT */}
              <span
                className="
                  min-w-7
                  h-7
                  px-2.5
                  rounded-full
                  bg-white
                  border
                  border-[#D8C8BB]
                  flex
                  items-center
                  justify-center
                  text-[11px]
                  font-semibold
                  text-[#765640]
                "
              >
                {messages.length}
              </span>
            </div>

            {/* SMALL SUMMARY */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-[11px] text-[#8C7A6E]">
                {messages.length === 1
                  ? "1 enquiry"
                  : `${messages.length} enquiries`}
              </span>

              {newCount > 0 && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#C7B4A5]" />

                  <span className="flex items-center gap-1.5 text-[11px] text-[#8B5E3C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9A6848]" />
                    {newCount} new
                  </span>
                </>
              )}

              {readCount > 0 && (
                <>
                  <span className="w-1 h-1 rounded-full bg-[#C7B4A5]" />

                  <span className="text-[11px] text-[#9A8B82]">
                    {readCount} read
                  </span>
                </>
              )}
            </div>
          </div>

          {/* =================================================
              REFRESH
          ================================================= */}
          <button
            type="button"
            onClick={() => fetchMessages(true)}
            disabled={refreshing}
            className="
              group
              self-start
              sm:self-auto
              h-10
              px-4
              rounded-full
              bg-white
              border
              border-[#D8C8BB]
              flex
              items-center
              gap-2
              text-[11px]
              font-semibold
              tracking-wide
              text-[#6D5546]
              shadow-[0_4px_16px_rgba(75,53,42,0.045)]
              hover:bg-[#FBF8F4]
              hover:border-[#CDB8A8]
              hover:-translate-y-[1px]
              transition-all
              duration-200
              disabled:opacity-60
              disabled:cursor-not-allowed
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
            MESSAGE LIST CARD
        ===================================================== */}
        <div
          className="
            bg-white
            border
            border-[#D8C8BB]
            rounded-[18px]
            overflow-hidden
            shadow-[0_10px_32px_rgba(75,53,42,0.055)]
          "
        >

          {/* ===================================================
              LIST HEADER
          =================================================== */}
          {messages.length > 0 && (
            <div
              className="
                h-11
                px-5
                flex
                items-center
                justify-between
                bg-[#FCFAF7]
                border-b
                border-[#E8DED6]
              "
            >
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.24em]
                  font-semibold
                  text-[#9A6848]
                "
              >
                Inbox
              </span>

              <span className="text-[10px] text-[#A08F84]">
                Latest first
              </span>
            </div>
          )}

          {/* ===================================================
              EMPTY STATE
          =================================================== */}
          {messages.length === 0 ? (
            <div className="py-20 px-6 text-center">

              <div
                className="
                  w-14
                  h-14
                  mx-auto
                  rounded-full
                  bg-[#F3E8DE]
                  border
                  border-[#E1D1C3]
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >
                <FaEnvelope
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
                No enquiries yet
              </h2>

              <p
                className="
                  text-[11px]
                  text-[#988980]
                  mt-2
                "
              >
                Customer messages will appear here.
              </p>
            </div>
          ) : (

            /* =================================================
               MESSAGE ROWS
            ================================================= */
            messages.map((message) => {
              const initial = String(
                message.name || "C"
              )
                .trim()
                .charAt(0)
                .toUpperCase();

              const isNew = message.status === "new";

              return (
                <button
                  key={message.id}
                  type="button"
                  onClick={() => openMessage(message)}
                  className="
                    group
                    relative
                    w-full
                    text-left
                    flex
                    items-center
                    gap-4
                    px-5
                    py-4
                    border-b
                    border-[#EAE2DB]
                    last:border-b-0
                    hover:bg-[#FCFAF8]
                    transition-all
                    duration-200
                  "
                >

                  {/* NEW INDICATOR */}
                  {isNew && (
                    <span
                      className="
                        absolute
                        left-0
                        top-1/2
                        -translate-y-1/2
                        w-[3px]
                        h-9
                        rounded-r-full
                        bg-[#9A6848]
                      "
                    />
                  )}

                  {/* =================================================
                      AVATAR
                  ================================================= */}
                  <div
                    className={`
                      shrink-0
                      w-11
                      h-11
                      rounded-full
                      flex
                      items-center
                      justify-center
                      font-serif
                      text-[17px]
                      border
                      transition-all
                      duration-200
                      ${
                        isNew
                          ? "bg-[#F1E3D7] border-[#DCC3B0] text-[#8B5E3C]"
                          : "bg-[#F5EFEA] border-[#E7DDD5] text-[#9A7B66]"
                      }
                      group-hover:border-[#CDB5A4]
                    `}
                  >
                    {initial}
                  </div>

                  {/* =================================================
                      MESSAGE INFORMATION
                  ================================================= */}
                  <div className="flex-1 min-w-0">

                    <div className="flex items-center gap-3">

                      <p
                        className={`
                          text-[13px]
                          truncate
                          ${
                            isNew
                              ? "font-semibold text-[#4B352A]"
                              : "font-medium text-[#5D4A3F]"
                          }
                        `}
                      >
                        {message.name || "Customer"}
                      </p>

                      {isNew && (
                        <span
                          className="
                            shrink-0
                            px-2
                            py-[3px]
                            rounded-full
                            bg-[#F2E7DD]
                            border
                            border-[#DEC9B8]
                            text-[8px]
                            uppercase
                            tracking-[0.12em]
                            font-semibold
                            text-[#8B5E3C]
                          "
                        >
                          New
                        </span>
                      )}
                    </div>

                    <p
                      className="
                        text-[11px]
                        text-[#806F64]
                        mt-1
                        truncate
                      "
                    >
                      {message.email || "—"}
                    </p>

                    <p
                      className="
                        text-[11px]
                        text-[#9A8C84]
                        mt-1
                        truncate
                      "
                    >
                      {message.message || "No message"}
                    </p>
                  </div>

                  {/* =================================================
                      DATE
                  ================================================= */}
                  <div
                    className="
                      hidden
                      md:block
                      shrink-0
                      w-[145px]
                      text-right
                    "
                  >
                    <p
                      className="
                        text-[10px]
                        text-[#9A8B82]
                      "
                    >
                      {formatDate(message.createdAt)}
                    </p>
                  </div>

                  {/* =================================================
                      VIEW
                  ================================================= */}
                  <div
                    className="
                      shrink-0
                      w-8
                      h-8
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-[#A69488]
                      group-hover:bg-[#F1E6DE]
                      group-hover:text-[#8B5E3C]
                      transition-all
                      duration-200
                    "
                  >
                    <FaChevronRight size={10} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* =====================================================
            BOTTOM NOTE
        ===================================================== */}
        {messages.length > 0 && (
          <div className="flex items-center justify-between px-1 mt-4">
            <p className="text-[10px] text-[#A08F84]">
              Customer enquiries are stored securely.
            </p>

            <p className="text-[10px] text-[#B09F94]">
              {messages.length} total
            </p>
          </div>
        )}
      </main>

      {/* =========================================================
          MESSAGE DETAIL MODAL
      ========================================================= */}
      {selectedMessage && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-[#33251F]/30
            backdrop-blur-[4px]
            flex
            items-center
            justify-center
            px-4
            py-6
          "
          onClick={closeMessage}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="
              relative
              w-full
              max-w-[540px]
              max-h-[78vh]
              bg-[#FBF8F4]
              rounded-[20px]
              border
              border-[#D9C9BC]
              shadow-[0_28px_75px_rgba(50,36,28,0.20)]
              overflow-hidden
            "
          >

            {/* ===================================================
                MODAL HEADER
            =================================================== */}
            <div
              className="
                flex
                items-center
                justify-between
                px-6
                py-5
                bg-[#FCFAF7]
                border-b
                border-[#E6DBD3]
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.32em]
                    text-[#9A6848]
                    font-semibold
                  "
                >
                  Customer Enquiry
                </p>

                <p className="text-[11px] text-[#9A8B82] mt-1">
                  Message details
                </p>
              </div>

              <button
                type="button"
                onClick={closeMessage}
                aria-label="Close message"
                className="
                  w-7
                  h-7
                  rounded-full
                  border
                  border-[#DED1C8]
                  bg-white
                  flex
                  items-center
                  justify-center
                  text-[#907E72]
                  hover:bg-[#F0E7E0]
                  hover:text-[#4B352A]
                  hover:border-[#CDB9A9]
                  transition-all
                  duration-200
                "
              >
                <FaTimes size={9} />
              </button>
            </div>

            {/* ===================================================
                SCROLLABLE CONTENT
            =================================================== */}
            <div
              className="
                message-detail-scroll
                max-h-[calc(78vh-76px)]
                overflow-y-auto
              "
            >
              <div className="px-6 py-6">

                {/* =================================================
                    CUSTOMER PROFILE
                ================================================= */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    pb-5
                    border-b
                    border-[#E8DED6]
                  "
                >
                  <div
                    className="
                      shrink-0
                      w-12
                      h-12
                      rounded-full
                      bg-[#F0E2D6]
                      border
                      border-[#DEC8B7]
                      flex
                      items-center
                      justify-center
                      font-serif
                      text-[18px]
                      text-[#8B5E3C]
                    "
                  >
                    {String(
                      selectedMessage.name || "C"
                    )
                      .trim()
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        text-[15px]
                        font-semibold
                        text-[#4B352A]
                      "
                    >
                      {selectedMessage.name || "Customer"}
                    </p>

                    <p
                      className="
                        text-[11px]
                        text-[#8B786C]
                        mt-1
                        break-all
                      "
                    >
                      {selectedMessage.email || "—"}
                    </p>
                  </div>
                </div>

                {/* =================================================
                    CONTACT INFORMATION
                ================================================= */}
                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    gap-3
                    mt-5
                  "
                >
                  {/* PHONE */}
                  <div
                    className="
                      bg-white
                      border
                      border-[#E1D6CE]
                      rounded-[12px]
                      px-4
                      py-3
                    "
                  >
                    <p
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.22em]
                        text-[#A0806A]
                        font-semibold
                        mb-1.5
                      "
                    >
                      Phone
                    </p>

                    <div className="flex items-center gap-2">
                      <FaPhoneAlt
                        size={9}
                        className="text-[#9A6848]"
                      />

                      <span className="text-[11px] text-[#665349]">
                        {selectedMessage.phone || "—"}
                      </span>
                    </div>
                  </div>

                  {/* DATE */}
                  <div
                    className="
                      bg-white
                      border
                      border-[#E1D6CE]
                      rounded-[12px]
                      px-4
                      py-3
                    "
                  >
                    <p
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.22em]
                        text-[#A0806A]
                        font-semibold
                        mb-1.5
                      "
                    >
                      Received
                    </p>

                    <span className="text-[11px] text-[#665349]">
                      {formatDate(
                        selectedMessage.createdAt
                      )}
                    </span>
                  </div>
                </div>

                {/* =================================================
                    MESSAGE
                ================================================= */}
                <div className="mt-6">

                  <div className="flex items-center justify-between mb-3">
                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.28em]
                        text-[#9A6848]
                        font-semibold
                      "
                    >
                      Message
                    </p>
                  </div>

                  <div
                    className="
                      bg-white
                      border
                      border-[#DDD0C7]
                      rounded-[15px]
                      px-5
                      py-5
                      text-[13px]
                      leading-7
                      text-[#51443C]
                      whitespace-pre-wrap
                      break-words
                      shadow-[0_4px_15px_rgba(75,53,42,0.025)]
                    "
                  >
                    {selectedMessage.message ||
                      "No message provided."}
                  </div>
                </div>

                {/* =================================================
                    CLOSE
                ================================================= */}
                <div className="flex justify-end mt-5">
                  <button
                    type="button"
                    onClick={closeMessage}
                    className="
                      h-9
                      px-4
                      rounded-full
                      border
                      border-[#D7C7BA]
                      bg-white
                      text-[10px]
                      font-semibold
                      tracking-wide
                      text-[#6F5748]
                      hover:bg-[#F7F0EA]
                      hover:border-[#C9B4A4]
                      transition-all
                      duration-200
                    "
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          PREMIUM SCROLLBAR
      ========================================================= */}
      <style>
        {`
          .message-detail-scroll {
            scrollbar-width: thin;
            scrollbar-color: #C5A58B transparent;
          }

          .message-detail-scroll::-webkit-scrollbar {
            width: 4px;
          }

          .message-detail-scroll::-webkit-scrollbar-track {
            background: transparent;
            margin: 12px 0;
          }

          .message-detail-scroll::-webkit-scrollbar-thumb {
            background: #C5A58B;
            border-radius: 999px;
          }

          .message-detail-scroll::-webkit-scrollbar-thumb:hover {
            background: #A98263;
          }
        `}
      </style>
    </div>
  );
}