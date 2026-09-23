import { Routes, Route, } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Search from "../pages/Search";

import MyOrders from "../pages/MyOrders";
import OrderDetails from "../pages/OrderDetails";
import MyProfile from "../pages/MyProfile";
import AdminOrders from "../admin/AdminOrders";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../admin/AdminDashboard";
import AdminOrderDetails from "../admin/AdminOrderDetails";
import AdminProducts from "../admin/AdminProducts";
import AdminMessages from "../admin/AdminMessages";
import AdminNewsletter from "../admin/AdminNewsletter";


export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop"element={<Shop />}/>
             <Route path="/about"element={<About />}/>
             <Route path="/contact"element={<Contact />}/>
             <Route path="/cart"element={<Cart />}/>
             <Route path="/product"element={<ProductDetails />}/>
             <Route path="/wishlist"element={<Wishlist />}/>
             <Route path="/checkout"element={<Checkout />} />
             <Route path="/order-success"element={<OrderSuccess />}/>
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="/search" element={<Search />} />
             
             <Route path="/my-orders" element={<MyOrders />} />
             <Route path="/order-details/:orderId" element={<OrderDetails />} />
             <Route path="/profile" element={<MyProfile />} />
             <Route path="/admin/orders"element={<AdminRoute> <AdminOrders /></AdminRoute>}/>
             <Route path="/admin/dashboard"element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
             <Route path="/admin/orders/:orderId"element={<AdminRoute><AdminOrderDetails /></AdminRoute>}/>
             <Route path="/admin/products"element={<AdminRoute><AdminProducts /></AdminRoute>}/>
             <Route path="/admin/messages"element={<AdminRoute><AdminMessages /></AdminRoute>}/>
            <Route path="/admin/newsletter"element={<AdminRoute><AdminNewsletter /></AdminRoute>}/>
        </Routes>
    );
}
