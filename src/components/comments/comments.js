import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentsLayout from "./_Presentational/commentsLayout";
import {
  loadComments,
  saveComment,
  deleteComment
} from "redux/actions/commentAction";
import { toast } from "react-toastify";

export function Comments({ slug, saveComment, deleteComment, ...props }) {
  let { commentsList } = props;
  let commentMockData = { comment: { body: "" } };
  let [comment, setComment] = useState(commentMockData);
  let [formError, setFormError] = useState({});
  let [commentsListing, setCommentsListing] = useState(commentsList);

  /**
   * @description React life cycle method
   */
  useEffect(() => {
    setCommentsListing([...commentsList]);
  }, [commentsList.length, commentsList]);

  /**
   *
   * @param {Object} event
   * @description This method will update the state with provided data
   */
  let onChangeHandler = event => {
    let { name, value } = event.target;
    if (value) {
      setFormError(preError => {
        return {
          ...preError.comment,
          [name]: !Boolean(value)
        };
      });
    }
    setComment(prevComment => {
      prevComment.comment[name] = value;
      return {
        ...prevComment
      };
    });
  };

  /**
   *
   * @param {Object} comment
   * @description This method will validate the comment form
   */
  let isValid = comment => {
    let errorMap = {};

    if (!comment.body) {
      errorMap.body = true;
    }

    setFormError(errorMap);
    return !Boolean(Object.keys(errorMap).length);
  };

  /**
   * @description This method will dispatch an action to save comment if valid
   */
  let postCommentHandler = () => {
    if (!isValid(comment.comment)) {
      return;
    }

    saveComment(slug, comment).then(() => {
      setComment(commentMockData);
      toast.success("Comment has added");
    });
  };

  /**
   *
   * @param {Boolean} commentId
   * @description This method will dispatch an action to delete comment
   */
  let deleteCommentHandler = commentId => {
    deleteComment(slug, commentId).then(() => {
      toast.success("Comment has deleted");
    });
  };

  return (
    <div>
      {
        <CommentsLayout
          commentsList={commentsListing}
          formError={formError}
          comment={comment.comment}
          onChange={onChangeHandler}
          postComment={postCommentHandler}
          deleteComment={deleteCommentHandler}
        />
      }
    </div>
  );
}

Comments.propTypes = {
  slug: PropTypes.string,
  commentsList: PropTypes.array
};

const mapStateToProps = state => {
  return {
    loading: state.apiCallsInProgress > 0,
    commentsList: state.comments.commentsList ? state.comments.commentsList : []
  };
};

const mapDispatchToProps = {
  loadComments,
  saveComment,
  deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
