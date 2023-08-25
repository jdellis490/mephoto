import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="flex items-center justify-between flex-wrap bg-neutral-800 p-6">
      <div className="flex items-center flex-shrink-0 text-lime-400 mr-6">
        <Link to="/">
          <span className="font-bold text-6xl">NeuPixl</span>
        </Link>
      </div>
      <div>
        {/* If user is logged in, switches login button to logout and runs logout function */}
        {Auth.loggedIn() ? (
          <Link
            to="/"
            className="inline-block text-md px-4 py-2 leading-relaxed border rounded border-lime-400 bg-lime-400 text-neutral-800 hover:bg-neutral-800 hover:text-lime-400 mt-4 md:mt-0"
            onClick={logout}
          >
            {" "}
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-block text-md px-4 py-2 leading-relaxed border rounded border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-neutral-800 mt-4 md:mt-0"
          >
            {" "}
            Login
          </Link>
        )}
        <Link
          to="/signup"
          className="inline-block text-md px-4 py-2 mx-5 leading-relaxed border rounded border-white text-white hover:border-transparent hover:bg-white hover:text-neutral-800 mt-4 md:mt-0"
        >
          {" "}
          Signup
        </Link>
      </div>
    </header>
  );
};

export default Header;
