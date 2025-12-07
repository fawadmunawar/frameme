import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../Header/Header";
import { 
  Search, 
  Camera, 
  ShoppingBag, 
  Heart, 
  Star, 
  Filter, 
  X, 
  ChevronDown,
  Phone,
  Truck,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  Monitor,
  EyeOff
} from "lucide-react";

// --- MOCK DATA (Blue Light Theme) ---
const HERO_IMG = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000"; // Person working on computer

const PRODUCTS = [
  { id: 1, name: "Screen Shield Pro", price: 600, src: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=600", tag: "Best Seller", rating: 4.9 },
  { id: 2, name: "Digital Nomad", price: 700, src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600", tag: "Anti-Glare", rating: 4.7 },
  { id: 3, name: "Focus Master", price: 800, src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600", tag: "", rating: 4.5 },
  { id: 4, name: "Tech Lite Round", price: 900, src: "https://images.unsplash.com/photo-1509695507497-903c140c435c?auto=format&fit=crop&q=80&w=600", tag: "Premium", rating: 4.8 },
  { id: 5, name: "Office Mate", price: 500, src: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600", tag: "Sale", rating: 4.3 },
  { id: 6, name: "Gamer Vision X", price: 600, src: "https://images.unsplash.com/photo-1505934547515-fb27b738e4df?auto=format&fit=crop&q=80&w=600", tag: "Blue Block+", rating: 4.7 },
  { id: 7, name: "Creator Studio", price: 1000, src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600", tag: "", rating: 4.6 },
  { id: 8, name: "Developer Square", price: 600, src: "https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&q=80&w=600", tag: "Lightweight", rating: 4.4 },
];

const CATEGORIES = [
  { name: "Sunglasses", path: "/sunglasses", count: 42 },
  { name: "Prescription", path: "/prescription", count: 18 },
  { name: "Sports", path: "/sports", count: 12 },
  { name: "Computer Glasses", path: "/bluelight", count: 8 },
];

const COLORS = [
  { name: "Crystal Clear", class: "bg-gray-100 border-gray-300" },
  { name: "Matte Black", class: "bg-gray-900" },
  { name: "Tortoise", class: "bg-amber-900" },
  { name: "Gunmetal", class: "bg-gray-600" },
  { name: "Rose Gold", class: "bg-rose-300" },
];

// --- INLINE HEADER ---
// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 font-sans">
//       <div className="bg-gray-900 text-white text-[10px] py-2 px-4 flex justify-between items-center">
//         <p className="flex items-center gap-2"><EyeOff size={12} className="text-blue-400"/> Protect Your Eyes from Digital Strain</p>
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

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
};

// --- SUB-COMPONENTS ---

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-6 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center justify-between w-full mb-4 group"
      >
        <span className="font-bold text-gray-900 group-hover:text-orange-500 transition-colors">{title}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-gray-400"
        >
          <ChevronDown size={20}/>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white rounded-3xl p-4 relative cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 border border-transparent hover:border-gray-100"
      onClick={onClick}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.tag && (
          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-white shadow-lg ${
            product.tag === 'Best Seller' ? 'bg-blue-600' : 
            product.tag === 'Blue Block+' ? 'bg-indigo-600' : 
            'bg-gray-900'
          }`}>
            {product.tag}
          </span>
        )}
      </div>

      {/* Wishlist Button (Visible on Hover) */}
      <button className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md text-gray-400 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:text-red-500 hover:scale-110">
        <Heart size={18} />
      </button>

      {/* Image Area */}
      <div className="relative h-64 w-full bg-[#f8f9fa] rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
        {/* Blob Background */}
        <div className="absolute w-32 h-32 bg-blue-100 rounded-full blur-3xl group-hover:bg-blue-200 transition-colors duration-500 opacity-60"></div>
        
        <motion.img
          src={product.src}
          alt={product.name}
          className="w-[80%] object-contain drop-shadow-xl relative z-10 mix-blend-multiply"
          whileHover={{ scale: 1.15, rotate: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        {/* Quick Action Overlay (Slides up) */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
             <button className="w-full bg-white/90 backdrop-blur text-gray-900 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2">
                 <Camera size={16} /> Virtual Try-On
             </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="px-2">
        <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors">{product.name}</h3>
            <div className="flex items-center gap-1 text-yellow-400 text-xs">
                <Star size={12} fill="currentColor" /> <span className="text-gray-400 font-medium">{product.rating}</span>
            </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">Blue Light Filter</p>
        
        <div className="flex items-center justify-between">
            <span className="text-xl font-black text-gray-900">Rs. {product.price}</span>
            <button className="p-3 bg-gray-100 rounded-full text-gray-900 hover:bg-orange-500 hover:text-white transition-all shadow-sm hover:shadow-orange-500/30">
                <ShoppingBag size={18} />
            </button>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const Bluelight = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Computer Glasses");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="bg-white min-h-screen font-sans">
      <Header />

      {/* --- HERO HEADER --- */}
      <section className="relative bg-[#0b0c10] text-white pt-24 pb-32 px-6 overflow-hidden">
        {/* Abstract Backgrounds */}
        <motion.div 
           animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-700/20 to-indigo-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"
        />
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 mb-12 md:mb-0">
                <motion.div initial={{opacity:0, y: 20}} animate={{opacity:1, y:0}} transition={{duration: 0.6}}>
                     <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                        Digital Defense
                     </span>
                     <h1 className="text-5xl md:text-7xl font-black mt-2 mb-6 leading-[1.1]">
                        Work Smart. <br/> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Sleep Better.</span>
                     </h1>
                     <p className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed">
                        Filter out harmful blue light from screens. Reduce eye strain, headaches, and fatigue with our advanced lens technology.
                     </p>
                     <div className="flex gap-4">
                         <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all shadow-lg hover:shadow-blue-500/50">
                             Shop Collection
                         </button>
                         <button className="border border-gray-700 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-2">
                             <Camera size={20} /> Try On
                         </button>
                     </div>
                </motion.div>
            </div>
            
            {/* Hero Image Floating */}
            <motion.div 
               initial={{ x: 100, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }} 
               transition={{ duration: 0.8, delay: 0.2 }}
               className="md:w-1/2 flex justify-center relative"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-transparent z-10"></div>
                <motion.img 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    src={HERO_IMG} 
                    alt="Working on computer" 
                    className="w-full max-w-lg object-cover rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.5)] border border-white/10"
                />
                
                {/* Floating Badge */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-6 left-12 bg-gray-800 p-4 rounded-2xl border border-gray-700 flex items-center gap-3 z-20 shadow-xl"
                >
                    <div className="bg-blue-500/20 p-2 rounded-full text-blue-400"><Monitor size={20}/></div>
                    <div>
                        <p className="text-gray-400 text-xs font-bold uppercase">Protection</p>
                        <p className="text-white font-bold">100% Blue Light Block</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* --- SIDEBAR FILTERS (Desktop Sticky) --- */}
          <aside className="lg:w-1/4 hidden lg:block">
             <div className="bg-white rounded-3xl p-6 shadow-xl sticky top-24 border border-gray-100">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                    <Filter className="text-orange-500" size={24} />
                    <h2 className="font-bold text-xl text-gray-900">Filters</h2>
                </div>

                <FilterSection title="Categories">
                   <ul className="space-y-3">
                       {CATEGORIES.map((cat) => (
                           <li key={cat.name} 
                               onClick={() => { setActiveCategory(cat.name); navigate(cat.path); }}
                               className={`flex justify-between items-center cursor-pointer group ${activeCategory === cat.name ? 'text-orange-500 font-bold' : 'text-gray-600'}`}
                           >
                               <span className="group-hover:translate-x-1 transition-transform">{cat.name}</span>
                               <span className="bg-gray-100 text-xs py-1 px-2 rounded-md text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">{cat.count}</span>
                           </li>
                       ))}
                   </ul>
                </FilterSection>

                <FilterSection title="Colors">
                    <div className="flex flex-wrap gap-3">
                        {COLORS.map((col) => (
                            <button key={col.name} 
                                title={col.name}
                                className={`w-8 h-8 rounded-full ${col.class} border-2 border-transparent hover:scale-110 hover:border-orange-500 transition-all shadow-sm`}
                            />
                        ))}
                    </div>
                </FilterSection>

                <FilterSection title="Price Range">
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm text-gray-600 font-medium">
                            <span>$0</span>
                            <span>$1000+</span>
                        </div>
                        <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                </FilterSection>
             </div>
          </aside>

          {/* --- PRODUCT GRID --- */}
          <main className="lg:w-3/4 w-full">
            
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm mb-4 sm:mb-0">Showing <span className="font-bold text-gray-900">8</span> of <span className="font-bold text-gray-900">42</span> products</p>
                
                <div className="flex gap-4 w-full sm:w-auto">
                    {/* Search Mobile */}
                    <div className="relative flex-1 sm:flex-none">
                         <input type="text" placeholder="Search..." className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"/>
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14}/>
                    </div>
                    {/* Mobile Filter Toggle */}
                    <button 
                        onClick={() => setShowMobileFilters(true)}
                        className="lg:hidden p-3 bg-gray-900 text-white rounded-xl shadow-lg"
                    >
                        <Filter size={18}/>
                    </button>
                </div>
            </div>

            {/* Grid */}
            <motion.div
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
            >
               {PRODUCTS.map((product) => (
                   <ProductCard 
                     key={product.id} 
                     product={product} 
                     onClick={() => navigate("/productpage")}
                   />
               ))}
            </motion.div>

            {/* Load More Button */}
            <div className="mt-16 text-center">
                <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   className="px-10 py-4 bg-white border-2 border-gray-100 text-gray-900 font-bold rounded-full shadow-lg hover:border-orange-500 hover:text-orange-500 transition-colors"
                >
                    Load More Products
                </motion.button>
            </div>
          </main>
        </div>
      </div>

      {/* --- MOBILE FILTER DRAWER --- */}
      <AnimatePresence>
         {showMobileFilters && (
             <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-50 flex justify-end"
                onClick={() => setShowMobileFilters(false)}
             >
                 <motion.div 
                    initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25 }}
                    className="w-[85%] max-w-md h-full bg-white p-6 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                 >
                     <div className="flex justify-between items-center mb-8">
                         <h2 className="text-2xl font-bold">Filters</h2>
                         <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full"><X size={24}/></button>
                     </div>
                     
                     <FilterSection title="Categories">
                        <ul className="space-y-4">
                            {CATEGORIES.map(c => <li key={c.name} className="text-gray-600 font-medium">{c.name}</li>)}
                        </ul>
                     </FilterSection>
                     <FilterSection title="Colors">
                        <div className="flex flex-wrap gap-4">
                            {COLORS.map((col) => <div key={col.name} className={`w-10 h-10 rounded-full ${col.class} border shadow-sm`}></div>)}
                        </div>
                     </FilterSection>
                     
                     <div className="mt-8 pt-6 border-t border-gray-100">
                         <button onClick={() => setShowMobileFilters(false)} className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg shadow-xl">Apply Filters</button>
                     </div>
                 </motion.div>
             </motion.div>
         )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Bluelight;