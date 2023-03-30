import React from "react";
// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_IMAGECARD } from "../utils/queries";

const SingleImageCard = () => {
  // Use `useParams()` to get value of route parameter `:imageId`
  const { imageId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_IMAGECARD, {
    //pass URL parameter
    variables: { imageId: imageId },
  });

  const imageCard = data?.imageCard || {};

  if (loading) {
    return <div>Getting images...</div>;
  }

  //ImageCard model props into JSX for rendering single image
  return (
    <div className="max-w-sm bg-gray-300 rounded shadow-lg p-8 m-10">
      <div className="font-bold text-green-700 text-xl mb-3">
        {imageCard.title} by {imageCard.imageAuthor}
      </div>
      {imageCard.image}
      <img
        src="https://source.unsplash.com/random"
        alt=""
        className="w-full mb-3"
      />
      <div className="text-neutral-800 mb-3 pb-3 text-md md:mt-0">
        <p className="text-xs pb-3"> Date Added: {imageCard.createdAt} </p>
        <p className="text-green-700">
          {imageCard.description}
          This is the description info of the image the user uploads.
        </p>
      </div>
      {/* TODO: Add Comments in list form and a button to add comments on image */}
      <div className="font-bold text-neutral-800 text-md mb-3">
        Comments:
        <div className="inline-block text-sm px-4 py-2 mx-5 border rounded border-lime-500 hover:bg-lime-500 hover:text-white">
          Add Comment
        </div>
      </div>
    </div>
  );
};

export default SingleImageCard;
