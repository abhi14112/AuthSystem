import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 text-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">

          {/* Subscribe */}
          <div>
            <h3 className="text-lg font-bold mb-4">E-Commerce</h3>
            <p className="mb-2 text-gray-400">Subscribe</p>
            <p className="mb-4 text-gray-400">Get 10% off your first order</p>
            <form className="flex border border-gray-600 rounded overflow-hidden max-w-xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-black px-4 py-2 text-gray-300 text-xs focus:outline-none w-full"
              />
              <button type="submit" className="bg-gray-700 hover:bg-gray-600 px-4">
                ➤
              </button>
            </form>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <p className="text-gray-400 mb-2">111 New Delhi India</p>
            <p className="text-gray-400 mb-2">exclusive@gmail.com</p>
            <p className="text-gray-400">+77777-88888-9999</p>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-bold mb-4">Account</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">My Account</a></li>
              <li><a href="#" className="hover:text-white">Login / Register</a></li>
              <li><a href="#" className="hover:text-white">Cart</a></li>
              <li><a href="#" className="hover:text-white">Wishlist</a></li>
              <li><a href="#" className="hover:text-white">Shop</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Link</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms Of Use</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-600 border-t border-gray-800 pt-6 text-xs">
          &copy; {new Date().getFullYear()} Exclusive. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
