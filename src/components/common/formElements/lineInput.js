import React from "react";
import PropTypes from "prop-types";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LineInput = ({
  placeholder,
  componentClassName,
  name,
  value,
  onChange,
  error,
  type,
  maxLength
}) => {
  return (
    <div className="custom-line-input-container">
      <input
        type={type ? type : "text"}
        placeholder={placeholder}
        name={name}
        className={`${
          componentClassName ? componentClassName : "custom-line-input"
        } ${error ? " error" : ""}`}
        value={value}
        onChange={onChange}
        maxLength={maxLength ? maxLength : ""}
        autoComplete="false"
      ></input>
      {error && (
        <div className="line-error">
          <FontAwesomeIcon icon={faInfoCircle} className="error-info-icon" />
          {error}
        </div>
      )}
    </div>
  );
};

LineInput.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  componentClassName: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number
};

export default LineInput;
