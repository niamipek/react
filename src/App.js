import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home";
import { Router, Route, Link, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <div className="app-container"><Header />
        <Container>
         
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
