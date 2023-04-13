import React, { useState, useEffect, useRef } from "react";
import * as ReactBootStrap from "react-bootstrap";
import StatusCodeTable from "./StatusCodeTable";
import UpdateEndpointPopUp from "./UpdateEndpointPopUp";
import { BsPencilSquare } from "react-icons/bs";
import editIcon from "../icons/edit.png";
import ToggleSwitch from "./ToggleSwitch"
import SearchBar from "../Navbar/searchBar";
import Popup from './AddStatusCodePopup';

const EndpointTable = (props) => {
  const [record, setRecord] = useState(props.record);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [searchValue, setSearchValue] = useState([]);
  const [modalAdd,setModalAdd]=useState();

  const toggleModal = () => {
    setModal(!modal);
  };
  const handleUpdateClick = (value) => {
    setRecord(value);
  };
  const toggleModalAdd = () => {
    setModalAdd(!modalAdd)
  }
  const handleSearch = (input) => {

    record.filter((i) => {
      if (i.endpoint === input) {
        return;
      }
    });
  };
  const tableRef = useRef(null);

 
  return (
    <div>
   
    <div className="table-responsive" >
       <div>
      <ReactBootStrap.Table
        
        bordered
        hover
        className="table table-sm table-bordered"
      >
        <thead className="text-white">
          <tr>
            <th className="text-nowrap">Name</th>
            <th className="text-nowrap">Method</th>
            <th className="text-nowrap">Active </th>
            <th className="text-nowrap">Description</th>
            <th className="text-nowrap">File Path</th>
            <th>Last Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            <tr key={record.id}>
              <td className="text-nowrap">{record.endpoint}</td>
              <td className="text-nowrap">{record.method}</td>
              <td style={{paddingBottom:'20px'}}>
                    <ToggleSwitch value={record.active} id={record.id}/>
                  </td>
              <td className="text-nowrap"> {record.description}</td>
              <td className="text-nowrap">
                {record.file_path.Valid? record.file_path.String.toString() : "-"}
              </td>
              <td>{new Date(record.updated_at.toString()).toUTCString()}</td>
              <td id="edit-btn1">
                <button className="edit-btn2" onClick={toggleModal}>
                  <img src={editIcon} alt="edit" border="0" />
                </button>
              </td>
              {modal && (
                <UpdateEndpointPopUp
                  onUpdate={handleUpdateClick}
                  onClose={toggleModal}
                  record={record}
                />
              )}
            </tr>
          }
        </tbody>
      </ReactBootStrap.Table>
      {modalAdd && <Popup  onClose={toggleModalAdd} />}

    </div>
     </div></div>
  );
};
export default EndpointTable;