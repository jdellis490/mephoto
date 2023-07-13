import React from "react";
import { Link } from "react-router-dom";


const ImageGallery = ({ imageCards }) => {
  if (!imageCards.length) {
    return <h3> No Images yet!</h3>
  }

  return (
    <div className="mx-auto p-5 m-10">
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {imageCards && imageCards.map((imageCard) => (
          <div
            key={imageCard._id}
            className="bg-gray-200 rounded shadow-lg px-5 py-2 m-2 font-bold text-3xl"
          >
            <div className="m-2 text-lime-500">
              {imageCard.title} <br />
              <span className="text-xl text-neutral-700"> by: {imageCard.imageAuthor}</span>
            </div>
            <Link to={`/imageCards/${imageCard._id}`}>
            <img className="w-auto h-auto mb-3 rounded-lg border border-black bg-neutral-100" src={imageCard.imageUrl} alt="" />
            </Link>
            <p className="text-neutral-800 pb-5 text-xs text-left">
                Date Added: {imageCard.createdAt}{" "}
              </p>
            <div className="border rounded border-dashed border-neutral-500 mb-10 text-md md:mt-0">
              <p className="text-green-700 text-base px-3 py-6">
                {imageCard.description}
              </p>              
            </div>
            <div className="font-bold text-neutral-800 text-lg mb-3">
              {/* Comments: */}
              <Link to={`/imageCards/${imageCard._id}`}>
              <button className="inline-block text-sm px-4 py-2 mx-5 border rounded border-lime-500 hover:bg-lime-500 hover:text-white">
                Click to add a comment!
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
