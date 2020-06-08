import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LineInput from "components/common/formElements/lineInput";
import { Row, Col, Button } from "react-bootstrap";
import TextAreaInput from "../../../common/formElements/textAreaInput";
const SettingsPageLayout = ({ onChange, updateUser, user, error, logout }) => {
  return (
    <Row className="main-container">
      <Col xs="12" md={{ span: 4, offset: 4 }}>
        <p className="main-heading">Your Settings</p>
        <LineInput
          placeholder="User Name"
          onChange={onChange}
          error={error.nameError ? "Please provide the correct value" : ""}
          type="text"
          maxLength={20}
          value={user.username ? user.username : ""}
          name="username"
        />
        <TextAreaInput
          placeholder="Short bio about you"
          onChange={onChange}
          value={user.bio ? user.bio : ""}
          name="bio"
        />
        <LineInput
          placeholder="Email"
          onChange={onChange}
          error={error.emailError ? "Please provide the correct value" : ""}
          type="email"
          value={user.email ? user.email : ""}
          name="email"
        />
        <LineInput
          placeholder="New Password"
          onChange={onChange}
          error={
            error.passwordError
              ? "Password must have at least 8 characters"
              : ""
          }
          type="password"
          value={user.password ? user.password : ""}
          name="password"
        />
        <Button
          variant="success"
          className="active-button"
          onClick={updateUser}
        >
          Update Settings
        </Button>
        <Button
          variant="outline-danger"
          className="active-button logout"
          onClick={logout}
        >
          logout.
        </Button>
      </Col>
    </Row>
  );
};

SettingsPageLayout.propTypes = {
  onChange: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired
};

export default SettingsPageLayout;
