import React from 'react'
import api from '../utils/axiosInstance'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/store'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        username: "",
        password: "",
    })
    const setAuth = useAuthStore((state) => state.setAuth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        api.post("/api/auth/signup", userData).then((res) => {
            toast.success(res.data.message);
            navigate("/login");
        })
            .catch((err) => {
                toast.error("failed to signup");
                console.log(err);
            })
    }
    return (
        <div className='w-full h-screen flex justify-center py-10'>
            <div className='text-slate-900 rounded-lg p-4 shadow-lg h-max'>
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-semibold mb-2 text-center'>SignUp Form</h1>
                    <input type='text' name='firstName' className='py-1 px-3 mt-4 border outline-none rounded-md font-semibold' value={userData.firstName} placeholder='FirstName' onChange={handleChange} />
                    <input type='text' name='lastName' className='py-1 px-3 mt-4 border outline-none rounded-md font-semibold' value={userData.lastName} placeholder='LastName' onChange={handleChange} />
                    <input type='email' name='emailAddress' className='py-1 px-3 mt-4 border outline-none rounded-md font-semibold' value={userData.emailAddress} placeholder='Email' onChange={handleChange} />
                    <input type='text' name='username' className='py-1 px-3 mt-2 border outline-none rounded-md font-semibold' value={userData.username} placeholder='Username' onChange={handleChange} />
                    <input type='password' name='password' className='py-1 mt-2 px-3 border outline-none font-semibold  rounded-md' value={userData.password} placeholder='Password' onChange={handleChange} />

                    <button className='rounded-md bg-slate-900 text-white font-bold mt-4 py-2 px-3 cursor-pointer' onClick={handleSubmit}>Sign Up</button>
                    <p className='text-center mt-3'>Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>login here</Link></p>
                </div>
            </div>
        </div>
    )
}
export default Register;