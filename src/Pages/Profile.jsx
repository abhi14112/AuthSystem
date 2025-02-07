import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import useAuthStore from "../store/store";
import toast from "react-hot-toast";
const PersonalInfoForm = () => {
  const user = useAuthStore((state) => state.user);
  const [personInfo, setPersonInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
  });
  const handleUpdateInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://localhost:7249/api/profile/${user.id}`,
        personInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated successfully");
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const getPersonalInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://localhost:7249/api/profile/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPersonInfo(response.data);
    } catch (error) {
      toast.error("Error while getting profile");
    }
  };
  useEffect(() => {
    getPersonalInfo();
  }, []);
  const handleChange = (e) => {
    setPersonInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={personInfo.firstName}
            name="firstName"
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            placeholder="First Name"
          />
          <input
            type="text"
            value={personInfo.lastName}
            name="lastName"
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            placeholder="Last Name"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Your Gender</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={personInfo.gender === "male"}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={personInfo.gender === "female"}
                onChange={handleChange}
                className="form-radio"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={personInfo.email}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block mb-2">Mobile Number</label>
          <input
            type="tel"
            name="phone"
            value={personInfo.phone}
            onChange={handleChange}
            className="border rounded px-3 mb-4 py-2 w-full"
            placeholder="Enter mobile number"
          />
        </div>
        <button
          onClick={handleUpdateInfo}
          className=" rounded px-3 py-2 w-full bg-blue-500 text-slate-100 cursor-pointer font-semibold shadow-md hover:scale-102 transition-all duration-500 shadow-slate-700"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default PersonalInfoForm;
