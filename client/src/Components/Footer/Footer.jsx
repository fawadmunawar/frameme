import React from 'react'

import foooter from "../../assets/Home Images/foooter.png"

const Footer = () => {
  return (
    <div>
        <div className="max-w-md mx-auto p-6 rounded-lg">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Join Our News Letters
          </h2>

          <p className="text-gray-400 text-center mb-6">
            Leverage agile frameworks to provide a robust synopsis for high
            level overviews. Iterative approaches to corporate strategy foster
          </p>

          <div className="flex flex-col space-y-4 bg-gray-100 rounded-md">
            <input
              type="email"
              placeholder="Insert your mail here"
              class="px-4 py-2 bg-gray-100 rounded-md outline-none focus:ring-2"
            />

            <button className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700 cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>

        {/* footer  */}
    <footer className="bg-gray-100 text-gray-800 px-6 py-8">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Logo Section */}
        <div>
          <img
            src={ foooter } // Add the logo path later
            alt="FrameMe logo"
            className="h-24 w-auto object-contain"
          />
        </div>

        {/* Text Content Section */}
        <div className="flex flex-col gap-3 sm:items-end text-sm sm:text-right">
          <h2 className="text-2xl text-orange-500 font-bold">FrameMe</h2>
          <div className="flex flex-col gap-1">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms and Conditions
            </a>
          </div>
          <p className="text-xs mt-2">
            ©2025 FrameMe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer