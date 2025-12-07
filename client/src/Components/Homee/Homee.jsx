import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaShoppingBag, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Keep your existing component imports
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Images (Assumed paths are correct based on your snippet)
import image1 from "../../assets/Home Images/images 1.png";
import image2 from "../../assets/Home Images/two.png";
import image3 from "../../assets/Home Images/three.png";
import image4 from "../../assets/Home Images/four.png";
import image5 from "../../assets/Home Images/five.png";
import image6 from "../../assets/Home Images/six.png";
import image7 from "../../assets/Home Images/seven.png";
import card from "../../assets/Home Images/card.png";
import mainpic from "../../../public/homePicture.png";

// --- DATA ---
const topItems = [
  { name: "Oakley Sutro", brand: "Apple Cherry", price: "$99", oldPrice: "$120", image: image5 },
  { name: "Aviator", brand: "Ray-Ban", price: "$99", oldPrice: "$130", image: image6 },
  { name: "Round", brand: "Vogue", price: "$99", oldPrice: "$120", image: image7 },
  { name: "Wayfarer", brand: "Ray-Ban", price: "$89", oldPrice: "$110", image: image5 },
  // Add a few more for better marquee flow
  { name: "Clubmaster", brand: "Ray-Ban", price: "$109", oldPrice: "$140", image: image6 },
];

const categories = [
  { name: "Sunglasses", image: image1, path: "/sunglasses", color: "bg-orange-50" },
  { name: "Prescription", image: image2, path: "/prescription", color: "bg-blue-50" },
  { name: "Sports", image: image3, path: "/sports", color: "bg-green-50" },
  { name: "Computer Glasses", image: image4, path: "/bluelight", color: "bg-purple-50" },
];

// Faking multiple testimonials for the slider functionality
const testimonialsData = [
    { id: 1, name: "Sara Khan", role: "Verified Buyer", text: "Absolutely Incredible! The insights the company gave from the start really helped me find the perfect frame. The virtual try-on is a game changer!", img: card },
    { id: 2, name: "Mike Ross", role: "Tech Enthusiast", text: "The quality of the blue light glasses is unmatched. I work 10 hours a day and my headaches are gone. Fast shipping too!", img: image6 },
    { id: 3, name: "Jessica Pearson", role: "Fashion Stylist", text: "I source frames for clients here all the time. The collection is always trendy and the premium feel is exactly what my clients look for.", img: image7 },
];

// --- ANIMATION VARIANTS & UTILITIES ---

// 1. 3D Tilt Card Component Helper
const TiltCard = ({ children, onClick, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
  
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
  
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    };
  
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };
  
    return (
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative transition-all duration-200 ease-out ${className}`}
      >
        <div style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </motion.div>
    );
  };


const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }, // Custom easing for smoother feel
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

// For the pulsing background blobs
const pulseVariant = {
    hidden: { scale: 0.8, opacity: 0.3 },
    visible: { 
        scale: [0.8, 1.1, 0.8], 
        opacity: [0.3, 0.5, 0.3],
        transition: { repeat: Infinity, duration: 8, ease: "easeInOut" }
    }
};


const Homee = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // Parallax effect for Hero text

  // Testimonial State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };
  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  // Testimonial Variants
  const sliderVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "circOut" }
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.4, ease: "circIn" }
    })
  };


  return (
    <div ref={containerRef} className="font-sans bg-[#f8f9fa] text-gray-800 overflow-x-hidden perspective-[2000px]">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center bg-white px-6 lg:px-20 overflow-hidden">
        {/* Animated Background Blobs */}
        <motion.div variants={pulseVariant} initial="hidden" animate="visible" className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-3xl -z-10"></motion.div>
        <motion.div variants={pulseVariant} initial="hidden" animate="visible" transition={{delay: 1}} className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-100/40 rounded-full blur-3xl -z-10"></motion.div>
        
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          {/* Text Content with Parallax */}
          <motion.div 
            style={{ y: yParallax }} // Apply parallax
            className="flex flex-col text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.span variants={fadeInUp} className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 font-bold tracking-wider uppercase text-sm mb-4">
                    New Collection 2025
                </motion.span>
                <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                Try First, <br />
                {/* Animated Gradient Text */}
                <span className="animate-text bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 bg-clip-text text-transparent bg-[length:300%_auto] font-black">
                    Buy Confidently
                </span>
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-gray-500 text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Experience virtual try-on technology. See exactly how they look on your face before you spend a dime.
                </motion.p>
                <motion.div variants={fadeInUp}>
                    <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px -10px rgba(249, 115, 22, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl transition-all flex items-center gap-3 mx-auto lg:mx-0 group"
                    >
                    Find Out More
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform"/>
                    </motion.button>
                </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Image with enhanced floating and entrance */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
            className="order-1 lg:order-2 flex justify-center perspective-[1000px]"
          >
            <motion.img 
              animate={{ y: [-15, 15, -15], rotateZ: [-1, 1, -1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] max-h-[600px] object-cover z-10 border-8 border-white/50 backdrop-blur-md" 
              src={mainpic} 
              alt="Hero Model" 
            />
          </motion.div>
        </div>
      </section>

      {/* --- CATEGORIES (3D TILT CARDS) --- */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-6">Our Premium Collection</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
          >
            {categories.map((cat, index) => (
              <TiltCard
                key={index}
                onClick={() => navigate(cat.path)}
                className={`bg-white rounded-[3rem] p-10 cursor-pointer group overflow-hidden shadow-2xl border-b-4 ${index % 2 === 0 ? 'border-orange-400' : 'border-blue-400'}`}
              >
                 {/* Decorative expanding circle on hover */}
                <div className={`absolute -top-20 -right-20 w-64 h-64 ${cat.color} rounded-full opacity-70 group-hover:scale-[3] transition-transform duration-700 ease-in-out -z-10`}></div>
                
                <motion.div variants={fadeInUp} className="flex flex-col items-center relative z-10">
                  <motion.img
                    src={cat.image}
                    alt={cat.name}
                    whileHover={{ scale: 1.1, rotateZ: -5, filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.2))" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-64 h-64 object-contain mb-8"
                  />
                  <h3 className="text-4xl font-black text-gray-900 mb-2">{cat.name}</h3>
                  <p className="text-gray-500 font-medium mb-8">Explore the range</p>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gray-900 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg text-2xl group-hover:bg-orange-500 transition-colors"
                  >
                    <FaArrowRight className="group-hover:rotate-[-45deg] transition-transform duration-300"/>
                  </motion.button>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- TOP ITEMS (INFINITE MARQUEE) --- */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="flex justify-between items-end"
          >
            <div>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">Trending Now</h2>
                <p className="text-gray-500 mt-2 text-lg">Hot picks loved by our community.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 font-bold text-orange-600 hover:text-orange-700 transition">View All <FaArrowRight/></button>
          </motion.div>
        </div>

         {/* Infinite Marquee Container */}
        <div className="relative w-full overflow-hidden">
             {/* Gradient masks for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex">
                {/* We duplicate the list twice to create the seamless loop effect */}
                {[...topItems, ...topItems].map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ x: "0%" }}
                    animate={{ x: "-100%" }}
                    // Adjust duration to control speed. Linear ease is crucial for marquee.
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="min-w-[300px] md:min-w-[350px] flex-shrink-0 px-6"
                >
                    <div className="group bg-[#f8f9fa] rounded-3xl p-8 relative hover:bg-white hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer">
                        {/* Floating Icons on Hover */}
                        <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 z-20">
                            <button className="bg-white p-3 rounded-full shadow hover:text-red-500 hover:scale-110 transition"><FaRegHeart/></button>
                            <button className="bg-white p-3 rounded-full shadow hover:text-orange-500 hover:scale-110 transition"><FaShoppingBag/></button>
                        </div>

                        <div className="relative w-full h-56 flex items-center justify-center mb-6">
                        <motion.img 
                            src={item.image} 
                            alt={item.name} 
                            whileHover={{ scale: 1.15, translateY: -20 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="max-h-full object-contain drop-shadow-xl" 
                        />
                        </div>
                        <h3 className="font-bold text-2xl text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-4 font-medium uppercase tracking-wider">{item.brand}</p>
                        <div className="flex items-center gap-3">
                        <span className="text-gray-900 font-black text-xl">{item.price}</span>
                        <span className="text-gray-400 line-through text-lg font-medium">{item.oldPrice}</span>
                        </div>
                        
                        {/* Quick View Button Slide up */}
                        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out overflow-hidden rounded-b-3xl">
                            <button className="w-full bg-gray-900 text-white py-3 rounded-2xl font-bold hover:bg-orange-600 transition-colors">Quick View</button>
                        </div>
                    </div>
                </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* --- INTERACTIVE TESTIMONIAL SLIDER --- */}
      <section className="py-32 px-4 relative overflow-hidden">
         {/* Background decoration */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-orange-50/50 -skew-y-6 -z-10"></div>

        <div className="max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" variants={fadeInUp} className="text-center mb-16">
                <h2 className="text-4xl font-bold">What Our Customers Say</h2>
            </motion.div>

            <div className="relative">
                {/* Nav Buttons */}
                <button onClick={prevTestimonial} className="absolute left-4 lg:-left-12 top-1/2 -translate-y-1/2 bg-white hover:bg-orange-500 hover:text-white text-gray-800 p-5 rounded-full shadow-xl z-30 transition-all hover:scale-110">
                    <FaChevronLeft size={20} />
                </button>
                <button onClick={nextTestimonial} className="absolute right-4 lg:-right-12 top-1/2 -translate-y-1/2 bg-white hover:bg-orange-500 hover:text-white text-gray-800 p-5 rounded-full shadow-xl z-30 transition-all hover:scale-110">
                    <FaChevronRight size={20}/>
                </button>

                <div className="overflow-hidden px-4 py-10">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentTestimonial}
                            custom={direction}
                            variants={sliderVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="bg-white rounded-[4rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-12 md:p-20 flex flex-col md:flex-row items-center relative mx-auto max-w-4xl"
                        >
                        {/* Big Quote */}
                        <span className="absolute top-10 left-10 text-[12rem] leading-none text-orange-100 font-serif -z-0 select-none">“</span>

                        <div className="w-full md:w-2/5 flex justify-center mb-10 md:mb-0 z-10">
                            <div className="relative">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-[-20px] border-2 border-dashed border-orange-300 rounded-full"></motion.div>
                            <img src={testimonialsData[currentTestimonial].img} alt="User" className="w-48 h-48 object-cover rounded-full border-8 border-white shadow-2xl relative z-10" />
                            </div>
                        </div>

                        <div className="md:w-3/5 text-center md:text-left z-10 md:pl-12">
                            <div className="flex items-center justify-center md:justify-start gap-1 mb-6">
                                {[1,2,3,4,5].map(s => <motion.span key={s} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: s*0.1}} className="text-yellow-400 text-2xl">★</motion.span>)}
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8 leading-snug">"{testimonialsData[currentTestimonial].text}"</h3>
                            <div>
                            <h4 className="font-black text-2xl text-gray-900">{testimonialsData[currentTestimonial].name}</h4>
                            <p className="text-base text-orange-500 font-bold uppercase tracking-wider mt-2">{testimonialsData[currentTestimonial].role}</p>
                            </div>
                        </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                 {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-8">
                    {testimonialsData.map((_, i) => (
                        <button key={i} onClick={() => { setDirection(i > currentTestimonial ? 1 : -1); setCurrentTestimonial(i); }} 
                        className={`h-3 rounded-full transition-all duration-500 ${i === currentTestimonial ? "bg-orange-500 w-10" : "bg-gray-300 w-3 hover:bg-orange-300"}`} />
                    ))}
                </div>
            </div>
        </div>
      </section>
    
    {/* Add this style tag for the animated text gradient */}
    <style jsx>{`
        .animate-text {
            background-size: 300% auto;
            animation: textGradient 5s ease infinite alternate;
        }
        @keyframes textGradient {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
        }
    `}</style>
      <Footer />
    </div>
  );
};

export default Homee;