import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import { toast5 } from "../utils/toast";
import { AuthContext } from "./AuthContext";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc, } from "firebase/firestore";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);

  // =========================================================
  // LOAD WISHLIST FROM LOCAL STORAGE
  // =========================================================

  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist =
        localStorage.getItem("wishlistItems");

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    } catch (error) {
      console.error(
        "Error loading wishlist:",
        error
      );

      return [];
    }
  });

  // =========================================================
  // SAVE WISHLIST TO LOCAL STORAGE + FIRESTORE
  // =========================================================

  useEffect(() => {
    const saveWishlist = async () => {
      try {
        // Save locally
        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(wishlistItems)
        );

        // Don't save to Firebase if nobody is logged in
        if (!user) return;

        // Firebase wishlist location
        const wishlistRef = doc(
          db,
          "users",
          user.uid,
          "data",
          "wishlist"
        );

        // Save wishlist
        await setDoc(wishlistRef, {
          items: wishlistItems,
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error(
          "Error saving wishlist:",
          error
        );
      }
    };

    saveWishlist();
  }, [wishlistItems, user]);

  // =========================================================
  // LOAD WISHLIST FROM FIRESTORE
  // =========================================================

  useEffect(() => {
    const loadWishlist = async () => {
      if (!user) return;

      try {
        const wishlistRef = doc(
          db,
          "users",
          user.uid,
          "data",
          "wishlist"
        );

        const wishlistSnap =
          await getDoc(wishlistRef);

        if (wishlistSnap.exists()) {
          const firebaseWishlist =
            wishlistSnap.data().items || [];

          setWishlistItems(firebaseWishlist);

          localStorage.setItem(
            "wishlistItems",
            JSON.stringify(firebaseWishlist)
          );
        }
      } catch (error) {
        console.error(
          "Error loading wishlist from Firestore:",
          error
        );
      }
    };

    loadWishlist();
  }, [user]);

  // =========================================================
  // ADD TO WISHLIST
  // =========================================================

  const addToWishlist = (product) => {
    // Check existing wishlist BEFORE updating state
    const exists = wishlistItems.some(
      (item) => item.name === product.name
    );

    if (exists) {
     toast5.info("Already in Wishlist ❤️", {
  autoClose: 5000,
});
      return;
    }

    // Add product to wishlist
    setWishlistItems((currentItems) => [
      ...currentItems,
      product,
    ]);

    // Toast is OUTSIDE the state updater
    // This prevents duplicate notifications in React StrictMode
   toast5.success("Added to Wishlist ❤️", {
  autoClose: 5000,
});
  };

  // =========================================================
  // REMOVE FROM WISHLIST
  // =========================================================

  const removeFromWishlist = (name) => {
    setWishlistItems((currentItems) =>
      currentItems.filter(
        (item) => item.name !== name
      )
    );

   toast5.success("Removed from Wishlist", {
  autoClose: 5000,
});
  };

  // =========================================================
  // CLEAR WISHLIST
  // =========================================================

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // =========================================================
  // CONTEXT
  // =========================================================

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}