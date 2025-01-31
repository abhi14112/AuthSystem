import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
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
const App = () => {
    const user = useAuthStore((state) => state.user);
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute />
                } />
                <Route path='/login' element={user ? <Navigate to={"/"} /> : <Login />} />
                <Route path='/register' element={user ? <Navigate to="/" /> : <Register />} />
                <Route path='/add' element={user?.role == 'admin' ? <AddProduct /> : <Navigate to="/" />} />
                <Route path='/cart' element={user?.role == 'customer' ? <Cart /> : <Navigate to="/" />} />
                <Route path='/update' element={user?.role == 'admin' ? <EditProduct /> : <Navigate to="/" />} />
                <Route path='*' element={<NotFound />} />

            </Routes>
            <Toaster />
        </>
    )
}
export default App