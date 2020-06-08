import React from "react";
import PropTypes from "prop-types";
import LineInput from "components/common/formElements/lineInput";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { config } from "config/config";
const RegisterPageLayout = ({ onChange, registerUser, userDetails, error }) => {
  return (
    <Row className="main-container">
      <Col xs="12" md={{ span: 4, offset: 4 }}>
        <p className="main-heading">Sign Up</p>
        <Link to={config.LOGIN_PAGE_URI} className="have-account-text">
          Already have an account?
        </Link>
        <LineInput
          placeholder="User Name"
          onChange={onChange}
          name={userDetails.username}
          error={error.nameError ? "Please provide the correct value" : ""}
          type="text"
          maxLength={20}
        />
        <LineInput
          placeholder="Email"
          onChange={onChange}
          name={userDetails.email}
          error={error.emailError ? "Please provide the correct value" : ""}
          type="email"
        />
        <LineInput
          placeholder="Password"
          onChange={onChange}
          name={userDetails.password}
          error={
            error.passwordError
              ? "Password must have at least 8 characters"
              : ""
          }
          type="password"
        />
        <Button
          variant="success"
          className="active-button"
          onClick={registerUser}
        >
          Sign Up
        </Button>
      </Col>
    </Row>
  );
};

RegisterPageLayout.propTypes = {
  onChange: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired
};

export default RegisterPageLayout;
