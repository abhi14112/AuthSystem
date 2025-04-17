import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import useActivityTracker from './utils/useActivityTracker';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import NotFound from './Pages/NotFound';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './utils/PrivateRoute';
import useAuthStore from './store/store';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
import Cart from './Pages/Cart';
import SearchPage from './Pages/SearchPage';
import ProductDetail from './components/ProductDetail';
import Products from './components/Products';
import Profile from './Pages/Profile';
import PurchaseSuccessPage from './Pages/PurchaseSuccess';
import PurchaseFail from './Pages/PurchaseFail';
import OrdersPage from './Pages/OrderPage';
import AdminOrder from './Pages/AdminOrder';
import Navbar from './components/Navbar';
import OrderDetails from './components/OrderDetails';
import NavLayout from './Pages/NavLayout';
import Account from './components/Account';
import Address from './components/Address';
const App = () => {
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);
    return (
        <>
            {
                user &&
                <Navbar />
            }
            <Routes>
                <Route path="/" element={
                    <PrivateRoute />
                } />
                <Route path='/login' element={user ? <Navigate to={"/"} /> : <Login />} />
                <Route path='/register' element={user ? <Navigate to="/" /> : <Register />} />
                <Route path='/add' element={user?.role == 'admin' ? <AddProduct /> : <Navigate to="/" />} />
                <Route path='/admin/orders' element={user?.role == 'admin' ? <AdminOrder /> : <Navigate to="/" />} />
                <Route path='/cart' element={user?.role == 'customer' ? <Cart /> : <Navigate to="/" />} />
                <Route path='/dashboard' element={user?.role == 'customer' ? <NavLayout /> : <Navigate to="/" />} >
                    <Route path='' element={<OrdersPage />}>
                    </Route>
                    <Route path='orderdetails/:id' element={<OrderDetails />}>
                    </Route>
                    <Route path='account' element={<Account />}></Route>
                    <Route path='address' element={<Address />}></Route>
                </Route>
                <Route path='/success' element={user?.role == 'customer' ? <PurchaseSuccessPage /> : <Navigate to="/" />} />
                <Route path='/failed' element={user?.role == 'customer' ? <PurchaseFail /> : <Navigate to="/" />} />
                <Route path='/user/:section' element={user?.role == 'customer' ? <Profile /> : <Navigate to="/" />} />
                <Route path='/products' element={user?.role == 'customer' ? <Products /> : <Navigate to="/" />} />
                <Route path='/search' element={user?.role == 'customer' ? <SearchPage /> : <Navigate to="/" />} />
                <Route path='/product/item/:id' element={user?.role == 'customer' ? <ProductDetail /> : <Navigate to="/" />} />
                <Route path='/update' element={user?.role == 'admin' ? <EditProduct /> : <Navigate to="/" />} />
                <Route path='*' element={<NotFound />} />

            </Routes>
            <Toaster />
        </>
    )
}
export default App