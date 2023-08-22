import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ModalComponent = (props) => {
  const { isShow, handleHide } = props;
  return (
    <Modal show={isShow} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleHide}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
