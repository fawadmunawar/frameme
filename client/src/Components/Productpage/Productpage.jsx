import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import Header from "../Header/Header";

import main1 from "../../assets/Details/main1.png"
import side1 from "../../assets/Details/side1.png"
import side2 from "../../assets/Details/side2.png"
import side3 from "../../assets/Details/side3.png"
import man from "../../assets/Details/man1.png"
import logo from "../../assets/Details/logo.png"

import image5 from "../../assets/Home Images/five.png"
import image6 from "../../assets/Home Images/six.png"
import image7 from "../../assets/Home Images/seven.png"
import Footer from "../Footer/Footer";

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

export default function Productpage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <Header />
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={main1}
            alt="Aviator Sunglasses"
            className="rounded-xl w-full"
          />
          <div className="flex justify-around items-center">
            <img
              src={side1}
              alt="Side View"
              className="w-20 h-12 object-cover rounded"
            />
            <img
              src={side2}
              alt="Flat View"
              className="w-20 h-12 object-cover rounded"
            />
            <img
              src={side3}
              alt="Angle View"
              className="w-20 h-12 object-cover rounded"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">Aviator</h1>
          <p className="text-orange-600 text-xl font-bold">Rs. 500</p>
          <div className="flex space-x-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <div className="text-sm text-gray-700">
            <p>
              Crafted with a modern aviator aesthetic, the Sunisi Astra
              redefines style through their premium polarized lenses and
              lightweight alloy frame. 100% UV400/UVA&UVB protection,
              scratch-resistant coating, and ultra-durable build.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="bg-orange-600 text-white px-6 py-2 rounded-xl flex items-center space-x-2 hover:bg-orange-700">
              <AiOutlineShoppingCart /> <span>Add to Cart</span>
            </button>
            <button className="border px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-gray-100">
              <AiOutlineHeart /> <span>Wishlist</span>
            </button>
          </div>

          <div className="border w-full py-2 rounded-xl text-center cursor-pointer font-semiboldbold hover:bg-gray-100 mt-4 flex justify-around items-center">
            <button className="text-2xl">Virtual Try-On</button>
            <img src={logo} alt="logo" />
          </div>

          <div className="text-sm text-gray-600 mt-4">
            <p>
              Sub total: <span className="text-black font-medium">Rs. 500</span>
            </p>
            <p className="text-red-500">*Incl. all taxes</p>
          </div>

          <div className="w-60 min-h-96">
            <img className="object-cover rounded-md" src={ man } alt="" />
          </div>

          <div className="mt-20">
            <h2 className="text-4xl font-semibold mt-6 mb-2">Description</h2>
            <p className="text-sm text-gray-700">
              Elevate your eyewear game with the Sunisi Astra Aviator shades.
              Experience unparalleled style and iconic angular silhouette. The
              premium polarized UV400+ clarity lenses reduce light distortion
              and enhance true-to-life colors, all wrapped within a durable
              frame. Ethically crafted using surgical-grade materials. Designed
              for individuals who value conscious fashion & resilient
              functionality. The ultra-lightweight frame ensures all-day
              comfort, while corrosion-resistant hinges, adjustable nose pads &
              a flexible construction blend security & style. Whether you're out
              on the streets or in the sun-drenched outdoors, the Sunisi Astra
              represents a legacy of innovation, unmatched comfort, and a
              commitment to sustainable materials.
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-4xl font-semibold mb-2">Reviews (1)</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold">Ahmed Ali</p>
                <div className="flex text-yellow-400">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-sm text-gray-600">2 March 2024 - 03:59 pm</p>
                <p className="text-sm mt-1">
                  Thank you the product was received in perfect condition.
                </p>
                <div className="flex space-x-2 mt-2">
                  <img
                    src={ side1 }
                    alt="Review"
                    className="w-12 h-8 object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
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
}