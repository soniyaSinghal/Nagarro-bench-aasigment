import React from "react";
import PropTypes from "prop-types";
import CommentCard from "./commentCard/commentCard";
import AddCommentCard from "./commentCard/addCommentCard";

function CommentsLayout({
  commentsList,
  formError,
  comment,
  onChange,
  postComment,
  deleteComment
}) {
  return (
    <>
      <AddCommentCard
        formError={formError}
        comment={comment}
        onChange={onChange}
        postComment={postComment}
      />
      {commentsList.length &&
        commentsList.map(comment => {
          return (
            <CommentCard
              comment={comment}
              key={comment.id}
              deleteComment={deleteComment}
            />
          );
        })}
    </>
  );
}

CommentsLayout.propTypes = {
  commentsList: PropTypes.array,
  formError: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
};

export default CommentsLayout;
