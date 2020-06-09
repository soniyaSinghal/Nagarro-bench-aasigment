import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import LineInput from "components/common/formElements/lineInput";
import TextAreaInput from "components/common/formElements/textAreaInput";
import { useHistory } from "react-router-dom";
import { config } from "config/config";
import Skeleton from "react-loading-skeleton";

function SettingsPageLayout({
  userDetails,
  onChange,
  formError,
  loading,
  pageHeading,
  UpdateUserDetails
}) {
  let history = useHistory();
  return (
    <div className="app-form manage-article settings">
      <Row className="main-container">
        <Col xs="12" md={{ span: 8, offset: 2 }}>
          <p className="main-heading">{pageHeading}</p>
          {loading || !userDetails ? (
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
                name="image"
                placeholder="URL of Profile Picture"
                onChange={onChange}
                value={userDetails.image ? userDetails.image : ""}
                type="text"
                error={formError.image ? "Mandatory field" : ""}
              />

              <LineInput
                name="username"
                placeholder="User name"
                onChange={onChange}
                value={userDetails.username ? userDetails.username : ""}
                error={formError.username ? "Mandatory field" : ""}
              />

              <TextAreaInput
                placeholder="Short Bio about you"
                onChange={onChange}
                name="bio"
                type="text"
                value={userDetails.bio ? userDetails.bio : ""}
              />
              <LineInput
                name="email"
                placeholder="New Password"
                onChange={onChange}
                value={userDetails.email ? userDetails.email : ""}
                disabled={true}
              />
              <LineInput
                type="password"
                name="password"
                placeholder="New Password"
                onChange={onChange}
                value={userDetails.password ? userDetails.password : ""}
                error={formError.password ? "Mandatory field" : ""}
              />

              <Button
                variant="success"
                className="active-button"
                onClick={UpdateUserDetails}
              >
                Update Settings
              </Button>
              <Button
                variant="outline-success"
                className="cancel-button active-button"
                onClick={() => {
                  history.push(config.HOME_PAGE_URI);
                }}
              >
                Go To Home
              </Button>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

SettingsPageLayout.propTypes = {
  userDetails: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  UpdateUserDetails: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default SettingsPageLayout;
