import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./user/pages/Home";
import ScrollToTop from "./common/ScrollToTop";
import Login from "./common/Login";
import Register from "./common/Register";
import NotFound from "./common/NotFound";
import { Toaster } from "react-hot-toast";
import Address from "./user/components/Address";
import OrderDetails from "./user/components/OrderDetails";
import useAuthStore from "./store/store";
import AddProduct from "./admin/pages/AddProduct";
import EditProduct from "./admin/pages/EditProduct";
import SearchPage from "./user/pages/SearchPage";
import ProductDetail from "./user/components/ProductDetail";
import Products from "./user/pages/Products";
import AdminOrder from "./admin/pages/AdminOrder";
import Account from "./user/components/Account";
import AdminProducts from "./admin/pages/AdminProducts";
import Checkauth from "./common/Checkauth";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import UserLayout from "./user/layout/UserLayout";
import Cart from "./user/pages/Cart";
import OrderPage from "./user/pages/OrderPage";
import NavLayout from "./user/layout/NavLayout";
import PurchaseSuccess from "./user/pages/PurchaseSuccess";
import Categoreis from "./admin/pages/Categories";
import PurchaseFail from "./user/pages/PurchaseFail";
import AddCategory from "./admin/pages/AddCategory";
import EditCategory from "./admin/pages/EditCategory";
const App = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      <Routes>
        <Route path="/" element={<Checkauth user={user} />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/success"
          element={
            <Checkauth user={user}>
              <PurchaseSuccess />
            </Checkauth>
          }
        ></Route>
        <Route
          path="/failed"
          element={
            <Checkauth user={user}>
              <PurchaseFail />
            </Checkauth>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <Checkauth user={user}>
              <AdminLayout />
            </Checkauth>
          }
        >
          <Route index path="" element={<AdminDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="orders" element={<AdminOrder />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="edit" element={<EditProduct />} />
          <Route path="categories" element={<Categoreis />} />
          <Route path="addCategory" element={<AddCategory />} />
          <Route path="editCategory" element={<EditCategory />} />
        </Route>
        <Route
          path="/shop"
          element={
            <Checkauth user={user}>
              <UserLayout />
            </Checkauth>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="dashboard" element={<NavLayout />}>
            <Route path="account" element={<Account />} />
            <Route path="orders" element={<OrderPage />} />
            <Route path="orders/orderdetails/:id" element={<OrderDetails />} />
            <Route path="address" element={<Address />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
};
export default App;
