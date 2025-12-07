import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Star, 
  ShoppingCart, 
  Eye, 
  Check, 
  ArrowRight,
  Phone,
  Truck,
  ShoppingBag,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";

// --- MOCK DATA ---
const PRODUCTS = [
  { id: 1, name: "Rectangle Classic", price: 600, shape: "Rectangle", image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=600", rating: 4.8 },
  { id: 2, name: "Modern Square", price: 700, shape: "Square", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600", rating: 4.9 },
  { id: 3, name: "Professor Round", price: 800, shape: "Round", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600", rating: 4.7 },
  { id: 4, name: "Cat Eye Vogue", price: 900, shape: "Cat Eye", image: "https://images.unsplash.com/photo-1509695507497-903c140c435c?auto=format&fit=crop&q=80&w=600", rating: 5.0 },
  { id: 5, name: "Oval Minimalist", price: 500, shape: "Oval", image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600", rating: 4.6 },
  { id: 6, name: "Geometric Bold", price: 600, shape: "Geometric", image: "https://images.unsplash.com/photo-1505934547515-fb27b738e4df?auto=format&fit=crop&q=80&w=600", rating: 4.8 },
  { id: 7, name: "Titanium Rimless", price: 1000, shape: "Rimless", image: "https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&q=80&w=600", rating: 4.9 },
  { id: 8, name: "Half-Rim Club", price: 600, shape: "Half Rim", image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600", rating: 4.5 },
];

const SHAPES = ["Rectangle", "Square", "Round", "Cat Eye", "Oval", "Geometric"];

// --- INLINE HEADER ---
// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 font-sans">
//       <div className="bg-gray-900 text-white text-[10px] py-2 px-4 flex justify-between items-center">
//         <p>Free Anti-Reflective Coating on All Lenses</p>
//         <div className="hidden md:flex gap-4">
//             <span className="flex items-center gap-1"><Phone size={10}/> Support</span>
//             <span className="flex items-center gap-1"><Truck size={10}/> Track Order</span>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         <h1 
//           className="text-2xl font-black tracking-tighter cursor-pointer group" 
//           onClick={() => navigate('/')}
//         >
//           Frame<span className="text-orange-500 group-hover:text-orange-600 transition-colors">Me</span>.
//         </h1>
//         <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-600 uppercase tracking-wider">
//           {["Home", "Shop", "About", "Contact"].map((link) => (
//             <button 
//               key={link} 
//               onClick={() => navigate(link === "Home" ? "/" : `/${link.toLowerCase()}`)} 
//               className="hover:text-orange-500 transition-colors cursor-pointer relative group"
//             >
//               {link}
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
//             </button>
//           ))}
//         </nav>
//         <div className="flex items-center gap-4">
//           <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-orange-500 transition-colors" />
//           <button className="relative cursor-pointer group" onClick={() => navigate('/cart')}>
//             <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
//             <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-3 h-3 flex items-center justify-center rounded-full shadow-sm">2</span>
//           </button>
//           <Menu className="md:hidden w-6 h-6 text-gray-900 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
//         </div>
//       </div>
//        {/* Mobile Menu Stub */}
//        <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div initial={{height:0}} animate={{height:"auto"}} exit={{height:0}} className="md:hidden bg-white border-t overflow-hidden shadow-xl">
//              <nav className="flex flex-col p-6 gap-4">
//                 {["Home", "Shop", "About", "Contact"].map((link) => (
//                     <button key={link} className="text-lg font-bold text-gray-800 text-left" onClick={() => navigate(link === "Home" ? "/" : `/${link.toLowerCase()}`)}>{link}</button>
//                 ))}
//              </nav>
//           </motion.div>
//         )}
//        </AnimatePresence>
//     </header>
//   );
// };

// --- INLINE FOOTER ---
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12 mt-auto font-sans relative">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-white text-xl font-bold mb-4">FrameMe.</h3>
        <p className="text-sm leading-relaxed text-gray-400">Premium eyewear designed for style, comfort, and the digital age.</p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Shop</h4>
        <ul className="space-y-2 text-sm text-gray-400">
           <li>Sunglasses</li>
           <li>Eyeglasses</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Support</h4>
         <ul className="space-y-2 text-sm text-gray-400">
           <li>FAQ</li>
           <li>Shipping</li>
        </ul>
      </div>
      <div>
         <h4 className="text-white font-bold mb-4">Follow Us</h4>
         <div className="flex gap-4">
            <Facebook size={20} className="hover:text-orange-500 cursor-pointer"/>
            <Twitter size={20} className="hover:text-orange-500 cursor-pointer"/>
            <Instagram size={20} className="hover:text-orange-500 cursor-pointer"/>
         </div>
      </div>
    </div>
  </footer>
);

// --- MAIN CONTENT ---
const Prescription = () => {
  const navigate = useNavigate();
  const [activeShape, setActiveShape] = useState(null);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />

      {/* --- HERO BANNER --- */}
      <section className="relative bg-white py-16 md:py-24 px-6 overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[80px] opacity-60 translate-x-1/3 -translate-y-1/3"></div>
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <motion.div 
               initial={{opacity: 0, x: -30}} 
               animate={{opacity: 1, x: 0}}
               className="md:w-1/2"
            >
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                    Vision Correction
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
                    See Clearly. <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Look Sharp.</span>
                </h1>
                <p className="text-gray-500 text-lg mb-8 max-w-md">
                    Premium prescription lenses paired with designer frames. Anti-glare, scratch-resistant, and 100% UV protection included.
                </p>
            </motion.div>
            
            <motion.div 
               initial={{opacity: 0, scale: 0.9}} 
               animate={{opacity: 1, scale: 1}}
               transition={{ delay: 0.2 }}
               className="md:w-1/2 relative"
            >
                <img 
                    src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800" 
                    alt="Prescription Glasses" 
                    className="w-full rounded-[2.5rem] shadow-2xl z-10 relative"
                />
                {/* Floating Elements */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <Check size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Lenses</p>
                        <p className="font-bold text-gray-900">Blue-Light Block</p>
                    </div>
                </div>
            </motion.div>
         </div>
      </section>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* --- SIDEBAR FILTERS --- */}
        <aside className="lg:w-1/4 space-y-8">
            {/* Search */}
            <div className="relative group">
                <input 
                    type="text" 
                    placeholder="Search frames..." 
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={18} />
            </div>

            {/* Categories Navigation */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Filter size={18} className="text-orange-500" /> Categories
                </h3>
                <div className="space-y-1">
                    {[
                        { name: "Sunglasses", path: "/sunglasses" },
                        { name: "Prescription", path: "/prescription", active: true },
                        { name: "Sports", path: "/sports" },
                        { name: "Eye Wear", path: "/bluelight" }
                    ].map((cat, idx) => (
                        <div 
                           key={idx}
                           onClick={() => navigate(cat.path)}
                           className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${cat.active ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-600 hover:bg-gray-50 hover:pl-4'}`}
                        >
                            <span>{cat.name}</span>
                            <ChevronRight size={16} className={`opacity-50 ${cat.active ? 'opacity-100' : ''}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Shape Filter */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Frame Shape</h3>
                <div className="flex flex-wrap gap-2">
                    {SHAPES.map((shape) => (
                        <button
                            key={shape}
                            onClick={() => setActiveShape(activeShape === shape ? null : shape)}
                            className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${activeShape === shape ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                        >
                            {shape}
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Mini */}
            <div className="hidden lg:block bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl text-white shadow-lg">
                <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                <p className="text-sm text-gray-300 mb-4">Our opticians are ready to assist you with your prescription.</p>
                <button className="w-full py-2 bg-orange-500 rounded-lg font-bold text-sm hover:bg-orange-600 transition-colors">Chat Now</button>
            </div>
        </aside>

        {/* --- PRODUCT GRID --- */}
        <main className="flex-1">
            <motion.div 
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
               {PRODUCTS.map((product) => (
                   <motion.div
                      key={product.id}
                      variants={itemVariants}
                      whileHover={{ y: -5 }}
                      onClick={() => navigate("/productpage")}
                      className="group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
                   >
                       <div className="relative h-48 bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                            {/* Product Image */}
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-[80%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                            />
                            
                            {/* Hover Badge */}
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                {product.shape}
                            </div>

                            {/* Hover Action */}
                            <button className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all flex items-center gap-2">
                                <Eye size={12} /> Try On
                            </button>
                       </div>

                       <div>
                           <div className="flex justify-between items-start mb-1">
                               <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                               <div className="flex items-center text-yellow-400 text-xs gap-0.5">
                                   <Star size={12} fill="currentColor" /> {product.rating}
                               </div>
                           </div>
                           <p className="text-xs text-gray-500 mb-3">FrameMe Premium</p>
                           <div className="flex items-center justify-between">
                               <span className="font-black text-lg text-gray-900">Rs. {product.price}</span>
                               <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-orange-500 hover:text-white transition-colors">
                                   <ShoppingCart size={14} />
                               </button>
                           </div>
                       </div>
                   </motion.div>
               ))}
            </motion.div>

            {/* Pagination / Load More */}
            <div className="mt-12 flex justify-center">
                <button className="px-8 py-3 bg-white border border-gray-200 text-gray-900 font-bold rounded-full shadow-sm hover:border-orange-500 hover:text-orange-500 transition-all">
                    Load More Frames
                </button>
            </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Prescription;