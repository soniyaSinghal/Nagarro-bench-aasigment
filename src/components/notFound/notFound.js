import React from "react";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { config } from "config/config";

export function NotFound() {
  let history = useHistory();
  return (
    <div className="not-found-page">
      <div className="container-1">
        <FontAwesomeIcon icon={faLightbulb} />
        <span>Page Not Found</span>
      </div>

      <div className="go-to-home-container">
        <Button
          variant="success"
          onClick={() => {
            history.push(`${config.HOME_PAGE_URI}`);
          }}
        >
          Go To Home
        </Button>
      </div>
    </div>
  );
}
