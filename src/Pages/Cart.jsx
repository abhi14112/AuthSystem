import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/store";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Minus } from "lucide-react";

const Cart = () => {
  const setCartItems = useAuthStore((state) => state.setCartItems);
  const cartItems = useAuthStore((state) => state.cartItems);
  const getCartData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://localhost:7249/api/cart/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data?.cartItems;
      if (data) {
        setCartItems(data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`https://localhost:7249/api/cart/RemoveFromCart/${productId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((item) => item.productId !== productId));
      toast.success("Item removed from card");
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.error("Error removing item:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`https://localhost:7249/api/cart/UpdateQuantity/${productId}`, quantity, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    console.log(response.data);
  }
  const increaseQuantity = (productId) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    const data = updatedItems.find((item) => item.productId === productId);
    console.log(data.quantity);
    let quantity = data.quantity;
    setCartItems(updatedItems);
    updateQuantity(productId, quantity);
  };

  const decreaseQuantity = (productId) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedItems);
    const data = updatedItems.find((item) => item.productId === productId);
    console.log(data.quantity);
    let quantity = data.quantity;
    updateQuantity(productId, quantity);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <div className="bg-slate-300">
      <Navbar />
      <h2 className="text-2xl font-semibold mb-4 text-center">Shopping Cart</h2>
      <div className="w-screen px-6 py-4 bg-slate-300 min-h-screen h-auto  mx-auto grid grid-cols-4">
        {/* Cart Items List */}
        <div className="w-full lg:w-3/4 col-span-3">

          {cartItems.length > 0 ? (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.productId} className="flex items-center bg-white shadow-md rounded-lg p-4">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold">{item.productName}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-sm text-gray-500">Category: {item.category}</p>

                    {/* Quantity Buttons */}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.productId)}
                        className="bg-gray-300 text-gray-800 p-2 rounded-full mr-2 hover:bg-gray-400"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.productId)}
                        className="bg-gray-300 text-gray-800 p-2 rounded-full ml-2 hover:bg-gray-400"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="text-green-600 font-semibold mt-2">Price: ${item.price.toFixed(2)}</p>
                  </div>

                  {/* Remove Button */}
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
        </div>

        {/* Checkout Section */}
        <div className="w-full h-48 mt-6 lg:mt-0 lg:ml-6 bg-white shadow-md rounded-lg p-6 col-span-1 ">
          <h3 className="text-xl font-semibold mb-4">Checkout</h3>
          <p className="text-lg">Total Price: ${calculateTotal()}</p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition"
          // Add your checkout logic here
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
