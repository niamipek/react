import { Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { putUpdateUser,handleEditUserFromModal } from "../services/UserService";
import { toast } from "react-toastify";
const ModalEditUser = (props) => {
  const { show, handleClose ,dataUserEdit,handleEditUserFromModal} = props;
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
    const handleEditUser = async() => {
        let res= await putUpdateUser(name, username,dataUserEdit.id);
        if(res) {
          handleEditUserFromModal({
            name: name,
            username: username,
            id: dataUserEdit.id
            
          });
        handleClose();
        toast.success("Update user succeed!");
    }
  }
  const handleSaveUser = (name, username) => {
    if (!name || !username) {
      alert("Missing required parameters!");
      return;
    }
    handleClose();
  };
  useEffect(() => {
    if(show){
        setName(dataUserEdit.name);
        setUsername(dataUserEdit.username);
    }
  },[dataUserEdit])
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
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
          <Button variant="primary" onClick={()=>handleEditUser()}>
            Confirm 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalEditUser;