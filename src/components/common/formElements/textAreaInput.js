import React from "react";
import PropTypes from "prop-types";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextAreaInput = ({
  placeholder,
  componentClassName,
  name,
  value,
  onChange,
  error,
  maxLength,
  disabled
}) => {
  return (
    <div className="custom-line-input-container">
      <textarea
        placeholder={placeholder}
        name={name}
        className={`${
          componentClassName
            ? `${componentClassName} custom-line-input`
            : "custom-line-input"
        } ${error ? " error" : ""}`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength ? maxLength : ""}
      ></textarea>
      {error && (
        <div className="line-error">
          <FontAwesomeIcon icon={faInfoCircle} className="error-info-icon" />
          {error}
        </div>
      )}
    </div>
  );
};

TextAreaInput.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  componentClassName: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number
};

export default TextAreaInput;
