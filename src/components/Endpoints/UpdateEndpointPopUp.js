import React, { useEffect, useState } from "react";
import axios from "axios";
import { on } from "events";
import Select from "react-dropdown-select";

const items = [
  {
    value: 1,
    label: "GET",
  },
  {
    value: 2,
    label: "POST",
  },
  {
    value: 3,
    label: "PUT",
  },
  {
    value: 4,
    label: "DELETE",
  },
];

const UpdateEndpointPopUp = ({ onClose, record, onUpdate }) => {
  const [description, setDescription] = useState(record.description);
  const [endpoint, setEndpoint] = useState(record.endpoint);

  const [method, setMethod] = useState(record.method);
  const [filePath, setFilePath] = useState(
    record.file_path ? record.file_path.String.toString() : ""
  );
  const [isActive, setIsActive] = useState(record.active.Bool);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleEndpointChange = (event) => {
    setEndpoint(event.target.value);
  };
  const handleFilePathChange = (event) => {
    setFilePath(event.target.value);
  };
  const handleToggleSwitch = () => {
    setIsActive(!isActive);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      endpoint: endpoint,
      method: method,
      file_path: filePath,
      description: description,
      active: Number(isActive),
    };
    try {
      const response = await fetch(
        `http://localhost:9002/v1/endpoint/${record.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.ok) {
        onClose();
        const body = await response.json();
        onUpdate(body);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="popup-container"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="popup-content">
        <div className="titleCloseBtn">
          <button onClick={onClose} id="close-btn">
            X
          </button>
        </div>
        <h2>Update</h2>
        <form onSubmit={handleSubmit} className="popup-element">
          <label>
            Endpoint:
            <br />
            <input
              id="input-id"
              value={endpoint}
              onChange={handleEndpointChange}
            />
          </label>
          <br />
          <label className="select-method">
            Method:
            <br />
            <Select
              options={items}
              Value={3}
              style={{ width: "130px", position: "relative" }}
              onChange={(values) => setMethod(values[0].label)}
            />
          </label>
          <br />

          <label>
            File Path:
            <br />
            <input
              id="input-id"
              value={filePath}
              onChange={handleFilePathChange}
            />
          </label>
          <br />
          <label>
            Description:
            <br />
            <input
              id="input-id"
              value={description}
              onChange={handleDescriptionChange}
            />
          </label>
          <br />
          <label>
            Active:
            <input
              id="checkbox"
              type="checkbox"
              checked={isActive}
              onChange={handleToggleSwitch}
            />
          </label>

          <div className="popup-footer">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <button type="button" className="btn btn-danger" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEndpointPopUp;
