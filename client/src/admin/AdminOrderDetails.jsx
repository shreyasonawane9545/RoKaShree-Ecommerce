import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaCheck,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaShippingFast,
} from "react-icons/fa";

export default function AdminOrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // STATUS STEPS
  // =========================================================
  const statusOptions = [
    "Placed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  // =========================================================
  // FETCH ORDER
  // =========================================================
  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !orderId) return;

      try {
        const orderRef = doc(db, "orders", orderId);
        const snapshot = await getDoc(orderRef);

        if (!snapshot.exists()) {
          setOrder(null);
          return;
        }

        setOrder({
          id: snapshot.id,
          ...snapshot.data(),
        });
      } catch (error) {
        console.error(
          "Error fetching admin order:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user, orderId]);

  // =========================================================
  // FORMAT DATE
  // =========================================================
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

      if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
      }

      return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Date unavailable";
    }
  };

  // =========================================================
  // STATUS ICON
  // =========================================================
  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return FaClock;

      case "Shipped":
        return FaShippingFast;

      case "Delivered":
        return FaCheck;

      default:
        return FaBoxOpen;
    }
  };

  // =========================================================
  // STATUS STYLE
  // =========================================================
  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return {
          background: "#EDF2EC",
          border: "#C9D6C7",
          text: "#60705C",
        };

      case "Shipped":
        return {
          background: "#EEEAE3",
          border: "#D1C9BC",
          text: "#665F54",
        };

      case "Processing":
        return {
          background: "#F2E9DF",
          border: "#D8C3AF",
          text: "#76563F",
        };

      default:
        return {
          background: "#F5EEE8",
          border: "#DDCABB",
          text: "#8B684F",
        };
    }
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <>
        <AdminNavbar />

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
                w-8
                h-8
                mx-auto
                rounded-full
                border-2
                border-[#D8C9BD]
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
              Loading order
            </p>

          </div>
        </section>
      </>
    );
  }

  // =========================================================
  // ORDER NOT FOUND
  // =========================================================
  if (!order) {
    return (
      <>
        <AdminNavbar />

        <section
          className="
            min-h-screen
            bg-[#F8F3ED]
            flex
            items-center
            justify-center
            px-6
          "
        >
          <div className="text-center">

            <FaBoxOpen
              className="
                mx-auto
                text-3xl
                text-[#B9987C]
              "
            />

            <h1
              className="
                mt-5
                font-serif
                text-2xl
                font-semibold
                text-[#4B352A]
              "
            >
              Order not found
            </h1>

            <button
              type="button"
              onClick={() =>
                navigate("/admin/orders")
              }
              className="
                mt-5
                h-9
                px-4
                rounded-full
                bg-[#4B352A]
                text-white
                text-[10px]
                uppercase
                tracking-[1.4px]
                font-semibold
                hover:bg-[#6D4A35]
                transition-all
              "
            >
              Back to Orders
            </button>

          </div>
        </section>
      </>
    );
  }

  // =========================================================
  // ORDER DATA
  // =========================================================
  const currentStatus =
    order.status || "Placed";

  const currentIndex =
    statusOptions.indexOf(currentStatus);

  const StatusIcon =
    getStatusIcon(currentStatus);

  const statusStyle =
    getStatusStyle(currentStatus);

  const subtotal =
    Number(order.subtotal || 0);

  const shippingCost =
    Number(order.shipping || 0);

  const total =
    Number(order.total || 0);

  const customer =
    order.customer || {};

  const shipping =
    order.deliveryAddress || {};

  const customerName =
    `${customer.firstName || ""} ${
      customer.lastName || ""
    }`.trim() || "Customer";

  const addressLines = [
    shipping.address,
    shipping.addressLine2,
    shipping.city,
    shipping.state,
    shipping.pincode,
    shipping.country,
  ].filter(Boolean);

  // =========================================================
  // PAYMENT LABEL
  // =========================================================
  const paymentMethod =
    order.paymentMethod === "COD"
      ? "Cash on Delivery (COD)"
      : order.paymentMethod ||
        "Not available";

  // =========================================================
  // PAGE
  // =========================================================
  return (
    <>
      <AdminNavbar />

      <section
        className="
          min-h-screen
          bg-[#F8F3ED]
          py-6
          md:py-8
        "
      >
        <div
          className="
            max-w-[1180px]
            mx-auto
            px-5
            sm:px-6
            lg:px-8
          "
        >

          {/* =================================================
              BACK ARROW ONLY
          ================================================= */}
          <button
            type="button"
            onClick={() =>
              navigate("/admin/orders")
            }
            aria-label="Back to orders"
            className="
              group
              w-9
              h-9
              rounded-full
              border
              border-[#D8C8BB]
              bg-white
              flex
              items-center
              justify-center
              text-[#765640]
              shadow-[0_3px_12px_rgba(75,53,42,0.035)]
              hover:bg-[#4B352A]
              hover:text-white
              hover:border-[#4B352A]
              transition-all
              duration-200
            "
          >
            <FaArrowLeft
              className="
                text-[10px]
                transition-transform
                duration-200
                group-hover:-translate-x-0.5
              "
            />
          </button>

          {/* =================================================
              ORDER HEADER
          ================================================= */}
          <header className="mt-6 mb-7">

            {/* LABEL */}
            <div
              className="
                flex
                items-center
                gap-3
                mb-2
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-[#B9987C]
                "
              />

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[3px]
                  font-semibold
                  text-[#8B5E3C]
                "
              >
                Order Management
              </p>
            </div>

            {/* ORDER ID + READ ONLY STATUS */}
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-3
              "
            >

              <h1
                className="
                  font-serif
                  text-[32px]
                  md:text-[42px]
                  leading-none
                  font-semibold
                  tracking-[-0.02em]
                  text-[#4B352A]
                "
              >
                #{order.id
                  .slice(-8)
                  .toUpperCase()}
              </h1>

              {/* =============================================
                  READ-ONLY STATUS BADGE
              ============================================= */}
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  h-7
                  px-3
                  rounded-full
                  border
                "
                style={{
                  backgroundColor:
                    statusStyle.background,
                  borderColor:
                    statusStyle.border,
                  color:
                    statusStyle.text,
                }}
              >
                <StatusIcon className="text-[9px]" />

                <span
                  className="
                    text-[10px]
                    font-semibold
                  "
                >
                  {currentStatus}
                </span>
              </div>

            </div>

            {/* DATE */}
            <p
              className="
                mt-3
                text-[11px]
                text-[#81746B]
              "
            >
              Placed on{" "}
              {formatDate(
                order.createdAt
              )}
            </p>

          </header>

          {/* =================================================
              THIN PREMIUM TIMELINE
          ================================================= */}
          <div
            className="
              mb-8
              px-1
              sm:px-4
            "
          >
            <div className="flex items-start">

              {statusOptions.map(
                (step, index) => {

                  const completed =
                    index <= currentIndex;

                  const active =
                    index === currentIndex;

                  return (
                    <div
                      key={step}
                      className="
                        flex
                        items-start
                        flex-1
                        last:flex-none
                      "
                    >

                      {/* STEP */}
                      <div
                        className="
                          flex
                          flex-col
                          items-center
                          shrink-0
                        "
                      >

                        <div
                          className={`
                            flex
                            items-center
                            justify-center
                            rounded-full
                            border
                            transition-all
                            duration-300

                            ${
                              completed
                                ? "bg-[#8B5E3C] border-[#8B5E3C] text-white"
                                : "bg-transparent border-[#D5C7BC] text-transparent"
                            }

                            ${
                              active
                                ? "w-7 h-7 shadow-[0_3px_10px_rgba(139,94,60,0.18)]"
                                : "w-6 h-6"
                            }
                          `}
                        >
                          {completed && (
                            <FaCheck className="text-[8px]" />
                          )}
                        </div>

                        <span
                          className={`
                            mt-2
                            text-[8px]
                            uppercase
                            tracking-[1.2px]
                            whitespace-nowrap

                            ${
                              completed
                                ? "font-semibold text-[#79563F]"
                                : "text-[#B1A49C]"
                            }
                          `}
                        >
                          {step}
                        </span>

                      </div>

                      {/* CONNECTOR */}
                      {index <
                        statusOptions.length - 1 && (
                        <div
                          className={`
                            h-px
                            flex-1
                            mt-[14px]
                            mx-1.5
                            sm:mx-3

                            ${
                              index < currentIndex
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

          {/* =================================================
              CUSTOMER / SHIPPING / PAYMENT / TOTAL
              ONE SINGLE PREMIUM CARD
          ================================================= */}
          <div
            className="
              mb-7
              overflow-hidden
              rounded-[18px]
              border
              border-[#D8C8BB]
              bg-white
              shadow-[0_8px_28px_rgba(75,53,42,0.045)]
            "
          >

            {/* =================================================
                CUSTOMER
            ================================================= */}
            <div
              className="
                px-5
                py-5
                md:px-6
                md:py-6
              "
            >

              {/* CUSTOMER LABEL */}
              <p
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[2.2px]
                  text-[#9A6848]
                "
              >
                Customer
              </p>

              {/* CUSTOMER NAME */}
              <h2
                className="
                  mt-1
                  font-serif
                  text-[23px]
                  font-semibold
                  leading-tight
                  text-[#4B352A]
                "
              >
                {customerName}
              </h2>

              {/* EMAIL + PHONE */}
              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                  sm:gap-8
                "
              >

                {/* EMAIL */}
                <div>
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[1.8px]
                      text-[#A09288]
                    "
                  >
                    Email
                  </p>

                  <p
                    className="
                      mt-1.5
                      break-all
                      text-[12px]
                      text-[#5E5149]
                    "
                  >
                    {customer.email ||
                      "Not available"}
                  </p>
                </div>

                {/* PHONE */}
                <div>
                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[1.8px]
                      text-[#A09288]
                    "
                  >
                    Phone
                  </p>

                  <p
                    className="
                      mt-1.5
                      text-[12px]
                      text-[#5E5149]
                    "
                  >
                    {customer.phone ||
                      "Not available"}
                  </p>
                </div>

              </div>

            </div>

            {/* =================================================
                DIVIDER
            ================================================= */}
            <div className="h-px bg-[#E9E1DA]" />

            {/* =================================================
                LOWER INFORMATION
            ================================================= */}
            <div
              className="
                grid
                grid-cols-1
                lg:grid-cols-[1fr_1fr]
              "
            >

              {/* =================================================
                  SHIPPING ADDRESS
              ================================================= */}
              <div
                className="
                  px-5
                  py-5
                  md:px-6
                  md:py-6
                  lg:border-r
                  lg:border-[#E9E1DA]
                "
              >

                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  {/* ICON */}
                  <div
                    className="
                      mt-0.5
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F3EAE3]
                      text-[#765640]
                    "
                  >
                    <FaMapMarkerAlt
                      className="text-[11px]"
                    />
                  </div>

                  {/* ADDRESS */}
                  <div className="min-w-0">

                    <p
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[2px]
                        text-[#9A6848]
                      "
                    >
                      Shipping Address
                    </p>

                    <div
                      className="
                        mt-3
                        text-[11px]
                        leading-[1.55]
                        text-[#665950]
                      "
                    >
                      {addressLines.length > 0 ? (
                        addressLines.map(
                          (line, index) => (
                            <p key={index}>
                              {line}
                            </p>
                          )
                        )
                      ) : (
                        <p>
                          Address not available
                        </p>
                      )}
                    </div>

                  </div>

                </div>
              </div>

              {/* =================================================
                  PAYMENT + TOTAL
              ================================================= */}
              <div
                className="
                  px-5
                  py-5
                  md:px-6
                  md:py-6
                "
              >

                {/* PAYMENT */}
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  {/* ICON */}
                  <div
                    className="
                      mt-0.5
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F3EAE3]
                      text-[#765640]
                    "
                  >
                    <FaMoneyBillWave
                      className="text-[11px]"
                    />
                  </div>

                  {/* PAYMENT CONTENT */}
                  <div className="min-w-0">

                    <p
                      className="
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[2px]
                        text-[#9A6848]
                      "
                    >
                      Payment Method
                    </p>

                    <p
                      className="
                        mt-1.5
                        text-[12px]
                        font-medium
                        text-[#5E5149]
                      "
                    >
                      {paymentMethod}
                    </p>

                  </div>

                </div>

                {/* SUBTLE DIVIDER */}
                <div
                  className="
                    my-4
                    ml-12
                    h-px
                    bg-[#E8DED6]
                  "
                />

                {/* ORDER TOTAL */}
                <div className="ml-12">

                  <p
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[2px]
                      text-[#9A6848]
                    "
                  >
                    Order Total
                  </p>

                  <p
                    className="
                      mt-1
                      font-serif
                      text-[27px]
                      font-semibold
                      leading-none
                      text-[#4B352A]
                    "
                  >
                    ₹
                    {total.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p
                    className="
                      mt-2
                      text-[10px]
                      text-[#9A8B82]
                    "
                  >
                    Subtotal ₹
                    {subtotal.toLocaleString(
                      "en-IN"
                    )}

                    <span className="mx-1.5 text-[#C2B3A9]">
                      ·
                    </span>

                    Shipping ₹
                    {shippingCost.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              PRODUCTS
          ================================================= */}
          <div
            className="
              overflow-hidden
              rounded-[18px]
              border
              border-[#D8C8BB]
              bg-white
              shadow-[0_8px_28px_rgba(75,53,42,0.045)]
            "
          >

            {/* =================================================
                PRODUCTS HEADER
            ================================================= */}
            <div
              className="
                flex
                items-end
                justify-between
                border-b
                border-[#E8DED6]
                bg-[#FCFAF7]
                px-5
                py-5
                md:px-6
              "
            >

              <div>

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[2.2px]
                    text-[#9A6848]
                  "
                >
                  Order Items
                </p>

                <h2
                  className="
                    mt-1
                    font-serif
                    text-[22px]
                    font-semibold
                    leading-none
                    text-[#4B352A]
                  "
                >
                  Products
                </h2>

              </div>

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[1.3px]
                  text-[#A09288]
                "
              >
                {(order.items || []).length}{" "}
                {(order.items || []).length === 1
                  ? "Item"
                  : "Items"}
              </span>

            </div>

            {/* =================================================
                PRODUCT LIST
            ================================================= */}
            <div
              className="
                divide-y
                divide-[#EEE7E1]
              "
            >

              {(order.items || []).map(
                (item, index) => {

                  const itemPrice =
                    Number(
                      String(
                        item.price ?? 0
                      )
                        .replace("₹", "")
                        .replace(/,/g, "")
                    );

                  const quantity =
                    Number(
                      item.quantity || 1
                    );

                  const itemTotal =
                    itemPrice * quantity;

                  return (
                    <div
                      key={`${
                        item.id ||
                        item.name ||
                        "product"
                      }-${index}`}
                      className="
                        flex
                        items-center
                        gap-4
                        px-5
                        py-4
                        md:px-6
                        hover:bg-[#FCFAF8]
                        transition-colors
                        duration-200
                      "
                    >

                      {/* =================================================
                          PRODUCT IMAGE
                      ================================================= */}
                      <div
                        className="
                          h-[58px]
                          w-[58px]
                          shrink-0
                          overflow-hidden
                          rounded-[11px]
                          border
                          border-[#E5DAD1]
                          bg-[#F7F1EB]
                          md:h-[64px]
                          md:w-[64px]
                        "
                      >

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={
                              item.name ||
                              "Product"
                            }
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />
                        ) : (
                          <div
                            className="
                              flex
                              h-full
                              w-full
                              items-center
                              justify-center
                            "
                          >
                            <FaBoxOpen
                              className="
                                text-sm
                                text-[#B9987C]
                              "
                            />
                          </div>
                        )}

                      </div>

                      {/* =================================================
                          PRODUCT INFO
                      ================================================= */}
                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >

                        <h3
                          className="
                            truncate
                            text-[13px]
                            font-semibold
                            text-[#4B352A]
                            md:text-[14px]
                          "
                        >
                          {item.name ||
                            "Product"}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-[10px]
                            text-[#8A7B72]
                          "
                        >
                          Quantity:{" "}
                          {quantity}
                        </p>

                      </div>

                      {/* =================================================
                          PRODUCT PRICE
                      ================================================= */}
                      <div
                        className="
                          shrink-0
                          text-right
                        "
                      >

                        <p
                          className="
                            font-serif
                            text-[15px]
                            font-semibold
                            text-[#6D4A35]
                            md:text-[16px]
                          "
                        >
                          ₹
                          {itemTotal.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        {quantity > 1 && (
                          <p
                            className="
                              mt-1
                              text-[9px]
                              text-[#9A8B82]
                            "
                          >
                            ₹
                            {itemPrice.toLocaleString(
                              "en-IN"
                            )}{" "}
                            each
                          </p>
                        )}

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          </div>

        </div>
      </section>
    </>
  );
}