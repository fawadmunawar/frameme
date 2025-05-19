import React, { useState } from 'react';
import { FiTrash2, FiHeart } from 'react-icons/fi';

import main1 from "../../assets/Cart/main1.png"
import main2 from "../../assets/Cart/main2.png"
import main3 from "../../assets/Cart/main3.png"
import mainpic from "../../assets/Cart/mainpic.png"
import image5 from "../../assets/Home Images/five.png"
import image6 from "../../assets/Home Images/six.png"
import image7 from "../../assets/Home Images/seven.png"

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const topItems = [
    {
      name: "Oakley Sutro",
      brand: "Apple Cherry",
      price: "$99",
      oldPrice: "$120",
      image: image5,
    },
    {
      name: "Aviator",
      brand: "Apple Cherry",
      price: "$99",
      oldPrice: "$130",
      image: image6,
    },
    {
      name: "Round",
      brand: "Apple Cherry",
      price: "$99",
      oldPrice: "$120",
      image: image7,
    },
  ];

const cartItemsData = [
  { id: 1, name: 'Aviator', price: 500, image: main1 },
  { id: 2, name: 'Geometric', price: 900, image: main2 },
  { id: 3, name: 'WayFarer', price: 800, image: main3 },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    cartItemsData.map(item => ({ ...item, quantity: 5 }))
  );
  const [coupon, setCoupon] = useState('');

  const updateQuantity = (id, amount) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen p-8">
        <Header />
        <section className="text-center py-20 bg-white flex w-1/2 items-center justify-between px-4 gap-80">
        <img className="rounded-2xl" src={ mainpic } alt="sunglasses" />
        <h1 className="text-4xl font-bold text-gray-900">
          Try First, Buy Confidently
        </h1>
      </section>
      <h1 className="text-4xl font-bold mb-6 text-gray-800">My Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center bg-white p-4 rounded">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="ml-6 flex-1">
                <h2 className="font-semibold text-lg text-gray-700">{item.name}</h2>
                <div className="flex items-center mt-2">
                  <span className="mr-2 font-medium">Quantity:</span>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 text-lg bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="px-4 text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 text-lg bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
                <div className="text-orange-600 font-bold text-xl mt-2">Rs.{item.price}</div>
              </div>
              <div className="flex flex-col items-end">
                <button onClick={() => removeItem(item.id)} className="text-red-500 text-xl mb-2">
                  <FiTrash2 />
                </button>
                <button className="border border-orange-500 text-orange-500 px-3 py-1 rounded flex items-center text-sm">
                  Wishlist <FiHeart className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded">
            <h3 className="font-semibold text-gray-700 mb-3">Have a Coupon?</h3>
            <input
              type="text"
              placeholder="Input your email here"
              value={coupon}
              onChange={e => setCoupon(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded mb-2"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded w-full">Apply</button>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold text-gray-700 mb-3">Cart Totals</h3>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>Rs.{subtotal}</span>
            </div>
            <div className="text-sm text-gray-600 mb-1">Shipping</div>
            <div className="text-sm text-gray-800 font-medium">Free Shipping</div>
            <div className="text-sm text-gray-600 mb-4">
              Shipping to Islamabad <button className="text-orange-500 ml-2">Change</button>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>Rs.{subtotal}</span>
            </div>
          </div>

          <button className="bg-orange-500 text-white px-6 py-3 rounded w-full text-center text-sm">
            Checkout
          </button>
        </div>
      </div>
      <section className="py-16 bg-white">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Top Items</h2>
            <p className="text-gray-500 mt-2">
              Loved by thousands. Perfect for you. Find your new favorite today.
            </p>
          </div>

          <div className="flex justify-center gap-6 px-4 overflow-x-auto">
            {topItems.map((item, index) => (
              <div
                key={index}
                className="min-w-[200px] bg-gray-100 rounded-lg p-4 text-center shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 mx-auto object-contain"
                />
                <h3 className="font-semibold mt-4">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <div className="mt-2">
                  <span className="text-red-500 font-bold">{item.price}</span>
                  <span className="text-gray-400 line-through ml-2">
                    {item.oldPrice}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2, 3, 4].map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === 2 ? "bg-yellow-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </section>
      <Footer />
    </div>
  );
};

export default Cart;
