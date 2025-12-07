import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft,
  Star
} from "lucide-react";

// Google Logo SVG Component
const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.52 12.29C23.52 11.43 23.44 10.6 23.3 9.8H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.95 21.1C22.2 19.01 23.52 15.92 23.52 12.29Z" fill="#4285F4"/>
    <path d="M12 24C15.24 24 17.96 22.92 19.95 21.1L16.08 18.1C15 18.83 13.62 19.25 12 19.25C8.87 19.25 6.22 17.14 5.27 14.29L1.27 17.38C3.25 21.32 7.31 24 12 24Z" fill="#34A853"/>
    <path d="M5.27 14.29C5.02 13.56 4.89 12.79 4.89 12C4.89 11.21 5.03 10.44 5.27 9.71L1.27 6.62C0.46 8.23 0 10.06 0 12C0 13.94 0.46 15.77 1.27 17.38L5.27 14.29Z" fill="#FBBC05"/>
    <path d="M12 4.75C13.77 4.75 15.35 5.36 16.6 6.55L20.02 3.13C17.96 1.21 15.24 0 12 0C7.31 0 3.25 2.68 1.27 6.62L5.27 9.71C6.22 6.86 8.87 4.75 12 4.75Z" fill="#EA4335"/>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* --- LEFT SIDE: IMAGE & BRANDING --- */}
      <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
        >
            <img 
                src="https://images.unsplash.com/photo-1570222094114-28a9d88a27e6?auto=format&fit=crop&q=80&w=1200" 
                alt="FrameMe Style" 
                className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </motion.div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full text-white">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="cursor-pointer"
                onClick={() => navigate("/")}
            >
                <h1 className="text-3xl font-black tracking-tighter">Frame<span className="text-orange-500">Me</span>.</h1>
            </motion.div>

            <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8 }}
            >
                <h2 className="text-5xl font-bold leading-tight mb-6">Welcome <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Back.</span></h2>
                <p className="text-gray-300 text-lg max-w-md mb-8">Continue your journey with the perfect pair. Your wishlist and exclusive offers are waiting.</p>
                
                {/* Testimonial Snippet */}
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl w-fit border border-white/10">
                    <div className="flex -space-x-3">
                        {[4,5,6].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-900 bg-gray-200 overflow-hidden">
                                <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=100&q=80`} alt="User" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex text-yellow-400 text-xs mb-1">
                            {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                        </div>
                        <p className="text-xs font-medium text-gray-200">Join 50k+ Members</p>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>

      {/* --- RIGHT SIDE: FORM --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 relative">
         {/* Mobile Back Button */}
         <button 
            onClick={() => navigate("/")}
            className="lg:hidden absolute top-6 left-6 p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-orange-500 transition-colors"
         >
             <ArrowLeft size={20} />
         </button>

         {/* Decorative Blobs */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full blur-[100px] opacity-20 pointer-events-none -translate-x-1/2 translate-y-1/2"></div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-white relative z-10"
        >
            <motion.div variants={itemVariants} className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Log In</h2>
                <p className="text-gray-500 text-sm">Access your account details and try-on history.</p>
            </motion.div>

            {/* Google Button */}
            <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.02, backgroundColor: "#f9fafb" }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 font-semibold py-3.5 rounded-2xl shadow-sm transition-all mb-6 group hover:border-gray-300"
            >
                <GoogleLogo />
                <span>Sign in with Google</span>
            </motion.button>

            <motion.div variants={itemVariants} className="relative flex items-center gap-4 mb-6">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Or sign in with email</span>
                <div className="flex-grow h-px bg-gray-200"></div>
            </motion.div>

            <div className="space-y-5">
                {/* Email Input */}
                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20}/>
                        <input 
                            type="email" 
                            placeholder="you@example.com"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block pl-12 p-3.5 outline-none transition-all placeholder:text-gray-400"
                        />
                    </div>
                </motion.div>

                {/* Password Input */}
                <motion.div variants={itemVariants}>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5 ml-1">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" size={20}/>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block pl-12 pr-12 p-3.5 outline-none transition-all placeholder:text-gray-400"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                    </div>
                </motion.div>

                {/* Forgot Password */}
                <motion.div variants={itemVariants} className="flex justify-end">
                    <span 
                        onClick={() => navigate("/forgot")}
                        className="text-sm font-semibold text-gray-500 hover:text-orange-600 cursor-pointer transition-colors"
                    >
                        Forgot Password?
                    </span>
                </motion.div>

                {/* Submit Button */}
                <motion.button 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2 group mt-4"
                >
                    Log In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                </motion.button>
            </div>

            <motion.div variants={itemVariants} className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                    Don't have an account?{" "}
                    <span 
                        onClick={() => navigate("/signup")}
                        className="text-orange-600 font-bold cursor-pointer hover:underline hover:text-orange-700 transition-colors"
                    >
                        Sign Up
                    </span>
                </p>
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;