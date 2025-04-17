import { MapPinHouse, Plus, Trash, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import api from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import useAuthStore from '../store/store';
const Address = () => {
    const setUserAddress = useAuthStore((state) => state.setUserAddress);
    const [isOpen, setIsOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState({
        "addressLine": "",
        "city": "",
        "state": "",
        "pincode": "",
        "country": ""
    });
    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/Profile/DeleteAddress/${id}`);
            toast.success("Address deleted successfully");
            window.location.reload();
        } catch (error) {
            toast.error("Failed to delete address");
        }
    }
    const handleAddressChange = (e) => {
        setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const handleSetAddress = () => {
        api.post("api/profile/createaddress", address)
            .then((res) => {
                setAddresses((prev) => ([...prev, res.data]));
            });
        setIsOpen((prev) => !prev);
        setAddress({
            "addressLine": "",
            "city": "",
            "state": "",
            "pincode": "",
            "country": ""
        });
    }
    useEffect(() => {
        api.get("api/profile/getaddress")
            .then((res) => {
                setUserAddress(res.data);
                setAddresses(res.data);
            })
    }, []);
    return (
        <>

            <div className=' w-[400px] p-6 flex flex-col  '>
                <div onClick={() => setIsOpen((prev) => !prev)} className='bg-slate-100 w-full cursor-pointer flex gap-1 text-green-700 font-semibold '>
                    <Plus />
                    <p>
                        Add a new Address
                    </p>
                </div>
                <div className='mt-4  flex flex-col'>
                    {
                        addresses && addresses.map((item) => {
                            return <div className='bg-white px-3 items-center flex justify-between rounded-sm mb-2 py-2 w-[400px]'>
                                <MapPinHouse size={24} />
                                <div className='w-[380px]' >

                                    <div>
                                        <p className='font-semibold text-center'>{item.addressLine} {item.pincode}</p>

                                    </div>
                                    <p className='text-center'>{item.city} {item.state} {item.country} </p>
                                </div>
                                <button onClick={() => handleDelete(item?.id)} className=""><Trash size={18} color='red' /></button>
                            </div>
                        })
                    }
                </div>
            </div>
            {
                isOpen &&
                <div className='flex absolute inset-0  bg-slate-300   justify-center '>
                    <div className='w-[500px] my-24 h-max relative px-4 py-4 rounded-md  top-16 bg-white'>
                        <span onClick={() => { setIsOpen((prev) => !prev) }} className='absolute top-3 right-3 cursor-pointer'>
                            <X />
                        </span>
                        <p className='font-semibold text-xl mb-2'>Add Address</p>
                        <input onChange={handleAddressChange} value={address.addressLine} className='w-full mb-2 border border-zinc-500 py-2 px-4 rounded-md outline-none' type='text' placeholder='Address Line 1' name='addressLine' />
                        <div className='flex gap-2 mb-2'>
                            <input onChange={handleAddressChange} value={address.city} className='w-full border border-zinc-500 py-2 px-4 rounded-md outline-none' type='text' placeholder='City' name='city' />
                            <input onChange={handleAddressChange} value={address.state} className='w-full border border-zinc-500 py-2 px-4 rounded-md outline-none' type='text' placeholder='State' name='state' />
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleAddressChange} value={address.pincode} className='w-full border border-zinc-500 py-2 px-4 rounded-md outline-none' type='number' placeholder='Pincode' name='pincode' />
                            <input onChange={handleAddressChange} value={address.country} className='w-full border border-zinc-500 py-2 px-4 rounded-md outline-none' type='text' placeholder='Country' name='country' />
                        </div>
                        <button onClick={handleSetAddress} className="w-full mt-2 outline-none shadow-xl rounded-sm hover:bg-blue-600 transition-all duration-300  py-2 px-4 bg-blue-500 text-white">Submit</button>
                    </div>
                </div>
            }
        </>

    )
}
export default Address