import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane, FaArrowUp } from "react-icons/fa";

// Keep your specific image import
import foooter from "../../assets/Home Images/foooter.png"; 

const Footer = () => {
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // --- VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const linkHover = {
    rest: { x: 0, color: "#9ca3af" }, // gray-400
    hover: { x: 5, color: "#f97316" }, // orange-500
  };

  return (
    <footer className="relative bg-[#0b0c10] text-gray-300 pt-24 overflow-hidden font-sans">
      
      {/* --- BACKGROUND DECORATION --- */}
      {/* Large subtle gradient blob moving in background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1], 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
         animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1], 
          }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- NEWSLETTER FLOATING CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative -mt-32 mb-20 rounded-[2.5rem] p-10 md:p-16 overflow-hidden shadow-2xl"
        >
          {/* Animated Gradient Background for Newsletter */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black z-0"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[80px] opacity-20 z-0"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left max-w-lg">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Join Our Exclusive Club
              </motion.h2>
              <p className="text-gray-400 text-lg">
                Get the latest trends, virtual try-on updates, and secret sales delivered to your inbox.
              </p>
            </div>

            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex w-full max-w-md bg-white/5 backdrop-blur-md p-2 rounded-full border border-white/10 focus-within:border-orange-500/50 transition-colors"
            >
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 bg-transparent px-6 py-3 text-white placeholder-gray-500 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2"
              >
                <span>Join</span>
                <FaPaperPlane className="text-xs" />
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        {/* --- MAIN GRID --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10"
        >
          
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="col-span-1 flex flex-col items-start">
            {/* White Logo Filter for Dark Mode */}
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={foooter}
              alt="FrameMe Logo"
              className="h-24 w-auto object-contain mb-6 -ml-3 brightness-0 invert opacity-90" 
            />
            <p className="text-gray-400 text-sm leading-7 mb-6">
              Revolutionizing eyewear with AI-powered virtual try-on technology. Quality frames, perfect fit, delivered to you.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                <motion.a 
                  key={idx}
                  href="#"
                  whileHover={{ y: -5, backgroundColor: "#f97316", color: "#fff", borderColor: "#f97316" }}
                  className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 transition-all"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Column 1 */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-white text-lg mb-6 tracking-wide">Shop Collection</h3>
            <ul className="space-y-4">
              {['Sunglasses', 'Prescription', 'Blue Light', 'Sports', 'New Arrivals'].map((item) => (
                <motion.li key={item} initial="rest" whileHover="hover" animate="rest">
                  <motion.a href="#" variants={linkHover} className="inline-block transition-colors">
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Links Column 2 */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-white text-lg mb-6 tracking-wide">Customer Care</h3>
            <ul className="space-y-4">
              {['Track Order', 'Shipping Info', 'Returns & Exchange', 'Size Guide', 'Help Center'].map((item) => (
                <motion.li key={item} initial="rest" whileHover="hover" animate="rest">
                  <motion.a href="#" variants={linkHover} className="inline-block transition-colors">
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-white text-lg mb-6 tracking-wide">Contact Us</h3>
            <div className="space-y-4 text-gray-400">
                <motion.div whileHover={{ x: 5 }} className="group cursor-pointer">
                    <p className="text-xs font-bold text-gray-500 uppercase">Head Office</p>
                    <p className="text-white group-hover:text-orange-500 transition-colors">Islamabad, Pakistan</p>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="group cursor-pointer">
                    <p className="text-xs font-bold text-gray-500 uppercase">Phone</p>
                    <p className="text-white group-hover:text-orange-500 transition-colors">+92 300 123 4567</p>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="group cursor-pointer">
                    <p className="text-xs font-bold text-gray-500 uppercase">Email</p>
                    <p className="text-white group-hover:text-orange-500 transition-colors">hello@frameme.com</p>
                </motion.div>
            </div>
          </motion.div>

        </motion.div>

        {/* --- COPYRIGHT --- */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 FrameMe. Crafted with <span className="text-red-500 animate-pulse">❤</span> in Pakistan.</p>
          
          <div className="flex items-center gap-8 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
             
             {/* Back to Top Button */}
             <motion.button 
                onClick={scrollToTop}
                whileHover={{ y: -5 }}
                className="bg-gray-800 text-white p-3 rounded-lg hover:bg-orange-500 transition-colors shadow-lg"
             >
                 <FaArrowUp />
             </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;