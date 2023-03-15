import React, { useState } from 'react';
import axios from 'axios';
import { on } from 'events';
import { json } from 'react-router-dom';



const UpdateStatusCodePopUp = ({ onClose, record }) =>  {  
  console.log(record);
  const [description, setDescription] = useState(record.description);
  const[statusCode,setStatusCode]=useState(record.status_code)
  const [identifier,setIdentifier]=useState(record.status_code_identifier);
  const[responseBody,setResponseBody]=useState(JSON.stringify(record.response_body))

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleResponseChange = (event) => {
    setResponseBody(JSON.stringify(event.target.value));
  };
  const handleIdentifierChange = (event) => {
    setIdentifier(event.target.value);
  };
  const handleStatusCodeChange = (event) => {
    setStatusCode( event.target.value);
    console.log(statusCode)
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(record);
    const requestBody={
      status_code:parseInt(statusCode),
      status_code_identifier:identifier,
      description:description,
      response_body:JSON.parse(responseBody)
    }
    console.log(requestBody)
    try {
      const response = await fetch(`http://localhost:9002/v1/status-codes/${record.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });
      //console.log(description);
      if (response.ok) {
        onClose();
        console.log((description));
      } else {
        throw new Error('Network response was not ok.');
        //console.log(description);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="popup-background">
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
            <input type="number" value={statusCode} onChange={handleStatusCodeChange} />
          </label>
          <br />
          <label>
            Status Code Identifier:
            <br />
            <input  name="identifier" value={identifier} onChange={handleIdentifierChange} style={{ width: '500px' }} />
          </label>
          <br />
          <label>
            Description:
            <br />
            <input value={description} onChange={handleDescriptionChange} style={{ width: '500px' }}/>
          </label>
          <br />
          <label>
            Response Body:
            <br />
            <textarea value={responseBody} onChange={handleResponseChange} rows='4'cols='60'/>
          </label>
          <br />
          <div className='popup-footer' >
          <button type="submit" className='btn btn-primary'>Add</button>
          <button type="button" className='btn btn-danger' onClick={onClose}>Cancel</button>
        </div>
        </form>
      </div>
    </div>
    </div>
  );
};
export default UpdateStatusCodePopUp;
