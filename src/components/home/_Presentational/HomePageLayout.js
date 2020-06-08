import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import Articles from "components/articles/articles";
import { config } from "config/config";

function HomePageLayout({ tags, loading, articles }) {
  let history = useHistory();
  let userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let loggedInUsername =
    userDetails && userDetails.username ? userDetails.username : "";

  const getTagsMarkup = tags => {
    let tagMarkup = tags.map(tag => {
      return (
        <span
          key={tag}
          className={`tag-name ${loggedInUsername ? "" : "disabled"}`}
          onClick={event => {
            tagClickHandler(event, tag);
          }}
        >
          {tag}
        </span>
      );
    });

    return <div className="tag-container">{tagMarkup}</div>;
  };
  let tagClickHandler = (event, tag) => {
    event.stopPropagation();
    if (loggedInUsername) {
      history.push(config.TAGGED_ARTICLE_PAGE_URL, { tagName: tag });
    } else {
      event.preventDefault();
    }
  };
  let showAllArticles = () => {
    history.push(config.ARTICLES_PAGE_URI);
  };
  return (
    <>
      <div className="header-container">
        <div className="container-content">
          <p className="logo-text">Portal</p>
          <p className="content-text">A place to share your knowledge.</p>
        </div>
      </div>
      <Row className="home-page-container">
        <Col lg="8" className="left-section">
          <Articles articlesData={articles} loading={loading} />
          <Button
            variant="success"
            className="view-all"
            onClick={() => {
              showAllArticles();
            }}
          >
            Show All
          </Button>
        </Col>
        <Col lg="1" />
        <Col lg="3" className="right-section">
          <p className="tag-heading">Popular Tags</p>
          {loading ? (
            <SkeletonTheme highlightColor="#eff1f6" color="##6361611a">
              <Skeleton count={5} style={{ marginBottom: "1rem" }} />
            </SkeletonTheme>
          ) : (
            <Fragment>{getTagsMarkup(tags)}</Fragment>
          )}
        </Col>
      </Row>
    </>
  );
}

HomePageLayout.propTypes = {
  tags: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  articlesData: PropTypes.object
};

export default HomePageLayout;
