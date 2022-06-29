import React from "react";

function MenuLink({ text }) {
  return (
    <h1
      className="text-center py-4 w-screen hover:bg-gray-300 transition-colors duration-500 cursor-pointer font-bold text-xl border-t border-gray-300"
      title={text}
    >
      {text}
    </h1>
  );
}

export default MenuLink;
