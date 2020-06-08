import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

function ConfirmationModal({
  modalHeading,
  modalMessage,
  modalPrimaryButton,
  modalSecondaryButton,
  showModal,
  closeModalHandler,
  primaryButtonHandler
}) {
  const [show, setShow] = useState(showModal);

  /**
   * @description This method will update the state to show modal
   * also call the parent's method
   */
  const handleClose = () => {
    setShow(false);
    closeModalHandler();
  };

  /**
   * @description This method will call the method to close the modal
   * also call the perant's method
   */
  const primaryButtonAction = () => {
    primaryButtonHandler();
    handleClose();
  };

  /**
   * @description React life cycle method
   */
  useEffect(() => {
    setShow(showModal);
  }, [showModal]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={true}
      centered
      className="confirmation-modal"
    >
      <Modal.Header closeButton className="confirmation-modal_header">
        <Modal.Title>{modalHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="confirmation-modal_body">
        {modalMessage}
      </Modal.Body>
      <Modal.Footer className="confirmation-modal_footer">
        <Button
          variant="secondary"
          onClick={primaryButtonAction}
          className="confirmation-modal_footer_btn-primary"
        >
          {modalPrimaryButton}
        </Button>
        <Button
          variant="primary"
          onClick={handleClose}
          className="confirmation-modal_footer_btn-secondary"
        >
          {modalSecondaryButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  modalHeading: PropTypes.string.isRequired,
  modalMessage: PropTypes.string.isRequired,
  modalPrimaryButton: PropTypes.string.isRequired,
  modalSecondaryButton: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeModalHandler: PropTypes.func.isRequired,
  primaryButtonHandler: PropTypes.func.isRequired
};

export default ConfirmationModal;
