import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/store'
import api from '../utils/axiosInstance'
// import ReCAPTCHA from 'react-google-recaptcha'
const Login = () => {

    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })
    const setAuth = useAuthStore((state) => state.setAuth);
    const setToken = useAuthStore((state) => state.setToken);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        

        api.post("/api/auth/login", userData).then((res) => {
            toast.success(res.data.message);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            setAuth(res.data.user);
            setToken(res.data.token);
        })
            .catch((err) => {
                toast.error("failed to login");
                console.log(err);
            })
    }
    return (
        <div className='w-full h-screen flex justify-center py-10'>
            <div className='text-slate-900 rounded-lg p-4 shadow-lg h-max'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-semibold mb-2 text-center'>Login Form</h1>
                    <input type='text' name='username' className='py-1 px-3 mt-4 border outline-none rounded-md font-semibold' value={userData.username} placeholder='Username' onChange={handleChange} />
                    <input type='password' name='password' className='py-1 mt-2 px-3 border outline-none font-semibold  rounded-md' value={userData.password} placeholder='Password' onChange={handleChange} />

                    {/* <ReCAPTCHA sitekey='6Lc4ydkqAAAAAM8ck6EH7SH4L2jjaoZNQhc18_Hj'
                        onChange={handleCaptchaChange}
                    /> */}


                    <button className='rounded-md bg-slate-900 text-white font-bold mt-4 py-2 px-3 cursor-pointer' onClick={handleSubmit}>Login</button>
                    <p className='text-center mt-3'>New user? <Link to="/register" className='text-blue-600 hover:underline'>Register here</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Login