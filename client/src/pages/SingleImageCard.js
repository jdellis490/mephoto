import React from "react";
// Import the `useParams()` hook
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_IMAGECARD } from "../utils/queries";
import { DELETE_IMAGECARD } from "../utils/mutations";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import Auth from "../utils/auth";

const SingleImageCard = () => {
  // Use `useParams()` to get value of route parameter `:imageId`
  const { imageId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_IMAGECARD, {
    //pass URL id parameter
    variables: { imageId: imageId },
  });

  const imageCard = data?.imageCard || {};

  if (loading) {
    return <div>Getting image...</div>;
  }

  // Delete images
  const DeleteImageButton = ({ imageId }) => {
    const navigate = useNavigate();
    const [deleteImageCard, { error }] = useMutation(DELETE_IMAGECARD);
    const handleDelete = async (event) => {
      event.preventDefault();
      // User must have auth with login and be the image author to delete
      if (
        Auth.loggedIn() &&
        Auth.getProfile().data.username === imageCard.imageAuthor
      ) {
        try {
          deleteImageCard({
            variables: { imageId },
          });
          navigate("/");
          window.location.reload();
        } catch (err) {
          console.error(err);
        }
      } else return alert("Not Authorized!");
    };
    return (
      <div className="flex justify-end">
        <button
          className="leading-relaxed text-sm text-red-500 font-bold px-3 py-2 border rounded border-red-500 bg-neutral-200 hover:bg-red-500 hover:border-neutral-900 hover:text-white"
          onClick={handleDelete}
        >
          Delete
        </button>
        {error && (
          <div className="inline block text-sm text-red-500 italic bg-red-100 rounded p-1 mt-1">
            {error ? "Unable to delete" : error.message}
          </div>
        )}
      </div>
    );
  };

  //ImageCard model props into JSX for rendering single image
  return (
    <div className="mx-auto max-w-2xl bg-neutral-200 rounded shadow-lg p-8 m-10">
      <div className="font-bold text-3xl mb-3">
        {imageCard.title} by:{" "}
        <span className="text-lime-600">{imageCard.imageAuthor} </span>
        {Auth.loggedIn() &&
        Auth.getProfile().data.username === imageCard.imageAuthor ? (
          <DeleteImageButton imageId={imageCard._id} />
        ) : (
          ""
        )}
      </div>
      <img
        className="w-full mb-3 rounded-lg border border-black bg-neutral-100"
        src={imageCard.imageUrl}
        alt=""
      />
      <div className="text-neutral-800 mb-3 pb-3 text-md md:mt-0">
        <p className="text-xs pb-3"> Date Added: {imageCard.createdAt} </p>
        <p className="px-4 py-5 text-xl text-center font-bold border border-black bg-neutral-100 rounded-lg">
          {imageCard.description}
        </p>
      </div>
      <div className="px-3 py-3 font-bold text-neutral-800 text-md border border-black border-dashed bg-neutral-300 rounded-xl">
        <div className="mb-3 text-gray-700 text-xl">Comments:</div>
        {/* Creates JSX elements with props of destructured components */}
        <CommentList comments={imageCard.comments} />
        <CommentForm imageId={imageCard._id} />
      </div>
    </div>
  );
};

export default SingleImageCard;
