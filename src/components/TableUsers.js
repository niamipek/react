import Table from "react-bootstrap/Table";
import React, { use, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchAllUsers } from "../services/UserService";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import _, { set } from "lodash";
const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;
  const offset = currentPage * usersPerPage;
  const currentUsers = listUsers.slice(offset, offset + usersPerPage);
  const [isShowModalAddNew, setShowModalAddNew] = useState(false);
  const [isShowModalEditUser, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleClose = () => {
    setShowModalAddNew(false);
    setIsShowModalEdit(false);
}
  const handleUpdateTableUser = (user) => {
    setListUsers([user, ...listUsers]);
  };
  let totalUser = 0;
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    let res = await fetchAllUsers();
    if (res) {
      console.log("check res", res.length);
      totalUser = res.length;
      console.log("totalUser", totalUser);
      setTotalUsers(totalUser);
      setListUsers(res);
    }
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index=listUsers.findIndex(item => item.id === user.id);
    cloneListUsers[index].name = user.name;
    cloneListUsers[index].username = user.username;
setListUsers(cloneListUsers);
  }
  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List User:</b>
        </span>
        <button
          className="btn btn-primary"
          onClick={() => setShowModalAddNew(true)}
        >
          Add new user
        </button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers &&
            currentUsers.length > 0 &&
            currentUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-2"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={5}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={() => setShowModalAddNew(false)}
        handleUpdateTableUser={handleUpdateTableUser}
      />
      <ModalEditUser
        show={isShowModalEditUser}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
      />
    </>
  );
};
export default TableUsers;
