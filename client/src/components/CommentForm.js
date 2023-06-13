import React, { useState } from "react";
import { ADD_COMMENT } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const CommentForm = ({ imageId }) => {
  const [commentText, setCommentText] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT);

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
    if (name === "commentText") {
    setCommentText(value);
    }   
  };

  return (
    <div className="antialiased text-gray-900">
      <div className="max-w-xl mx-auto py-1 md:max-w-4x1">
          {/* <h2 className="text-2xl font-bold">Comment:</h2> */}
          {Auth.loggedIn() ? (
          <form
            className="mt-8 px-5 py-5 pb-10 max-w-md border border-neutral-800 rounded-xl"
            onSubmit={handleFormSubmit}
          >
            <textarea
              className="form-textarea mt-1 mb-5 block w-full h-24 rounded-md border-gray-300 shadow-sm focus:border-lime-400 focus:ring-lime-300 focus:ring focus:ring-opacity-50"
              name="commentText"
              value={commentText}
              placeholder="Add your comment..."
              onChange={handleChange}
            ></textarea>
            <button
              className="inline block text-md font-bold px-5 py-3 border rounded border-lime-500 hover:bg-lime-500 hover:text-white"
              type="submit"
            >
              Add Comment
            </button>
            {error && (
                  <div className="text-red-500 italic bg-red-100 rounded p-1">
                    {error.message}
                  </div>
                )}
          </form>
          ) : (
            <div className="container mt-5 p-5 bg-gray-200 rounded-xl shadow border text-xl">
            <p>
              Please{" "}
              <Link
                className="text-lime-600 underline font-bold"
                to="/login"
              >
                Login
              </Link>{" "}
              or{" "}
              <Link
                className="text-lime-600 underline font-bold"
                to="/signup"
              >
                Signup
              </Link>{" "}
              to add your comments!
            </p>
          </div>
          )}
      </div>
    </div>
  );
};

export default CommentForm;
