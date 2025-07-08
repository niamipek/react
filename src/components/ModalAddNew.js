import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
const ModalAddNew = (props) => {
  const { show, handleClose } = props;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const handleSaveUser = (name, username) => {
    if (!name || !username) {
      alert("Missing required parameters!");
      return;
    }
    console.log("check name:", name);
    console.log("check username:", username);
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={name} onChange={(event)=>setName(event.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleSaveUser(name, username)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalAddNew;
