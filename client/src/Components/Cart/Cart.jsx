import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../../CartContext.jsx'; // Ensure this path is correct
import { 
  Trash2, Heart, Minus, Plus, ArrowRight, ShoppingBag, 
  CreditCard, Tag, ShieldCheck, Search, Menu, Phone, 
  Truck, Facebook, Twitter, Instagram 
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

// --- MOCK DATA ---
const CART_INITIAL_ITEMS = [
  { id: 1, name: 'Aviator Classic', brand: 'FrameMe', price: 500, quantity: 1, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=300" },
  { id: 2, name: 'Geometric Bold', brand: 'Vogue', price: 900, quantity: 2, image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=300" },
  { id: 3, name: 'Wayfarer Elite', brand: 'Ray-Ban', price: 800, quantity: 1, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=300" },
];

const TOP_ITEMS = [
  { id: 101, name: "Oakley Sutro", brand: "Sport", price: 99, oldPrice: 120, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=300" },
  { id: 102, name: "Aviator Pro", brand: "Classic", price: 99, oldPrice: 130, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=300" },
  { id: 103, name: "Round Metal", brand: "Vintage", price: 99, oldPrice: 120, image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=300" },
];

// --- INLINE HEADER ---
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 font-sans">
      <div className="bg-gray-900 text-white text-[10px] py-2 px-4 flex justify-between items-center">
        <p>Free Shipping on Orders Over $100</p>
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
       {/* Mobile Menu Stub */}
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

// --- MAIN CART PAGE ---
const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const [coupon, setCoupon] = useState('');
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; 
  const total = subtotal + shipping;
  
  // 1. Define Page Animations
  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  };

  return (
    // 2. Wrap main div in motion.div
    <motion.div 
        className="min-h-screen bg-gray-50 font-sans"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
    >
      <Header />

      <section className="bg-white border-b border-gray-100 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                  <h1 className="text-4xl font-black text-gray-900 mb-2">Your Bag</h1>
                  <p className="text-gray-500 flex items-center gap-2 justify-center md:justify-start">
                      <span className="font-bold text-orange-500">{cartItems.length} items</span> in your cart
                  </p>
              </div>
              <div className="flex gap-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-green-500"/>
                      <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <Truck size={18} className="text-blue-500"/>
                      <span>Free Shipping</span>
                  </div>
              </div>
          </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- LEFT: CART ITEMS --- */}
          <div className="lg:w-2/3 space-y-6">
            <AnimatePresence mode='popLayout'>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6"
                  >
                    <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-[80%] h-auto object-contain mix-blend-multiply" />
                    </div>

                    <div className="flex-1 w-full text-center sm:text-left">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">{item.brand}</p>
                                <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                                <Trash2 size={18} />
                            </button>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                <button 
                                    onClick={() => updateQuantity(item.id, -1)} 
                                    className="p-2 hover:bg-white rounded-md transition-colors text-gray-600 disabled:opacity-50"
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, 1)} 
                                    className="p-2 hover:bg-white rounded-md transition-colors text-gray-600"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            <p className="font-black text-xl text-gray-900 mt-4 sm:mt-0">
                                Rs. {item.price * item.quantity}
                            </p>
                        </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4"/>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Your bag is empty</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
                    <button onClick={() => navigate("/sunglasses")} className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">Start Shopping</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <div className="lg:w-1/3">
             <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>
                
                <div className="mb-8">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Promo Code</label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
                            <input 
                                type="text" 
                                value={coupon} 
                                onChange={(e) => setCoupon(e.target.value)} 
                                placeholder="Enter code" 
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                            />
                        </div>
                        <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-700 transition-colors">Apply</button>
                    </div>
                </div>

                <div className="space-y-4 mb-8 border-t border-gray-100 pt-6">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">Rs. {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-black text-gray-900 pt-4 border-t border-gray-100">
                        <span>Total</span>
                        <span>Rs. {total}</span>
                    </div>
                </div>

                {/* 3. FIX: Passed function reference instead of function execution */}
                <button
                 onClick={() => navigate("/checkout")}
                 className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 group">
                    Checkout <CreditCard size={18} className="group-hover:translate-x-1 transition-transform"/>
                </button>
                
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400">Secure Checkout - SSL Encrypted</p>
                </div>
             </div>
          </div>
        </div>

        {/* --- YOU MAY ALSO LIKE --- */}
        <section className="mt-24">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
                <div className="flex gap-2">
                    <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50"><ArrowRight size={16} className="rotate-180"/></button>
                    <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50"><ArrowRight size={16}/></button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {TOP_ITEMS.map((item) => (
                    <motion.div 
                        key={item.id}
                        whileHover={{ y: -5 }}
                        className="bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <div className="relative h-48 bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                            <img src={item.image} alt={item.name} className="w-[80%] object-contain mix-blend-multiply" />
                            <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors">
                                <Heart size={16}/>
                            </button>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase">{item.brand}</p>
                                <h4 className="font-bold text-gray-900">{item.name}</h4>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 line-through">Rs. {item.oldPrice}</p>
                                <p className="font-bold text-orange-600">Rs. {item.price}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Cart;