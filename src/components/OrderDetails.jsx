import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const OrderDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div className='p-8'>
      <div onClick={() => { navigate("/dashboard") }} className='p-2 cursor-pointer border border-gray-700 rounded-lg w-max'>
        <ArrowLeft />
      </div>
      <div className='pt-4'>
        <div>
          <p className='font-bold text-lg'>Order Summary</p>
          <p className='text-sm text-slate-600'>Your Order will arrive at {new Date(data.createdAt).toLocaleString()}</p>
        </div>
        <div className='py-4 border-b-8 border-slate-400'>
          <p className='py-4'>{data?.products?.length} items in  this order.</p>
          {
            data?.products?.map((item) => (
              <div className='py-3 flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                  <img className='w-[60px] object-cover border-1 border-slate-400 p-2  h-[60px] rounded-xl' src={item?.imageUrl} />
                  <p>{item?.productName}</p>
                </div>
                <div>
                  <p className='font-semibold text-sm'>&#x20B9; {item?.price}</p>
                </div>
              </div>
            ))
          }
        </div>

        <div>
          <div className='py-4 border-b border-slate-400'>
            <p className='font-semibold text-sm'>Bill details</p>
          </div>
          <div className='flex justify-between'>
            <div>
              <p>MRP</p>
              <p>Delivery Charge</p>
              <p className='font-semibold'>Bill Total</p>
            </div>
            <div>
              <p>&#x20B9;  {data?.totalAmount}</p>
              <p>Free</p>
              <p className='font-semibold'>&#x20B9;  {data?.totalAmount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default OrderDetails