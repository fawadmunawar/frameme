import React from 'react'
import { useNavigate } from "react-router-dom";

const Forgot = () => {

    const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-orange-500 text-5xl font-bold">FrameMe</h1>
        <h1 className=" text-4xl font-bold">Forgot Password</h1>
        <h1 className=" text-2xl font-bold text-gray-500">Let us help you</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="" className="text-gray-500">
            Email Address
          </label>
          <input
            type="text"
            className="border border-gray-500 outline-none rounded-2xl px-6 py-2 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-gray-500">
            Verification Code
          </label>
          <input
            type="text"
            className="border border-gray-500 outline-none rounded-2xl px-6 py-2 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-gray-500">
            Verification Code
          </label>
          <input
            type="text"
            className="border border-gray-500 outline-none rounded-2xl px-6 py-2 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-gray-500">
            New Password
          </label>
          <input
            type="text"
            className="border border-gray-500 outline-none rounded-2xl px-6 py-2 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-gray-500">
            Verify Password
          </label>
          <input
            type="text"
            className="border border-gray-500 outline-none rounded-2xl px-6 py-2 "
          />
        </div>
        <div className="flex flex-col">
          <button className="w-full font-semibold text-white bg-orange-500 px-4 py-2 rounded-2xl cursor-pointer hover:bg-orange-700">
            Change Password
          </button>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Forgot