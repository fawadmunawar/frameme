import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaPhoneAlt,
  FaTruck,
  FaBars,
  FaTimes,
  FaArrowRight
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    "Free Shipping on Orders Over $100",
    "New Collection 2025 Out Now!",
    "Get 20% Off Your First Order - Code: WELCOME"
  ];

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cycle Announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  // Nav Items Data
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/sunglasses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* --- TOP ANNOUNCEMENT BAR --- */}
      <div className="bg-[#0b0c10] text-white text-xs py-2.5 px-6 overflow-hidden relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Left Side: Animated Text */}
            <div className="flex-1 flex justify-center md:justify-start overflow-hidden h-5 relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={announcementIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute font-medium tracking-wide"
                >
                  {announcements[announcementIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Right Side: Utility Links (Desktop Only) */}
            <div className="hidden md:flex gap-6 text-gray-400">
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors text-[11px] uppercase font-bold tracking-wider">
                    <FaPhoneAlt size={10} /> +1 (800) 123-4567
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-white transition-colors text-[11px] uppercase font-bold tracking-wider">
                    <FaTruck size={10} /> Track Order
                </a>
            </div>
        </div>
      </div>

      {/* --- MAIN HEADER --- */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-md shadow-lg py-3 border-gray-200" 
            : "bg-white py-5 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center gap-4">
          
          {/* 1. Logo */}
          <div 
            className="cursor-pointer group" 
            onClick={() => navigate("/")}
          >
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter flex items-center gap-1">
              Frame<span className="text-orange-500 group-hover:rotate-12 transition-transform inline-block">Me</span>.
            </h1>
          </div>

          {/* 2. Desktop Navigation */}
          <nav className="hidden md:flex gap-10 text-sm font-bold text-gray-600 uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.name}
                onClick={() => navigate(link.path)}
                className="relative cursor-pointer hover:text-orange-500 transition-colors py-2 group"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* 3. Icons & Search */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Expandable Search */}
            <div className={`hidden sm:flex items-center transition-all duration-300 bg-gray-100 rounded-full ${isSearchOpen ? 'w-64 px-4' : 'w-10 px-0 bg-transparent justify-end'}`}>
               {isSearchOpen && (
                   <input 
                    autoFocus
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent border-none outline-none text-sm w-full text-gray-800 placeholder-gray-400 mr-2"
                    onBlur={() => !isSearchOpen && setIsSearchOpen(false)} 
                   />
               )}
               <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${isSearchOpen ? 'text-orange-500' : 'text-gray-600'}`}
               >
                   <FaSearch />
               </button>
            </div>


            {/* Action Icons */}
            <div className="flex items-center gap-3 lg:gap-5 text-gray-800">
              
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group">
                <FaHeart className="text-lg group-hover:text-red-500 transition-colors" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                onClick={() => navigate("/cart")}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative group"
              >
                <FaShoppingCart className="text-lg group-hover:text-orange-500 transition-colors" />
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse border border-white">
                  2
                </span>
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/signup")}
                className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors hover:text-blue-600"
              >
                <FaUser className="text-lg" />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-xl text-gray-800" 
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header inside Menu */}
              <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <span className="text-xl font-bold">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    onClick={() => {
                      navigate(link.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between text-lg font-semibold text-gray-700 py-3 border-b border-gray-50 hover:text-orange-500 hover:pl-2 transition-all group"
                  >
                    {link.name}
                    <FaArrowRight className="text-sm opacity-0 group-hover:opacity-100 transition-opacity text-orange-400"/>
                  </motion.a>
                ))}
              </nav>

              {/* Footer inside Menu */}
              <div className="p-6 bg-gray-50">
                 <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold shadow-lg mb-4 hover:bg-orange-500 transition-colors">
                    Log In / Sign Up
                 </button>
                 <div className="flex justify-center gap-4 text-gray-400">
                    <span className="text-xs">Privacy Policy</span>
                    <span className="text-xs">Terms & Conditions</span>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;