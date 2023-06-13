import React from "react";
// Import the `useParams()` hook
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_IMAGECARD } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

const SingleImageCard = ( ) => {
  // Use `useParams()` to get value of route parameter `:imageId`
  const { imageId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_IMAGECARD, {
    //pass URL id parameter
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
      <img className="w-full mb-3 rounded-lg" src={imageCard.imageUrl} alt="" />
      <div className="text-neutral-800 mb-3 pb-3 text-md md:mt-0">
        <p className="text-xs pb-3"> Date Added: {imageCard.createdAt} </p>
        <p className="text-green-700">
          {imageCard.description}
        </p>
      </div>
      {/* TODO: Add Comments in list form and a button to add comments on image */}
      <div className="font-bold text-neutral-800 text-md mb-3">
        Comments:
        <CommentList comments={imageCard.comments} />
        <CommentForm imageId={imageCard._id} />
      </div>
    </div>
  );
};

export default SingleImageCard;
