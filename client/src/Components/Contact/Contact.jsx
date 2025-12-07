import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser'; // Import EmailJS
import toast, { Toaster } from 'react-hot-toast'; // Import Toast
import { 
  Phone, 
  Truck, 
  Search, 
  ShoppingBag, 
  Menu, 
  Facebook, 
  Twitter, 
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  ChevronDown,
  ChevronUp,
  Send,
  Loader2 // Added loader icon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "../Header/Header";

// --- INLINE FOOTER COMPONENT ---
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-16 mt-auto font-sans relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
      <div className="space-y-4">
        <h3 className="text-white text-2xl font-black tracking-tighter">Frame<span className="text-orange-500">Me</span>.</h3>
        <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
          Premium eyewear designed for style, comfort, and the digital age. Experience the future of vision.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Shop</h4>
        <ul className="space-y-3 text-sm text-gray-400">
           <li className="hover:text-orange-500 cursor-pointer transition-colors">Sunglasses</li>
           <li className="hover:text-orange-500 cursor-pointer transition-colors">Eyeglasses</li>
           <li className="hover:text-orange-500 cursor-pointer transition-colors">Lenses</li>
           <li className="hover:text-orange-500 cursor-pointer transition-colors">Accessories</li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
         <ul className="space-y-3 text-sm text-gray-400">
           <li className="hover:text-orange-500 cursor-pointer transition-colors">FAQ</li>
           <li className="hover:text-orange-500 cursor-pointer transition-colors">Shipping & Returns</li>
           <li className="hover:text-orange-500 cursor-pointer transition-colors">Warranty</li>
           <li className="hover:text-orange-500 cursor-pointer transition-colors">Contact Us</li>
        </ul>
      </div>
      <div>
         <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Follow Us</h4>
         <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
                <Facebook size={18}/>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
                <Twitter size={18}/>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
                <Instagram size={18}/>
            </div>
         </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
        © 2025 FrameMe Inc. All rights reserved.
    </div>
  </footer>
);

// --- FAQ ITEM COMPONENT ---
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:bg-gray-50/50 transition-colors px-4 rounded-xl"
      >
        <span className="font-bold text-gray-900 text-lg">{question}</span>
        <span className={`text-orange-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 px-4 text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- CONTACT FORM COMPONENT ---
const ContactForm = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        'service_q9cx4hb', 
        'template_1df982c', 
        form.current, 
        { publicKey: 'dpCfLe0zzJF7eFOM5' } 
      )
      .then(
        () => {
          toast.success('Message sent successfully!', {
            style: {
              border: '1px solid #f97316',
              padding: '16px',
              color: '#333',
            },
            iconTheme: {
              primary: '#f97316',
              secondary: '#FFFAEE',
            },
          });
          e.target.reset();
        },
        (error) => {
          console.error('FAILED...', error.text);
          toast.error('Failed to send message. Please try again.');
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
          <input 
            type="text" 
            name="first_name" // Added name attribute
            required
            placeholder="Jane" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
          <input 
            type="text" 
            name="last_name" // Added name attribute
            required
            placeholder="Doe" 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
        <input 
          type="email" 
          name="user_email" // Added name attribute
          required
          placeholder="jane@example.com" 
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
        <div className="relative">
          <select 
            name="subject" // Added name attribute
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all appearance-none text-gray-600"
          >
            <option value="Order Status">Order Status</option>
            <option value="Returns & Exchanges">Returns & Exchanges</option>
            <option value="Product Inquiry">Product Inquiry</option>
            <option value="Other">Other</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18}/>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
        <textarea 
          rows="4" 
          name="message" // Added name attribute
          required
          placeholder="How can we help you today?" 
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
        ></textarea>
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-600 hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>Sending <Loader2 className="animate-spin" size={18}/></>
        ) : (
          <>Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform"/></>
        )}
      </button>
    </form>
  );
};

// --- MAIN PAGE ---
const Contact = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative bg-[#0b0c10] text-white py-24 px-6 overflow-hidden">
        {/* Abstract Background */}
        <motion.div 
           animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-600/20 to-purple-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                <motion.span variants={fadeInUp} className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">
                    Customer Support
                </motion.span>
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black mb-6">
                    We're here to help.
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Have questions about your prescription? Need style advice? Our team of opticians and stylists is ready to assist you.
                </motion.p>
            </motion.div>
        </div>
      </section>

      {/* --- CONTACT CARDS --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
              {[
                  { icon: <MessageSquare size={32}/>, title: "Chat with us", desc: "Speak to our friendly team via live chat.", link: "Start Chat", color: "bg-blue-50 text-blue-600 border-blue-100" },
                  { icon: <Mail size={32}/>, title: "Email us", desc: "We'll respond within 24 hours.", link: "hello@frameme.com", color: "bg-orange-50 text-orange-600 border-orange-100" },
                  { icon: <MapPin size={32}/>, title: "Visit HQ", desc: "Blue Area, Islamabad, Pakistan.", link: "Get Directions", color: "bg-green-50 text-green-600 border-green-100" }
              ].map((card, idx) => (
                  <motion.div 
                    key={idx}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-start"
                  >
                      <div className={`p-4 rounded-2xl mb-6 ${card.color} border`}>
                          {card.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                      <p className="text-gray-500 mb-6">{card.desc}</p>
                      <button className="font-bold text-gray-900 hover:text-orange-600 transition-colors flex items-center gap-2 group mt-auto">
                          {/* {card.link} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/> */}
                      </button>
                  </motion.div>
              ))}
          </motion.div>
      </section>

      {/* --- FORM & FAQ SECTION --- */}
      <section className="py-24 px-6 bg-[#fcfcfc]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Left: Form */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100"
              >
                  <div className="mb-8">
                      <h2 className="text-3xl font-black text-gray-900 mb-2">Send us a message</h2>
                      <p className="text-gray-500">We love hearing from you. Fill out the form below.</p>
                  </div>
                  <ContactForm />
              </motion.div>

              {/* Right: FAQ & Info */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                  <div className="mb-10">
                      <h2 className="text-3xl font-black text-gray-900 mb-6">Frequently Asked Questions</h2>
                      <div className="space-y-2">
                          <FAQItem 
                            question="How does the Virtual Try-On work?" 
                            answer="Our AR technology uses your device's camera to map your face in 3D. Simply click the 'Try On' button on any product page to see how the frames fit your unique face shape instantly."
                          />
                          <FAQItem 
                            question="Do you offer prescription lenses?" 
                            answer="Yes! We offer a wide range of prescription options including single vision, progressives, and blue-light blocking lenses. You can upload your prescription during checkout."
                          />
                          <FAQItem 
                            question="What is your return policy?" 
                            answer="We offer a 30-day no-questions-asked return policy. If you're not 100% satisfied with your frames, simply return them in their original condition for a full refund."
                          />
                          <FAQItem 
                            question="How long does shipping take?" 
                            answer="Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for 1-2 day delivery."
                          />
                      </div>
                  </div>

                  {/* Hours Card */}
                  <div className="bg-gray-900 text-white p-8 rounded-3xl flex items-start gap-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                      <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                          <Clock size={24} className="text-orange-500"/>
                      </div>
                      <div>
                          <h4 className="text-lg font-bold mb-2">Operating Hours</h4>
                          <p className="text-gray-400 text-sm mb-1">Mon - Fri: 9:00 AM - 8:00 PM</p>
                          <p className="text-gray-400 text-sm">Sat - Sun: 10:00 AM - 6:00 PM</p>
                      </div>
                  </div>
              </motion.div>
          </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;