import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap";

function CommentCard({ comment, deleteComment }) {
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let loggedInUsername =
    userDetails && userDetails.username ? userDetails.username : "";
  return (
    <Row>
      <Col
        className="comment-container"
        xs={{ span: 10, offset: 1 }}
        lg={{ span: 6, offset: 3 }}
      >
        <p className="comment-body">{comment.body}</p>
        <div className="comment-footer">
          <p className="author-name">{comment.author.username}</p>
          <FontAwesomeIcon
            icon={faClock}
            className="clock-icon"
          ></FontAwesomeIcon>
          <span>{moment(comment.updatedAt).format("MMMM DD,YYYY")}</span>
          {loggedInUsername === comment.author.username && (
            <div className="action-icon-container">
              <FontAwesomeIcon
                icon={faTrash}
                className="delete-icon"
                onClick={() => deleteComment(comment.id)}
              ></FontAwesomeIcon>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
}

CommentCard.propTypes = {
  comment: PropTypes.object,
  deleteComment: PropTypes.func.isRequired
};

export default CommentCard;
