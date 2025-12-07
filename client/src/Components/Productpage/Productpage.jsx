import { useState, useRef, useEffect } from "react";
import { FaStar, FaCamera, FaUpload } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineClose, AiFillThunderbolt } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Your image imports
import main1 from "../../assets/Details/main1.png";
import side1 from "../../assets/Details/side1.png";
import side2 from "../../assets/Details/side2.png";
import side3 from "../../assets/Details/side3.png";
import man from "../../assets/Details/man1.png";
import logo from "../../assets/Details/logo.png";
import image5 from "../../assets/Home Images/five.png";
import image6 from "../../assets/Home Images/six.png";
import image7 from "../../assets/Home Images/seven.png";

import glassesImageSource from "../../assets/Sunglasses/sunglasses.png";

import * as faceapi from "face-api.js";

// --- Helper Function: Draw Glasses on Canvas (UNCHANGED) ---
const drawGlassesOverlay = (canvas, detections, glassesImage) => {
  const ctx = canvas.getContext("2d");

  if (!glassesImage.complete || glassesImage.naturalWidth === 0) return;

  // We clear the canvas before drawing the new frame/overlay
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const landmarks = detections.landmarks;
  const leftPoint = landmarks.getLeftEye()[0];
  const rightPoint = landmarks.getRightEye()[3];

  // Calculate Distance & Center
  const eyeDistance = Math.sqrt(
    Math.pow(rightPoint.x - leftPoint.x, 2) +
    Math.pow(rightPoint.y - leftPoint.y, 2)
  );
  const center = {
    x: (leftPoint.x + rightPoint.x) / 2,
    y: (leftPoint.y + rightPoint.y) / 2,
  };
  const angle = Math.atan2(
    rightPoint.y - leftPoint.y,
    rightPoint.x - leftPoint.x
  );

  // Adjust these values to fit the specific glasses model better
  const scaleMultiplier = 2.0; 
  const verticalAdjustment = 0.05; // Negative moves glasses up, Positive moves down

  const glassesWidth = eyeDistance * scaleMultiplier;
  const aspectRatio = glassesImage.naturalHeight / glassesImage.naturalWidth;
  const glassesHeight = glassesWidth * aspectRatio;

  ctx.save();
  ctx.translate(center.x, center.y);
  ctx.rotate(angle);

  const xOffset = -glassesWidth / 2;
  const yOffset = -glassesHeight * 0.5 + glassesHeight * verticalAdjustment;

  ctx.drawImage(
    glassesImage,
    xOffset,
    yOffset,
    glassesWidth,
    glassesHeight
  );

  ctx.restore();
};

function VirtualTryOn({ isActive, onClose }) {
  const [mode, setMode] = useState("camera"); // 'camera' or 'upload'
  const [imageURL, setImageURL] = useState(null);
   
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const uploadedImageRef = useRef(null); 
  const glassesImgRef = useRef(new Image()); 

  // 1. Load Models and Glasses Image on Mount (UNCHANGED)
  useEffect(() => {
    const MODEL_URL = "/models";

    const loadModelsAndImage = async () => {
      try {
        // Load the AR Models
        await faceapi.tf.setBackend("webgl");
        await faceapi.tf.ready();

        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        console.log("✅ Face tracking models loaded!");

        // Load the Glasses Image
        const img = new Image();
        img.src = glassesImageSource;
        img.onload = () => {
          glassesImgRef.current = img;
        };
        img.onerror = (err) => {
            console.error("❌ FAILED to load glasses image.", err);
        };
      } catch (error) {
        console.error("Failed to load AR models:", error);
      }
    };

    loadModelsAndImage();
  }, []);

  // 2. Handle Camera Stream (UNCHANGED)
  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      // Only start camera if active AND in camera mode
      if (isActive && mode === "camera" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            // Start tracking once the video starts playing
            videoRef.current.addEventListener("play", handleVideoOnPlay);
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          alert("Could not access your camera. Please ensure permissions are granted.");
        }
      }
    };

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
      if (videoRef.current) {
        videoRef.current.removeEventListener("play", handleVideoOnPlay);
      }
    };

    if (isActive && mode === "camera") {
      startCamera();
    } else {
      stopCamera();
    }

    // Cleanup
    return () => {
      stopCamera();
    };
  }, [isActive, onClose, mode]);

  // 3. Loop: Detect Face in Video (UNCHANGED)
  const handleVideoOnPlay = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const displaySize = { width: video.clientWidth, height: video.clientHeight };
    faceapi.matchDimensions(canvas, displaySize);

    const intervalId = setInterval(async () => {
      if (video.paused || video.ended) return;

      const detections = await faceapi.detectSingleFace(
        video,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceLandmarks();

      // Ensure canvas is cleared every frame for video
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (detections) {
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        drawGlassesOverlay(canvas, resizedDetections, glassesImgRef.current);
      }
    }, 100);

    return () => clearInterval(intervalId);
  };

  // 4. One-time: Detect Face in Uploaded Image (UNCHANGED)
  const handleImageLoad = async () => {
    const img = uploadedImageRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    // Use the rendered size of the image
    const displaySize = { width: img.width, height: img.height };
    
    // Resize canvas to match image
    canvas.width = displaySize.width;
    canvas.height = displaySize.height;
    
    faceapi.matchDimensions(canvas, displaySize);

    // Detect face
    const detections = await faceapi.detectSingleFace(
        img, 
        new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks();

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (detections) {
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        drawGlassesOverlay(canvas, resizedDetections, glassesImgRef.current);
    } else {
        alert("No face detected in this image. Please try a clearer photo!");
    }
  };

  // 5. Handle File Selection (UNCHANGED)
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setImageURL(url);
    }
  };

  if (!isActive) return null;

  return (
    // REDESIGNED MODAL UI
    <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
      
      {/* Top Bar */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center max-w-5xl">
         <div className="text-white font-bold text-xl tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Virtual Try-On
         </div>
         <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-4xl transition-transform hover:rotate-90 hover:scale-110"
            aria-label="Close"
         >
            <AiOutlineClose />
         </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Toggle Controls */}
        <div className="flex justify-center gap-4">
            <button
            onClick={() => setMode("camera")}
            className={`flex items-center space-x-3 px-6 py-3 rounded-full font-bold transition-all duration-300 border ${
                mode === "camera" 
                ? "bg-orange-600 border-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.5)]" 
                : "bg-transparent border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white"
            }`}
            >
            <FaCamera className="text-lg" /> <span>Live Camera</span>
            </button>
            
            <label className={`relative flex items-center space-x-3 px-6 py-3 rounded-full font-bold transition-all duration-300 border cursor-pointer ${
                mode === "upload" 
                ? "bg-orange-600 border-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.5)]" 
                : "bg-transparent border-gray-600 text-gray-400 hover:border-gray-400 hover:text-white"
            }`}
            >
                <FaUpload className="text-lg" /> <span>Upload Photo</span>
                <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onClick={() => setMode("upload")}
                onChange={handleFileChange}
                />
            </label>
        </div>

        {/* Viewport */}
        <div className="relative w-full bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-video flex items-center justify-center">
        
            {/* === CAMERA VIEW === */}
            {mode === "camera" && (
                <div className="relative w-full h-full">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover transform scaleX(-1)"
                    />
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full transform scaleX(-1)"
                    />
                    {/* UI Overlay on Camera */}
                    <div className="absolute inset-0 border-[3px] border-white/20 rounded-3xl m-4 pointer-events-none">
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-widest animate-pulse">
                            Live
                        </div>
                    </div>
                </div>
            )}

            {/* === UPLOAD VIEW === */}
            {mode === "upload" && (
                <div className="relative w-full h-full flex items-center justify-center bg-[#111]">
                    {imageURL ? (
                        <div className="relative inline-block max-h-full">
                            <img 
                                ref={uploadedImageRef}
                                src={imageURL}
                                alt="Uploaded"
                                onLoad={handleImageLoad}
                                className="max-w-full max-h-[70vh] object-contain block rounded-lg shadow-lg"
                            />
                            <canvas
                                ref={canvasRef}
                                className="absolute inset-0 w-full h-full pointer-events-none"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500 animate-pulse">
                            <div className="w-24 h-24 border-2 border-dashed border-gray-600 rounded-2xl flex items-center justify-center mb-4">
                                <FaUpload className="text-3xl" />
                            </div>
                            <p className="text-lg font-medium">Select an image to start</p>
                        </div>
                    )}
                </div>
            )}
        </div>
        
        {/* Instructions */}
        <div className="text-center space-y-2">
            <h3 className="text-white text-lg font-medium">
                {mode === "camera" ? "Align your face within the frame" : "Processing your photo"}
            </h3>
            <p className="text-gray-400 text-sm">
                {mode === "camera" 
                    ? "Move your head slightly to check the fit from different angles." 
                    : "For best results, upload a well-lit, front-facing portrait."}
            </p>
        </div>
      </div>
    </div>
  );
}

const topItems = [
    {
        name: "Oakley Sutro",
        brand: "Performance Series",
        price: "$149",
        oldPrice: "$180",
        image: image5,
    },
    {
        name: "Ray-Ban Aviator",
        brand: "Classic Collection",
        price: "$160",
        oldPrice: "$195",
        image: image6,
    },
    {
        name: "Clubmaster Classic",
        brand: "Timeless",
        price: "$135",
        oldPrice: "$150",
        image: image7,
    },
];

export default function Productpage() {
  const [quantity, setQuantity] = useState(1);
  const [isTryOnActive, setIsTryOnActive] = useState(false);
  const navigate = useNavigate();

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleTryOnClick = () => {
    setIsTryOnActive(true);
  };

  const handleTryOnClose = () => {
    setIsTryOnActive(false);
  };

  // Logic to handle Add to Cart click
  const handleAddToCart = () => {
    // Here you could check if user is already logged in. 
    // For now, we simply show the prompt as requested.
    setShowLoginPrompt(true);
  }

  return (
    <div className="bg-gray-50 text-slate-800 font-sans selection:bg-orange-100 selection:text-orange-900">
      {showLoginPrompt && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl text-center relative overflow-hidden transform transition-all scale-100">
                    
                    {/* Close Button */}
                    <button
                        onClick={() => setShowLoginPrompt(false)}
                        className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <AiOutlineClose size={24} />
                    </button>

                    {/* Icon */}
                    <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <AiOutlineShoppingCart className="text-3xl" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-3">One step closer!</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                        To add this item to your cart, please log in to your account or sign up for free.
                    </p>

                    {/* Actions */}
                    <div className="space-y-3">
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-600/30 transition-all active:scale-[0.98]"
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="w-full bg-white border-2 border-slate-200 text-slate-700 hover:border-orange-500 hover:text-orange-600 font-bold py-3.5 rounded-xl transition-all active:scale-[0.98]"
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
        )}
        <VirtualTryOn isActive={isTryOnActive} onClose={handleTryOnClose} />
        
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                
                {/* --- LEFT COLUMN: IMAGES --- */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    {/* Main Image Stage */}
                    <div className="relative group overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-gray-200 border border-gray-100 aspect-[4/3]">
                        <img
                            src={main1}
                            alt="Aviator Sunglasses"
                            className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Floating Badge */}
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-orange-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm flex items-center gap-2">
                             <AiFillThunderbolt /> Best Seller
                        </div>
                    </div>

                    {/* Thumbnails Gallery */}
                    <div className="grid grid-cols-4 gap-4">
                        {[side1, side2, side3, man].map((img, idx) => (
                            <div key={idx} className="relative rounded-2xl overflow-hidden cursor-pointer group border-2 border-transparent hover:border-orange-500 transition-all duration-300 h-24 bg-white shadow-sm">
                                <img
                                    src={img}
                                    alt={`View ${idx}`}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- RIGHT COLUMN: DETAILS --- */}
                <div className="lg:col-span-5 flex flex-col h-full lg:sticky lg:top-24">
                    <div className="space-y-8">
                        
                        {/* Header Section */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">Aviator</h1>
                                <button className="p-3 rounded-full bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors shadow-sm">
                                    <AiOutlineHeart className="text-xl" />
                                </button>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-orange-600">Rs. 500</span>
                                <div className="flex items-center gap-1 text-yellow-400 bg-yellow-50 px-2 py-1 rounded-md">
                                    <FaStar /> <span className="text-slate-700 font-semibold text-sm ml-1">4.8 (120 reviews)</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-slate-500 leading-relaxed">
                            Crafted with a modern aviator aesthetic, the Sunisi Astra
                            redefines style through premium polarized lenses and a
                            lightweight alloy frame. Features 100% UV400 protection,
                            scratch-resistant coating, and an ultra-durable build.
                        </p>

                        {/* VIRTUAL TRY-ON CTA CARD */}
                        <div 
                            onClick={handleTryOnClick} 
                            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 p-1 shadow-2xl transition-all hover:shadow-orange-500/20 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="relative flex items-center justify-between bg-slate-900 rounded-xl p-5 h-full">
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-600/20 p-3 rounded-lg text-orange-500">
                                        <FaCamera className="text-2xl animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg">Virtual Try-On</h3>
                                        <p className="text-slate-400 text-sm">See how they look on you instantly</p>
                                    </div>
                                </div>
                                <div className="bg-white/10 p-2 rounded-full text-white transform group-hover:rotate-45 transition-transform duration-300">
                                    <img src={logo} alt="AR" className="w-8 h-8 invert opacity-80" />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between text-sm font-medium text-slate-500 mb-2">
                                <span>Subtotal</span>
                                <span className="text-slate-900 text-lg">Rs. 500</span>
                            </div>
                            
                            <button 
                                onClick={handleAddToCart}
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold py-4 rounded-2xl shadow-lg shadow-orange-600/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                            >
                                <AiOutlineShoppingCart className="text-2xl" /> 
                                <span>Add to Cart</span>
                            </button>
                            
                            <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
                                {/* <FaRegcheckCircle className="text-green-500" /> Free shipping & 30-day returns */}
                            </p>
                        </div>

                        {/* Reviews Preview */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
                            <h3 className="font-bold text-slate-900 mb-4">Latest Review</h3>
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">AA</div>
                                <div>
                                    <h4 className="font-semibold text-sm">Ahmed Ali</h4>
                                    <div className="flex text-yellow-400 text-xs my-1">
                                        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                    </div>
                                    <p className="text-slate-500 text-sm italic">"Thank you the product was received in perfect condition."</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
        
        {/* RECOMMENDATION SECTION */}
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Decorative Bg Blob */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-2">
                <span className="text-orange-600 font-bold uppercase tracking-widest text-sm">You might also like</span>
                <h2 className="text-4xl font-extrabold text-slate-900">Trending Now</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {topItems.map((item, index) => (
                <div
                    key={index}
                    className="group bg-gray-50 rounded-3xl p-6 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:shadow-gray-200 hover:-translate-y-2 border border-transparent hover:border-gray-100"
                >
                    <div className="relative h-48 flex items-center justify-center mb-6">
                        <div className="absolute w-32 h-32 bg-gradient-to-tr from-gray-200 to-white rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-48 h-auto object-contain z-10 drop-shadow-lg transform transition-transform group-hover:scale-110 duration-500"
                        />
                    </div>
                    
                    <div className="space-y-1">
                        <p className="text-sm text-gray-500 font-medium">{item.brand}</p>
                        <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 border-t border-gray-200 pt-4">
                        <div>
                            <span className="text-slate-900 font-bold text-lg">{item.price}</span>
                            <span className="text-gray-400 text-sm line-through ml-2 font-medium">{item.oldPrice}</span>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-600">
                            <AiOutlineShoppingCart />
                        </button>
                    </div>
                </div>
                ))}
            </div>
          </div>
        </section>
        
        <Footer />
    </div>
  );
}