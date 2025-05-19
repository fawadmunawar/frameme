import React from "react";
import Header from "../Header/Header";

import heroImg from "../../assets/Sunglasses/sunglasses1.png";

import side1 from "../../assets/Sunglasses/side1.png";
import side2 from "../../assets/Sunglasses/side2.png";
import side3 from "../../assets/Sunglasses/side3.png";
import side4 from "../../assets/Sunglasses/side4.png";

import main1 from "../../assets/Prescription/main1.png";
import main2 from "../../assets/Prescription/main2.png";
import main3 from "../../assets/Prescription/main3.png";
import main4 from "../../assets/Prescription/main4.png";
import main5 from "../../assets/Prescription/main5.png";
import main6 from "../../assets/Prescription/main6.png";
import main7 from "../../assets/Prescription/main7.png";
import main8 from "../../assets/Prescription/main8.png";

import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

import { IoIosArrowForward } from "react-icons/io";

const Prescription = () => {
  const products = [
    { name: "Rectangle", price: 600, src: main1 },
    { name: "Square", price: 700, src: main2 },
    { name: "Round", price: 800, src: main3 },
    { name: "Cat Eye", price: 900, src: main4 },
    { name: "Oval", price: 500, src: main5 },
    { name: "Geometric", price: 600, src: main6 },
    { name: "Rim Less", price: 1000, src: main7 },
    { name: "Half Rim", price: 600, src: main8 },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <section className="text-center py-20 bg-white flex w-1/2 items-center justify-between px-4 gap-80">
        <img className="rounded-2xl" src={heroImg} alt="sunglasses" />
        <h1 className="text-4xl font-bold text-gray-900">
          Home Shopping Your Choise!
        </h1>
      </section>

      <div className="min-h-screen text-black p-4">
        <div className="flex flex-col md:flex-row">
          <aside className="md:w-1/4 p-4">
            <input
              type="text"
              placeholder="Search product"
              className="w-full p-2 mb-4 rounded text-black bg-gray-50"
            />
            <div className="ml-4">
                <h1 className="font-bold text-2xl">Categories</h1>
                <div className="flex justify-center flex-col mt-4 gap-2">
                    <div className="flex gap-6 items-center cursor-pointer hover:transform hover:translate-y-1" onClick={() => navigate("/sunglasses")}>
                        <h1 className="font-semibold">Sunglasses</h1>
                        <IoIosArrowForward className="text-orange-500"/>
                    </div>
                    <div className="flex gap-6 items-center cursor-pointer hover:transform hover:translate-y-1" onClick={() => navigate("/prescription")}>
                        <h1 className="font-semibold">Prescription</h1>
                        <IoIosArrowForward className="text-orange-500"/>
                    </div>
                    <div className="flex gap-6 items-center cursor-pointer hover:transform hover:translate-y-1" onClick={() => navigate("/sports")}>
                        <h1 className="font-semibold">Sports</h1>
                        <IoIosArrowForward className="text-orange-500"/>
                    </div>
                    <div className="flex gap-6 items-center cursor-pointer hover:transform hover:translate-y-1" onClick={() => navigate("/bluelight")}>
                        <h1 className="font-semibold">Eye Wear</h1>
                        <IoIosArrowForward className="text-orange-500"/>
                    </div>
                </div>
            </div>
            <div className="p-4 rounded">
              <h2 className="text-lg mb-2">Featured Product</h2>
              {products.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-white rounded mr-2">
                    <img src={item.src} alt="" />
                  </div>
                  <span className="text-orange-400">Rs.{item.price}</span>
                </div>
              ))}
            </div>
          </aside>

          <main className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white text-black p-4 rounded-3xl shadow-2xl flex flex-col items-center cursor-pointer hover:scale-105 transition"
                onClick={() => navigate("/productpage")}
              >
                <div />
                <img
                  className="w-32 h-24 bg-gray-300 mb-2"
                  src={product.src}
                  alt=""
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">by donchung</p>
                <p className="text-orange-600 font-semibold mt-1">
                  Rs.{product.price}
                </p>
                <button className="mt-2 text-sm border p-1 rounded-2xl hover:border-white hover:bg-black hover:text-white transition ">
                  Try on
                </button>
              </div>
            ))}
          </main>
        </div>
        <div className="flex justify-center mt-4">
          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            See more
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Prescription;
