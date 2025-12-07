import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ScanFace, 
  Glasses, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  Facebook, 
  Twitter, 
  Instagram,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import existing Header
import Header from "../Header/Header";

// --- INLINE FOOTER COMPONENT ---
const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-16 mt-auto font-sans relative overflow-hidden">
    {/* Footer Background Decoration */}
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

// --- MAIN CONTENT ---
const About = () => {
  const navigate = useNavigate();

  // --- ANIMATION VARIANTS ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const heroImageAnim = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0b0c10] text-white pt-20">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3"
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                <motion.div variants={fadeInUp}>
                    <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-[0.25em] mb-8 backdrop-blur-sm">
                        Established 2025
                    </span>
                </motion.div>
                <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
                    We Are <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 animate-gradient">FrameMe.</span>
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                    Bridging the gap between digital convenience and physical luxury. We are revolutionizing how the world sees—and is seen.
                </motion.p>
            </motion.div>
        </div>
      </section>

      {/* --- OUR STORY (Split Layout) --- */}
      <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={heroImageAnim}
                className="relative"
              >
                  <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                      <img 
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1632" 
                        alt="Design Studio" 
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-8 left-8 text-white">
                          <p className="font-bold text-lg">Designed in Islamabad</p>
                          <p className="text-sm opacity-80">Our Main HQ</p>
                      </div>
                  </div>
                  {/* Decorative Frame */}
                  <div className="absolute -bottom-8 -right-8 w-full h-full border-2 border-orange-500/30 rounded-[2.5rem] -z-0"></div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">Not Just Another <br/> Eyewear Brand.</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      FrameMe was born from a simple frustration: buying glasses online was a gamble. You never knew how they would fit until they arrived.
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed mb-10">
                      We combined cutting-edge <strong className="text-gray-900 underline decoration-orange-500/50 decoration-2 underline-offset-4">Face Mapping Technology</strong> with artisanal craftsmanship to create a shopping experience that is as precise as it is personal.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                          <h4 className="font-black text-4xl text-orange-500 mb-2">50k+</h4>
                          <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">Happy Faces</p>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                          <h4 className="font-black text-4xl text-orange-500 mb-2">100%</h4>
                          <p className="text-sm text-gray-500 font-bold uppercase tracking-wide">UV Protection</p>
                      </div>
                  </div>
              </motion.div>
          </div>
      </section>

      {/* --- THE TECHNOLOGY (Dark Section) --- */}
      <section className="py-32 bg-[#0F1115] text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-20">
                  <span className="text-orange-500 font-bold tracking-[0.3em] uppercase text-xs">Innovation</span>
                  <h2 className="text-4xl md:text-5xl font-bold mt-4">The Magic Behind the Mirror</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                      {
                          icon: <ScanFace size={32} className="text-white"/>,
                          title: "AI Face Mapping",
                          desc: "Our algorithms analyze 68 distinct facial landmarks to recommend frames that perfectly balance your unique features."
                      },
                      {
                          icon: <Glasses size={32} className="text-white"/>,
                          title: "True-to-Scale AR",
                          desc: "Experience hyper-realistic virtual try-on. See the exact size, texture, and fit on your face in real-time."
                      },
                      {
                          icon: <Globe2 size={32} className="text-white"/>,
                          title: "Sustainable Tech",
                          desc: "By reducing returns through better sizing, we lower our carbon footprint significantly compared to traditional retail."
                      }
                  ].map((item, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2"
                      >
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-8 shadow-lg shadow-orange-900/20 group-hover:scale-110 transition-transform duration-300">
                              {item.icon}
                          </div>
                          <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                          <p className="text-gray-400 leading-relaxed text-lg">{item.desc}</p>
                      </motion.div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- VALUES / WHY CHOOSE US --- */}
      <section className="py-32 px-6 bg-[#f8f9fa]">
          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                  <div className="flex flex-col justify-center">
                      <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-10 leading-tight">Crafted for Comfort. <br/> Designed for You.</h2>
                      <div className="space-y-8">
                          {[
                              { title: "Italian Acetate", desc: "Hand-polished, plant-based acetate that feels warm and natural on the skin." },
                              { title: "German Hinges", desc: "Ultra-durable flex hinges that adapt to your face width without pinching." },
                              { title: "Japanese Lenses", desc: "Crystal clear optics with superior scratch and smudge resistance." }
                          ].map((item, idx) => (
                              <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex gap-6 group"
                              >
                                  <div className="mt-1 text-orange-500 transition-transform group-hover:scale-110">
                                      <CheckCircle2 size={28} />
                                  </div>
                                  <div>
                                      <h4 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors">{item.title}</h4>
                                      <p className="text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
                                  </div>
                              </motion.div>
                          ))}
                      </div>
                      
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/sunglasses")}
                        className="mt-12 px-10 py-5 bg-gray-900 text-white rounded-full font-bold shadow-xl flex items-center gap-3 hover:bg-orange-600 transition-colors w-fit"
                      >
                          Explore Collection <ArrowRight size={20} />
                      </motion.button>
                  </div>

                  <div className="grid grid-cols-2 gap-6 h-full">
                       <motion.img 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600" 
                          className="w-full h-80 object-cover rounded-[2rem] shadow-lg"
                       />
                       <motion.img 
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600" 
                          className="w-full h-80 object-cover rounded-[2rem] shadow-lg translate-y-16"
                       />
                  </div>
              </div>
          </div>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center mb-20">
              <h2 className="text-4xl font-bold mb-6">Meet The Visionaries</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">The diverse team of designers, engineers, and dreamers building the future of eyewear.</p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {[
                  { name: "Alex Chen", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
                  { name: "Sarah Miller", role: "Head of Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
                  { name: "Jordan Smith", role: "Lead Engineer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" }
              ].map((member, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center group"
                  >
                      <div className="relative mb-6 mx-auto w-56 h-56 rounded-full overflow-hidden border-4 border-gray-100 group-hover:border-orange-500 transition-colors duration-300">
                          <img src={member.img} alt={member.name} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-orange-500 font-bold text-sm uppercase tracking-wide">{member.role}</p>
                  </motion.div>
              ))}
          </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-red-600 text-white text-center px-6">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
               <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">Ready to find your look?</h2>
               <p className="text-xl md:text-2xl opacity-90 mb-12 max-w-2xl mx-auto font-light">Try on any frame instantly with our virtual mirror. No app download required.</p>
               <button 
                 onClick={() => navigate("/sunglasses")}
                 className="bg-white text-orange-600 px-12 py-5 rounded-full font-bold text-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:bg-gray-50 hover:scale-105 transition-all"
               >
                   Start Shopping
               </button>
           </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;