import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { on } from 'events';
import Select from "react-dropdown-select";



const items = [
  { 
    value: 1,
    label: "GET"
  },
  {
    value:  2,
    label: "POST"
  },
  {
    value:  3,
    label: "PUT"
  },
  {
    value:  4,
    label: "DELETE"
  }
];

const UpdateEndpointPopUp = ({ onClose, record,onUpdate }) => {
  console.log(record.active)
  const [description, setDescription] = useState(record.description);
  const [endpoint,setEndpoint]=useState(record.endpoint)
  
  const [method,setMethod]=useState(record.method)
  console.log(method)
  const [filePath,setFilePath]=useState(record.file_path ? record.file_path.String.toString() : '')
  const [isActive, setIsActive] = useState(record.active.Bool);
  


  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleEndpointChange=(event)=>{
    setEndpoint(event.target.value)
  };
  const handleFilePathChange=(event)=>{
    setFilePath(event.target.value)
  }
  const handleToggleSwitch = () => {
    setIsActive(!isActive);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody={
      endpoint:endpoint,
      method:method,
      file_path:filePath,
      description:description,
      active:Number(isActive)
    }
    try {
      const response = await fetch(`http://localhost:9002/v1/endpoint/${record.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });
      console.log(requestBody);
      if (response.ok) {
        onClose();
        console.log((description));
        const body =await response.json()
        onUpdate(body)
      } else {
        throw new Error('Network response was not ok.');
        //console.log(description);
      }
    } catch (error) {
      console.error(error);
    }

  };
  useEffect((record)=>{

  }
  );
console.log(isActive)
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
                    Endpoint:
                    <br />
                    <input value={endpoint} onChange={handleEndpointChange} />
                  </label>
                  <br />
                  <label className="select-method">
                    Method:
                    <br />
                    <Select options={items} Value = {3} style={{width:'130px',position: 'relative'}} onChange={(values) => setMethod(values[0].label)}  />
                    {/* <DropDownButtonComponent items={items} select={handleMethodChange} iconCss='ddb-icons e-folder' cssClass='e-vertical' iconPosition='Top'>Move</DropDownButtonComponent> */}
                  </label>
                  <br/>
                  {/* <div class="http-type">
                    <div>
                      <label data-sw-translateGET for="rct0.123">Method: </label><br />
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
                    File Path:
                    <br />
                    <input value={filePath} onChange={handleFilePathChange} />
                    <span className="slider"></span>
                  </label>
                  <br />
                  <label>
                    Description:
                    <br />
                    <input value={description} onChange={handleDescriptionChange} />
                  </label>
                  <br />
                  <label>
                    Active:
                  <input type="checkbox" checked={isActive} onChange={handleToggleSwitch} />
                  </label>

                  <div className='popup-footer'>
                    <button type="submit" className='btn btn-primary'>Add</button>
                    <button type="button" className='btn btn-danger' onClick={onClose}>Cancel</button>
                  </div>
                </form>
        </div> 
      </div>
    </div>
  );
};

export default UpdateEndpointPopUp;
