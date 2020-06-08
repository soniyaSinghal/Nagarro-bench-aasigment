import React from "react";
import PropTypes from "prop-types";
import LineInput from "components/common/formElements/lineInput";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { config } from "config/config";

const LoginPageLayout = ({ onChange, loginUser, error, userDetails }) => {
  return (
    <Row className="main-container">
      <Col xs="12" md={{ span: 4, offset: 4 }}>
        <p className="main-heading">Sign in</p>
        <Link to={config.REGISTER_PAGE_URI} className="have-account-text">
          Need an account?
        </Link>
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
          error={error.passwordError ? "Please provide the correct value" : ""}
          type="password"
        />
        <Button variant="success" className="active-button" onClick={loginUser}>
          Sign in
        </Button>
      </Col>
    </Row>
  );
};

LoginPageLayout.propTypes = {
  onChange: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  error: PropTypes.object,
  userDetails: PropTypes.object.isRequired
};

export default LoginPageLayout;
