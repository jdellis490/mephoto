import React from "react";

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3> No Comments yet!</h3>;
  }

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
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
