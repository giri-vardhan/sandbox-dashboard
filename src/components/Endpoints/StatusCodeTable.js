import React, { useState, useEffect } from "react";
import axios from "axios";
import copyIcon from "../icons/copy.png";
import Popup from "./AddStatusCodePopup";
import SearchBar from "../Navbar/searchBar";
import Moment from "react-moment";
import "moment-timezone";

import editIcon from "../icons/edit.png";
import deleteIcon from "../icons/delete.png";
import * as ReactBootStrap from "react-bootstrap";
import UpdateStatusCodePopUp from "./UpdateStatusCodePopUp";
import DeleteStatusCodePopUp from "./DeleteStatusCodePopUp";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import addIcon from "../icons/add.png";

const StatusCodeTable = (props) => {
  const [record, setRecord] = useState(props.record);
  const [endpoint, setEndpoint] = useState(props.endpoint);
  const [userData] = useState(props.userData);
  const auth = props.auth;


  const [modalUpdate, setModalUpdate] = useState();
  const [modalDelete, setModalDelete] = useState();
  const [entry, setEntry] = useState();
  const [modalAdd, setModalAdd] = useState();
  const handleUpdateButtonClick = (value) => {
    setEntry(value);
  };
  const toggleModalAdd = () => {
    setModalAdd(!modalAdd);
  };
  const handleDeleteClick = (value) => {
    const newEntry = record.filter((item) => item.id !== value);
    setRecord(newEntry);
  };
  const handleUpdateClick = (value) => {
    var newEntry = record.filter((item) => item.id !== value.id);
    newEntry = [...newEntry, value];
    newEntry.sort((a, b) => a.status_code - b.status_code);
    setRecord(newEntry);
  };
  const toggleModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };
  const toggleModalDelete = () => {
    setModalDelete(!modalDelete);
  };
  const addData = (data) => {
    const body = {
      id: data.id,
      status_code: data.status_code,
      status_code_identifier: data.status_code_identifier,
      response_body: data.response_body,
      description: data.description,
      endpoint_id: data.endpoint_id,
      created_at: new Date().toLocaleTimeString(),
      updated_at: new Date(),
      deleted_at: { Time: null, Valid: false },
    };
    if (record.status_code && record.status_code === 400) {
      setRecord([body]);
      return;
    }
    const newEntry = [...record, body];
    newEntry.sort((a, b) => a.status_code - b.status_code);
    setRecord(newEntry);
  };
  const handleSearch = (input) => {
    record.filter((i) => {
      if (i.status_code_identifier === input) {
        setRecord([]);
        setRecord((preRecord) => preRecord.concat(i));
        return;
      }
    });
  };
  return (
    <div>
      <div className="search-statusCode">
        <SearchBar
          header={"Status Code"}
          onSearch={handleSearch}
          userData={userData}
          auth={auth}
        />
      </div>

      <h2 className="status-header">Status Code Table</h2>
      <button
        className="btn btn-success"
        id="add-Status"
        onClick={toggleModalAdd}
      >
        Add Status Code
      </button>
      {record.status_code && record.status_code === 400 ? (
        <h1 className="status-not">No Status code available</h1>
      ) : (
        <div className="table-responsive">
          <div>
            <ReactBootStrap.Table
              bordered
              hover
              size="sm"
              className="table table-sm table-bordered"
            >
              <thead className="text-white">
                <tr>
                  <th className="text-nowrap" style={{ width: "10%" }}>
                    Name
                  </th>
                  <th className="text-nowrap">Status Code</th>
                  <th className="text-nowrap">Description</th>
                  <th className="text-nowrap">Response_body</th>
                  <th className="text-nowrap">Last Updated</th>
                  <th className="text-nowrap">Action</th>
                </tr>
              </thead>

              <tbody>
                {record.map(
                  (item) =>
                    item.deleted_at.Valid === false && (
                      <tr key={item.id}>
                        <td style={{ width: "10%" }}>
                          {item.status_code_identifier}
                        </td>
                        <td className="text-nowrap">{item.status_code}</td>
                        <td>{item.description ? item.description : "-"}</td>
                        <td id="copy-btn1">
                          <div className="copy-btn-div">
                            <p className="">
                              {JSON.stringify(item.response_body)}
                            </p>
                          </div>{" "}
                          <div className="copy-btn-div">
                            <button
                              className="copy-btn2"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  JSON.stringify(item.response_body)
                                );
                              }}
                            >
                              <img src={copyIcon} alt="copy" border="0" />
                            </button>
                          </div>
                        </td>
                        <td>{new Date(item.updated_at).toUTCString()}</td>
                        <td>
                          <div className="edit-btn-div">
                            <button
                              className="edit-btn2"
                              onClick={() => {
                                handleUpdateButtonClick(item);
                                toggleModalUpdate();
                              }}
                            >
                              <img src={editIcon} alt="edit" border="0" />
                            </button>
                          </div>
                          <div className="delete-btn-div">
                            <button
                              className="delete-btn2"
                              onClick={() => {
                                handleUpdateButtonClick(item);
                                toggleModalDelete();
                              }}
                            >
                              <img src={deleteIcon} alt="delete" border="0" />
                            </button>
                          </div>

                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </ReactBootStrap.Table>
          </div>
        </div>
      )}
      {entry && modalUpdate && (
        <UpdateStatusCodePopUp
          onUpdate={handleUpdateClick}
          onClose={toggleModalUpdate}
          record={entry}
        />
      )}
      {entry && modalDelete && (
        <DeleteStatusCodePopUp
          onDelete={handleDeleteClick}
          onClose={toggleModalDelete}
          record={entry}
        />
      )}
      {modalAdd && (
        <Popup onData={addData} onClose={toggleModalAdd} endpoint={endpoint} />
      )}
    </div>
  );
};
export default StatusCodeTable;
