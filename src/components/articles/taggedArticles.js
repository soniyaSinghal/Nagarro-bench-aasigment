import React from "react";
import SpecialArticles from "./specialArticles";

const TaggedArticles = ({ history, ...props }) => {
  let tagName =
    props.location && props.location.state && props.location.state.tagName
      ? props.location.state.tagName
      : "";

  return (
    <SpecialArticles isFav={false} isTagAssociated={true} tagName={tagName} />
  );
};

export default TaggedArticles;
