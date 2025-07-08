import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import ModalAddNew from "./components/ModalAddNew";
import React, { useState } from "react";
function App() {
  const [isShowModalAddNew, setShowModalAddNew] = useState(false);

  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 add-new" >
          <span><b>List User:</b></span>
          <button className="btn btn-primary" 
          onClick={()=>setShowModalAddNew(true)}>Add new user</button>
        </div>
        <TableUsers />
      </Container>
    
    <ModalAddNew
    show={isShowModalAddNew}
    handleClose={() => setShowModalAddNew(false)}/>
    
    </div>
  );
}

export default App;
