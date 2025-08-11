import Table from "react-bootstrap/Table";
import React, { use, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchAllUsers } from "../services/UserService";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce, get, set } from "lodash";
import "./TableUsers.scss"; // Assuming you have a CSS file for styling
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
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
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [dataExport, setDataExport] = useState([]);
  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const handleClose = () => {
    setShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };
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
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].name = user.name;
    cloneListUsers[index].username = user.username;
    setListUsers(cloneListUsers);
  };
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
    console.log("check user delete", user);
  };
  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUsers(cloneListUsers);
  };
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
  };
  const [keyWord, setKeyWord] = useState("");
  const handleSearch = debounce((event) => {
    let term = event.target.value;
    console.log("check term", term);
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter((item) => {
        return item.email.toLowerCase().includes(term.toLowerCase());
      });
      setListUsers(cloneListUsers);
    } else {
      getUsers();
    }
  }, 2000);
  const getUsersExport = (event, done) => {
    let result = [];

    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "Name", "Username"]);
      listUsers.forEach((item) => {
        result.push([item.id, item.email, item.name, item.username]);
      });
    }

    // Đổi sang ; để Excel VN nhận dạng cột
    const csvData = result.map((row) => row.join(";")).join("\n");

    // Thêm BOM
    const bomCsv = "\uFEFF" + csvData;

    // Lưu vào state cho CSVLink dùng
    setDataExport(bomCsv);

    done();
  };
  const handleImportCsv = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept csv file");
        return;
      }
      Papa.parse(file, {
        skipEmptyLines: true,
        complete: (results) => {
          let rawCsv = results.data;
          if (rawCsv.length > 0) {
            if (rawCsv[0] && rawCsv[0].length === 3) {
              if (
                rawCsv[0][0] !== "Email" ||
                rawCsv[0][1] !== "Name" ||
                rawCsv[0][2] !== "Username"
              ) {
                toast.error("Wrong format header csv file, please check again");
              } else {
                console.log("rawCsv", rawCsv);
                let results = [];
                rawCsv.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.name = item[1];
                    obj.username = item[2];
                    results.push(obj);
                  }
                });
                setListUsers(results);
              }
            } else toast.error("Wrong format csv file, please check again");
          } else toast.error("Not found data in csv file");
          console.log("Parsed CSV results:", results);
        },
      });
    }
  };
  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List User:</b>
        </span>
        <div className="group-btns">
          <label htmlFor="fileInput" className="btn btn-warning">
            <i className="fa-solid fa-file-import"></i>
            Import
          </label>
          <input
            id="fileInput"
            type="file"
            hidden
            onChange={(event) => handleImportCsv(event)}
          />

          <CSVLink
            filename={"users.csv"}
            className="btn btn-primary"
            data={dataExport}
            asyncOnClick={true}
            onClick={getUsersExport}
            enclosingCharacter={""}
          >
            <i className="fa-solid fa-download"></i> Export
          </CSVLink>

          <button
            className="btn btn-primary"
            onClick={() => setShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus"></i> Add new user
          </button>
        </div>
      </div>
      <div className="col-4 my-3 search-user">
        <input
          className="form-control"
          placeholder="Search user by email"
          // value={keyWord}
          onChange={(event) => handleSearch(event)}
        />
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>Name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "name")}
                  ></i>
                </span>
              </div>
            </th>
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
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
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
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};
export default TableUsers;
