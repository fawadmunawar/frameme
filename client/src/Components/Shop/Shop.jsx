import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  Eye,
  CheckCircle,
  SlidersHorizontal
} from "lucide-react";

// --- MASTER DATA (Aggregated from all categories) ---
const ALL_PRODUCTS = [
  // Sunglasses
  { id: 1, name: "Aviator Classic", category: "Sunglasses", price: 500, src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600", tag: "Best Seller", rating: 4.8 },
  { id: 2, name: "Wayfarer Elite", category: "Sunglasses", price: 700, src: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=600", tag: "New", rating: 5.0 },
  // Prescription
  { id: 3, name: "Rectangle Classic", category: "Prescription", price: 600, src: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600", tag: "", rating: 4.8 },
  { id: 4, name: "Modern Square", category: "Prescription", price: 700, src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600", tag: "Premium", rating: 4.9 },
  // Sports
  { id: 5, name: "Velocity Wrap", category: "Sports", price: 600, src: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600", tag: "Performance", rating: 4.8 },
  { id: 6, name: "Oakley Sutro", category: "Sports", price: 700, src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600", tag: "Pro Choice", rating: 5.0 },
  // Blue Light
  { id: 7, name: "Screen Shield", category: "Blue Light", price: 600, src: "https://images.unsplash.com/photo-1509695507497-903c140c435c?auto=format&fit=crop&q=80&w=600", tag: "Office", rating: 4.9 },
  { id: 8, name: "Digital Nomad", category: "Blue Light", price: 700, src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600", tag: "Anti-Glare", rating: 4.7 },
];

const CATEGORIES = ["All", "Sunglasses", "Prescription", "Sports", "Blue Light"];
const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"];

// --- INLINE COMPONENTS ---

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 font-sans">
      <div className="bg-gray-900 text-white text-[10px] py-2 px-4 flex justify-between items-center">
        <p>Global Shipping | 30-Day Returns | 2-Year Warranty</p>
        <div className="hidden md:flex gap-4">
            <span className="flex items-center gap-1"><Phone size={10}/> Support</span>
            <span className="flex items-center gap-1"><Truck size={10}/> Track Order</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 
          className="text-2xl font-black tracking-tighter cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          Frame<span className="text-orange-500 group-hover:text-orange-600 transition-colors">Me</span>.
        </h1>
        <nav className="hidden md:flex gap-8 text-sm font-bold text-gray-600 uppercase tracking-wider">
          {["Home", "Shop", "About", "Contact"].map((link) => (
            <button 
              key={link} 
              onClick={() => navigate(link === "Home" ? "/" : `/${link.toLowerCase()}`)} 
              className="hover:text-orange-500 transition-colors cursor-pointer relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-orange-500 transition-colors" />
          <button className="relative cursor-pointer group" onClick={() => navigate('/cart')}>
            <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-3 h-3 flex items-center justify-center rounded-full shadow-sm">2</span>
          </button>
          <Menu className="md:hidden w-6 h-6 text-gray-900 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </div>
       <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{height:0}} animate={{height:"auto"}} exit={{height:0}} className="md:hidden bg-white border-t overflow-hidden shadow-xl">
             <nav className="flex flex-col p-6 gap-4">
                {["Home", "Shop", "About", "Contact"].map((link) => (
                    <button key={link} className="text-lg font-bold text-gray-800 text-left" onClick={() => navigate(link === "Home" ? "/" : `/${link.toLowerCase()}`)}>{link}</button>
                ))}
             </nav>
          </motion.div>
        )}
       </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-12 mt-auto font-sans">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-white text-xl font-bold mb-4">FrameMe.</h3>
        <p className="text-sm leading-relaxed text-gray-400">Visionary eyewear for the modern world.</p>
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
         <h4 className="text-white font-bold mb-4">Social</h4>
         <div className="flex gap-4">
            <Facebook size={20} className="hover:text-orange-500 cursor-pointer"/>
            <Twitter size={20} className="hover:text-orange-500 cursor-pointer"/>
            <Instagram size={20} className="hover:text-orange-500 cursor-pointer"/>
         </div>
      </div>
    </div>
  </footer>
);

// --- QUICK VIEW MODAL ---
const QuickViewModal = ({ product, isOpen, onClose }) => {
    if (!isOpen || !product) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.9, y: 20 }} 
                    className="relative bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 z-10 transition-colors">
                        <X size={20} />
                    </button>

                    {/* Image Side */}
                    <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 relative">
                        <img src={product.src} alt={product.name} className="w-full h-auto object-contain mix-blend-multiply max-h-[300px]" />
                        <div className="absolute bottom-6 left-6 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm border border-gray-100">
                            {product.category}
                        </div>
                    </div>

                    {/* Details Side */}
                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                        <div className="mb-4">
                            <h2 className="text-3xl font-black text-gray-900 mb-2">{product.name}</h2>
                            <div className="flex items-center gap-2 text-yellow-400 text-sm">
                                <Star fill="currentColor" size={16} /> <span>{product.rating} (42 Reviews)</span>
                            </div>
                        </div>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Engineered for comfort and style. Featuring our signature lightweight frames and premium lenses.
                        </p>

                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-gray-400 text-xs font-bold uppercase">Price</p>
                                <p className="text-3xl font-black text-gray-900">Rs. {product.price}</p>
                            </div>
                            <div className="flex gap-2">
                                {['black', 'brown', 'gold'].map(c => (
                                    <div key={c} className="w-8 h-8 rounded-full border-2 border-gray-100 cursor-pointer hover:border-orange-500 transition-colors" style={{backgroundColor: c}}></div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                                <ShoppingBag size={18}/> Add to Bag
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

// --- MAIN SHOP COMPONENT ---
const Shop = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // For Modal
  const [sortBy, setSortBy] = useState("Featured");

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    let result = ALL_PRODUCTS;

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
        result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Sort Logic
    if (sortBy === "Price: Low to High") {
        result = [...result].sort((a,b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
        result = [...result].sort((a,b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-white min-h-screen font-sans">
      <Header />
      
      {/* Quick View Modal */}
      {selectedProduct && (
          <QuickViewModal 
            product={selectedProduct} 
            isOpen={!!selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
      )}

      {/* --- HERO SECTION --- */}
      <section className="relative h-[400px] flex items-center bg-[#0b0c10] text-white overflow-hidden">
         <div className="absolute inset-0">
             <img 
               src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600" 
               className="w-full h-full object-cover opacity-40"
               alt="Shop Banner"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
         </div>
         <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
             <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
             >
                 <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2 block">The Master Collection</span>
                 <h1 className="text-5xl md:text-7xl font-black mb-6">Shop All <br/> Eyewear.</h1>
                 <p className="text-gray-300 max-w-lg text-lg">
                     From performance sports gear to chic blue-light blockers. 
                     Find the perfect frame for every aspect of your life.
                 </p>
             </motion.div>
         </div>
      </section>

      {/* --- MAIN LAYOUT --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
          
          {/* --- SIDEBAR --- */}
          <aside className="lg:w-1/4 space-y-8 sticky top-24 h-fit">
              {/* Search */}
              <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search catalog..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>

              {/* Category Filter */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Filter size={18} className="text-orange-500"/> Categories
                  </h3>
                  <div className="space-y-1">
                      {CATEGORIES.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex justify-between items-center ${selectedCategory === cat ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'}`}
                          >
                              {cat}
                              {selectedCategory === cat && <CheckCircle size={14}/>}
                          </button>
                      ))}
                  </div>
              </div>

              {/* Sort Filter */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <SlidersHorizontal size={18} className="text-orange-500"/> Sort By
                  </h3>
                  <div className="space-y-1">
                      {SORT_OPTIONS.map(opt => (
                          <button
                            key={opt}
                            onClick={() => setSortBy(opt)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${sortBy === opt ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                          >
                              {opt}
                          </button>
                      ))}
                  </div>
              </div>
          </aside>

          {/* --- PRODUCT GRID --- */}
          <main className="flex-1">
              <div className="flex justify-between items-end mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                      {selectedCategory === "All" ? "All Products" : `${selectedCategory} Collection`}
                      <span className="text-gray-400 text-sm font-normal ml-3">{filteredProducts.length} items</span>
                  </h2>
              </div>

              {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 rounded-3xl">
                      <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                      <button onClick={() => {setSelectedCategory("All"); setSearchQuery("");}} className="mt-4 text-orange-500 font-bold hover:underline">Clear Filters</button>
                  </div>
              ) : (
                  <motion.div 
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                      <AnimatePresence>
                          {filteredProducts.map((product) => (
                              <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={product.id}
                                className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 relative cursor-pointer"
                              >
                                  {/* Badge */}
                                  {product.tag && (
                                      <div className="absolute top-4 left-4 z-10 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
                                          {product.tag}
                                      </div>
                                  )}

                                  {/* Image Wrapper */}
                                  <div className="relative h-56 bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                                      <img src={product.src} alt={product.name} className="w-[85%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                                      
                                      {/* Hover Buttons */}
                                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                          <button 
                                            onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                                            className="bg-white text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg hover:bg-gray-900 hover:text-white transition-colors flex items-center gap-1"
                                          >
                                              <Eye size={12}/> Quick View
                                          </button>
                                      </div>
                                  </div>

                                  {/* Info */}
                                  <div onClick={() => navigate("/productpage")}>
                                      <div className="flex justify-between items-start">
                                          <div>
                                              <p className="text-xs text-gray-500 font-semibold uppercase mb-1">{product.category}</p>
                                              <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                                          </div>
                                          <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                                              <Star size={12} fill="currentColor"/> {product.rating}
                                          </div>
                                      </div>
                                      
                                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                          <span className="text-lg font-black text-gray-900">Rs. {product.price}</span>
                                          <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 hover:bg-orange-500 hover:text-white transition-colors">
                                              <ShoppingBag size={14} />
                                          </button>
                                      </div>
                                  </div>
                              </motion.div>
                          ))}
                      </AnimatePresence>
                  </motion.div>
              )}
          </main>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;