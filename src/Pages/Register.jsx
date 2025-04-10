import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../store/store'
import api from '../utils/axiosInstance'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

const Register = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        emailAddress: "",
        username: "",
        password: "",
    })

    const [errors, setErrors] = useState({})
    const setAuth = useAuthStore((state) => state.setAuth)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    const validateForm = () => {
        let valid = true
        const newErrors = {}

        if (!userData.firstName.trim()) {
            newErrors.firstName = "First name is required"
            valid = false
        }
        if (!userData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
            valid = false
        }
        if (!userData.emailAddress.trim()) {
            newErrors.emailAddress = "Email is required"
            valid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.emailAddress)) {
            newErrors.emailAddress = "Enter valid email"
            valid = false
        }
        if (!userData.username.trim()) {
            newErrors.username = "Username is required"
            valid = false
        } else if (userData.username.length < 4) {
            newErrors.username = "Username must be at least 4 characters"
            valid = false
        }
        if (!userData.password) {
            newErrors.password = "Password is required"
            valid = false
        } else if (userData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)
        try {
            const res = await api.post("/api/auth/signup", userData)
            toast.success(res.data.message || "Registered successfully!")
            navigate("/login")
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed")
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
            <div className="hidden md:flex w-1/2 h-full items-center justify-center">
                <img
                    src="../../public/dl.beatsnoop 1.png"
                    alt="Register visual"
                    className="max-w-[80%] h-auto object-contain"
                />
            </div>

            <div className="w-full md:w-1/2 px-6 md:px-12 py-8">
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        Create account on <span className="font-bold">E-Commerce</span>
                    </h2>
                    <p className="text-gray-600 mb-6">Enter your details below</p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                                {errors.firstName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                    required
                                />
                                {errors.lastName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div className="mb-4">
                            <input
                                type="email"
                                name="emailAddress"
                                value={userData.emailAddress}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                                required
                            />
                            {errors.emailAddress && (
                                <p className="text-xs text-red-500 mt-1">{errors.emailAddress}</p>
                            )}
                        </div>

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
                            {errors.username && (
                                <p className="text-xs text-red-500 mt-1">{errors.username}</p>
                            )}
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
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-black text-white w-full py-2 px-6 rounded-md hover:bg-gray-800 transition"
                        >
                            {isLoading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-700 mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold text-black hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
