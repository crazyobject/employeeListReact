import { Button, Modal } from 'react-bootstrap';

const DeleteCelebrity = ({
  isDeleteCelebrity,
  handleClose,
  handleDeleteCelebrity,
}) => {
  return (
    <Modal show={isDeleteCelebrity} onHide={handleClose}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>Are you sure you want to delete?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteCelebrity}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteCelebrity;
