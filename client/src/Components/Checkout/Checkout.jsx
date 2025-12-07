import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from '../../CartContext.jsx';
import { useContext } from "react";
import { 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  CreditCard, 
  MapPin, 
  Truck, 
  CheckCircle, 
  ShoppingBag,
  Phone,
  Search,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  Lock,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- MOCK DATA FOR SUMMARY ---
const CART_SUMMARY = [
  { id: 1, name: 'Aviator Classic', brand: 'FrameMe', price: 500, quantity: 1, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=300" },
  { id: 2, name: 'Geometric Bold', brand: 'Vogue', price: 900, quantity: 2, image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=300" },
];

// --- INLINE HEADER ---
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 font-sans">
      <div className="bg-gray-900 text-white text-[10px] py-2 px-4 flex justify-between items-center">
        <p className="flex items-center gap-2"><Lock size={10}/> Secure Checkout</p>
        <div className="hidden md:flex gap-4">
            <span className="flex items-center gap-1"><Phone size={10}/> Support</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 
          className="text-2xl font-black tracking-tighter cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          Frame<span className="text-orange-500 group-hover:text-orange-600 transition-colors">Me</span>.
        </h1>
        {/* Simplified Nav for Checkout */}
        <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
            <span className="text-gray-900">Cart</span>
            <ChevronRight size={14}/>
            <span className="text-orange-500">Checkout</span>
            <ChevronRight size={14}/>
            <span>Confirmation</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <ShieldCheck size={14}/> SSL Encrypted
          </div>
        </div>
      </div>
    </header>
  );
};

// --- INLINE FOOTER ---
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-8 mt-auto font-sans border-t border-gray-800">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm">© 2025 FrameMe Inc. All rights reserved.</p>
      <div className="flex gap-4">
         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all cursor-pointer"><Facebook size={14}/></div>
         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all cursor-pointer"><Twitter size={14}/></div>
         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all cursor-pointer"><Instagram size={14}/></div>
      </div>
    </div>
  </footer>
);

// --- MAIN CHECKOUT COMPONENT ---
const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment, 3 = Success
  const [loading, setLoading] = useState(false);

  const subtotal = CART_SUMMARY.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal; // Free shipping

  const handleNextStep = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if(step === 2 && clearCart) clearCart();
    }, 800);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 }, // Slide in from right
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };
  return (
    <motion.div 
        className="bg-gray-50 min-h-screen font-sans"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
    >
      <Header />

      {/* --- SUCCESS MODAL --- */}
      <AnimatePresence>
        {step === 3 && (
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                className="fixed inset-0 z-[60] bg-white flex items-center justify-center p-6"
            >
                <div className="text-center max-w-md">
                    <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} 
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600"
                    >
                        <CheckCircle size={48} />
                    </motion.div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Order Confirmed!</h2>
                    <p className="text-gray-500 mb-8 text-lg">Thank you for your purchase. Your premium frames are being polished and will ship within 24 hours.</p>
                    <div className="bg-gray-50 p-4 rounded-xl mb-8 border border-gray-100">
                        <p className="text-sm text-gray-400 uppercase font-bold mb-1">Order Number</p>
                        <p className="text-xl font-bold text-gray-900">#FM-{Math.floor(Math.random() * 1000000)}</p>
                    </div>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-xl w-full"
                    >
                        Continue Shopping
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          
          {/* --- LEFT: FORMS --- */}
          <div className="lg:w-2/3">
            
            {/* Step 1: Shipping */}
            <motion.div 
                animate={{ opacity: step === 1 ? 1 : 0.5, pointerEvents: step === 1 ? 'auto' : 'none' }}
                className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-6 relative overflow-hidden transition-all ${step !== 1 ? 'max-h-24' : ''}`}
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${step >= 1 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                    <h2 className="text-2xl font-bold text-gray-900">Shipping Details</h2>
                    {step > 1 && <CheckCircle className="ml-auto text-green-500" />}
                </div>

                {step === 1 && (
                    <form onSubmit={handleNextStep}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">First Name</label>
                                <input required type="text" placeholder="John" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all"/>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Last Name</label>
                                <input required type="text" placeholder="Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all"/>
                            </div>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
                            <input required type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all"/>
                        </div>

                        <div className="space-y-2 mb-6">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Street Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                                <input required type="text" placeholder="123 Vision Street" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">City</label>
                                <input required type="text" placeholder="Islamabad" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all"/>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">State</label>
                                <input required type="text" placeholder="Islamabad" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all"/>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Zip Code</label>
                                <input required type="text" placeholder="44000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all"/>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center gap-2"
                        >
                            {loading ? "Processing..." : <>Continue to Payment <ArrowRight size={18} /></>}
                        </button>
                    </form>
                )}
            </motion.div>

            {/* Step 2: Payment */}
            <motion.div 
                animate={{ opacity: step === 2 ? 1 : 0.5, pointerEvents: step === 2 ? 'auto' : 'none' }}
                className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden transition-all`}
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${step === 2 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                    <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
                </div>

                {step === 2 && (
                    <form onSubmit={handleNextStep}>
                        {/* Visual Card */}
                        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl relative overflow-hidden h-48 flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl"></div>
                            <div className="flex justify-between items-start z-10">
                                <CreditCard size={32} />
                                <span className="font-mono text-lg tracking-widest">VISA</span>
                            </div>
                            <div className="z-10">
                                <p className="font-mono text-xl tracking-widest mb-2">•••• •••• •••• 4242</p>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase">Card Holder</p>
                                        <p className="font-bold uppercase tracking-wide text-sm">John Doe</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase">Expires</p>
                                        <p className="font-bold text-sm">12/28</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Card Number</label>
                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all font-mono"/>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Expiry Date</label>
                                    <input type="text" placeholder="MM/YY" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all font-mono"/>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">CVC</label>
                                    <input type="text" placeholder="123" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all font-mono"/>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                type="button" 
                                onClick={() => setStep(1)}
                                className="px-6 py-4 rounded-xl font-bold text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                Back
                            </button>
                            <button 
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? "Processing..." : `Pay Rs. ${total}`}
                            </button>
                        </div>
                    </form>
                )}
            </motion.div>
          </div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <div className="lg:w-1/3">
             <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <ShoppingBag size={20} className="text-orange-500"/> Order Summary
                </h2>
                
                <div className="space-y-6 mb-8 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-[80%] h-auto object-contain mix-blend-multiply"/>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm text-gray-900">{item.name}</h4>
                                    <p className="text-xs text-gray-500">{item.brand}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-sm">Rs. {item.price}</p>
                                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 text-center py-4">Your cart is empty.</p>
                    )}
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>Rs. {subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-lg font-black text-gray-900 pt-3">
                        <span>Total</span>
                        <span>Rs. {total}</span>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Checkout;