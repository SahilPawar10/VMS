import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmDelete({
  showModal,
  hideModal,
  confirmDelete,
  id,
  message,
  confirmtype,
}) {
  const title = confirmtype ? (
    <Modal.Title> {confirmtype}</Modal.Title>
  ) : (
    <Modal.Title> Delete Confirmation</Modal.Title>
  );
  return (
    <>
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <div className="alert alert-danger">{message}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={hideModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              confirmDelete(id);
            }}
          >
            {confirmtype ? "Logout" : "Delete"}
            {/* Delete */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmDelete;
