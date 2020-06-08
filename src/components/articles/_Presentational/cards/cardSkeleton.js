import React from "react";
import Skeleton from "react-loading-skeleton";

export default function CardSkeleton() {
  return (
    <div className="card-container">
      <div className="card-header-container">
        <div className="image-container">
          <Skeleton width="3rem" />
        </div>
        <div className="text-container">
          <p>
            <Skeleton width="10rem" />
          </p>
          <p>
            <Skeleton width="10rem" />
          </p>
        </div>
      </div>
      <div className="card-body-container">
        <p>
          <Skeleton width="20rem" height="2rem" />
        </p>
        <p>
          <Skeleton width="25rem" />
        </p>
      </div>
    </div>
  );
}
