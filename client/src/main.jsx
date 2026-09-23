import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import CartProvider from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import AuthProvider from "./context/AuthContext";
import ReviewProvider from "./context/ReviewContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ReviewProvider>
          <WishlistProvider>
            <CartProvider>
              <App />

              {/* =====================================================
                  ROKASHREE GLOBAL NOTIFICATION
                  5 SECOND AUTO-CLOSE
              ===================================================== */}

              <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop
                closeOnClick
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                draggable={false}
                closeButton={true}
                hideProgressBar={true}
                icon={false}
                theme="light"
                toastClassName="rokashree-toast"
                toastStyle={{
                  pointerEvents: "auto",
                }}
              />
            </CartProvider>
          </WishlistProvider>
        </ReviewProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
