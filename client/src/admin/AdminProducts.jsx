import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import localProducts from "../data/products";
import AdminNavbar from "./AdminNavbar";

import {
  FaBoxOpen,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaTimes,
  FaImage,
  FaCheckCircle,
  FaExclamationCircle,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa";


// =============================================================
// PRODUCT IMAGE LIBRARY
// =============================================================

const PRODUCT_IMAGES = localProducts.map((product) => ({
  name: product.name,
  path: product.image,
  category: product.category,
}));


// =============================================================
// CATEGORIES
// =============================================================

const CATEGORIES = [
  "Wall Hanging",
  "Plant Hanger",
  "Dream Catcher",
  "Curtain",
  "Mirror",
  "Room Divider",
  "Shelf Decor",
  "Table Runner",
  "Swing Hammock",
  "Wedding Backdrop",
  "Lampshade",
  "Key Holder",
];


// =============================================================
// PREMIUM DROPDOWN
// =============================================================

function PremiumDropdown({
  value,
  options,
  onChange,
  placeholder = "Select",
  compact = false,
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

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
    >
      <button
        type="button"
        onClick={() =>
          setOpen((previous) => !previous)
        }
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
        `}
      >
        <span
          className={`
            truncate
            font-medium
            text-[#624B3E]
            ${
              compact
                ? "text-[12px]"
                : "text-[13px]"
            }
          `}
        >
          {value || placeholder}
        </span>

        <FaChevronDown
          className={`
            ml-2
            shrink-0
            text-[7px]
            text-[#907C6D]
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            top-[calc(100%+6px)]
            z-[80]
            max-h-[260px]
            overflow-y-auto
            rounded-[13px]
            border
            border-[#D8C8BB]
            bg-white
            p-1.5
            shadow-[0_16px_36px_rgba(75,53,42,0.14)]
          "
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
                  py-2.5
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
// ADMIN PRODUCTS
// =============================================================

export default function AdminProducts() {

  // ===========================================================
  // PRODUCTS
  // ===========================================================

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // ===========================================================
  // SEARCH / FILTER
  // ===========================================================

  const [searchTerm, setSearchTerm] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");


  // ===========================================================
  // PRODUCT MODAL
  // ===========================================================

  const [showProductModal, setShowProductModal] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);


  // ===========================================================
  // FORM
  // ===========================================================

  const [productName, setProductName] =
    useState("");

  const [productPrice, setProductPrice] =
    useState("");

  const [productCategory, setProductCategory] =
    useState("");

  const [productImage, setProductImage] =
    useState("");

  const [imageSearch, setImageSearch] =
    useState("");


  // ===========================================================
  // FORM STATE
  // ===========================================================

  const [saving, setSaving] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");


  // ===========================================================
  // DELETE
  // ===========================================================

  const [deleteProduct, setDeleteProduct] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);


  // ===========================================================
  // LOAD PRODUCTS
  // ===========================================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const snapshot =
        await getDocs(
          collection(db, "products")
        );

      const productList =
        snapshot.docs.map(
          (productDoc) => ({
            id: productDoc.id,
            ...productDoc.data(),
          })
        );

      setProducts(productList);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error
      );

      setErrorMessage(
        "Unable to load products. Please refresh the page."
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);


  // ===========================================================
  // PRICE FORMAT
  // ===========================================================

  const formatPrice = (price) => {
    const numericPrice =
      Number(
        String(price ?? 0)
          .replace(/[₹,]/g, "")
      );

    if (
      Number.isNaN(numericPrice)
    ) {
      return "₹0";
    }

    return `₹${numericPrice.toLocaleString(
      "en-IN"
    )}`;
  };


  // ===========================================================
  // IMAGE LIBRARY FILTER
  // ===========================================================

  const filteredImages =
    useMemo(() => {
      const search =
        imageSearch
          .trim()
          .toLowerCase();

      if (!search) {
        return PRODUCT_IMAGES;
      }

      return PRODUCT_IMAGES.filter(
        (image) =>
          image.name
            .toLowerCase()
            .includes(search) ||
          image.category
            .toLowerCase()
            .includes(search)
      );
    }, [imageSearch]);


  // ===========================================================
  // FILTER PRODUCTS
  // ===========================================================

  const filteredProducts =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return products.filter(
        (product) => {
          const name =
            String(
              product.name || ""
            ).toLowerCase();

          const category =
            String(
              product.category || ""
            ).toLowerCase();

          const matchesSearch =
            !search ||
            name.includes(search) ||
            category.includes(search);

          const matchesCategory =
            categoryFilter === "All" ||
            product.category ===
              categoryFilter;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      products,
      searchTerm,
      categoryFilter,
    ]);


  // ===========================================================
  // OPEN ADD
  // ===========================================================

  const openAddModal = () => {
    setEditingProduct(null);

    setProductName("");
    setProductPrice("");
    setProductCategory("");
    setProductImage("");
    setImageSearch("");

    setErrorMessage("");

    setShowProductModal(true);
  };


  // ===========================================================
  // OPEN EDIT
  // ===========================================================

  const openEditModal = (
    product
  ) => {
    setEditingProduct(product);

    setProductName(
      product.name || ""
    );

    setProductPrice(
      String(
        product.price || ""
      ).replace(/[₹,]/g, "")
    );

    setProductCategory(
      product.category || ""
    );

    setProductImage(
      product.image || ""
    );

    setImageSearch("");

    setErrorMessage("");

    setShowProductModal(true);
  };


  // ===========================================================
  // CLOSE MODAL
  // ===========================================================

  const closeProductModal = () => {
    if (saving) return;

    setShowProductModal(false);
    setEditingProduct(null);

    setProductName("");
    setProductPrice("");
    setProductCategory("");
    setProductImage("");
    setImageSearch("");

    setErrorMessage("");
  };


  // ===========================================================
  // VALIDATE
  // ===========================================================

  const validateForm = () => {

    if (!productName.trim()) {
      return "Product name is required.";
    }

    if (!productPrice) {
      return "Product price is required.";
    }

    const numericPrice =
      Number(productPrice);

    if (
      Number.isNaN(
        numericPrice
      ) ||
      numericPrice <= 0
    ) {
      return "Please enter a valid price.";
    }

    if (!productCategory) {
      return "Please select a category.";
    }

    if (!productImage) {
      return "Please select a product image.";
    }

    return "";
  };


  // ===========================================================
  // SAVE PRODUCT
  // ===========================================================

  const handleSaveProduct =
    async (event) => {
      event.preventDefault();

      setErrorMessage("");
      setSuccessMessage("");

      const validationError =
        validateForm();

      if (validationError) {
        setErrorMessage(
          validationError
        );
        return;
      }

      try {
        setSaving(true);

        // ADD

        if (!editingProduct) {

          const newProductRef =
            doc(
              collection(
                db,
                "products"
              )
            );

          await setDoc(
            newProductRef,
            {
              name:
                productName.trim(),

              price:
                `₹${Number(
                  productPrice
                ).toLocaleString(
                  "en-IN"
                )}`,

              category:
                productCategory,

              image:
                productImage,

              createdAt:
                new Date(),

              updatedAt:
                new Date(),
            }
          );

          setSuccessMessage(
            "Product added successfully."
          );
        }

        // EDIT

        else {

          await setDoc(
            doc(
              db,
              "products",
              editingProduct.id
            ),
            {
              name:
                productName.trim(),

              price:
                `₹${Number(
                  productPrice
                ).toLocaleString(
                  "en-IN"
                )}`,

              category:
                productCategory,

              image:
                productImage,

              updatedAt:
                new Date(),
            },
            {
              merge: true,
            }
          );

          setSuccessMessage(
            "Product updated successfully."
          );
        }

        await fetchProducts();

        setShowProductModal(false);
        setEditingProduct(null);

        setProductName("");
        setProductPrice("");
        setProductCategory("");
        setProductImage("");
        setImageSearch("");

      } catch (error) {

        console.error(
          "Product save failed:",
          error
        );

        setErrorMessage(
          "Unable to save product. Please try again."
        );

      } finally {
        setSaving(false);
      }
    };


  // ===========================================================
  // DELETE PRODUCT
  // ===========================================================

  const handleDeleteProduct =
    async () => {

      if (!deleteProduct) {
        return;
      }

      try {
        setDeleting(true);
        setErrorMessage("");

        await deleteDoc(
          doc(
            db,
            "products",
            deleteProduct.id
          )
        );

        setProducts(
          (previousProducts) =>
            previousProducts.filter(
              (product) =>
                product.id !==
                deleteProduct.id
            )
        );

        setDeleteProduct(null);

        setSuccessMessage(
          "Product deleted successfully."
        );

      } catch (error) {

        console.error(
          "Product delete failed:",
          error
        );

        setErrorMessage(
          "Unable to delete product. Please try again."
        );

      } finally {
        setDeleting(false);
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
              Loading products
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
                  Products
                </h1>


                <p
                  className="
                    mt-3
                    text-sm
                    leading-6
                    text-[#81746B]
                  "
                >
                  Manage your handcrafted
                  collection.
                </p>

              </div>


              {/* ADD PRODUCT */}

              <button
                type="button"
                onClick={openAddModal}
                className="
                  group
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  gap-2
                  self-start
                  rounded-[11px]
                  bg-[#4B352A]
                  px-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[1.5px]
                  text-white
                  shadow-[0_7px_18px_rgba(75,53,42,0.13)]
                  transition-all
                  duration-200
                  hover:-translate-y-[1px]
                  hover:bg-[#5A4032]
                  hover:shadow-[0_10px_24px_rgba(75,53,42,0.16)]
                  md:self-auto
                "
              >

                <FaPlus
                  className="
                    text-[8px]
                  "
                />

                <span>
                  Add Product
                </span>

                <FaChevronDown
                  className="
                    hidden
                  "
                />

              </button>

            </div>

          </header>


          {/* =================================================
              SUCCESS
          ================================================= */}

          {successMessage && (
            <div
              className="
                mb-5
                flex
                items-center
                justify-between
                gap-3
                rounded-[14px]
                border
                border-[#D7E5D7]
                bg-[#F3F8F3]
                px-4
                py-3
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <FaCheckCircle
                  className="
                    text-xs
                    text-[#668466]
                  "
                />

                <p
                  className="
                    text-xs
                    text-[#587258]
                  "
                >
                  {successMessage}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSuccessMessage("")
                }
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  text-[#8A9A8A]
                  transition
                  hover:bg-[#E8F0E8]
                "
              >
                <FaTimes
                  className="text-[9px]"
                />
              </button>

            </div>
          )}


          {/* =================================================
              ERROR
          ================================================= */}

          {errorMessage &&
            !showProductModal && (
              <div
                className="
                  mb-5
                  flex
                  items-center
                  gap-2
                  rounded-[14px]
                  border
                  border-[#E8D5CD]
                  bg-[#FBF3F0]
                  px-4
                  py-3
                "
              >

                <FaExclamationCircle
                  className="
                    text-xs
                    text-[#A66D59]
                  "
                />

                <p
                  className="
                    text-xs
                    text-[#875747]
                  "
                >
                  {errorMessage}
                </p>

              </div>
            )}


          {/* =================================================
              SUMMARY
          ================================================= */}

          <div
            className="
              mb-7
              grid
              grid-cols-2
              gap-3
              lg:grid-cols-4
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
                  Total Products
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
                {products.length}
              </p>

            </div>


            {/* CATEGORIES */}

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
                  Categories
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
                {
                  new Set(
                    products.map(
                      (product) =>
                        product.category
                    )
                  ).size
                }
              </p>

            </div>


            {/* SHOWING */}

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
                  Showing
                </p>

                <FaSearch
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
                {filteredProducts.length}
              </p>

            </div>


            {/* STATUS */}

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
                  Status
                </p>

                <FaCheckCircle
                  className="
                    text-[10px]
                    text-[#6F8068]
                  "
                />

              </div>

              <p
                className="
                  mt-3
                  text-[12px]
                  font-semibold
                  text-[#596653]
                "
              >
                Collection Active
              </p>

            </div>

          </div>


          {/* =================================================
              SEARCH + FILTER
          ================================================= */}

          <div
            className="
              mb-6
              rounded-[21px]
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

              <div
                className="
                  relative
                  flex-1
                "
              >

                <FaSearch
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[11px]
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
                  placeholder="Search product or category"
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
                      text-[#8B5E3C]
                      transition
                      hover:bg-[#EEE4DB]
                    "
                  >
                    <FaTimes
                      className="text-[9px]"
                    />
                  </button>
                )}

              </div>


              {/* CATEGORY FILTER */}

              <div
                className="
                  w-full
                  md:w-[210px]
                "
              >

                <PremiumDropdown
                  value={
                    categoryFilter === "All"
                      ? "All Categories"
                      : categoryFilter
                  }
                  options={[
                    "All Categories",
                    ...CATEGORIES,
                  ]}
                  onChange={(value) =>
                    setCategoryFilter(
                      value ===
                        "All Categories"
                        ? "All"
                        : value
                    )
                  }
                />

              </div>

            </div>

          </div>


          {/* =================================================
              RESULTS HEADER
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
                Product Collection
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-[#81746B]
                "
              >
                Showing{" "}
                {filteredProducts.length}{" "}
                of{" "}
                {products.length} products
              </p>

            </div>


            {(searchTerm ||
              categoryFilter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("All");
                }}
                className="
                  text-[10px]
                  font-semibold
                  text-[#8B5E3C]
                  transition
                  hover:text-[#4B352A]
                "
              >
                Clear filters
              </button>
            )}

          </div>


          {/* =================================================
              PRODUCTS
          ================================================= */}

          {filteredProducts.length === 0 ? (

            <div
              className="
                rounded-[22px]
                border
                border-[#D8C8BB]
                bg-white
                px-6
                py-16
                text-center
                shadow-[0_8px_30px_rgba(75,53,42,0.035)]
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

              <h2
                className="
                  mt-5
                  font-serif
                  text-xl
                  font-semibold
                  text-[#4B352A]
                "
              >
                No products found
              </h2>

              <p
                className="
                  mt-2
                  text-xs
                  text-[#81746B]
                "
              >
                Try another product name
                or category.
              </p>

            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >

              {filteredProducts.map(
                (product) => (

                  <article
                    key={product.id}
                    className="
                      group
                      overflow-hidden
                      rounded-[20px]
                      border
                      border-[#D8C8BB]
                      bg-white
                      shadow-[0_7px_25px_rgba(75,53,42,0.04)]
                      transition-all
                      duration-300
                      hover:-translate-y-[1px]
                      hover:border-[#CBB6A5]
                      hover:shadow-[0_14px_35px_rgba(75,53,42,0.075)]
                    "
                  >

                    {/* IMAGE */}

                    <div
                      className="
                        relative
                        aspect-[4/3]
                        overflow-hidden
                        bg-[#F3ECE5]
                      "
                    >

                      {product.image ? (

                        <img
                          src={product.image}
                          alt={product.name}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-[1.025]
                          "
                        />

                      ) : (

                        <div
                          className="
                            flex
                            h-full
                            w-full
                            flex-col
                            items-center
                            justify-center
                            text-[#B9987C]
                          "
                        >

                          <FaImage
                            className="text-xl"
                          />

                          <span
                            className="
                              mt-2
                              text-[8px]
                              uppercase
                              tracking-[1.5px]
                            "
                          >
                            No image
                          </span>

                        </div>

                      )}


                      {/* CATEGORY */}

                      <span
                        className="
                          absolute
                          left-3
                          top-3
                          rounded-full
                          border
                          border-white/70
                          bg-white/90
                          px-3
                          py-1.5
                          text-[8px]
                          font-semibold
                          uppercase
                          tracking-[1px]
                          text-[#76523B]
                          shadow-[0_3px_10px_rgba(75,53,42,0.06)]
                          backdrop-blur-sm
                        "
                      >
                        {product.category}
                      </span>

                    </div>


                    {/* INFO */}

                    <div
                      className="
                        p-4
                        md:p-5
                      "
                    >

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-3
                        "
                      >

                        <div
                          className="
                            min-w-0
                          "
                        >

                          <h2
                            className="
                              truncate
                              font-serif
                              text-[17px]
                              font-semibold
                              text-[#4B352A]
                            "
                          >
                            {product.name}
                          </h2>

                          <p
                            className="
                              mt-1
                              truncate
                              text-[9px]
                              text-[#A09288]
                            "
                          >
                            Product ID:{" "}
                            {product.id}
                          </p>

                        </div>


                        <p
                          className="
                            shrink-0
                            font-serif
                            text-[16px]
                            font-semibold
                            text-[#6D4A35]
                          "
                        >
                          {formatPrice(
                            product.price
                          )}
                        </p>

                      </div>


                      {/* ACTIONS */}

                      <div
                        className="
                          mt-4
                          flex
                          gap-2
                        "
                      >

                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(
                              product
                            )
                          }
                          className="
                            flex
                            h-9
                            flex-1
                            items-center
                            justify-center
                            gap-1.5
                            rounded-[10px]
                            border
                            border-[#D6C4B5]
                            bg-[#FBF8F4]
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[1.2px]
                            text-[#75533D]
                            transition-all
                            duration-200
                            hover:border-[#BCA28E]
                            hover:bg-[#F4ECE4]
                          "
                        >

                          <FaEdit
                            className="
                              text-[8px]
                            "
                          />

                          Edit

                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            setDeleteProduct(
                              product
                            )
                          }
                          aria-label={`Delete ${product.name}`}
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-[10px]
                            border
                            border-[#E3D3C9]
                            bg-[#FCF9F6]
                            text-[#A77C63]
                            transition-all
                            duration-200
                            hover:border-[#D4B6A7]
                            hover:bg-[#F8ECE7]
                            hover:text-[#8B5E3C]
                          "
                        >

                          <FaTrash
                            className="
                              text-[9px]
                            "
                          />

                        </button>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showProductModal && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#2F211B]/45
            p-4
            backdrop-blur-sm
          "
        >

          <div
            className="
              max-h-[92vh]
              w-full
              max-w-[510px]
              overflow-y-auto
              rounded-[24px]
              border
              border-[#DCCFC4]
              bg-white
              shadow-[0_25px_70px_rgba(75,53,42,0.22)]
            "
          >

            {/* HEADER */}

            <div
              className="
                sticky
                top-0
                z-10
                flex
                items-center
                justify-between
                border-b
                border-[#EEE6DE]
                bg-white
                px-6
                py-5
              "
            >

              <div>

                <p
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[2.5px]
                    text-[#8B5E3C]
                  "
                >
                  {editingProduct
                    ? "Collection Update"
                    : "New Collection"}
                </p>

                <h2
                  className="
                    mt-1
                    font-serif
                    text-[24px]
                    font-semibold
                    text-[#4B352A]
                  "
                >
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

              </div>


              <button
                type="button"
                onClick={
                  closeProductModal
                }
                disabled={saving}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#E2D6CC]
                  text-[#76523B]
                  transition
                  hover:bg-[#F7F0E9]
                  disabled:opacity-50
                "
              >
                <FaTimes
                  className="text-[10px]"
                />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={
                handleSaveProduct
              }
              className="
                space-y-5
                p-6
              "
            >

              {/* PRODUCT NAME */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#8B5E3C]
                  "
                >
                  Product Name
                </label>

                <input
                  type="text"
                  value={productName}
                  onChange={(event) =>
                    setProductName(
                      event.target.value
                    )
                  }
                  placeholder="Enter product name"
                  className="
                    h-11
                    w-full
                    rounded-[12px]
                    border
                    border-[#E1D6CC]
                    bg-[#FAF7F3]
                    px-4
                    text-[13px]
                    text-[#4B352A]
                    outline-none
                    placeholder:text-[#B0A49C]
                    transition
                    focus:border-[#AD876A]
                    focus:bg-white
                    focus:shadow-[0_6px_18px_rgba(75,53,42,0.05)]
                  "
                />

              </div>


              {/* PRICE */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#8B5E3C]
                  "
                >
                  Price
                </label>

                <div
                  className="
                    relative
                  "
                >

                  <span
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-sm
                      text-[#8B5E3C]
                    "
                  >
                    ₹
                  </span>

                  <input
                    type="number"
                    min="1"
                    value={productPrice}
                    onChange={(event) =>
                      setProductPrice(
                        event.target.value
                      )
                    }
                    placeholder="Enter price"
                    className="
                      h-11
                      w-full
                      rounded-[12px]
                      border
                      border-[#E1D6CC]
                      bg-[#FAF7F3]
                      pl-9
                      pr-4
                      text-[13px]
                      text-[#4B352A]
                      outline-none
                      placeholder:text-[#B0A49C]
                      transition
                      focus:border-[#AD876A]
                      focus:bg-white
                      focus:shadow-[0_6px_18px_rgba(75,53,42,0.05)]
                    "
                  />

                </div>

              </div>


              {/* CATEGORY */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#8B5E3C]
                  "
                >
                  Category
                </label>

                <PremiumDropdown
                  value={
                    productCategory ||
                    "Select category"
                  }
                  options={CATEGORIES}
                  onChange={
                    setProductCategory
                  }
                />

              </div>


              {/* IMAGE LIBRARY */}

              <div>

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >

                  <label
                    className="
                      block
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[2px]
                      text-[#8B5E3C]
                    "
                  >
                    Product Image
                  </label>

                  <span
                    className="
                      text-[9px]
                      text-[#A09288]
                    "
                  >
                    Select from library
                  </span>

                </div>


                {/* IMAGE SEARCH */}

                <div
                  className="
                    relative
                    mb-3
                  "
                >

                  <FaSearch
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-[10px]
                      text-[#A09288]
                    "
                  />

                  <input
                    type="text"
                    value={imageSearch}
                    onChange={(event) =>
                      setImageSearch(
                        event.target.value
                      )
                    }
                    placeholder="Search image..."
                    className="
                      h-10
                      w-full
                      rounded-[11px]
                      border
                      border-[#E1D6CC]
                      bg-[#FAF7F3]
                      pl-9
                      pr-3
                      text-[12px]
                      text-[#4B352A]
                      outline-none
                      placeholder:text-[#B0A49C]
                      focus:border-[#AD876A]
                    "
                  />

                </div>


                {/* SELECTED IMAGE */}

                {productImage && (

                  <div
                    className="
                      mb-3
                      overflow-hidden
                      rounded-[14px]
                      border
                      border-[#DCCABC]
                      bg-[#FCFAF8]
                      p-2
                    "
                  >

                    <div
                      className="
                        relative
                      "
                    >

                      <img
                        src={productImage}
                        alt="Selected product"
                        className="
                          h-36
                          w-full
                          rounded-[10px]
                          object-cover
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setProductImage("")
                        }
                        className="
                          absolute
                          right-2
                          top-2
                          flex
                          h-8
                          w-8
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[#E6DDD4]
                          bg-white/95
                          text-[#7A543D]
                          transition
                          hover:bg-[#F8F1EA]
                        "
                        aria-label="Remove selected image"
                      >
                        <FaTimes
                          className="text-[9px]"
                        />
                      </button>

                    </div>

                  </div>

                )}


                {/* IMAGE GRID */}

                <div
                  className="
                    grid
                    max-h-[230px]
                    grid-cols-4
                    gap-2
                    overflow-y-auto
                    rounded-[12px]
                    bg-[#FAF7F3]
                    p-2
                  "
                >

                  {filteredImages.map(
                    (image) => {

                      const selected =
                        productImage ===
                        image.path;

                      return (
                        <button
                          key={`${image.name}-${image.path}`}
                          type="button"
                          onClick={() =>
                            setProductImage(
                              image.path
                            )
                          }
                          className={`
                            relative
                            aspect-square
                            overflow-hidden
                            rounded-[9px]
                            border-2
                            transition-all
                            duration-200
                            ${
                              selected
                                ? "border-[#8B5E3C] ring-2 ring-[#B9987C]/20"
                                : "border-transparent hover:border-[#DCCABC]"
                            }
                          `}
                        >

                          <img
                            src={image.path}
                            alt={image.name}
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />

                          {selected && (
                            <div
                              className="
                                absolute
                                inset-0
                                flex
                                items-center
                                justify-center
                                bg-[#4B352A]/20
                              "
                            >

                              <div
                                className="
                                  flex
                                  h-7
                                  w-7
                                  items-center
                                  justify-center
                                  rounded-full
                                  bg-white
                                "
                              >
                                <FaCheckCircle
                                  className="
                                    text-sm
                                    text-[#668466]
                                  "
                                />
                              </div>

                            </div>
                          )}

                        </button>
                      );
                    }
                  )}

                </div>


                {filteredImages.length ===
                  0 && (
                  <div
                    className="
                      py-6
                      text-center
                    "
                  >

                    <FaImage
                      className="
                        mx-auto
                        text-[#B9987C]
                      "
                    />

                    <p
                      className="
                        mt-2
                        text-xs
                        text-[#81746B]
                      "
                    >
                      No matching images
                      found.
                    </p>

                  </div>
                )}

              </div>


              {/* ERROR */}

              {errorMessage && (
                <div
                  className="
                    flex
                    items-start
                    gap-2
                    rounded-[12px]
                    border
                    border-[#E8D5CD]
                    bg-[#FBF3F0]
                    px-4
                    py-3
                  "
                >

                  <FaExclamationCircle
                    className="
                      mt-0.5
                      text-xs
                      text-[#A66D59]
                    "
                  />

                  <p
                    className="
                      text-xs
                      text-[#875747]
                    "
                  >
                    {errorMessage}
                  </p>

                </div>
              )}


              {/* BUTTONS */}

              <div
                className="
                  flex
                  gap-3
                  border-t
                  border-[#EEE6DE]
                  pt-5
                "
              >

                <button
                  type="button"
                  onClick={
                    closeProductModal
                  }
                  disabled={saving}
                  className="
                    h-10
                    flex-1
                    rounded-[11px]
                    border
                    border-[#DCCABC]
                    bg-[#FBF8F4]
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[1.5px]
                    text-[#7A543D]
                    transition
                    hover:bg-[#F7F0E9]
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="
                    flex
                    h-10
                    flex-1
                    items-center
                    justify-center
                    gap-2
                    rounded-[11px]
                    bg-[#4B352A]
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[1.5px]
                    text-white
                    transition-all
                    hover:bg-[#5A4032]
                    disabled:opacity-60
                  "
                >

                  {saving ? (

                    <>
                      <span
                        className="
                          h-3.5
                          w-3.5
                          rounded-full
                          border-2
                          border-white
                          border-t-transparent
                          animate-spin
                        "
                      />

                      {editingProduct
                        ? "Saving..."
                        : "Adding..."}
                    </>

                  ) : (

                    editingProduct
                      ? "Save Changes"
                      : "Add Product"

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}


      {/* =====================================================
          DELETE CONFIRMATION
      ===================================================== */}

      {deleteProduct && (

        <div
          className="
            fixed
            inset-0
            z-[110]
            flex
            items-center
            justify-center
            bg-[#2F211B]/45
            p-4
            backdrop-blur-sm
          "
        >

          <div
            className="
              w-full
              max-w-[400px]
              rounded-[22px]
              border
              border-[#DCCFC4]
              bg-white
              p-6
              shadow-[0_25px_70px_rgba(75,53,42,0.22)]
            "
          >

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-[#E7D2C8]
                bg-[#F8ECE7]
                text-[#A66D59]
              "
            >
              <FaTrash
                className="text-sm"
              />
            </div>


            <h2
              className="
                mt-5
                font-serif
                text-[24px]
                font-semibold
                text-[#4B352A]
              "
            >
              Delete Product?
            </h2>


            <p
              className="
                mt-2
                text-sm
                leading-6
                text-[#81746B]
              "
            >
              Are you sure you want to
              delete{" "}

              <span
                className="
                  font-semibold
                  text-[#6D4A35]
                "
              >
                {deleteProduct.name}
              </span>

              ? This action cannot be
              undone.
            </p>


            <div
              className="
                mt-6
                flex
                gap-3
              "
            >

              <button
                type="button"
                onClick={() =>
                  setDeleteProduct(null)
                }
                disabled={deleting}
                className="
                  h-10
                  flex-1
                  rounded-[11px]
                  border
                  border-[#DCCABC]
                  bg-[#FBF8F4]
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[1.5px]
                  text-[#7A543D]
                  transition
                  hover:bg-[#F7F0E9]
                  disabled:opacity-50
                "
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={
                  handleDeleteProduct
                }
                disabled={deleting}
                className="
                  flex
                  h-10
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-[11px]
                  bg-[#8B5E3C]
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[1.5px]
                  text-white
                  transition
                  hover:bg-[#6D472D]
                  disabled:opacity-60
                "
              >

                {deleting ? (

                  <>
                    <span
                      className="
                        h-3.5
                        w-3.5
                        rounded-full
                        border-2
                        border-white
                        border-t-transparent
                        animate-spin
                      "
                    />

                    Deleting...
                  </>

                ) : (
                  "Delete Product"
                )}

              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}