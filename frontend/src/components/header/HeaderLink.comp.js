import React from "react";

function HeaderLink({ text }) {
  return (
    <h1 className="text-blue-500 font-bold text-lg hover:underline cursor-pointer">
      {text}
    </h1>
  );
}

export default HeaderLink;
