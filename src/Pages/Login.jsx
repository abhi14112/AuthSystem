import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/store'
import api from '../utils/axiosInstance'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

const Login = () => {
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const setAuth = useAuthStore((state) => state.setAuth)
    const setToken = useAuthStore((state) => state.setToken)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prevData) => ({ ...prevData, [name]: value }))
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await api.post("/api/auth/login", userData)
            toast.success(res.data.message)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            localStorage.setItem("token", res.data.token)
            setAuth(res.data.user)
            setToken(res.data.token)
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to login")
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
            <div className="hidden md:flex w-1/2 h-full items-center justify-center ">
                <img
                    src="../../public/dl.beatsnoop 1.png"
                    alt="Login visual"
                    className="max-w-[80%] h-auto object-contain"
                />
            </div>

            <div className="w-full md:w-1/2 px-6 md:px-12 py-8">
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Log in to <span className="font-bold">E-Commerce</span></h2>
                    <p className="text-gray-600 mb-6">Enter your details below</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                        </div>

                        <div className="mb-4 relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={userData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                            >
                                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                            </button>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition"
                            >
                                {isLoading ? "Logging in..." : "Log In"}
                            </button>
                            <Link to="/forgot-password" className="text-red-500 text-sm hover:underline">
                                Forget Password?
                            </Link>
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-700">
                        Don’t have an account?{" "}
                        <Link to="/register" className="font-semibold text-black hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
