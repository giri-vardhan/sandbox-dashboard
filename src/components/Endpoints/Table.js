import { iterableEquality } from '@jest/expect-utils';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Endpoints from './Endpoints';

const TablePopup = ({ onClose, endpointValue}) => {
  const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:9002/v1/endpoints')
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.error(error));
//   }, []);
  
//   const filteredData = data.filter(item => item.endpoint === endpointValue);

  useEffect(() => {
    if (endpointValue) {
      axios.get(`http://localhost:9002/v1/endpoints?endpoint=${endpointValue}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [endpointValue]);

  return (
    <div className='modal'>
    <div className='overlay'>
        <div className="headerCloseBtn">
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-header">
          <h1>Endpoint Table</h1>
        </div>
        <div className='modal-body'>
    <table>
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
          <th>Column 3</th>
          <th>Column 4</th>
          <th>Column 5</th>
          <th>Column 6</th>
          <th>Column 7</th>
          <th>Column 8</th>

        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.endpoint}</td>
            <td>{item.method}</td>
            <td>{item.active ? item.active.Bool.toString() : ''}</td>
            <td>{item.description}</td>
            <td>{item.created_at ? item.created_at.toString() : ''}</td>
            <td>{item.updated_at ? item.updated_at.toString() : ''}</td>
            <td>{item.deleted_at ? item.deleted_at.Time.toString() : ''}</td>

          </tr>
        ))}
      </tbody>
      <div className='modal-footer'>
      <button className="close-modal" id="closeBtn" type="button" onClick={onClose}>Close</button>
      </div>
    </table>
    <br /> 
    <br />
    </div>
    </div>
    </div>
  );
};
export default TablePopup;




