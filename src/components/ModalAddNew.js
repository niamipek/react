import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import { postCreateNewUser } from "../services/UserService";
import { toast } from "react-toastify";
const ModalAddNew = (props) => {
  const { show, handleClose,handleUpdateTableUser } = props;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const handleSaveUser = async (name, username) => {
    let res = await postCreateNewUser(name, username);
    console.log("check res:", res);
    if (res && res.data && res.data.id) {
      handleClose();
      setName("");
      setUsername("");
      toast.success("Create a new user successfully!");
      handleUpdateTableUser({name: name, username: username, id: res.data.id});
    } else {
      toast.error("Something went wrong...");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleSaveUser(name, username)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalAddNew;
