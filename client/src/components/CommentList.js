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
              <div className="p-3 bg-gray-200 text-green-700">
                <h5>
                  {comment.commentAuthor} said{" "}
                  <span> on {comment.createdAt}</span>
                </h5>
                <p className="text-green-700 text-base text-center py-6">
                  {comment.commentText}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
