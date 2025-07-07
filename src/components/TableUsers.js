import Table from "react-bootstrap/Table";
import React, { use, useEffect, useState } from "react";

import { fetchAllUsers } from "../services/UserService";
const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    let res = await fetchAllUsers();
    if (res) {
      setListUsers(res);
    }
  };
  console.log("listUsers", listUsers);
  // email: "Sincere@april.biz";
  // id: 1;
  // name: "Leanne Graham";
  // username: "Bret";
  // website: "hildegard.org";
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
export default TableUsers;
