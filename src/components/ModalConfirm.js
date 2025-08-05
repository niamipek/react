import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { deleteUser } from "../services/UserService";
const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFromModal } =
    props;
  const confirmDelete = async () => {
    let res = await deleteUser(dataUserDelete.id);
    console.log("check res delete", res);
    let status = await res.status;
    if (status === 200) {
      toast.success("Delete user succeed!");
      handleClose();
      handleDeleteUserFromModal(dataUserDelete);
    } else {
      toast.error("Delete user failed!");
      handleClose();
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Are u sure you want to delete this user? Do you want to proceed?{" "}
            <br />
            <b>Email:{dataUserDelete.email}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalConfirm;
