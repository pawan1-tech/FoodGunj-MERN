import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoImg from "../utils/Images/Logo.png";
import {
  FavoriteBorder,
  MenuRounded,
  SearchRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Button from "./Button";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/UserSlice";

const Navbar = ({ setOpenAuth, openAuth, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const cartCount = currentUser?.cart?.length || 0;

  const navLinkClasses = ({ isActive }) => 
    `flex items-center text-gray-800 font-medium cursor-pointer transition-all duration-1000 no-underline hover:text-red-600 ${
      isActive ? "text-red-600 border-b-[1.8px] border-red-600" : ""
    }`;

  return (
    <nav className="bg-white h-20 flex items-center justify-center text-base sticky top-0 z-10 text-white">
      <div className="w-full max-w-[1400px] px-6 flex gap-3.5 items-center justify-between">
        <div onClick={() => setIsOpen(!isOpen)} className="text-gray-800 hidden md:flex items-center">
          <MenuRounded style={{ color: "inherit" }} />
        </div>

        <Link to="/" className="w-full flex items-center px-1.5 font-medium text-lg no-underline text-inherit">
          <img src={LogoImg} alt="logo" className="h-[150px]" />
        </Link>

        <div className="hidden md:flex items-center justify-center gap-4">
          <NavLink to="/search" className={navLinkClasses}>
            <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} />
          </NavLink>
          <NavLink to="/favorite" className={navLinkClasses}>
            <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
          </NavLink>
          <NavLink to="/cart" className={navLinkClasses}>
            <div className="relative">
              <ShoppingCartOutlined sx={{ color: "inherit", fontSize: "28px" }} />
              {cartCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </div>
              )}
            </div>
          </NavLink>
          {currentUser && (
            <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
          )}
        </div>

        <ul className="w-full flex items-center justify-center gap-8 px-1.5 list-none md:hidden">
          <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
          <li><NavLink to="/dishes" className={navLinkClasses}>Dishes</NavLink></li>
          <li><NavLink to="/orders" className={navLinkClasses}>Orders</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClasses}>Contact</NavLink></li>
        </ul>

        <div className="w-full flex justify-end gap-7 items-center px-1.5 text-red-600 md:hidden">
          <NavLink to="/search" className={navLinkClasses}>
            <SearchRounded sx={{ color: "inherit", fontSize: "30px" }} />
          </NavLink>
          {currentUser ? (
            <>
              <NavLink to="/favorite" className={navLinkClasses}>
                <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
              </NavLink>
              <NavLink to="/cart" className={navLinkClasses}>
                <div className="relative">
                  <ShoppingCartOutlined sx={{ color: "inherit", fontSize: "28px" }} />
                  {cartCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartCount}
                    </div>
                  )}
                </div>
              </NavLink>
              <Avatar src={currentUser?.img}>{currentUser?.name[0]}</Avatar>
              <button 
                onClick={() => dispatch(logout())}
                className="text-end text-blue-600 cursor-pointer text-base transition-all duration-300 font-semibold hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Button text="Sign In" small onClick={() => setOpenAuth(true)} />
          )}
        </div>

        {isOpen && (
          <div className="flex flex-col items-start gap-4 px-1.5 list-none w-4/5 py-3 px-10 pb-6 bg-white/60 absolute top-20 right-0 transition-all duration-600 ease-in-out transform translate-y-0 rounded-b-[20px] shadow-md md:block">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/dishes" onClick={() => setIsOpen(false)} className={navLinkClasses}>
              Dishes
            </NavLink>
            <NavLink to="/orders" onClick={() => setIsOpen(false)} className={navLinkClasses}>
              Orders
            </NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)} className={navLinkClasses}>
              Contact
            </NavLink>
            {currentUser ? (
              <button 
                onClick={() => dispatch(logout())}
                className="text-end text-blue-600 cursor-pointer text-base transition-all duration-300 font-semibold hover:text-red-600"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <Button text="Sign Up" outlined small onClick={() => setOpenAuth(true)} />
                <Button text="Sign In" small onClick={() => setOpenAuth(true)} />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;