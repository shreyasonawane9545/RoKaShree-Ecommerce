import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminNavbar from "./AdminNavbar";

import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import {
  FaArrowRight,
  FaBoxOpen,
  FaChartLine,
  FaClock,
  FaRupeeSign,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";


// =============================================================
// ADMIN DASHBOARD
// =============================================================

export default function AdminDashboard() {
  const navigate = useNavigate();

  const { user } =
    useContext(AuthContext);

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


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
          "Error fetching dashboard orders:",
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
  // STATISTICS
  // ===========================================================

  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum +
        Number(order.total || 0),
      0
    );


  const pendingOrders =
    orders.filter(
      (order) =>
        order.status === "Placed" ||
        order.status === "Processing"
    ).length;


  const customers =
    new Set(
      orders
        .map(
          (order) => order.userId
        )
        .filter(Boolean)
    ).size;


  // ===========================================================
  // FORMAT DATE
  // ===========================================================

  const formatDate = (
    createdAt
  ) => {
    if (!createdAt) {
      return "Date unavailable";
    }

    try {
      const date =
        createdAt?.toDate
          ? createdAt.toDate()
          : new Date(
              createdAt?.seconds
                ? createdAt.seconds *
                    1000
                : createdAt
            );

      if (
        Number.isNaN(
          date.getTime()
        )
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
  // OPEN ADMIN ORDER DETAILS
  // ===========================================================

  const openOrderDetails =
    (orderId) => {
      navigate(
        `/admin/orders/${orderId}`
      );
    };


  // ===========================================================
  // STATUS STYLE
  // ===========================================================

  const getStatusStyle = (
    status
  ) => {
    switch (status) {
      case "Processing":
        return {
          background:
            "#F2E9DF",
          text:
            "#76563F",
          border:
            "#D8C3AF",
        };

      case "Shipped":
        return {
          background:
            "#EEEAE3",
          text:
            "#665F54",
          border:
            "#D1C9BC",
        };

      case "Delivered":
        return {
          background:
            "#EDF2EC",
          text:
            "#60705C",
          border:
            "#C9D6C7",
        };

      default:
        return {
          background:
            "#F5EEE8",
          text:
            "#8B684F",
          border:
            "#DDCABB",
        };
    }
  };


  // ===========================================================
  // LOADING
  // ===========================================================

  if (loading) {
    return (
      <>
        <AdminNavbar />

        <section
          className="
            flex
            min-h-screen
            items-center
            justify-center
            bg-[#F8F3ED]
          "
        >
          <div className="text-center">

            <div
              className="
                mx-auto
                h-8
                w-8
                animate-spin
                rounded-full
                border
                border-[#DCCABC]
                border-t-[#8B5E3C]
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
              Loading dashboard
            </p>

          </div>
        </section>
      </>
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

          <header
            className="
              mb-8
              md:mb-9
            "
          >

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


            <div
              className="
                flex
                flex-col
                gap-3
                md:flex-row
                md:items-end
                md:justify-between
              "
            >

              <div>

                <h1
                  className="
                    font-serif
                    text-[36px]
                    font-semibold
                    leading-none
                    tracking-[-0.5px]
                    text-[#4B352A]
                    md:text-[43px]
                  "
                >
                  Dashboard
                </h1>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-[#81746B]
                  "
                >
                  A quiet overview of your
                  store performance.
                </p>

              </div>

            </div>

          </header>


          {/* =================================================
              STATISTICS
          ================================================= */}

          <div
            className="
              mb-8
              grid
              grid-cols-2
              gap-3
              lg:grid-cols-4
            "
          >

            {/* REVENUE */}

            <div
              className="
                group
                flex
                min-h-[108px]
                flex-col
                justify-between
                rounded-[18px]
                border
                border-[#4B352A]
                bg-[#4B352A]
                px-5
                py-4
                shadow-[0_12px_28px_rgba(75,53,42,0.13)]
                transition-all
                duration-200
                hover:-translate-y-[1px]
                hover:shadow-[0_15px_34px_rgba(75,53,42,0.16)]
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#DCCABC]
                  "
                >
                  Revenue
                </p>

                <FaRupeeSign
                  className="
                    text-[10px]
                    text-[#DCCABC]
                  "
                />

              </div>

              <p
                className="
                  font-serif
                  text-[25px]
                  font-semibold
                  leading-none
                  text-white
                "
              >
                ₹
                {totalRevenue.toLocaleString(
                  "en-IN"
                )}
              </p>

            </div>


            {/* ORDERS */}

            <div
              className="
                group
                flex
                min-h-[108px]
                flex-col
                justify-between
                rounded-[18px]
                border
                border-[#D2BBA7]
                bg-[#F3E8DE]
                px-5
                py-4
                shadow-[0_8px_25px_rgba(75,53,42,0.055)]
                transition-all
                duration-200
                hover:-translate-y-[1px]
                hover:shadow-[0_12px_30px_rgba(75,53,42,0.075)]
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#80624D]
                  "
                >
                  Orders
                </p>

                <FaShoppingBag
                  className="
                    text-[10px]
                    text-[#8B684F]
                  "
                />

              </div>

              <p
                className="
                  font-serif
                  text-[25px]
                  font-semibold
                  leading-none
                  text-[#4B352A]
                "
              >
                {orders.length}
              </p>

            </div>


            {/* CUSTOMERS */}

            <div
              className="
                group
                flex
                min-h-[108px]
                flex-col
                justify-between
                rounded-[18px]
                border
                border-[#D0BDAA]
                bg-[#F1E9DF]
                px-5
                py-4
                shadow-[0_8px_25px_rgba(75,53,42,0.055)]
                transition-all
                duration-200
                hover:-translate-y-[1px]
                hover:shadow-[0_12px_30px_rgba(75,53,42,0.075)]
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#755A46]
                  "
                >
                  Customers
                </p>

                <FaUsers
                  className="
                    text-[10px]
                    text-[#80644D]
                  "
                />

              </div>

              <p
                className="
                  font-serif
                  text-[25px]
                  font-semibold
                  leading-none
                  text-[#4B352A]
                "
              >
                {customers}
              </p>

            </div>


            {/* PENDING */}

            <div
              className="
                group
                flex
                min-h-[108px]
                flex-col
                justify-between
                rounded-[18px]
                border
                border-[#C9C2B6]
                bg-[#EFEEE9]
                px-5
                py-4
                shadow-[0_8px_25px_rgba(75,53,42,0.055)]
                transition-all
                duration-200
                hover:-translate-y-[1px]
                hover:shadow-[0_12px_30px_rgba(75,53,42,0.075)]
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#625B50]
                  "
                >
                  Pending Orders
                </p>

                <FaClock
                  className="
                    text-[10px]
                    text-[#746C60]
                  "
                />

              </div>

              <p
                className="
                  font-serif
                  text-[25px]
                  font-semibold
                  leading-none
                  text-[#4B352A]
                "
              >
                {pendingOrders}
              </p>

            </div>

          </div>


          {/* =================================================
              RECENT ORDERS HEADER
          ================================================= */}

          <div
            className="
              mb-4
              flex
              items-end
              justify-between
              gap-4
              px-1
            "
          >

            <div>

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[2.5px]
                  text-[#9A8C82]
                "
              >
                Store Activity
              </p>

              <h2
                className="
                  mt-1
                  font-serif
                  text-[23px]
                  font-semibold
                  text-[#4B352A]
                  md:text-[25px]
                "
              >
                Recent Orders
              </h2>

            </div>


            {/* VIEW ALL */}

            {orders.length > 0 && (
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/orders"
                  )
                }
                className="
                  inline-flex
                  h-9
                  shrink-0
                  items-center
                  gap-2
                  rounded-[10px]
                  bg-[#4B352A]
                  px-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[1.4px]
                  text-white
                  shadow-[0_6px_15px_rgba(75,53,42,0.10)]
                  transition-all
                  duration-200
                  hover:-translate-y-[1px]
                  hover:bg-[#5A4032]
                  hover:shadow-[0_9px_20px_rgba(75,53,42,0.14)]
                "
              >

                <span>
                  View All
                </span>

                <FaArrowRight
                  className="text-[8px]"
                />

              </button>
            )}

          </div>


          {/* =================================================
              ORDERS
          ================================================= */}

          {orders.length === 0 ? (

            <div
              className="
                rounded-[21px]
                border
                border-[#D8C8BB]
                bg-white
                px-6
                py-16
                text-center
                shadow-[0_8px_28px_rgba(75,53,42,0.035)]
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

                <FaBoxOpen
                  className="
                    text-sm
                    text-[#9A765B]
                  "
                />

              </div>


              <p
                className="
                  mt-5
                  font-serif
                  text-xl
                  font-semibold
                  text-[#4B352A]
                "
              >
                No orders yet
              </p>


              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-[#81746B]
                "
              >
                New customer orders will
                appear here.
              </p>

            </div>

          ) : (

            <div
              className="
                overflow-hidden
                rounded-[21px]
                border
                border-[#D8C8BB]
                bg-white
                shadow-[0_9px_30px_rgba(75,53,42,0.04)]
              "
            >

              {orders
                .slice(0, 5)
                .map(
                  (
                    order,
                    index
                  ) => {

                    const status =
                      order.status ||
                      "Placed";

                    const statusStyle =
                      getStatusStyle(
                        status
                      );

                    const firstName =
                      order.customer
                        ?.firstName ||
                      "";

                    const lastName =
                      order.customer
                        ?.lastName ||
                      "";

                    const customerName =
                      `${firstName} ${lastName}`.trim() ||
                      "Customer";

                    const initial =
                      firstName
                        ?.charAt(0)
                        ?.toUpperCase() ||
                      customerName
                        .charAt(0)
                        .toUpperCase() ||
                      "C";

                    return (
                      <div
                        key={order.id}
                        className={`
                          group
                          flex
                          flex-col
                          gap-4
                          px-4
                          py-4
                          transition-all
                          duration-200
                          hover:bg-[#FCFAF8]
                          sm:px-5
                          md:flex-row
                          md:items-center
                          md:justify-between
                          md:px-6
                          ${
                            index !== 0
                              ? "border-t border-[#E7DDD5]"
                              : ""
                          }
                        `}
                      >

                        {/* =====================================
                            CUSTOMER
                        ===================================== */}

                        <div
                          className="
                            flex
                            min-w-0
                            items-center
                            gap-3.5
                          "
                        >

                          <div
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-[#D3C0B0]
                              bg-[#F2EAE2]
                              text-[10px]
                              font-semibold
                              text-[#75523B]
                            "
                          >
                            {initial}
                          </div>


                          <div
                            className="
                              min-w-0
                            "
                          >

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
                                  tracking-[1.4px]
                                  text-[#A09288]
                                "
                              >
                                #
                                {order.id
                                  .slice(
                                    -8
                                  )
                                  .toUpperCase()}
                              </p>

                            </div>


                            <p
                              className="
                                mt-1
                                truncate
                                text-[13px]
                                font-semibold
                                text-[#4B352A]
                              "
                            >
                              {customerName}
                            </p>


                            <p
                              className="
                                mt-0.5
                                text-[9px]
                                text-[#A09288]
                              "
                            >
                              {formatDate(
                                order.createdAt
                              )}
                            </p>

                          </div>

                        </div>


                        {/* =====================================
                            ORDER INFORMATION
                        ===================================== */}

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            md:justify-end
                            md:gap-7
                          "
                        >

                          {/* STATUS */}

                          <div
                            className="
                              min-w-[92px]
                            "
                          >

                            <p
                              className="
                                mb-1
                                text-[7px]
                                font-semibold
                                uppercase
                                tracking-[1.5px]
                                text-[#A09288]
                              "
                            >
                              Status
                            </p>

                            <span
                              className="
                                inline-flex
                                items-center
                                rounded-full
                                border
                                px-2.5
                                py-1
                                text-[8px]
                                font-semibold
                                tracking-[0.2px]
                              "
                              style={{
                                backgroundColor:
                                  statusStyle.background,
                                color:
                                  statusStyle.text,
                                borderColor:
                                  statusStyle.border,
                              }}
                            >
                              {status}
                            </span>

                          </div>


                          {/* TOTAL */}

                          <div
                            className="
                              min-w-[70px]
                              text-right
                            "
                          >

                            <p
                              className="
                                mb-1
                                text-[7px]
                                font-semibold
                                uppercase
                                tracking-[1.5px]
                                text-[#A09288]
                              "
                            >
                              Total
                            </p>

                            <p
                              className="
                                font-serif
                                text-[15px]
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


                          {/* ARROW */}

                          <button
                            type="button"
                            aria-label={`View order ${order.id}`}
                            onClick={() =>
                              openOrderDetails(
                                order.id
                              )
                            }
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-[#D5C2B3]
                              bg-[#FBF8F4]
                              text-[#8B5E3C]
                              transition-all
                              duration-200
                              hover:border-[#4B352A]
                              hover:bg-[#4B352A]
                              hover:text-white
                              hover:shadow-[0_5px_14px_rgba(75,53,42,0.12)]
                            "
                          >
                            <FaArrowRight
                              className="text-[8px]"
                            />
                          </button>

                        </div>

                      </div>
                    );
                  }
                )}

            </div>

          )}


          {/* =================================================
              FOOTER INSIGHT
          ================================================= */}

          <div
            className="
              mt-7
              flex
              items-center
              gap-3
              px-1
            "
          >

            <FaChartLine
              className="
                text-[10px]
                text-[#B9987C]
              "
            />

            <p
              className="
                text-[10px]
                leading-5
                text-[#9A8C82]
              "
            >
              A clear view of your store,
              orders, and customer activity.
            </p>

          </div>

        </div>

      </section>
    </>
  );
}