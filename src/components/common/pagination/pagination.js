import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function ArticlePagination({
  loadList,
  dataLimit,
  totalNumberOfItem
}) {
  let [currentPageNumber, setCurrentPageNumber] = useState(1);
  let getPaginationMarkup = () => {
    let paginationButtonsCount = totalNumberOfItem / dataLimit;
    let buttonMarkup = [];

    for (let i = 0; i < paginationButtonsCount; i++) {
      buttonMarkup.push(
        <Button
          variant="outline-success"
          className={currentPageNumber === i + 1 ? "selected" : ""}
          onClick={e => {
            setCurrentPageNumber(i + 1);
            e.stopPropagation();
            loadList(i * 10);
          }}
          value={i}
          key={i}
        >
          {i + 1}
        </Button>
      );
    }

    return buttonMarkup;
  };

  return <div>{getPaginationMarkup()}</div>;
}
