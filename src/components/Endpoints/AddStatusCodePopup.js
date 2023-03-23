import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { on } from 'events';

const AddStatusCodePopup=({onClose,endpoint,onData})=>{
    const [statusCode,setStatusCode]=useState('')
    const [responseBody,setResponseBody]=useState('')
    const [description,setDescription]=useState('')
    const [status_code_identifier,setStatusCodeIdentifier]=useState('')

    const handleStatusCode=(event)=>{
        setStatusCode(event.target.value)
    }

    const handleResponseBody=(event)=>{
        setResponseBody(event.target.value)
    }
    const handleDescription=(event)=>{
        setDescription(event.target.value)
    }
    const handleStatusCodeIdentifier=(event)=>{
        setStatusCodeIdentifier(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(endpoint)
        const  requestBody={
            endpoint_id:endpoint.id,
            status_code:parseInt(statusCode),
            response_body:JSON.parse(responseBody),
            description:description,
            status_code_identifier:status_code_identifier,
        }
        try {
            const response = await fetch('http://localhost:9002/v1/status-codes', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestBody),
            });
            console.log(response.ok)
            console.log(requestBody)
            //console.log(description);
            if (response.ok) {
              onClose();
              const r=await response.json()
              console.log(r)
              onData(r)
              console.log((description));
            } else {
              throw new Error('Network response was not ok.');
              //console.log(description);
            }
          } catch (error) {
            console.error(error);
          }
    }
    return(
        <div className="popup-background">
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
            <br/>
            <input required type="Number" value={statusCode} onChange={handleStatusCode}/>
            <br/>
          </label>
          <br/>
          
          {/* <div class="http-type">
            <div>
                <label data-sw-translateget htmlFor="rct0.123">Method: </label><br/>
                <select name="httpType" id="rct0.123">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                </select>
            </div>
          </div>
          <br /> */}
          <label>
            Name:
            <br/>
            <input type="text" value={status_code_identifier} onChange={handleStatusCodeIdentifier}/>
          </label>
          <br/>
          <label>
            Response Body:
            <br />
            <input  type="text" value={responseBody} onChange={handleResponseBody}/>
            <br/>
          </label>
          <br/>
          <label>
            Description:
            <br />
            <input required value={description}  onChange={handleDescription} />
            <br />
          </label>
          <br />
          <div className='popup-footer'>
          <button type="submit" className='btn btn-primary'>Add</button>
          <button type="button" className='btn btn-danger' style={{marginInlineStart:true}} onClick={onClose}>Cancel</button>
        </div>
        </form>
         
      </div>
    </div>
    </div>
    );
};

export default AddStatusCodePopup
