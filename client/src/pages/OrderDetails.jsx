import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";

import { doc, getDoc } from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { user } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!user || !orderId) {
        setLoading(false);
        return;
      }

      try {
        const orderRef = doc(db, "orders", orderId);
        const snapshot = await getDoc(orderRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          // Security check:
          // Only the owner of the order can view it.
          if (data.userId !== user.uid) {
            console.error("Unauthorized order access.");
            setOrder(null);
            return;
          }

          setOrder({
            id: snapshot.id,
            ...data,
          });
        } else {
          setOrder(null);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [user, orderId]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F8F3ED] flex items-center justify-center">
        <p className="text-sm text-[#8B5E3C]">
          Loading order...
        </p>
      </section>
    );
  }

  /* =========================================================
     ORDER NOT FOUND
  ========================================================= */

  if (!order) {
    return (
      <section className="min-h-screen bg-[#F8F3ED] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-semibold text-[#4B352A]">
            Order Not Found
          </h1>

          <button
            type="button"
            onClick={() => navigate("/my-orders")}
            className="
              mt-6
              bg-[#8B5E3C]
              hover:bg-[#6D472D]
              text-white
              px-6
              py-3
              rounded-full
              text-sm
              font-semibold
              transition-all
            "
          >
            Back to My Orders
          </button>
        </div>
      </section>
    );
  }

  /* =========================================================
     DYNAMIC ORDER STATUS
  ========================================================= */

  const statusSteps = [
    "Placed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const currentStatusIndex = statusSteps.indexOf(
    order.status || "Placed"
  );

  return (
    <section className="min-h-screen bg-[#F8F3ED] py-10">
      <div className="max-w-5xl mx-auto px-5 md:px-8">

        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() => navigate("/my-orders")}
          aria-label="Back to My Orders"
          className="
            group
            w-10
            h-10
            rounded-full
            bg-white
            border
            border-[#E5D9CE]
            flex
            items-center
            justify-center
            text-[#8B5E3C]
            shadow-[0_4px_15px_rgba(75,53,42,0.05)]
            hover:bg-[#8B5E3C]
            hover:text-white
            hover:border-[#8B5E3C]
            hover:-translate-x-0.5
            transition-all
            duration-300
          "
        >
          <FaArrowLeft className="text-xs" />
        </button>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="text-center mt-10">

          <p
            className="
              uppercase
              tracking-[4px]
              text-[9px]
              text-[#8B5E3C]
              font-semibold
            "
          >
            Your RoKaShree Order
          </p>

          <h1
            className="
              font-serif
              text-3xl
              md:text-4xl
              font-semibold
              text-[#4B352A]
              mt-3
            "
          >
            Order #{order.id.slice(-8).toUpperCase()}
          </h1>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="w-8 h-px bg-[#CDB7A3]" />

            <span className="text-[#8B5E3C] text-xs">
              ✦
            </span>

            <span className="w-8 h-px bg-[#CDB7A3]" />
          </div>

        </div>

        {/* =====================================================
            STATUS
        ===================================================== */}

        <div
          className="
            bg-white
            border
            border-[#E6DDD4]
            rounded-[24px]
            p-6
            mt-10
            shadow-[0_10px_35px_rgba(75,53,42,0.05)]
          "
        >
          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
            "
          >

            <div>
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[2px]
                  text-[#9A8C82]
                "
              >
                Order Status
              </p>

              <p
                className="
                  text-lg
                  font-semibold
                  text-[#4B352A]
                  mt-1
                "
              >
                {order.status || "Placed"}
              </p>
            </div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-[#EEF5EA]
                text-[#66835F]
                px-4
                py-2
                rounded-full
                text-xs
                font-semibold
              "
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#66835F]" />

              {order.status || "Placed"}
            </div>

          </div>
        </div>

        {/* =====================================================
            PRODUCTS
        ===================================================== */}

        <div
          className="
            bg-white
            border
            border-[#E6DDD4]
            rounded-[24px]
            mt-5
            p-6
            md:p-8
            shadow-[0_10px_35px_rgba(75,53,42,0.05)]
          "
        >

          <p
            className="
              text-[9px]
              uppercase
              tracking-[3px]
              text-[#9A7355]
              font-semibold
            "
          >
            Your Selection
          </p>

          <h2
            className="
              font-serif
              text-2xl
              font-semibold
              text-[#4B352A]
              mt-2
            "
          >
            Ordered Items
          </h2>

          <div className="mt-6 space-y-5">

            {order.items?.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="
                  flex
                  items-center
                  gap-4
                  py-4
                  border-b
                  border-[#EEE5DD]
                  last:border-b-0
                "
              >

                <div
                  className="
                    w-20
                    h-20
                    flex-shrink-0
                    rounded-2xl
                    bg-[#FAF6F1]
                    border
                    border-[#EEE3D9]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">

                  <h3
                    className="
                      text-sm
                      md:text-base
                      font-semibold
                      text-[#4B352A]
                    "
                  >
                    {item.name}
                  </h3>

                  <p
                    className="
                      text-[11px]
                      text-[#9A8C82]
                      mt-1
                    "
                  >
                    Quantity: {item.quantity}
                  </p>

                </div>

                <div className="text-right">

                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[1px]
                      text-[#9A8C82]
                    "
                  >
                    Price
                  </p>

                  <p
                    className="
                      text-base
                      font-semibold
                      text-[#8B5E3C]
                      mt-1
                    "
                  >
                    ₹{Number(item.price || 0).toLocaleString("en-IN")}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* =====================================================
            ORDER SUMMARY
        ===================================================== */}

        <div
          className="
            grid
            md:grid-cols-2
            gap-5
            mt-5
          "
        >

          {/* PAYMENT */}

          <div
            className="
              bg-white
              border
              border-[#E6DDD4]
              rounded-[24px]
              p-6
              shadow-[0_10px_35px_rgba(75,53,42,0.05)]
            "
          >

            <p
              className="
                text-[9px]
                uppercase
                tracking-[3px]
                text-[#9A7355]
                font-semibold
              "
            >
              Payment
            </p>

            <h2
              className="
                font-serif
                text-xl
                font-semibold
                text-[#4B352A]
                mt-2
              "
            >
              Payment Method
            </h2>

            <p
              className="
                text-sm
                font-semibold
                text-[#6D4A35]
                mt-5
              "
            >
              {order.paymentMethod === "cod"
                ? "Cash on Delivery"
                : order.paymentMethod}
            </p>

          </div>

          {/* TOTAL */}

          <div
            className="
              bg-white
              border
              border-[#E6DDD4]
              rounded-[24px]
              p-6
              shadow-[0_10px_35px_rgba(75,53,42,0.05)]
            "
          >

            <p
              className="
                text-[9px]
                uppercase
                tracking-[3px]
                text-[#9A7355]
                font-semibold
              "
            >
              Order Summary
            </p>

            <div className="mt-5 space-y-3">

              <div className="flex justify-between text-sm text-[#81746B]">
                <span>Subtotal</span>

                <span className="font-semibold text-[#4B352A]">
                  ₹{Number(order.subtotal || 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm text-[#81746B]">
                <span>Shipping</span>

                <span className="font-semibold text-[#66835F]">
                  FREE
                </span>
              </div>

              <div className="h-px bg-[#EEE5DD] my-3" />

              <div className="flex justify-between items-end">

                <span
                  className="
                    text-sm
                    font-semibold
                    text-[#4B352A]
                  "
                >
                  Grand Total
                </span>

                <span
                  className="
                    text-2xl
                    font-serif
                    font-semibold
                    text-[#8B5E3C]
                  "
                >
                  ₹{Number(order.total || 0).toLocaleString("en-IN")}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            DELIVERY ADDRESS
        ===================================================== */}

        <div
          className="
            bg-white
            border
            border-[#E6DDD4]
            rounded-[24px]
            mt-5
            p-6
            md:p-8
            shadow-[0_10px_35px_rgba(75,53,42,0.05)]
          "
        >

          <p
            className="
              text-[9px]
              uppercase
              tracking-[3px]
              text-[#9A7355]
              font-semibold
            "
          >
            Delivery
          </p>

          <h2
            className="
              font-serif
              text-2xl
              font-semibold
              text-[#4B352A]
              mt-2
            "
          >
            Delivery Address
          </h2>

          <div
            className="
              mt-5
              bg-[#FAF7F3]
              border
              border-[#EEE5DD]
              rounded-2xl
              p-5
            "
          >

            <p
              className="
                text-sm
                font-semibold
                text-[#4B352A]
              "
            >
              {order.customer?.firstName}{" "}
              {order.customer?.lastName}
            </p>

            <p
              className="
                text-sm
                text-[#75675E]
                leading-6
                mt-2
              "
            >
              {order.deliveryAddress?.address}

              {order.deliveryAddress?.city &&
                `, ${order.deliveryAddress.city}`}

              {order.deliveryAddress?.state &&
                `, ${order.deliveryAddress.state}`}

              {order.deliveryAddress?.pincode &&
                ` - ${order.deliveryAddress.pincode}`}
            </p>

            {order.customer?.phone && (
              <p
                className="
                  text-xs
                  text-[#8B5E3C]
                  font-semibold
                  mt-3
                "
              >
                +91 {order.customer.phone}
              </p>
            )}

          </div>

        </div>

        {/* =====================================================
            DYNAMIC ORDER TIMELINE
        ===================================================== */}

        <div
          className="
            bg-white
            border
            border-[#E6DDD4]
            rounded-[24px]
            mt-5
            p-6
            md:p-8
            shadow-[0_10px_35px_rgba(75,53,42,0.05)]
          "
        >

          <p
            className="
              text-[9px]
              uppercase
              tracking-[3px]
              text-[#9A7355]
              font-semibold
            "
          >
            Order Journey
          </p>

          <h2
            className="
              font-serif
              text-2xl
              font-semibold
              text-[#4B352A]
              mt-2
            "
          >
            Order Timeline
          </h2>

          <div className="mt-7 space-y-6">

            {statusSteps.map((step, index) => {

              const isCompleted =
                index <= currentStatusIndex;

              const isCurrent =
                index === currentStatusIndex;

              return (
                <div
                  key={step}
                  className="flex items-start gap-4"
                >

                  {/* STEP CIRCLE */}

                  <div
                    className={`
                      w-9
                      h-9
                      rounded-full
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                      transition-all
                      duration-300
                      ${
                        isCompleted
                          ? "bg-[#8B5E3C] text-white"
                          : "bg-[#F3E8DC] text-[#8B5E3C]"
                      }
                    `}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>

                  {/* STEP CONTENT */}

                  <div>

                    <p
                      className={`
                        text-sm
                        font-semibold
                        ${
                          isCurrent
                            ? "text-[#8B5E3C]"
                            : "text-[#4B352A]"
                        }
                      `}
                    >
                      {step === "Placed" && "Order Placed"}
                      {step === "Processing" && "Processing"}
                      {step === "Shipped" && "Shipped"}
                      {step === "Delivered" && "Delivered"}
                    </p>

                    <p
                      className="
                        text-xs
                        text-[#9A8C82]
                        mt-1
                      "
                    >
                      {step === "Placed" &&
                        "Your order has been successfully placed."}

                      {step === "Processing" &&
                        "Your handcrafted pieces will be prepared with care."}

                      {step === "Shipped" &&
                        "Your order will soon be on its way."}

                      {step === "Delivered" &&
                        "Carefully delivered to your doorstep."}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="text-center mt-10 pb-8">

          <p
            className="
              uppercase
              tracking-[4px]
              text-[9px]
              text-[#8B5E3C]
              font-semibold
            "
          >
            The RoKaShree Promise
          </p>

          <p
            className="
              font-serif
              italic
              text-[#6D594B]
              text-sm
              mt-2
            "
          >
            Thoughtfully handcrafted. Beautifully made.
          </p>

        </div>

      </div>
    </section>
  );
}