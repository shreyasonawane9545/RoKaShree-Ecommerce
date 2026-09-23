import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import {
  FaArrowLeft,
  FaBoxOpen,
  FaShoppingBag,
  FaTruck,
  FaCheck,
  FaMapMarkerAlt,
  FaCreditCard,
  FaPhoneAlt,
} from "react-icons/fa";

export default function MyOrders() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      try {
        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(ordersQuery);

        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Date
  const formatDate = (createdAt) => {
    if (!createdAt) return "Recently";

    try {
      const date = createdAt?.toDate
        ? createdAt.toDate()
        : new Date(createdAt);

      if (Number.isNaN(date.getTime())) return "Recently";

      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  };

  // Payment
  const formatPayment = (method) => {
    if (!method) return "Payment";

    const value = String(method).toLowerCase();

    if (value === "cod") return "Cash on Delivery";
    if (value === "upi") return "UPI";
    if (value === "card") return "Card";

    return method;
  };

  // Timeline step
  const getStep = (status) => {
    const value = String(status || "Placed").toLowerCase();

    if (value.includes("deliver")) return 4;
    if (value.includes("ship")) return 3;
    if (value.includes("process")) return 2;

    return 1;
  };

  // Status
  const getStatus = (status) => {
    const value = String(status || "Placed").toLowerCase();

    if (value.includes("deliver")) return "Delivered";
    if (value.includes("ship")) return "Shipped";
    if (value.includes("process")) return "Processing";

    return "Placed";
  };

  // Customer name
  const getName = (order) => {
    const customer = order.customer || {};

    const name = [
      customer.firstName,
      customer.lastName,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    return name || order.customerName || "Customer";
  };

  // Phone
  const getPhone = (order) => {
    return (
      order.customer?.phone ||
      order.deliveryAddress?.phone ||
      order.phone ||
      ""
    );
  };

  // Address
  const getAddress = (order) => {
    const address = order.deliveryAddress || {};

    const firstLine = [
      address.address,
      address.house,
      address.area,
      address.landmark,
    ]
      .filter(Boolean)
      .join(", ");

    const secondLine = [
      address.city,
      address.state,
      address.pincode,
    ]
      .filter(Boolean)
      .join(", ");

    return {
      firstLine,
      secondLine,
      country: address.country || "",
    };
  };

  // Safe product price
  const getItemPrice = (item) => {
    const value = item?.price ?? item?.unitPrice ?? 0;

    if (typeof value === "number") {
      return value;
    }

    const cleaned = String(value).replace(/[₹,\s]/g, "");
    const number = Number(cleaned);

    return Number.isFinite(number) ? number : 0;
  };

  // Safe order total
  const getTotal = (order) => {
    const value = order?.total ?? order?.subtotal ?? 0;

    if (typeof value === "number") {
      return value.toLocaleString("en-IN");
    }

    const cleaned = String(value).replace(/[₹,\s]/g, "");
    const number = Number(cleaned);

    return Number.isFinite(number)
      ? number.toLocaleString("en-IN")
      : "0";
  };

  // Loading
  if (loading) {
    return (
      <section className="min-h-screen bg-[#F8F3ED] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto rounded-full border-2 border-[#DDCFC2] border-t-[#8B5E3C] animate-spin" />
          <p className="text-[11px] text-[#8A7A6E] mt-4">
            Loading your orders...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8F3ED] text-[#4B352A] overflow-x-hidden">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-12">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#E5D9CE] flex items-center justify-center text-[#8B5E3C] shadow-[0_5px_18px_rgba(75,53,42,0.06)] hover:bg-[#8B5E3C] hover:text-white hover:border-[#8B5E3C] transition-all duration-300"
        >
          <FaArrowLeft className="text-[10px]" />
        </button>

        {/* Header */}
        <div className="text-center max-w-[620px] mx-auto mt-8 sm:mt-10 mb-8 sm:mb-9">
          <p className="text-[8px] sm:text-[9px] uppercase tracking-[3px] sm:tracking-[4px] text-[#8B5E3C] font-semibold">
            Your RoKaShree Collection
          </p>

          <h1 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] font-semibold text-[#4B352A] mt-2.5 leading-tight">
            My Orders
          </h1>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="w-8 sm:w-10 h-px bg-[#CDB7A3]" />
            <span className="text-[#8B5E3C] text-[9px]">✦</span>
            <span className="w-8 sm:w-10 h-px bg-[#CDB7A3]" />
          </div>

          <p className="text-[10px] sm:text-xs text-[#8A7A6E] mt-4">
            Every order, every detail — beautifully kept in one place.
          </p>
        </div>

        {/* Empty */}
        {orders.length === 0 && (
          <div className="max-w-[560px] mx-auto bg-white border border-[#E6DDD4] rounded-[24px] px-6 py-14 text-center shadow-[0_10px_35px_rgba(75,53,42,0.05)]">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#F3E8DC] border border-[#E5D6C8] flex items-center justify-center text-[#8B5E3C]">
              <FaShoppingBag />
            </div>

            <p className="text-[8px] uppercase tracking-[3px] text-[#8B5E3C] font-semibold mt-5">
              Your Collection Awaits
            </p>

            <h2 className="font-serif text-[25px] sm:text-3xl font-semibold mt-2">
              No Orders Yet
            </h2>

            <p className="text-[11px] sm:text-xs text-[#8A7A6E] leading-5 mt-3 max-w-sm mx-auto">
              You haven't placed an order yet. Discover handcrafted pieces created with patience, care and love.
            </p>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 mt-6 text-[#8B5E3C] text-xs font-semibold hover:text-[#6D472D] transition-colors"
            >
              Explore Collection
              <span>→</span>
            </Link>
          </div>
        )}

        {/* Orders */}
        {orders.length > 0 && (
          <div className="max-w-[980px] mx-auto space-y-5">

            {orders.map((order) => {
              const items = Array.isArray(order.items)
                ? order.items
                : [];

              const step = getStep(order.status);
              const status = getStatus(order.status);
              const address = getAddress(order);
              const name = getName(order);
              const phone = getPhone(order);

              return (
                <article
                  key={order.id}
                  className="bg-white border border-[#E5DAD1] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(75,53,42,0.05)]"
                >

                  {/* Order header */}
                  <div className="px-4 sm:px-6 lg:px-7 py-3.5 sm:py-4 bg-[#FEFCFA] border-b border-[#EEE5DD]">
                    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3">

                      <div className="min-w-0">
                        <p className="text-[7px] sm:text-[8px] uppercase tracking-[1.7px] text-[#9A7355] font-semibold">
                          Order ID
                        </p>

                        <p className="text-[11px] sm:text-[13px] font-semibold text-[#4B352A] mt-1 truncate">
                          #{order.id.slice(-8).toUpperCase()}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[7px] sm:text-[8px] uppercase tracking-[1.3px] text-[#A09288]">
                          Placed on
                        </p>

                        <p className="text-[8px] sm:text-[10px] text-[#6D5A4E] mt-1 whitespace-nowrap">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <span className="px-2.5 sm:px-3 py-1.5 rounded-full bg-[#EAF3E6] text-[#66835F] text-[7px] sm:text-[9px] font-semibold whitespace-nowrap">
                        {status}
                      </span>
                    </div>
                  </div>

                  {/* Order content */}
                  <div className="px-4 sm:px-6 lg:px-7 py-3.5 sm:py-4">

                    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-4 lg:gap-5">

                      {/* Products */}
                      <div className="min-w-0">
                        <p className="text-[8px] sm:text-[9px] font-semibold text-[#4B352A] mb-3">
                          Your Items
                          <span className="font-normal text-[#9A8C82]">
                            {" "}({items.length} {items.length === 1 ? "item" : "items"})
                          </span>
                        </p>

                        <div className="space-y-3">
                          {items.map((item, index) => (
                            <div
                              key={`${item.name || "item"}-${index}`}
                              className="flex items-center gap-3 sm:gap-3.5 min-w-0"
                            >

                              <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] shrink-0 rounded-[11px] bg-[#F7F1EA] border border-[#E9DED4] flex items-center justify-center overflow-hidden">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name || "Product"}
                                    className="w-[47px] h-[47px] sm:w-[53px] sm:h-[53px] object-contain"
                                  />
                                ) : (
                                  <FaBoxOpen className="text-[#B99B83] text-sm" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <h3 className="text-[10px] sm:text-[12px] font-semibold text-[#4B352A] leading-4 line-clamp-2">
                                  {item.name || "Handcrafted Product"}
                                </h3>

                                <p className="text-[8px] sm:text-[9px] text-[#9A8C82] mt-1">
                                  Qty {item.quantity || 1}
                                  {item.category ? ` · ${item.category}` : ""}
                                </p>
                              </div>

                              <p className="shrink-0 font-serif text-[14px] sm:text-[16px] font-semibold text-[#8B5E3C]">
                                ₹{getItemPrice(item).toLocaleString("en-IN")}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right details */}
                      <div className="space-y-2.5">

                        {/* Payment + Delivery */}
                        <div className="grid grid-cols-2 gap-2.5">

                          <div className="bg-[#FAF6F1] border border-[#EEE3D9] rounded-[13px] px-3 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-white border border-[#E5D8CC] flex items-center justify-center text-[#8B5E3C] shrink-0">
                                <FaCreditCard className="text-[8px]" />
                              </div>

                              <div className="min-w-0">
                                <p className="text-[7px] uppercase tracking-[1.2px] text-[#A09288]">
                                  Payment
                                </p>

                                <p className="text-[9px] sm:text-[10px] font-semibold text-[#4B352A] mt-0.5 truncate">
                                  {formatPayment(order.paymentMethod)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#FAF6F1] border border-[#EEE3D9] rounded-[13px] px-3 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-white border border-[#E5D8CC] flex items-center justify-center text-[#8B5E3C] shrink-0">
                                <FaTruck className="text-[8px]" />
                              </div>

                              <div>
                                <p className="text-[7px] uppercase tracking-[1.2px] text-[#A09288]">
                                  Delivery
                                </p>

                                <p className="text-[9px] sm:text-[10px] font-semibold text-[#4B352A] mt-0.5">
                                  5–7 Days
                                </p>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Address */}
                        <div className="bg-[#FAF6F1] border border-[#EEE3D9] rounded-[13px] px-3 py-3">
                          <div className="flex items-start gap-2.5">

                            <div className="w-7 h-7 rounded-full bg-white border border-[#E5D8CC] flex items-center justify-center text-[#8B5E3C] shrink-0">
                              <FaMapMarkerAlt className="text-[8px]" />
                            </div>

                            <div className="min-w-0 flex-1">

                              <p className="text-[7px] sm:text-[8px] uppercase tracking-[1.3px] text-[#9A7355] font-semibold">
                                Delivery Address
                              </p>

                              <div className="flex items-center gap-2 mt-1 flex-wrap">

                                <span className="text-[10px] sm:text-[11px] font-semibold text-[#4B352A]">
                                  {name}
                                </span>

                                {phone && (
                                  <>
                                    <span className="w-1 h-1 rounded-full bg-[#B99C85]" />

                                    <span className="flex items-center gap-1 text-[8px] sm:text-[9px] text-[#806E62]">
                                      <FaPhoneAlt className="text-[6px]" />
                                      {phone}
                                    </span>
                                  </>
                                )}
                              </div>

                              {address.firstLine && (
                                <p className="text-[8px] sm:text-[9px] text-[#8D7D72] leading-4 mt-1">
                                  {address.firstLine}
                                </p>
                              )}

                              {address.secondLine && (
                                <p className="text-[8px] sm:text-[9px] text-[#8D7D72] leading-4">
                                  {address.secondLine}
                                </p>
                              )}

                              {address.country && (
                                <p className="text-[8px] sm:text-[9px] text-[#8D7D72] leading-4">
                                  {address.country}
                                </p>
                              )}

                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="mt-4 pt-4 border-t border-[#EEE5DD]">

                      <div className="flex items-start w-full">

                        {/* Placed */}
                        <div className="w-[58px] sm:w-[90px] shrink-0 text-center">
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 mx-auto rounded-full border flex items-center justify-center ${step >= 1 ? "bg-[#8B5E3C] border-[#8B5E3C] text-white" : "bg-white border-[#D8C8BA] text-[#B9A99C]"}`}>
                            <FaCheck className="text-[6px] sm:text-[7px]" />
                          </div>

                          <p className="text-[7px] sm:text-[8px] font-semibold text-[#4B352A] mt-1.5">
                            Placed
                          </p>

                          <p className="text-[6px] sm:text-[7px] text-[#A09288] mt-0.5">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>

                        {/* Line */}
                        <div className={`flex-1 h-px mt-3 ${step >= 2 ? "bg-[#8B5E3C]" : "bg-[#D8C8BA]"}`} />

                        {/* Processing */}
                        <div className="w-[58px] sm:w-[90px] shrink-0 text-center">
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 mx-auto rounded-full border flex items-center justify-center ${step >= 2 ? "bg-[#8B5E3C] border-[#8B5E3C] text-white" : "bg-white border-[#D8C8BA] text-[#B9A99C]"}`}>
                            <FaCheck className="text-[6px] sm:text-[7px]" />
                          </div>

                          <p className="text-[7px] sm:text-[8px] font-semibold text-[#4B352A] mt-1.5">
                            Processing
                          </p>

                          <p className="text-[6px] sm:text-[7px] text-[#A09288] mt-0.5">
                            {step >= 2 ? "Completed" : "Pending"}
                          </p>
                        </div>

                        {/* Line */}
                        <div className={`flex-1 h-px mt-3 ${step >= 3 ? "bg-[#8B5E3C]" : "bg-[#D8C8BA]"}`} />

                        {/* Shipping */}
                        <div className="w-[58px] sm:w-[90px] shrink-0 text-center">
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 mx-auto rounded-full border flex items-center justify-center ${step >= 3 ? "bg-[#8B5E3C] border-[#8B5E3C] text-white" : "bg-white border-[#D8C8BA] text-[#B9A99C]"}`}>
                            <FaTruck className="text-[6px] sm:text-[7px]" />
                          </div>

                          <p className="text-[7px] sm:text-[8px] font-semibold text-[#4B352A] mt-1.5">
                            Shipping
                          </p>

                          <p className="text-[6px] sm:text-[7px] text-[#A09288] mt-0.5">
                            {step >= 3 ? "In transit" : "Pending"}
                          </p>
                        </div>

                        {/* Line */}
                        <div className={`flex-1 h-px mt-3 ${step >= 4 ? "bg-[#8B5E3C]" : "bg-[#D8C8BA]"}`} />

                        {/* Delivered */}
                        <div className="w-[58px] sm:w-[90px] shrink-0 text-center">
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 mx-auto rounded-full border flex items-center justify-center ${step >= 4 ? "bg-[#8B5E3C] border-[#8B5E3C] text-white" : "bg-white border-[#D8C8BA] text-[#B9A99C]"}`}>
                            <FaCheck className="text-[6px] sm:text-[7px]" />
                          </div>

                          <p className="text-[7px] sm:text-[8px] font-semibold text-[#4B352A] mt-1.5">
                            Delivered
                          </p>

                          <p className="text-[6px] sm:text-[7px] text-[#A09288] mt-0.5">
                            {step >= 4 ? "Completed" : "Pending"}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Total */}
                    <div className="mt-4 pt-4 border-t border-[#EEE5DD] flex items-end justify-between gap-4">

                      <div>
                        <p className="text-[9px] sm:text-[10px] font-semibold text-[#4B352A]">
                          Order Total
                        </p>

                        <p className="text-[7px] sm:text-[9px] text-[#9A8C82] mt-1">
                          {items.length} {items.length === 1 ? "item" : "items"} · Shipping included
                        </p>
                      </div>

                      <p className="font-serif text-[24px] sm:text-[28px] font-semibold text-[#8B5E3C] leading-none whitespace-nowrap">
                        ₹{getTotal(order)}
                      </p>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* RoKaShree Promise */}

 <div className="w-full py-5">
  <div className="grid grid-cols-3 w-full max-w-[360px] mx-auto">

    <div className="flex flex-col items-center text-center px-1">
      <div className="w-7 h-7 rounded-full bg-white border border-[#E5D8CC] flex items-center justify-center text-[#8B5E3C] text-[9px]">
        ✦
      </div>
      <p className="text-[7px] font-semibold text-[#4B352A] mt-2 whitespace-nowrap">
        Handmade
      </p>
      <p className="text-[6px] text-[#A09288] mt-0.5 whitespace-nowrap">
        Crafted with care
      </p>
    </div>

    <div className="flex flex-col items-center text-center px-1 border-l border-[#DED2C8]">
      <div className="w-7 h-7 rounded-full bg-white border border-[#E5D8CC] flex items-center justify-center text-[#8B5E3C] text-[9px]">
        <FaCheck />
      </div>
      <p className="text-[7px] font-semibold text-[#4B352A] mt-2 whitespace-nowrap">
        Secure Shopping
      </p>
      <p className="text-[6px] text-[#A09288] mt-0.5 whitespace-nowrap">
        Safe & protected
      </p>
    </div>

    <div className="flex flex-col items-center text-center px-1 border-l border-[#DED2C8]">
      <div className="w-7 h-7 rounded-full bg-white border border-[#E5D8CC] flex items-center justify-center text-[#8B5E3C] text-[9px]">
        <FaTruck />
      </div>
      <p className="text-[7px] font-semibold text-[#4B352A] mt-2 whitespace-nowrap">
        Carefully Delivered
      </p>
      <p className="text-[6px] text-[#A09288] mt-0.5 whitespace-nowrap">
        To your doorstep
      </p>
    </div>

  </div>
</div>
          <div className="text-center mt-8">
            <p className="text-[8px] uppercase tracking-[3px] text-[#8B5E3C] font-semibold">
              The RoKaShree Promise
            </p>

            <p className="font-serif italic text-[#6D594B] text-[12px] sm:text-sm mt-2">
              Thoughtfully handcrafted. Beautifully made.
            </p>
          </div>

        </div>
      
    </section>
  );
}