import React, { useState, useEffect } from "react";
import axios from "axios";
import { on } from "events";

const AddStatusCodePopup = ({ onClose, endpoint, onData }) => {
  const [statusCode, setStatusCode] = useState("");
  const [responseBody, setResponseBody] = useState("");
  const [description, setDescription] = useState("");
  const [status_code_identifier, setStatusCodeIdentifier] = useState("");

  const handleStatusCode = (event) => {
    setStatusCode(event.target.value);
  };

  const handleResponseBody = (event) => {
    setResponseBody(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleStatusCodeIdentifier = (event) => {
    setStatusCodeIdentifier(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      endpoint_id: endpoint.id,
      status_code: parseInt(statusCode),
      response_body: JSON.parse(responseBody),
      description: description,
      status_code_identifier: status_code_identifier,
    };
    try {
      const response = await fetch("http://localhost:9002/v1/status-codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        onClose();
        const r = await response.json();
        onData(r);
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
        <h2>Add Status-Code</h2>
        <form onSubmit={handleSubmit} className="popup-element">
          <label>
            Status Code:
            <br />
            <input
              id="input-id"
              required
              type="Number"
              value={statusCode}
              onChange={handleStatusCode}
            />
            <br />
          </label>
          <br />
          <label>
            Name:
            <br />
            <input
              id="input-id"
              type="text"
              value={status_code_identifier}
              onChange={handleStatusCodeIdentifier}
            />
          </label>
          <br />
          <label>
            Response Body:
            <br />
            <input
              id="input-id"
              type="text"
              value={responseBody}
              onChange={handleResponseBody}
            />
            <br />
          </label>
          <br />
          <label>
            Description:
            <br />
            <input
              id="input-id"
              required
              value={description}
              onChange={handleDescription}
            />
            <br />
          </label>
          <br />
          <div className="popup-footer">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
            <button
              type="button"
              className="btn btn-danger"
              style={{ marginInlineStart: true }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStatusCodePopup;
