import React from 'react'

const Home = () => {
  return (
    <div>   <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
    <p className="text-3xl text-gray-700 font-bold mb-5">
      Welcome to Neupixl
    </p>
    <p className="text-gray-500 text-lg">Let's get started!</p>
  </div>
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
  </div></div>
  )
};

export default Home