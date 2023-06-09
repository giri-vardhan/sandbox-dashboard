import React, { useState, useEffect, useRef } from "react";
import Popup from "./AddEndpointPopup";
import * as ReactBootStrap from "react-bootstrap";
import axios from "axios";
import SearchBar from "../Navbar/searchBar";
import infoIcon from "../icons/info.png";
import playIcon from "../icons/play.png";
import ToggleSwitch from "./ToggleSwitch";
import { Link, useNavigate } from "react-router-dom";

const Endpoints = ({ infoClick, userData, auth }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEndpoint, setTotalEndpoint] = useState(0);
  const [allEndpoint, setallEndpoint] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [endpoints, setEndpoints] = useState([]);
  const [modal, setModal] = useState(false);
  const [tableData, setTableData] = useState();
  const [showTable, setShowTable] = useState(false);
  const [record, setRecord] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [obj, setObj] = useState({});
  const [entry, setEntry] = useState();
  const [result, setResult] = useState();
  const [selectedEndpoint, setSelectedEndpoxint] = useState(null);
  const moment = require("moment-timezone");

  const handleAddEndpoint = () => {
    setEndpoints([...endpoints, { name: "New Endpoint" }]);
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  async function fetchStatusCode(value) {
    const url = `http://localhost:9002/v1/status-codes/${value.id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      infoClick(value, data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async function callStatusApi(value) {
    const data = await fetchStatusCode(value);
    return data;
  }
  const handleInfoButtonClick = (value) => {
    setSearchValue(value.id);
    setEntry(value);
    const data = callStatusApi(value);
    setResult(data);
    setObj(value);
    navigate("/status")
  };

  const tableRef = useRef(null);
  const handleScrollClick = () => {
    const element = document.getElementById("endpoint-table");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const addData = (data) => {
    const body = {
      active: data.active,
      description: data.description,
      endpoint: data.endpoint,
      file_path: data.file_path,
      id: data.id,
      method: data.method,
      created_at: new Date().toLocaleTimeString(),
      updated_at: new Date(),
      deleted_at: { Time: null, Valid: false },
    };
    setRecord((prevRecord) => prevRecord.concat(body));
    setallEndpoint((prevData) => prevData.concat(body));
    setTotalEndpoint(totalEndpoint + 1);
  };
  const endpointData = async (page) => {
    await axios
      .get(`http://localhost:9002/v1/endpoints/${page}`)
      .then((response) => {
        const newData = response.data.Endpoint;
        setRecord(newData);
        setTotalEndpoint(response.data.Count);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const pageNumbers = [];
  const totalPages = Math.ceil(totalEndpoint / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handelPage = async (page) => {
    endpointData(page);
    setCurrentPage(page);
  };
  const handelPageDecrement = async () => {
    if (currentPage === 1) {
      return;
    }
    endpointData(currentPage - 1);
    setCurrentPage(currentPage - 1);
  };
  const handelPageIncrement = async () => {
    if (currentPage === totalPages) {
      return;
    }

    endpointData(currentPage + 1);
    setCurrentPage(currentPage + 1);
  };

  const handleSearch = (input) => {
    allEndpoint.filter((i) => {
      if (i.endpoint === input) {

        handleInfoButtonClick(i);
        return;
      }
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:9002/v1/endpoints`)
      .then((response) => {
        setallEndpoint(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`http://localhost:9002/v1/endpoints/${currentPage}`)
      .then((response) => {
        setTotalEndpoint(response.data.Count);
        setRecord(response.data.Endpoint);
      })
      .catch((error) => {
        console.error(error);
      });
    // }
  }, []);
  return (
    <>
      <SearchBar
        header={"Endpoints"}
        onSearch={handleSearch}
        userData={userData}
        auth={auth}
      />

      <div className="table-responsive ">
        <button
          className="btn btn-success"
          id="add-endpoint"
          onClick={toggleModal}
        >
          Add Endpoint
        </button>
        <div id="swagger-ui-container" className="swagger-wrap">
          <ReactBootStrap.Table
            bordered
            hover
            className="table table-sm table-bordered "
          >
            <thead className=" text-white">
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
              {record.map((recordList) => (
                <tr key={recordList.id}>
                  <td className="text-nowrap">{recordList.endpoint}</td>
                  <td className="text-nowrap">{recordList.method}</td>
                  <td>
                    <div>
                      <ToggleSwitch
                        value={recordList.active}
                        id={recordList.id}
                      />
                    </div>
                  </td>
                  <td className="text-nowrap"> {recordList.description}</td>
                  <td className="text-nowrap">
                    {recordList.file_path.Valid ? (
                      recordList.file_path.String.toString()
                    ) : (
                      <h6 style={{ fontSize: "20px" }}>-</h6>
                    )}
                  </td>
                  <td>{new Date(recordList.updated_at).toUTCString()}</td>
                  <td>
                    <Link to="/status">
                      <button
                        className="info-button"
                        onClick={() => {
                          handleInfoButtonClick(recordList);
                          handleScrollClick();
                        }}
                      >
                        <img src={infoIcon} alt="Info" border="0"></img>
                      </button>
                    </Link>
                    <button
                      className="info-button"
                      style={{ marginRight: "0px" }}
                    >
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ReactBootStrap.Table>

          {modal && <Popup onData={addData} onClose={toggleModal} />}
          <br />
          <br />
        
        </div>
      </div>
      <div className="pagination ">
        {currentPage > 1 && (
          <button id="page-no" onClick={() => handelPageDecrement()}>
            &lt;
          </button>
        )}
        {pageNumbers.map((number) => (
          <div key={number}>
            {number === currentPage ? (
              <button
                id="current-page"
                key={number}
                onClick={() => handelPage(number)}
              >
                {number}
              </button>
            ) : (
              <button
                id="page-no"
                key={number}
                onClick={() => handelPage(number)}
              >
                {number}
              </button>
            )}
          </div>
        ))}
        {currentPage !== totalPages && (
          <button id="page-no" onClick={() => handelPageIncrement()}>
            &gt;
          </button>
        )}
      </div>
      <div>
        <h6 id="count">
          Record count is {record.length}/{totalEndpoint}
        </h6>
      </div>
    </>
  );
};

export default Endpoints;
