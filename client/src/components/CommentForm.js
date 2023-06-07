import React, { useState } from "react";
import { ADD_COMMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const CommentForm = () => {
  const [commentText, setCommentText] = useState("");
  const [addComment] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        // From Comment typeDef and resolvers
        variables: {
          imageId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCommentText(value);
  };

  return (
    <div className="antialiased text-gray-900 px-6">
      <div className="max-w-xl mx-auto py-12 md:max-w-4x1">
        <div className="py-12">
          <h2 className="text-4xl font-bold">Add Comment:</h2>
          <form
            className="mt-8 px-5 py-5 pb-10 max-w-md border border-neutral-800 rounded-xl"
            onSubmit={handleFormSubmit}
          >
            <textarea
              className="form-textarea mt-1 block w-full h-24 rounded-md border-gray-300 shadow-sm focus:border-lime-400 focus:ring-lime-300 focus:ring focus:ring-opacity-50"
              name="commentText"
              value={commentText}
              placeholder="Add your comment..."
              onChange={handleChange}
            ></textarea>
            <button
              className="inline block text-md font-bold px-5 py-3 border rounded border-lime-500 hover:bg-lime-500 hover:text-white"
              type="submit"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
