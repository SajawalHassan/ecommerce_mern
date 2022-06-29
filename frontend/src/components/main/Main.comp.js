import React from "react";
import Card from "../card/Card.comp";

function Main() {
  return (
    <div className="h-[85vh]">
      <div className="md:ml-[5rem] md:items-start lg:flex-row lg:items-center 2xl:mx-[5rem] lg:justify-between text-center mx-auto md:text-start flex items-center justify-center flex-col h-full">
        <div>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl">
            Your Affordable Cart.
          </h1>
          <p className="text-gray-700 text-sm w-[80%] mt-1 sm:text-base md:w-max md:text-lg">
            The place to get what you need at the right time and place
          </p>
          <button className="rounded-sm py-2 px-5 mt-5 bg-blue-700 text-white font-bold hover:bg-blue-600 transition-colors duration-500 w-max sm:px-7 sm:py-3">
            Shop Now
          </button>
        </div>
        <img
          src="https://o.remove.bg/downloads/1cb39c87-8b23-4423-97f8-b37a539f3cd2/download-removebg-preview.png"
          alt=""
          className="hidden lg:block h-[15rem] xl:h-[20rem]"
        />
        <div className="absolute bottom-4 inset-x-0 md:hidden">
          <Card />
        </div>
      </div>
    </div>
  );
}

export default Main;
