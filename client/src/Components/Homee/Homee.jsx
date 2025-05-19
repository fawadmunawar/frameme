import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaPhoneAlt,
  FaTruck,
} from "react-icons/fa";
import React from "react";

import image1 from "../../assets/Home Images/images 1.png"
import image2 from "../../assets/Home Images/two.png"
import image3 from "../../assets/Home Images/three.png"
import image4 from "../../assets/Home Images/four.png"
import image5 from "../../assets/Home Images/five.png"
import image6 from "../../assets/Home Images/six.png"
import image7 from "../../assets/Home Images/seven.png"
import card from "../../assets/Home Images/card.png"
import foooter from "../../assets/Home Images/foooter.png"
import mainpic from "../../assets/Cart/mainpic.png"

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

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { useNavigate } from "react-router-dom";

const companies = [
  "Company Text Logo",
  "COMPANY",
  "A COMPANY",
  "TEXT LOGO",
  "COMPANY",
  "Company Text Logo",
];


const Homee = () => {

  const navigate = useNavigate(); 

    return (
      <div className="font-sans">
        {/* Header */}
        
         <Header />

        {/* Hero */}
        <section className="text-center py-20 bg-white flex w-1/2 items-center justify-between px-4 gap-80">
        <img className="rounded-2xl" src={ mainpic } alt="sunglasses" />
        <div className="flex flex-col">
        <h1 className="text-4xl font-bold text-gray-900">
          Try First, Buy Confidently
        </h1>
          <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded">
            Find out More
          </button>
        </div>
      </section>

        {/* Product Tabs */}
        <section className="bg-gray-100 py-10 px-6">
          <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
            Our Premium Collection
          </h2>
          <div className="flex justify-center gap-8 text-sm font-medium mb-10">
            <span className="text-orange-500 border-b-2 border-orange-500">
              All Products
            </span> 
            <span className="text-gray-500 hover:text-orange-500 transition hover:cursor-pointer" onClick={() => navigate("/sunglasses")}>Sunglasses</span>
            <span className="text-gray-500 hover:text-orange-500 transition hover:cursor-pointer" onClick={() => navigate("/prescription")}>Prescription Glasses</span>
            <span className="text-gray-500 hover:text-orange-500 transition hover:cursor-pointer" onClick={() => navigate("/sports")}>Sports Glasses</span>
            <span className="text-gray-500 hover:text-orange-500 transition hover:cursor-pointer" onClick={() => navigate("/bluelight")}>BlueLight Glasses</span>
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Product 1 */}
            <div className="bg-white p-4 rounded-3xl shadow-2xl text-center cursor-pointer transition hover:scale-105" onClick={() => navigate("/sunglasses")}>
              <img
                src={image1}
                alt="Sunglasses"
                className="w-32 h-32 mx-auto mb-4"
              />
              <p className="text-xs text-gray-500">Category Glasses</p>
              <h3 className="text-lg font-semibold">Sunglasses</h3>
              <button className="mt-2 bg-orange-500 text-white w-8 h-8 rounded-full">
                &gt;
              </button>
            </div>

            {/* Product 2 */}
            <div className="bg-white p-4 rounded-3xl shadow-2xl text-center cursor-pointer transition hover:scale-105" onClick={() => navigate("/prescription")}>
              <img
                src={image2}
                alt="Prescription Glasses"
                className="w-32 h-32 mx-auto mb-4"
              />
              <p className="text-xs text-gray-500">Category Glasses</p>
              <h3 className="text-lg font-semibold">Prescription</h3>
              <button className="mt-2 bg-orange-500 text-white w-8 h-8 rounded-full">
                &gt;
              </button>
            </div>

            {/* product 3 */}
            <div className="bg-white p-4 rounded-3xl shadow-2xl text-center cursor-pointer transition hover:scale-105" onClick={() => navigate("/sports")}>
              <img
                src={image3}
                alt="Sports Glasses"
                className="w-32 h-32 mx-auto mb-4"
              />
              <p className="text-xs text-gray-500">Category Glasses</p>
              <h3 className="text-lg font-semibold">Sports</h3>
              <button className="mt-2 bg-orange-500 text-white w-8 h-8 rounded-full">
                &gt;
              </button>
            </div>

            {/* product 4 */}
            <div className="bg-white p-4 rounded-3xl shadow-2xl text-center cursor-pointer transition hover:scale-105" onClick={() => navigate("/bluelight")}>
              <img
                src={image4}
                alt="Sports Glasses"
                className="w-32 h-32 mx-auto mb-4"
              />
              <p className="text-xs text-gray-500">Category Glasses</p>
              <h3 className="text-lg font-semibold">Blue Light</h3>
              <button className="mt-2 bg-orange-500 text-white w-8 h-8 rounded-full">
                &gt;
              </button>
            </div>
          </div>
          <div className="flex justify-around mt-5">
            <button className="bg-orange-500 text-white rounded-xl p-2 content-center">
              Find out more
            </button>
          </div>
        </section>

        {/* crousal */}
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

        <section className="bg-gray-50 py-16 px-4">
          {/* Achievements */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our Achievement
            </h2>
            <div className="flex justify-center flex-wrap gap-10">
              {companies.map((company, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full mb-2"></div>
                  <span className="text-sm font-semibold text-gray-600 text-center">
                    {company}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white max-w-5xl mx-auto rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center relative">
            {/* Arrows */}
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full">
              <FaChevronLeft />
            </button>
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full">
              <FaChevronRight />
            </button>

            {/* Image */}
            <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
              <img
                src={card}
                alt="Sara Khan"
                className="w-40 h-auto object-cover rounded-md"
              />
            </div>

            {/* Content */}
            <div className="md:w-2/3 text-center md:text-left">
              <h3 className="text-4xl font-bold text-orange-500 mb-2">
                Good Seller!
              </h3>
              <p className="text-gray-500 mb-4">
                I am very happy with the services provided, it is very helpful,
                starting from the insight that the company gave from the start
                that I did not understand what it was so I got knowledge and
                made my website look better
              </p>
              <h4 className="font-bold text-2xl text-gray-900">Sara Khan</h4>
              <p className="text-sm text-gray-500 mt-2">Your Beloved Buyer</p>
            </div>
          </div>
        </section>

        {/* Newsletter  */}
                <Footer />
        
      </div>
    );
};

export default Homee;
