import React, { useEffect, useState } from "react";
import useAuthStore from "../store/store";
import toast from "react-hot-toast";
import { Plus, Minus } from "lucide-react";
import api from "../utils/axiosInstance";
import Address from "../components/Address";
const Cart = () => {
  const setUserAddress = useAuthStore((state) => state.setUserAddress);
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isAddress, setIsAddress] = useState(false);
  const [singleAddress, setSingleAddress] = useState({
    "addressLine": "",
    "city": "",
    "state": "",
    "pincode": "",
    "country": ""
  });
  const [placeOrder, setPlaceOrder] = useState(false);
  const setCartItems = useAuthStore((state) => state.setCartItems);
  const cartItems = useAuthStore((state) => state.cartItems);
  const user = useAuthStore((state) => state.user);
  const getCartData = async () => {
    try {
      const response = await api.get("/api/cart/items");
      const data = response.data?.cartItems;
      if (data) {
        console.log(data);
        setCartItems(data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  const handleAddressChange = (e) => {
    setSingleAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const removeFromCart = async (productId) => {
    try {
      await api.post(`/api/cart/RemoveFromCart/${productId}`);
      setCartItems(cartItems.filter((item) => item.productId !== productId));
      toast.success("Item removed from card");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
  };
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  const checkoutItems = cartItems?.map(
    ({ productId, productName, price, quantity }) => ({
      ProductId: productId,
      Name: productName,
      price: price,
      Quantity: quantity,
    })
  );
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(
        "/api/Stripe/create-payment-intent",
        checkoutItems
      );
      window.location.href = response.data.url;
    } catch (err) {
      console.error("Payment Error:", err);
    }
  };
  const handleSetAddress = () => {
    api.post("api/profile/createaddress", singleAddress)
      .then((res) => {
        setAddresses((prev) => ([...prev, res.data]));
      });
    setIsOpen((prev) => !prev);
    setSingleAddress({
      "addressLine": "",
      "city": "",
      "state": "",
      "pincode": "",
      "country": ""
    });
  }
  useEffect(() => {
    getCartData();
  }, []);
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      return;
    }
    let updatedItems = cartItems.map((item) => {
      if (item.productId == id) {
        item.quantity = quantity;
      }
      return item;
    });
    setCartItems(updatedItems);
    await api.put(`/api/cart/UpdateQuantity/${id}`, quantity);
  };
  useEffect(() => {
    api.get("api/profile/getaddress")
      .then((res) => {
        setUserAddress(res.data);
        setAddresses(res.data);
      })
  }, []);
  return (
    <div className="bg-slate-300">
      <div className="w-screen px-6 py-4 bg-slate-300 min-h-screen h-auto  mx-auto grid grid-cols-4">
        {placeOrder && (
          <div className="w-full  bg-slate-200 h-max  lg:w-3/4 col-span-3">
            <div className="bg-white mb-2 flex shadow-lg py-4 px-8 gap-2">
              <p className="text-blue-500  px-2 h-max bg-slate-100">1</p>
              <div>
                <p className="text-slate-500 font-semibold">LOGIN</p>
                <div className="flex gap-2">
                  <p className="font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="">{user.emailAddress}</p>
                </div>
              </div>
            </div>

            <div className="bg-white flex shadow-lg py-4 px-8 gap-2">
              <p className="text-blue-500  px-2 h-max bg-slate-100">2</p>
              <p className="text-slate-500 font-semibold">DELIVERY ADDRESS</p>
            </div>

            {

              addresses.map((item) => (
                <label onClick={() => setIsAddress(true)} className="bg-white mt-2 py-2 px-8 flex gap-4">

                  <input type="radio" name="address">
                  </input>
                  <div className="flex flex-col gap-1">

                    <div className="flex font-semibold gap-2">
                      <p>{user.firstName} {user.lastname}</p>
                      <p>{user.emailAddress}</p>
                    </div>
                    <div className="flex gap-1">
                      <p>{item.addressLine}</p>
                      <p>{item.city}</p>
                      <p>{item.state}</p>
                      <p>{item.pincode}</p>
                      <p>{item.country}</p>
                    </div>
                  </div>
                </label>
              ))
            }
            <div onClick={() => setIsOpen((prev) => !prev)} className="bg-white py-2 px-8 mt-2">
              <p className="font-semibold cursor-pointer text-blue-500">+ Add New Address</p>
            </div>
            {
              isOpen &&
              <div>

                <p className='font-semibold text-xl mb-2'>Add Address</p>
                <input onChange={handleAddressChange} value={singleAddress.addressLine} className='w-full mb-2 border border-zinc-500 py-2 px-4 rounded-md outline-none' type='text' placeholder='Address Line 1' name='addressLine' />
                <div className='flex gap-2 mb-2'>
                  <input onChange={handleAddressChange} value={singleAddress.city} className='w-full border border-zinc-500 py-2 px-4 rounded-md outline-none' type='text' placeholder='City' name='city' />
                  <input onChange={handleAddressChange} value={singleAddress.state} className='w-full border border-zinc-500 py-2 px-4 rounded-md outline-none' type='text' placeholder='State' name='state' />
                </div>
                <div className='flex gap-2'>
                  <input onChange={handleAddressChange} value={singleAddress.pincode} className='w-full border border-zinc-500 py-2 px-4 rounded-md outline-none' type='number' placeholder='Pincode' name='pincode' />
                  <input onChange={handleAddressChange} value={singleAddress.country} className='w-full border border-zinc-500 py-2 px-4 rounded-md outline-none' type='text' placeholder='Country' name='country' />
                </div>
                <button onClick={handleSetAddress} className="w-full mt-2 outline-none shadow-xl rounded-sm hover:bg-blue-600 transition-all duration-300  py-2 px-4 bg-blue-500 text-white">Submit</button>
              </div>
            }
          </div>
        )}
        {!placeOrder && (
          <div className="w-full bg-slate-200 h-max  lg:w-3/4 col-span-3">
            {cartItems.length > 0 ? (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li
                    key={item.productId}
                    className="flex items-center bg-white shadow-md rounded-lg p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold">
                        {item.productName}
                      </h3>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-sm text-gray-500">
                        Category: {item.category}
                      </p>

                      <div className="flex items-center mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="bg-gray-300 text-gray-800 p-2 rounded-full mr-2 hover:bg-gray-400"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="bg-gray-300 text-gray-800 p-2 rounded-full ml-2 hover:bg-gray-400"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <p className="text-green-600 font-semibold mt-2">
                        Price: ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition ml-4"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Cart is empty</p>
            )}

            <div className="h-24 mt-8 w-full sticky bottom-0 py-4 px-4 flex text-end bg-white justify-end">
              <button
                onClick={() => setPlaceOrder((prev) => !prev)}
                className="bg-orange-400 w-36  text-white rounded-md text-xl font-semibold  "
              >
                Place Order
              </button>
            </div>
          </div>
        )}

        <div className="w-full h-48 mt-6 lg:mt-0 lg:ml-6 bg-white shadow-md rounded-lg p-6 col-span-1 ">
          <div className="text-gray-600 text-xl font-semibold border-b border-slate-300">
            <p>PRICE DETAILS</p>
          </div>
          <h3 className="text-xl font-semibold mb-4">Checkout</h3>
          <p className="text-lg">
            {" "}
            <span className="font-semibold"> Total Price:</span> $
            {calculateTotal()}
          </p>
          {
            placeOrder &&
            <button onClick={handleSubmit} className="bg-blue-500 text-white rounded-md py-2 px-4 font-semibold text-xl">Checkout</button>
          }
        </div>
      </div>
    </div>
  );
};
export default Cart;