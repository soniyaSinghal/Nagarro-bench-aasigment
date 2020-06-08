import React from "react";
import AllArticles from "./allArticles";

function Articles() {
  return (
    <div>
      <AllArticles hidePagination={true} hideContentHeading={true} />
    </div>
  );
}

export default Articles;
