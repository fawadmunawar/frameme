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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homee />} />       {/* Home Page */}
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
    </>
  )
}

export default App
