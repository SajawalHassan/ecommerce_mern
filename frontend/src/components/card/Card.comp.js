import React from "react";

function Card() {
  return (
    <div className="bg-white w-[80%] sm:w-[70%] mx-auto h-[10rem] shadow-xl rounded-md grid place-content-center space-y-1 z-10 text-center">
      <h1 className="font-bold text-3xl">Elon Musk</h1>
      <p className="text-gray-600 w-[80%] mx-auto">
        The person who made this is the second coming of me
      </p>
    </div>
  );
}

export default Card;
