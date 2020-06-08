import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import LineInput from "components/common/formElements/lineInput";
import TextAreaInput from "components/common/formElements/textAreaInput";
import { useHistory } from "react-router-dom";
import { config } from "config/config";
import Skeleton from "react-loading-skeleton";

function ManageArticleLayout({
  selectedArticle,
  onChange,
  publishArticle,
  saving,
  showSkeleton,
  pageHeading,
  formError
}) {
  let history = useHistory();
  return (
    <div className="app-form manage-article">
      <Row className="main-container">
        <Col xs="12" md={{ span: 8, offset: 2 }}>
          <p className="main-heading">{pageHeading}</p>
          <p className="mandatory-text">
            All fields are mandatory except tags *
          </p>
          {showSkeleton ? (
            <>
              <Skeleton
                className="manage-article-skeleton"
                count={4}
                width="80%"
              />
            </>
          ) : (
            <>
              <LineInput
                placeholder="Article Title"
                onChange={onChange}
                name="title"
                type="text"
                value={selectedArticle.title}
                error={formError.title ? "Mandatory field" : ""}
              />
              <LineInput
                name="description"
                placeholder="What's this article about?"
                onChange={onChange}
                value={selectedArticle.description}
                type="text"
                error={formError.description ? "Mandatory field" : ""}
              />

              <TextAreaInput
                name="body"
                placeholder="Write your article (in markdown)"
                onChange={onChange}
                value={selectedArticle.body}
                componentClassName="article-body-container"
                error={formError.body ? "Mandatory field" : ""}
              />

              <LineInput
                name="tagList"
                placeholder="Attach tags (must be comma separated)"
                onChange={onChange}
                value={selectedArticle.tagList.map((tag, index) => {
                  if (index === selectedArticle.tagList.length - 1) {
                    return tag;
                  } else {
                    return tag;
                  }
                })}
                type="text"
              />

              <Button
                variant="success"
                className="active-button"
                onClick={publishArticle}
              >
                {saving ? "Publishing..." : "Publish"}
              </Button>
              <Button
                variant="outline-success"
                className="cancel-button active-button"
                onClick={() => {
                  history.push(config.ARTICLES_PAGE_URI);
                }}
              >
                Go To Articles
              </Button>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

ManageArticleLayout.propTypes = {
  selectedArticle: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  publishArticle: PropTypes.func.isRequired,
  showSkeleton: PropTypes.bool
};

export default ManageArticleLayout;
