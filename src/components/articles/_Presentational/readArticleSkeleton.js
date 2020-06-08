import React from "react";
import Skeleton from "react-loading-skeleton";

function ReadArticleSkeleton() {
  return (
    <div className="read-article">
      <div className="banner">
        <p className="banner-title">
          <Skeleton width="20rem" />
        </p>
        <div>
          <Skeleton width="0" height="3rem" />
          <div className="info">
            <p className="name">
              <Skeleton width="25rem" />
            </p>
            <p className="date">
              <Skeleton width="20rem" />
            </p>
          </div>
          <div className="fav">
            <Skeleton width="10rem" />
          </div>
        </div>
      </div>
      <section className="content-container">
        <label className="content-label">Description</label>
        <p className="article-text">
          <Skeleton width="50rem" />
        </p>
        <label className="content-label">Tags</label>
        <p>
          <Skeleton width="30rem" />
        </p>
        <p>
          <Skeleton width="30rem" />
        </p>
      </section>
    </div>
  );
}

export default ReadArticleSkeleton;
