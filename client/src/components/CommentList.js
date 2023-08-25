import React from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_COMMENT } from "../utils/mutations";
import { QUERY_SINGLE_IMAGECARD } from "../utils/queries";
import Auth from "../utils/auth";

// Destructure comments array and pass props to use in CommentList function
const CommentList = ({ comments = [] }) => {
  const { imageId } = useParams();
  const { data } = useQuery(QUERY_SINGLE_IMAGECARD, {
    //pass URL id parameter
    variables: { imageId: imageId },
  });
  if (!comments.length) {
    return <h3> No Comments yet!</h3>;
  }
  // Delete comments only if user has auth and is logged in
  const DeleteCommentButton = ({ commentId }) => {
    const [deleteComment, { loading, error }] = useMutation(DELETE_COMMENT);
    const handleDeleteComment = async (event) => {
      event.preventDefault();
      const userComment = comments.find(
        (comment) =>
          comment.commentAuthor === Auth.getProfile().data.username &&
          commentId === comment._id
      );
      if (
        Auth.loggedIn() &&
        Auth.getProfile().data.username === userComment.commentAuthor
      ) {
        try {
          deleteComment({
            variables: { imageId, commentId },
          });
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      } else return alert("Not Authorized");
    };
    return (
      <div className="flex justify-end">
        <button
          className="text-sm text-red-500 font-bold p-2 border border rounded-lg border-red-500 bg-neutral-200 hover:bg-red-500 hover:border-neutral-900 hover:text-white"
          onClick={handleDeleteComment}
          disabled={loading}
        >
          {loading ? "Deleting..." : "X"}
        </button>
        {error && (
          <div className="inline block text-sm text-red-500 italic bg-red-100 rounded p-1 mt-1">
            {error ? "Unable to delete" : error.message}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-col">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <h5 className="text-lime-600 text-xl">
                {comment.commentAuthor}
                <span className="text-black text-xs">
                  {" "}
                  said on {comment.createdAt}:
                </span>
              </h5>
              <div className="p-3 bg-lime-400 rounded-lg border border-green-700 text-xl">
                <p className="text-base p-2">{comment.commentText}</p>
                {/* Delete button doesn't appear unless user is logged in, has auth, and is the author */}
                {Auth.loggedIn() &&
                Auth.getProfile().data.username === comment.commentAuthor ? (
                  <DeleteCommentButton commentId={comment._id} />
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
