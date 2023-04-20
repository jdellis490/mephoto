import React from "react";
import { Link } from "react-router-dom";
import ImageCard from "../components/ImageCard";
import Auth from "../utils/auth";
import { SlCamera } from 'react-icons/sl';

const Home = () => {
  return (
    <div>
      {" "}
      <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        {Auth.loggedIn() ? (
        <p className="text-3xl text-gray-700 font-bold mb-5">
          Welcome to Neupixl, <span>{Auth.getProfile().data.username}!</span> 
          </p> 
          ) : (
            <p className="text-3xl text-gray-700 font-bold mb-5">
            Welcome to Neupixl!
            </p>          
        )}
        <p className="text-gray-500 text-lg">Let's get started!</p>
        <br />
        <button className="inline-block mt-5 text-lg text-center px-4 py-2 leading-relaxed border-2 rounded border-neutral-800 border-dashed bg-lime-400 text-neutral-800 hover:bg-neutral-800 hover:text-lime-400 md:mt-0">
        <Link to="/upload">
          <p >UPLOAD AN IMAGE <SlCamera className="mx-auto" size={'50'}/></p>
        </Link>
      </button>
      </div>
    
      {/* Hope this works! */}
      <ImageCard />
      <div className="max-w-sm bg-gray-200 rounded shadow-lg p-8 m-10">
        <div className="font-bold text-green-700 text-xl mb-3">
          Image title by Author
        </div>
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-full mb-3"
        />
        <div className="text-neutral-800 mb-3 pb-3 text-md md:mt-0">
          <p className="text-xs pb-3"> Date Added: </p>
          <p className="text-green-700">
            This is the description info of the image the user uploads.
          </p>
        </div>
        <div className="font-bold text-neutral-800 text-md mb-3">
          Comments:
          <div className="inline-block text-sm px-4 py-2 mx-5 border rounded border-lime-500 hover:bg-lime-500 hover:text-white">
            Add Comment
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
