import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Header = () => {
  return (
    <header className="flex items-center justify-between flex-wrap bg-neutral-800 p-6">
      <div className="flex items-center flex-shrink-0 text-lime-400 mr-6">
        <span className="font-bold text-6xl">NeuPixl</span>
      </div>
      <div>
        <Link to="/signup" className="inline-block text-md px-4 py-2 mx-5 leading-relaxed border rounded border-white text-white hover:border-transparent hover:bg-white hover:text-neutral-800 mt-4 md:mt-0"> Sign Up</Link>
        <a
          href="#"
          className="inline-block text-md px-4 py-2 leading-relaxed border rounded border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-neutral-800 mt-4 md:mt-0"
        >
          Log In
        </a>
      </div>
    </header>
  );
};

export default Header;
