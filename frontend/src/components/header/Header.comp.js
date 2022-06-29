import React, { useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import logoText from "../../images/logo-text.png";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import MenuLink from "./MenuLink.comp";

import { Link } from "react-router-dom";
import HeaderLink from "./HeaderLink.comp";

function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="py-2 px-4 md:px-8 flex items-center justify-between">
      <div className="p-[5.5px] btn md:hidden" onClick={() => setMenu(true)}>
        <MenuOutlinedIcon style={{ fontSize: "2.1rem" }} />
      </div>

      <div className="md:flex items-center space-x-5 hidden">
        <HeaderLink text="Products" />
        <HeaderLink text="Reviews" />
        <HeaderLink text="About Us" />
        <HeaderLink text="Cart" />
      </div>

      <Link to="/home">
        <img src={logoText} alt="" className="h-[2.5rem]" />
      </Link>

      <div className="p-2 btn md:hidden">
        <ShoppingCartOutlinedIcon style={{ fontSize: "2.1rem" }} />
      </div>

      <div className="md:flex items-center space-x-5 hidden">
        <div className="flex items-center space-x-3">
          <button className="py-1 px-5 bg-blue-500 text-white font-bold rounded-sm hover:bg-blue-600 transition-colors duration-500">
            Sign up
          </button>
          <button className="py-1 px-5 font-bold rounded-sm ring-1 ring-gray-300 hover:bg-gray-300 transition-colors duration-500">
            Sign in
          </button>
        </div>
      </div>

      {menu && (
        <div
          className="absolute inset-0 m-auto w-screen h-screen bg-gray-100 menu-animation z-20 md:hidden"
          id="menu"
        >
          <div className="py-4 px-3">
            <div className="btn p-[5.5px] absolute right-3">
              <ArrowBackIosNewOutlinedIcon
                style={{ fontSize: "1.7rem" }}
                onClick={() => setMenu(false)}
              />
            </div>
            <div className="flex items-center space-x-3">
              <button className="py-1 px-5 bg-blue-500 text-white font-bold rounded-sm hover:bg-blue-600 transition-colors duration-500">
                Sign up
              </button>
              <button className="py-1 px-5 font-bold rounded-sm ring-1 ring-gray-300 hover:bg-gray-300 transition-colors duration-500">
                Sign in
              </button>
            </div>
          </div>
          <div className="grid place-content-center h-[90vh]">
            <MenuLink text="Products" />
            <MenuLink text="Reviews" />
            <div className="border-b border-gray-300">
              <MenuLink text="About Us" />
            </div>
          </div>
          <h1 className="flex -mt-4 items-end justify-center font-bold text-lg">
            Website made by{" "}
            <a
              href="https://sajawalhassan.vercel.app/"
              className="ml-1 text-blue-500 hover:underline"
            >
              Sajawal Hassan
            </a>
          </h1>
        </div>
      )}
    </div>
  );
}

export default Header;
