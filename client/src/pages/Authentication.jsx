import React, { useState } from 'react'
import { Modal } from "@mui/material";
import LogoImage from "../utils/Images/Logo.png";
import AuthImage from "../utils/Images/AuthImage.jpg";
import { Close } from "@mui/icons-material";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Authentication = ({ openAuth, setOpenAuth }) => {
  const [login, setLogin] = useState(true);

  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <div className="flex flex-1 h-full bg-white">
        <div className="flex-1 relative md:hidden">
          <img src={LogoImage} alt="logo" className="absolute top-10 left-[60px] z-10" />
          <img src={AuthImage} alt="auth" className="relative h-full w-full object-cover" />
        </div>
        <div className="flex-[0.9] md:flex-1 flex flex-col p-10 gap-4 items-center justify-center relative">
          <div 
            className="absolute top-5 right-5 rounded-full p-0.5 w-8 h-8 border border-red-600 flex justify-center items-center hover:bg-red-600/20 cursor-pointer"
            onClick={() => setOpenAuth(false)}
          >
            <Close />
          </div>
          {login ? (
            <>
              <SignIn setOpenAuth={setOpenAuth} />
              <p className="flex gap-3 text-base text-center text-gray-500 mt-4 md:text-sm">
                Don't have an account?
                <span 
                  className="text-red-600 cursor-pointer transition-all duration-300 font-semibold"
                  onClick={() => setLogin(false)}
                >
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <>
              <SignUp setOpenAuth={setOpenAuth} />
              <p className="flex gap-3 text-base text-center text-gray-500 mt-4 md:text-sm">
                Already have an account?
                <span 
                  className="text-red-600 cursor-pointer transition-all duration-300 font-semibold"
                  onClick={() => setLogin(true)}
                >
                  Sign In
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default Authentication