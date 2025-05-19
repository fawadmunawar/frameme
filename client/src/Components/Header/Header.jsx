import React from 'react'

import {
    FaSearch,
    FaHeart,
    FaShoppingCart,
    FaUser,
    FaPhoneAlt,
    FaTruck,
  } from "react-icons/fa";

  import { useNavigate } from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

  return (
    <header className="flex px-6 py-4 flex-col">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold text-orange-500">FrameMe</p>
            </div>
            <div className="flex justify-center items-center gap-4 ">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-sm" title="Call Center" />
                <p>Call Center</p>
              </div>
              <div className="flex items-center gap-2">
                <FaTruck className="text-sm" title="Shipping & Returns" />
                <p>Shpopping & Returns</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center justify-between mt-4">
            <nav className="flex gap-4 text-sm font-bold">
              <a onClick={() => navigate("/")} href="#">Home</a>
              <a href="#">Detail</a>
              <a href="#">About</a>
              <a href="#" onClick={() => navigate("/cart")}>Cart</a>
            </nav>
            <div className="flex p-4 gap-32 bg-gray-100 rounded ">
              <input
                type="text"
                placeholder="Search what you need"
                className="outline-none text-sm"
              />
              <FaSearch className="text-gray-600" />
            </div>
            <div className="flex items-center gap-4 text-gray-700 text-xl">
              <FaHeart />
              <FaShoppingCart onClick={() => navigate("/cart")} className='cursor-pointer'/>
              <FaUser onClick={() => navigate("/signup")} className='cursor-pointer'/>
              <FaTruck className="text-sm" title="Shipping & Returns" />
              <FaPhoneAlt className="text-sm" title="Call Center" />
            </div>
          </div>
        </header>
  )
}

export default Header