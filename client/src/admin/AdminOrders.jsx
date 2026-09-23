import {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { toast5 } from "../utils/toast";

import AdminNavbar from "./AdminNavbar";

import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";

import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  FaArrowRight,
  FaBoxOpen,
  FaCheck,
  FaChevronDown,
  FaClock,
  FaSearch,
  FaShippingFast,
  FaTimes,
  FaTruck,
} from "react-icons/fa";


// =============================================================
// PREMIUM CUSTOM DROPDOWN
// =============================================================

function PremiumDropdown({
  value,
  options,
  onChange,
  placeholder = "Select",
  disabled = false,
  icon: Icon,
  compact = false,
  dropUp = false,
}) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleToggle = () => {
    if (disabled) return;

    setOpen((previous) => !previous);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
    >
      {/* TRIGGER */}
      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={`
          flex
          w-full
          items-center
          justify-between
          rounded-[11px]
          border
          text-left
          transition-all
          duration-200
          ${
            compact
              ? "h-9 px-3"
              : "h-11 px-4"
          }
          ${
            open
              ? "border-[#A77D5D] bg-white shadow-[0_7px_18px_rgba(75,53,42,0.07)]"
              : "border-[#D8C8BB] bg-[#FAF7F3] hover:border-[#BCA28E] hover:bg-white"
          }
          ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer"
          }
        `}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          {Icon && (
            <Icon
              className="
                shrink-0
                text-[9px]
                text-[#8B684F]
              "
            />
          )}

          <span
            className={`
              truncate
              font-medium
              text-[#624B3E]
              ${compact ? "text-[12px]" : "text-[13px]"}
            `}
          >
            {value || placeholder}
          </span>
        </span>

        <FaChevronDown
          className={`
            shrink-0
            text-[7px]
            text-[#907C6D]
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* MENU */}
      {open && !disabled && (
        <div
          className={`
            absolute
            left-0
            right-0
            z-[100]
            overflow-hidden
            rounded-[13px]
            border
            border-[#D8C8BB]
            bg-white
            p-1.5
            shadow-[0_16px_36px_rgba(75,53,42,0.13)]
            ${
              dropUp
                ? "bottom-[calc(100%+6px)]"
                : "top-[calc(100%+6px)]"
            }
          `}
        >
          {options.map((option) => {
            const selected =
              option === value;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-[9px]
                  px-3
                  py-2
                  text-left
                  text-[12px]
                  transition-all
                  duration-150
                  ${
                    selected
                      ? "bg-[#F3EBE3] font-medium text-[#4B352A]"
                      : "text-[#6D5A4E] hover:bg-[#FAF7F3] hover:text-[#4B352A]"
                  }
                `}
              >
                <span>{option}</span>

                {selected && (
                  <FaCheck
                    className="
                      text-[8px]
                      text-[#8B5E3C]
                    "
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}


// =============================================================
// ADMIN ORDERS
// =============================================================

export default function AdminOrders() {
  const navigate = useNavigate();

  const { user } =
    useContext(AuthContext);

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");


  // ===========================================================
  // STATUS OPTIONS
  // ===========================================================

  const statusOptions = [
    "Placed",
    "Processing",
    "Shipped",
    "Delivered",
  ];


  // ===========================================================
  // FETCH ORDERS
  // ===========================================================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersQuery = query(
          collection(db, "orders"),
          orderBy("createdAt", "desc")
        );

        const snapshot =
          await getDocs(ordersQuery);

        const fetchedOrders =
          snapshot.docs.map(
            (orderDoc) => ({
              id: orderDoc.id,
              ...orderDoc.data(),
            })
          );

        setOrders(fetchedOrders);
      } catch (error) {
        console.error(
          "Error fetching admin orders:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);


  // ===========================================================
  // UPDATE ORDER STATUS
  // ===========================================================

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {
    try {
      setUpdatingId(orderId);

      const orderRef = doc(
        db,
        "orders",
        orderId
      );

      await updateDoc(orderRef, {
        status: newStatus,
      });

      setOrders(
        (previousOrders) =>
          previousOrders.map(
            (order) =>
              order.id === orderId
                ? {
                    ...order,
                    status: newStatus,
                  }
                : order
          )
      );
    } catch (error) {
      console.error(
        "Error updating order status:",
        error
      );

     toast5.error("Unable to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };


  // ===========================================================
  // STATISTICS
  // ===========================================================

  const statistics = useMemo(() => {
    const totalRevenue =
      orders.reduce(
        (sum, order) =>
          sum +
          Number(order.total || 0),
        0
      );

    return {
      total: orders.length,

      placed: orders.filter(
        (order) =>
          order.status === "Placed"
      ).length,

      processing: orders.filter(
        (order) =>
          order.status === "Processing"
      ).length,

      shipped: orders.filter(
        (order) =>
          order.status === "Shipped"
      ).length,

      delivered: orders.filter(
        (order) =>
          order.status === "Delivered"
      ).length,

      revenue: totalRevenue,
    };
  }, [orders]);


  // ===========================================================
  // SEARCH NORMALIZER
  // ===========================================================

  const normalizeSearch = (value) =>
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");


  // ===========================================================
  // FILTER ORDERS
  // ===========================================================

  const filteredOrders = useMemo(() => {
    const search =
      normalizeSearch(searchTerm);

    return orders.filter((order) => {

      const orderId =
        normalizeSearch(order.id);

      const firstName =
        normalizeSearch(
          order.customer?.firstName ||
          order.shipping?.firstName ||
          ""
        );

      const lastName =
        normalizeSearch(
          order.customer?.lastName ||
          order.shipping?.lastName ||
          ""
        );

      const fullName =
        normalizeSearch(
          `${firstName} ${lastName}`
        );

      const fallbackName =
        normalizeSearch(
          order.customer?.name ||
          order.customerName ||
          order.shipping?.name ||
          ""
        );

      const email =
        normalizeSearch(
          order.customer?.email ||
          order.shipping?.email ||
          ""
        );

      const phone =
        normalizeSearch(
          order.customer?.phone ||
          order.shipping?.phone ||
          ""
        );

      const matchesSearch =
        !search ||
        orderId.includes(search) ||
        fullName.includes(search) ||
        fallbackName.includes(search) ||
        email.includes(search) ||
        phone.includes(search);

      const currentStatus =
        normalizeSearch(
          order.status || "Placed"
        );

      const selectedStatus =
        normalizeSearch(statusFilter);

      const matchesStatus =
        statusFilter === "All" ||
        currentStatus === selectedStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    orders,
    searchTerm,
    statusFilter,
  ]);


  // ===========================================================
  // DATE
  // ===========================================================

  const formatDate = (createdAt) => {
    if (!createdAt) {
      return "Date unavailable";
    }

    try {
      let date;

      if (createdAt?.toDate) {
        date = createdAt.toDate();
      } else if (createdAt?.seconds) {
        date = new Date(
          createdAt.seconds * 1000
        );
      } else {
        date = new Date(createdAt);
      }

      if (
        Number.isNaN(date.getTime())
      ) {
        return "Date unavailable";
      }

      return date.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return "Date unavailable";
    }
  };


  // ===========================================================
  // CUSTOMER NAME
  // ===========================================================

  const getCustomerName = (order) => {
    const firstName =
      order.customer?.firstName ||
      order.shipping?.firstName ||
      "";

    const lastName =
      order.customer?.lastName ||
      order.shipping?.lastName ||
      "";

    const fullName =
      `${firstName} ${lastName}`.trim();

    return (
      fullName ||
      order.customer?.name ||
      order.customerName ||
      order.shipping?.name ||
      "Customer"
    );
  };


  // ===========================================================
  // INITIALS
  // ===========================================================

  const getInitials = (order) => {
    const name =
      getCustomerName(order);

    const parts =
      name
        .split(" ")
        .filter(Boolean);

    if (parts.length === 1) {
      return parts[0]
        .slice(0, 2)
        .toUpperCase();
    }

    return `${parts[0][0]}${
      parts[parts.length - 1][0]
    }`.toUpperCase();
  };


  // ===========================================================
  // STATUS CONFIG
  // ===========================================================

  const getStatusConfig = (status) => {
    switch (status) {

      case "Processing":
        return {
          icon: FaClock,
          wrapper:
            "bg-[#F1E9DF] border-[#D1BCA7] text-[#725541]",
        };

      case "Shipped":
        return {
          icon: FaShippingFast,
          wrapper:
            "bg-[#EFEEE9] border-[#C9C2B6] text-[#625B50]",
        };

      case "Delivered":
        return {
          icon: FaCheck,
          wrapper:
            "bg-[#EAF0E8] border-[#C4D3C0] text-[#50684B]",
        };

      default:
        return {
          icon: FaBoxOpen,
          wrapper:
            "bg-[#F3E8DE] border-[#D2B8A2] text-[#79563E]",
        };
    }
  };


  // ===========================================================
  // LOADING
  // ===========================================================

  if (loading) {
    return (
      <section
        className="
          min-h-screen
          bg-[#F8F3ED]
          flex
          items-center
          justify-center
        "
      >
        <div className="text-center">

          <div
            className="
              mx-auto
              h-8
              w-8
              rounded-full
              border
              border-[#DCCABC]
              border-t-[#8B5E3C]
              animate-spin
            "
          />

          <p
            className="
              mt-4
              text-[10px]
              uppercase
              tracking-[3px]
              text-[#8B5E3C]
            "
          >
            Loading orders
          </p>

        </div>
      </section>
    );
  }


  // ===========================================================
  // PAGE
  // ===========================================================

  return (
    <>
      <AdminNavbar />

      <section
        className="
          min-h-screen
          bg-[#F8F3ED]
          py-8
          md:py-11
        "
      >

        <div
          className="
            mx-auto
            max-w-[1180px]
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <header className="mb-8 md:mb-10">

            <div
              className="
                flex
                flex-col
                gap-5
                md:flex-row
                md:items-end
                md:justify-between
              "
            >

              <div>

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      h-px
                      w-8
                      bg-[#B18C70]
                    "
                  />

                  <p
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[3px]
                      text-[#8B5E3C]
                    "
                  >
                    RoKaShree
                  </p>
                </div>

                <h1
                  className="
                    font-serif
                    text-[35px]
                    font-semibold
                    leading-none
                    tracking-[-0.5px]
                    text-[#4B352A]
                    md:text-[43px]
                  "
                >
                  Orders
                </h1>

                <p
                  className="
                    mt-3
                    max-w-md
                    text-sm
                    leading-6
                    text-[#81746B]
                  "
                >
                  Manage orders, customers and
                  delivery status from one place.
                </p>

              </div>


              <div className="md:text-right">

                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[2.5px]
                    text-[#9A8C82]
                  "
                >
                  Total Revenue
                </p>

                <p
                  className="
                    mt-1
                    font-serif
                    text-[29px]
                    font-semibold
                    text-[#6D4A35]
                  "
                >
                  ₹
                  {statistics.revenue.toLocaleString(
                    "en-IN"
                  )}
                </p>

              </div>

            </div>

          </header>


          {/* =================================================
              STATISTICS
          ================================================= */}

          <div
            className="
              mb-7
              grid
              grid-cols-2
              gap-3
              md:grid-cols-5
            "
          >

            {/* TOTAL */}

            <div
              className="
                min-h-[92px]
                rounded-[18px]
                border
                border-[#4B352A]
                bg-[#4B352A]
                px-5
                py-4
                shadow-[0_12px_28px_rgba(75,53,42,0.13)]
              "
            >
              <div className="flex items-center justify-between">

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#DCCABC]
                  "
                >
                  Total
                </p>

                <FaBoxOpen
                  className="
                    text-[11px]
                    text-[#DCCABC]
                  "
                />

              </div>

              <p
                className="
                  mt-3
                  font-serif
                  text-[25px]
                  font-semibold
                  text-white
                "
              >
                {statistics.total}
              </p>
            </div>


            {/* PLACED */}

            <div
              className="
                min-h-[92px]
                rounded-[18px]
                border
                border-[#D2BBA7]
                bg-[#F3E8DE]
                px-5
                py-4
                shadow-[0_7px_24px_rgba(75,53,42,0.055)]
              "
            >
              <div className="flex items-center justify-between">

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#80624D]
                  "
                >
                  Placed
                </p>

                <FaBoxOpen
                  className="
                    text-[10px]
                    text-[#8B684F]
                  "
                />

              </div>

              <p
                className="
                  mt-3
                  font-serif
                  text-[25px]
                  font-semibold
                  text-[#4B352A]
                "
              >
                {statistics.placed}
              </p>
            </div>


            {/* PROCESSING */}

            <div
              className="
                min-h-[92px]
                rounded-[18px]
                border
                border-[#D0BDAA]
                bg-[#F1E9DF]
                px-5
                py-4
                shadow-[0_7px_24px_rgba(75,53,42,0.055)]
              "
            >
              <div className="flex items-center justify-between">

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#755A46]
                  "
                >
                  Processing
                </p>

                <FaClock
                  className="
                    text-[10px]
                    text-[#80644D]
                  "
                />

              </div>

              <p
                className="
                  mt-3
                  font-serif
                  text-[25px]
                  font-semibold
                  text-[#4B352A]
                "
              >
                {statistics.processing}
              </p>
            </div>


            {/* SHIPPED */}

            <div
              className="
                min-h-[92px]
                rounded-[18px]
                border
                border-[#C9C2B6]
                bg-[#EFEEE9]
                px-5
                py-4
                shadow-[0_7px_24px_rgba(75,53,42,0.055)]
              "
            >
              <div className="flex items-center justify-between">

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#625B50]
                  "
                >
                  Shipped
                </p>

                <FaTruck
                  className="
                    text-[10px]
                    text-[#776F62]
                  "
                />

              </div>

              <p
                className="
                  mt-3
                  font-serif
                  text-[25px]
                  font-semibold
                  text-[#4B352A]
                "
              >
                {statistics.shipped}
              </p>
            </div>


            {/* DELIVERED */}

            <div
              className="
                min-h-[92px]
                rounded-[18px]
                border
                border-[#C4D3C0]
                bg-[#EAF0E8]
                px-5
                py-4
                shadow-[0_7px_24px_rgba(75,53,42,0.055)]
              "
            >
              <div className="flex items-center justify-between">

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#53684F]
                  "
                >
                  Delivered
                </p>

                <FaCheck
                  className="
                    text-[10px]
                    text-[#66805F]
                  "
                />

              </div>

              <p
                className="
                  mt-3
                  font-serif
                  text-[25px]
                  font-semibold
                  text-[#4B352A]
                "
              >
                {statistics.delivered}
              </p>
            </div>

          </div>


          {/* =================================================
              SEARCH + FILTER
          ================================================= */}

          <div
            className="
              mb-6
              rounded-[22px]
              border
              border-[#D8C8BB]
              bg-white
              p-3
              shadow-[0_9px_30px_rgba(75,53,42,0.045)]
              md:p-4
            "
          >

            <div
              className="
                flex
                flex-col
                gap-3
                md:flex-row
              "
            >

              {/* SEARCH */}

              <div className="relative flex-1">

                <FaSearch
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[12px]
                    text-[#9D8D81]
                  "
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search customer or order ID"
                  className="
                    h-11
                    w-full
                    rounded-[13px]
                    border
                    border-[#E1D6CC]
                    bg-[#FAF7F3]
                    pl-10
                    pr-10
                    text-[13px]
                    text-[#4B352A]
                    outline-none
                    placeholder:text-[#A99B91]
                    transition-all
                    duration-200
                    focus:border-[#AD876A]
                    focus:bg-white
                    focus:shadow-[0_6px_18px_rgba(75,53,42,0.05)]
                  "
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchTerm("")
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      h-6
                      w-6
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      text-[9px]
                      text-[#8B5E3C]
                      hover:bg-[#EEE4DB]
                    "
                  >
                    <FaTimes />
                  </button>
                )}

              </div>


              {/* FILTER */}

              <div
                className="
                  w-full
                  md:w-[190px]
                "
              >
                <PremiumDropdown
                  value={
                    statusFilter === "All"
                      ? "Filter by status"
                      : statusFilter
                  }
                  options={[
                    "Filter by status",
                    ...statusOptions,
                  ]}
                  onChange={(value) =>
                    setStatusFilter(
                      value ===
                        "Filter by status"
                        ? "All"
                        : value
                    )
                  }
                />
              </div>

            </div>

          </div>


          {/* =================================================
              RESULTS
          ================================================= */}

          <div
            className="
              mb-4
              flex
              items-center
              justify-between
              px-1
            "
          >

            <div>

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[2.5px]
                  text-[#8E7E72]
                "
              >
                Order Management
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#81746B]
                "
              >
                Showing{" "}
                {filteredOrders.length}{" "}
                of{" "}
                {orders.length} orders
              </p>

            </div>


            {(searchTerm ||
              statusFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("All");
                }}
                className="
                  text-[10px]
                  font-semibold
                  text-[#8B5E3C]
                  hover:text-[#4B352A]
                "
              >
                Clear filters
              </button>
            )}

          </div>


          {/* =================================================
              EMPTY
          ================================================= */}

          {filteredOrders.length === 0 ? (

            <div
              className="
                rounded-[24px]
                border
                border-[#D8C8BB]
                bg-white
                px-6
                py-16
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#E0D2C6]
                  bg-[#F5EEE7]
                "
              >
                <FaSearch
                  className="
                    text-sm
                    text-[#9A765B]
                  "
                />
              </div>

              <h2
                className="
                  mt-5
                  font-serif
                  text-xl
                  font-semibold
                  text-[#4B352A]
                "
              >
                No orders found
              </h2>

              <p
                className="
                  mt-2
                  text-xs
                  text-[#81746B]
                "
              >
                Try another customer name,
                order ID or status.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {filteredOrders.map(
                (order) => {

                  const status =
                    order.status ||
                    "Placed";

                  const statusConfig =
                    getStatusConfig(
                      status
                    );

                  const StatusIcon =
                    statusConfig.icon;

                  const customerName =
                    getCustomerName(
                      order
                    );

                  const initials =
                    getInitials(order);

                  const currentIndex =
                    statusOptions.indexOf(
                      status
                    );


                  return (
                    <article
                      key={order.id}
                      className="
                        group
                        overflow-visible
                        rounded-[20px]
                        border
                        border-[#D8C8BB]
                        bg-white
                        shadow-[0_7px_25px_rgba(75,53,42,0.04)]
                        transition-all
                        duration-300
                        hover:border-[#CBB6A5]
                        hover:shadow-[0_12px_32px_rgba(75,53,42,0.07)]
                      "
                    >

                      {/* =================================================
                          ORDER CONTENT
                      ================================================= */}

                      <div
                        className="
                          px-4
                          py-4
                          md:px-5
                          md:py-4.5
                        "
                      >

                        <div
                          className="
                            flex
                            flex-col
                            gap-4
                            lg:flex-row
                            lg:items-center
                            lg:gap-5
                          "
                        >

                          {/* CUSTOMER */}

                          <div
                            className="
                              flex
                              min-w-0
                              flex-1
                              items-center
                              gap-3.5
                            "
                          >

                            <div
                              className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-[#D8C5B5]
                                bg-[#F2E9E1]
                                text-[11px]
                                font-semibold
                                tracking-wide
                                text-[#76523B]
                              "
                            >
                              {initials}
                            </div>


                            <div className="min-w-0">

                              <div
                                className="
                                  flex
                                  items-center
                                  gap-2
                                "
                              >
                                <p
                                  className="
                                    text-[8px]
                                    font-semibold
                                    uppercase
                                    tracking-[2px]
                                    text-[#9A8B80]
                                  "
                                >
                                  Order
                                </p>

                                <span
                                  className="
                                    text-[8px]
                                    text-[#C2B5AB]
                                  "
                                >
                                  •
                                </span>

                                <p
                                  className="
                                    text-[8px]
                                    text-[#9A8B80]
                                  "
                                >
                                  {formatDate(
                                    order.createdAt
                                  )}
                                </p>
                              </div>


                              <h2
                                className="
                                  mt-0.5
                                  truncate
                                  text-[14px]
                                  font-semibold
                                  text-[#4B352A]
                                "
                              >
                                #
                                {order.id
                                  .slice(-8)
                                  .toUpperCase()}
                              </h2>


                              <p
                                className="
                                  mt-0.5
                                  truncate
                                  text-[11px]
                                  text-[#81746B]
                                "
                              >
                                {customerName}
                              </p>

                            </div>

                          </div>


                          {/* =================================================
                              CONTROLS
                          ================================================= */}

                          <div
                            className="
                              flex
                              w-full
                              items-end
                              gap-3
                              lg:w-auto
                            "
                          >

                            {/* STATUS */}

                           <div
                            className="
                              relative
                               z-30
                               min-w-0
                               flex-1
                             lg:w-[155px]
                            lg:flex-none
                            "
                           >

                              <p
                                className="
                                  mb-1.5
                                  text-[7px]
                                  font-semibold
                                  uppercase
                                  tracking-[1.8px]
                                  text-[#9A8C82]
                                "
                              >
                                Current Status
                              </p>

                              <div
                                className={`
                                  rounded-[12px]
                                  border
                                  p-[1px]
                                  ${statusConfig.wrapper}
                                `}
                              >
                                <PremiumDropdown
                                  value={status}
                                  options={
                                    statusOptions
                                  }
                                  onChange={(
                                    newStatus
                                  ) =>
                                    handleStatusChange(
                                      order.id,
                                      newStatus
                                    )
                                  }
                                  disabled={
                                    updatingId ===
                                    order.id
                                  }
                                  icon={
                                    StatusIcon
                                  }
                                  compact
                                  dropUp
                                />
                              </div>

                            </div>


                            {/* TOTAL */}

                            <div
                              className="
                                shrink-0
                                border-l
                                border-[#E2D7CE]
                                pl-3
                                lg:w-[105px]
                              "
                            >

                              <p
                                className="
                                  text-[7px]
                                  font-semibold
                                  uppercase
                                  tracking-[1.8px]
                                  text-[#9A8C82]
                                "
                              >
                                Total
                              </p>

                              <p
                                className="
                                  mt-1
                                  font-serif
                                  text-[18px]
                                  font-semibold
                                  text-[#6D4A35]
                                "
                              >
                                ₹
                                {Number(
                                  order.total ||
                                    0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </p>

                            </div>


                            {/* VIEW */}

                            <button
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/admin/orders/${order.id}`
                                )
                              }
                              className="
                                inline-flex
                                h-8
                                shrink-0
                                items-center
                                justify-center
                                gap-1
                                rounded-[9px]
                                border
                                border-[#D3C0B0]
                                bg-[#FBF8F4]
                                px-2.5
                                text-[8px]
                                font-semibold
                                uppercase
                                tracking-[1.2px]
                                text-[#75533D]
                                transition-all
                                duration-200
                                hover:border-[#4B352A]
                                hover:bg-[#4B352A]
                                hover:text-white
                              "
                            >
                              View

                              <FaArrowRight
                                className="
                                  text-[7px]
                                "
                              />
                            </button>

                          </div>

                        </div>

                      </div>


                      {/* =================================================
                          COMPACT STATUS TIMELINE
                      ================================================= */}

                      <div
                        className="
                          border-t
                          border-[#E9DFD7]
                          bg-[#FCFAF8]
                          px-4
                          py-3
                          md:px-5
                        "
                      >

                        <div className="flex items-center">

                          {statusOptions.map(
                            (
                              step,
                              index
                            ) => {

                              const completed =
                                index <=
                                currentIndex;

                              return (
                                <div
                                  key={step}
                                  className="
                                    flex
                                    flex-1
                                    items-center
                                    last:flex-none
                                  "
                                >

                                  <div
                                    className="
                                      flex
                                      items-center
                                      gap-1.5
                                    "
                                  >

                                    <div
                                      className={`
                                        flex
                                        h-[15px]
                                        w-[15px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        ${
                                          completed
                                            ? "border-[#8B5E3C] bg-[#8B5E3C] text-white"
                                            : "border-[#D5C8BE] bg-white text-transparent"
                                        }
                                      `}
                                    >
                                      {completed && (
                                        <FaCheck
                                          className="
                                            text-[5px]
                                          "
                                        />
                                      )}
                                    </div>

                                    <span
                                      className={`
                                        hidden
                                        whitespace-nowrap
                                        text-[7px]
                                        uppercase
                                        tracking-[1px]
                                        sm:block
                                        ${
                                          completed
                                            ? "font-semibold text-[#76523B]"
                                            : "text-[#B2A69E]"
                                        }
                                      `}
                                    >
                                      {step}
                                    </span>

                                  </div>


                                  {index <
                                    statusOptions.length -
                                      1 && (
                                    <div
                                      className={`
                                        mx-2
                                        h-px
                                        flex-1
                                        ${
                                          index <
                                          currentIndex
                                            ? "bg-[#B9987C]"
                                            : "bg-[#DED5CE]"
                                        }
                                      `}
                                    />
                                  )}

                                </div>
                              );
                            }
                          )}

                        </div>

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          )}

        </div>

      </section>
    </>
  );
}