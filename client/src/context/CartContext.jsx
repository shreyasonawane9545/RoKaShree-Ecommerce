import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import { AuthContext } from "./AuthContext";

import { db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const { user } = useContext(AuthContext);

  // =========================================================
  // LOAD CART
  // =========================================================

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // =========================================================
// SAVE CART TO LOCAL STORAGE + FIRESTORE
// =========================================================

useEffect(() => {
  const saveCart = async () => {
    try {
      // Save locally
      localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
      );

      // Don't save to Firebase if nobody is logged in
      if (!user) return;

      // Firebase cart location
      const cartRef = doc(
        db,
        "users",
        user.uid,
        "data",
        "cart"
      );

      // Save cart
      await setDoc(cartRef, {
        items: cartItems,
        updatedAt: new Date(),
      });

    } catch (error) {
      console.error(
        "Error saving cart:",
        error
      );
    }
  };

  saveCart();
}, [cartItems, user]);


  // =========================================================
// LOAD CART FROM FIRESTORE
// =========================================================

useEffect(() => {
  const loadCart = async () => {
    if (!user) return;

    try {
      const cartRef = doc(
        db,
        "users",
        user.uid,
        "data",
        "cart"
      );

      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const firebaseCart = cartSnap.data().items || [];

        setCartItems(firebaseCart);

        localStorage.setItem(
          "cartItems",
          JSON.stringify(firebaseCart)
        );
      }
    } catch (error) {
      console.error(
        "Error loading cart from Firestore:",
        error
      );
    }
  };

  loadCart();
}, [user]);

  // =========================================================
  // ADD PRODUCT
  // =========================================================

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingProduct = currentItems.find(
        (item) => item.name === product.name
      );

      if (existingProduct) {
        return currentItems.map((item) =>
          item.name === product.name
            ? {
                ...item,
                quantity:
                  item.quantity + (product.quantity || 1),
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: product.quantity || 1,
        },
      ];
    });
  };

  // =========================================================
  // INCREASE QUANTITY
  // =========================================================

  const increaseQuantity = (name) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.name === name
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // =========================================================
  // DECREASE QUANTITY
  // =========================================================

  const decreaseQuantity = (name) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.name === name
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // =========================================================
  // REMOVE PRODUCT
  // =========================================================

  const removeFromCart = (name) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.name !== name
      )
    );
  };

  // =========================================================
  // CLEAR CART
  // =========================================================

  const clearCart = () => {
    setCartItems([]);
  };

  // =========================================================
  // CONTEXT
  // =========================================================

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}