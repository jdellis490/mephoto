import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_IMAGECARDS } from "../utils/queries";


const ImageGallery = ({ imageCards }) => {
  if (!imageCards.length) {
    return <h3> No Images yet!</h3>
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap">
        {imageCards && imageCards.map((imageCard) => (
          <div
            key={imageCard._id}
            className="bg-gray-200 basis-1/4 rounded shadow-lg p-3 m-2 font-bold text-green-700 text-2xl text-center"
          >
            <div className="m-5">
              {imageCard.title} <br />
              by: <span className="text-lime-500">{imageCard.imageAuthor}</span>
            </div>
            <img className="w-full mb-3 rounded-lg" src={imageCard.imageUrl} alt="" />
            <p className="text-neutral-800 pb-5 text-xs text-left">
                Date Added: {imageCard.createdAt}{" "}
              </p>
            <div className="border rounded border-neutral-500 mb-10 text-md md:mt-0">
              <p className="text-green-700 text-base text-center py-6">
                {imageCard.description}
              </p>              
            </div>

            {/* TODO: Find a way to link the comments to an image card */}
            <div className="font-bold text-neutral-800 text-md mb-3">
              Click here to view comments.
              <Link to={`/imageCards/${imageCard._id}`}>
              <button className="inline-block text-sm px-4 py-2 mx-5 border rounded border-lime-500 hover:bg-lime-500 hover:text-white">
                Add Comment
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
