import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate(); 

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-orange-500 text-5xl font-bold">FrameMe</h1>
        <h1 className=" text-4xl font-bold">SignUp</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="" className="text-gray-500">
            Name
          </label>
          <input
            type="text"
            className="border border-gray-500 outline-none rounded-2xl px-6 py-2 "
          />
        </div>
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
            Password
          </label>
          <input
            type="text"
            className="border border-gray-500 outline-none rounded-2xl px-6 py-2 "
          />
        </div>
        <div className="flex flex-col">
          <button className="w-full text-white font-semibold bg-orange-500 px-4 py-2 rounded-2xl cursor-pointer hover:bg-orange-700">
            SignUp
          </button>
        </div>
        <div className="flex">
          <div className=" flex items-center justify-center gap-4 w-full border border-gray-500 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gray-200">
            <FcGoogle />
            <button>
              Continue with Google
            </button>
          </div>
        </div>
        <div className='w-full h-[1px] bg-gray-400'></div>
        <div className='flex'>
            <h1 className='text-gray-600 font-semibold'>Already have an account?</h1><span className='font-semibold hover:cursor-pointer hover:underline transition' onClick={() => navigate("/login")}>Log in</span>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Signup