import React, { useState } from "react";
import axios from "axios";
import { on } from "events";
import { json } from "react-router-dom";

const UpdateStatusCodePopUp = ({ onClose, record, onUpdate }) => {
  const [description, setDescription] = useState(record.description);
  const [statusCode, setStatusCode] = useState(record.status_code);
  const [identifier, setIdentifier] = useState(record.status_code_identifier);
  const [responseBody, setResponseBody] = useState(
    JSON.stringify(record.response_body)
  );

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleResponseChange = (event) => {
    setResponseBody(event.target.value);
  };
  const handleIdentifierChange = (event) => {
    setIdentifier(event.target.value);
  };
  const handleStatusCodeChange = (event) => {
    setStatusCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      status_code: parseInt(statusCode),
      status_code_identifier: identifier,
      description: description,
      response_body: JSON.parse(responseBody),
    };
    try {
      const response = await fetch(
        `http://localhost:9002/v1/status-codes/${record.id}`,
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
    <div className="popup-container">
      <div className="popup-content">
        <div className="titleCloseBtn">
          <button onClick={onClose} id="close-btn">
            X
          </button>
        </div>
        <h2>Update</h2>
        <form onSubmit={handleSubmit} className="popup-element">
          <label>
            Status Code:
            <br />
            <input
              id="input-id"
              type="number"
              value={statusCode}
              onChange={handleStatusCodeChange}
            />
          </label>
          <br />
          <label>
            Status Code Identifier:
            <b/>
            <input id="input-id"
              name="identifier"
              value={identifier}
              onChange={handleIdentifierChange}
              style={{ width: "500px" }}
            />
          </label>
          <br />
          <label>
            Description:
            <br />
            <input id="input-id"
              value={description}
              onChange={handleDescriptionChange}
              style={{ width: "500px" }}
            />
          </label>
          <br />
          <label>
            Response Body:
            <br />
            <textarea
              value={responseBody}
              onChange={handleResponseChange}
              rows="4"
              cols="60"
            />
          </label>
          <br />
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
export default UpdateStatusCodePopUp;
