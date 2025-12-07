import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homee from './Components/Homee/Homee'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sunglasses from './Components/Sunglasses/Sunglasses'
import Prescription from './Components/Prescription/Prescription'
import Sports from './Components/Sports/Sports'
import Bluelight from './Components/Bluelight/Bluelight'
import Productpage from './Components/Productpage/Productpage'
import Cart from './Components/Cart/Cart'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import Forgot from './Components/Forgot/Forgot'
import About from './Components/Details/Details'
import Shop from './Components/Shop/Shop'
import Contact from './Components/Contact/Contact'
import { CartProvider } from './CartContext.jsx';
import Checkout from './Components/Checkout/Checkout.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <CartProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homee />} />       {/* Home Page */}
        <Route path="/about" element={<About />} />       {/* About Page */}
        <Route path="/shop" element={<Shop />} />       {/* About Page */}
        <Route path="/checkout" element={<Checkout />} />       {/* Checkout Page */}
        <Route path="/contact" element={<Contact />} />       {/* About Page */}
        <Route path="/sunglasses" element={<Sunglasses />} /> {/* Sunglasses Page */}
        <Route path="/prescription" element={<Prescription />} /> {/* Prescription Page */}
        <Route path="/sports" element={<Sports />} /> {/* Sports Page */}
        <Route path="/bluelight" element={<Bluelight />} /> {/* Prescription Page */}
        <Route path="/productpage" element={<Productpage />} /> {/* Detail Page */}
        <Route path="/cart" element={<Cart />} /> {/* Cart Page */}
        <Route path="/signup" element={<Signup />} /> {/* SignUp Page */}
        <Route path="/login" element={<Login />} /> {/* Login Page */}
        <Route path="/forgot" element={<Forgot />} /> {/* Forgot Password Page */}
      </Routes>
    </BrowserRouter>
    </CartProvider>
    </>
  )
}

export default App
