import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_IMAGECARDS } from "../utils/queries";

const ImageCard = () => {
  const { loading, error, data } = useQuery(QUERY_IMAGECARDS);
  if (error) {
    return `Error! ${error}`;
  }
  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container mx-auto">
      <div className="md:flex">
        {data.imageCards.map((imageCards) => (
          <div
            key={imageCards._id}
            className="bg-gray-200 flex-wrap flex-1 rounded shadow-lg p-3 m-4 font-bold text-green-700 text-2xl text-center"
          >
            <div className="m-5">
              {imageCards.title} <br />
              by: <span className="text-lime-500">{imageCards.imageAuthor}</span>
            </div>
            <img className="w-full mb-3 rounded-lg" src={imageCards.imageUrl} alt="" />
            <p className="text-neutral-800 pb-5 text-xs text-left">
                Date Added: {imageCards.createdAt}{" "}
              </p>
            <div className="border rounded border-neutral-500 mb-10 text-md md:mt-0">
              <p className="text-green-700 text-base text-center py-6">
                {imageCards.description}
              </p>              
            </div>

            {/* TODO: Find a way to link the comments to an image card */}
            <div className="font-bold text-neutral-800 text-md mb-3">
              Comments:
              <div className="inline-block text-sm px-4 py-2 mx-5 border rounded border-lime-500 hover:bg-lime-500 hover:text-white">
                Add Comment
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;
