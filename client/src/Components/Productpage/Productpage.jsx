import { useState, useRef, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Your image imports
import main1 from "../../assets/Details/main1.png"
import side1 from "../../assets/Details/side1.png"
import side2 from "../../assets/Details/side2.png"
import side3 from "../../assets/Details/side3.png"
import man from "../../assets/Details/man1.png"
import logo from "../../assets/Details/logo.png"
import image5 from "../../assets/Home Images/five.png"
import image6 from "../../assets/Home Images/six.png"
import image7 from "../../assets/Home Images/seven.png"

// --- Helper Component for Try-On (New) ---
// This is where the camera logic will live
function VirtualTryOn({ isActive, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      if (isActive && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          // Request access to the user's video camera
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // The actual face tracking and glasses overlay logic (from my previous suggestion) 
            // would go here, using libraries like face-api.js or Three.js.
          }
        } catch (err) {
          console.error("Error accessing the camera: ", err);
          alert("Could not access your camera. Please ensure permissions are granted.");
          onClose(); // Close the try-on mode if camera access fails
        }
      } else if (stream) {
          // Clean up stream when component unmounts or isActive becomes false
          stream.getTracks().forEach(track => track.stop());
      }
    };

    startCamera();

    // Cleanup function: stop the camera tracks when the component unmounts or re-renders
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isActive, onClose]); // Re-run effect when isActive state changes

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl hover:text-orange-500 transition"
        aria-label="Close Virtual Try-On"
      >
        <AiOutlineClose />
      </button>

      <div className="relative w-full max-w-lg aspect-video bg-gray-800 rounded-xl shadow-2xl">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover rounded-xl transform scaleX(-1)" // Mirrors the video (standard for selfie view)
        >
        </video>
        {/*
          *** The Augmented Reality (AR) Layer goes here ***
          A canvas element would be placed over the video to render the glasses.
          <canvas id="glasses-overlay" className="absolute inset-0"></canvas>
        */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold">
            {/* Placeholder for the glasses, which would be dynamically drawn */}
            [Glasses Overlay Area] 
        </div>
      </div>
      <p className="mt-4 text-white">Move your head to see how the glasses fit!</p>
    </div>
  );
}


// --- Your Main Product Page Component (Modified) ---
const topItems = [
    // ... (Your topItems array remains the same)
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
  const [isTryOnActive, setIsTryOnActive] = useState(false); // New state for try-on

  const handleTryOnClick = () => {
    setIsTryOnActive(true);
  };

  const handleTryOnClose = () => {
    setIsTryOnActive(false);
  };

  return (
    <div>
        {/* Render the VirtualTryOn component when the state is true */}
        <VirtualTryOn isActive={isTryOnActive} onClose={handleTryOnClose} />
        
        <Header />
        
        <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ... (Your Product Image/Gallery content) ... */}
            <div>
              <img
                src={main1}
                alt="Aviator Sunglasses"
                className="rounded-xl w-full"
              />
              <div className="flex justify-around items-center mt-4">
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
              {/* ... (Your Product Details, Price, Description, etc.) ... */}
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

              {/* Add to Cart / Wishlist Buttons */}
              <div className="flex items-center space-x-4">
                <button className="bg-orange-600 text-white px-6 py-2 rounded-xl flex items-center space-x-2 hover:bg-orange-700">
                  <AiOutlineShoppingCart /> <span>Add to Cart</span>
                </button>
                <button className="border px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-gray-100">
                  <AiOutlineHeart /> <span>Wishlist</span>
                </button>
              </div>

              {/* The Virtual Try-On Button (Now with onClick handler) */}
              <div 
                className="border w-full py-2 rounded-xl text-center cursor-pointer font-semiboldbold hover:bg-gray-100 mt-4 flex justify-around items-center"
                onClick={handleTryOnClick} // <--- New onClick Handler
              >
                <button className="text-2xl">Virtual Try-On</button>
                <img src={logo} alt="logo" />
              </div>
              
              {/* ... (Rest of your content: Subtotal, Man Image, Description, Reviews) ... */}
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
                  Experience unparalleled style and iconic angular silhouette...
                </p>
              </div>
              
              <div className="mt-6">
                <h2 className="text-4xl font-semibold mb-2">Reviews (1)</h2>
                {/* ... (Review content) ... */}
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
          {/* ... (Your Top Items Section) ... */}
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