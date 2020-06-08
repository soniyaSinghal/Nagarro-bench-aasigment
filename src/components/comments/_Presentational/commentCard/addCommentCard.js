import React from "react";
import PropTypes from "prop-types";
import TextAreaInput from "components/common/formElements/textAreaInput";
import { Row, Col, Button } from "react-bootstrap";

function AddCommentCard({ formError, comment, onChange, postComment }) {
  return (
    <Row>
      <Col
        className="add-comment-container"
        xs={{ span: 10, offset: 1 }}
        lg={{ span: 6, offset: 3 }}
      >
        <TextAreaInput
          name="body"
          placeholder="Write your comment"
          onChange={onChange}
          value={comment.body}
          componentClassName="comment-area"
          error={formError.body ? "Please write your comment" : ""}
        />
        <div className="comment-footer">
          <Button
            variant="success"
            className="post-comment"
            onClick={postComment}
          >
            Post Comment
          </Button>
        </div>
      </Col>
    </Row>
  );
}

AddCommentCard.propTypes = {
  formError: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired
};

export default AddCommentCard;
