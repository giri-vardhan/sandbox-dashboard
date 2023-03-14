import React, { useState, useEffect } from 'react';
import axios from 'axios';
import copyIcon from '../icons/copy.png';
import editIcon from '../icons/edit.png';
import deleteIcon from '../icons/delete.png';

import * as ReactBootStrap from 'react-bootstrap';
import UpdateStatusCodePopUp from './UpdateStatusCodePopUp';
import DeleteStatusCodePopUp from './DeleteStatusCodePopUp';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const StatusCodeTable = ({record}) => {
    console.log('props recived statuscode' , record)
    
    const [results, setResults] = useState([]);
    const [modalUpdate,setModalUpdate]= useState();
    const [modalDelete,setModalDelete]= useState();
    const [entry,setEntry] =useState();

    const handleUpdateButtonClick = (value) =>{
      setEntry(value)
    }
    const toggleModalUpdate = ()=> {
      setModalUpdate(!modalUpdate)
    }
    const toggleModalDelete = ()=> {
      setModalDelete(!modalDelete)
    }

    // const uniqueIds = [...new Set(record.map(item => item.id))];
    console.log(record); 

    // useEffect(() => {
    //     // if (endpointValue) {
    //       axios.get(`http://localhost:9002/v1/status-codes/1`)
    //         .then(response => {
    //           setData(response.data);
    //           console.log(response.data)
    //         })
    //         .catch(error => {
    //           console.error(error);
    //         });
    //    // }
    //   }, []);

    // useEffect(() => {
    //     console.log("here statuscode");
    //      uniqueIds.forEach((id) => {
    //         // console.log("abcd")
    //         // const x=uniqueIds[0].toString();
    //         // console.log(x);
    //         fetch(`http://localhost:9002/v1/status-codes/${id}`)
    //             .then(response => response.json())
    //             .then(data => {
    //                 // setResults(data);
    //                 setResults(prevResults => [...prevResults, ...data]);
    //                 console.log(results);
    //             })
    //             .catch(error => console.error(error));
    //     }); 
    //   }, []);
      
    //   const filteredData = results.filter(item => item.endpoint_id === record);
    //   console.log(filteredData);
      console.log(results);
console.log(record[0].deleted_at)
    return (
        <div className="table-responsive">
          <ReactBootStrap.Table striped bordered hover size="sm" className="table table-sm table-bordered">
          <thead className="bg-dark text-white">
            <tr>
              <th className='text-nowrap'>Status Code</th>
              <th className='text-nowrap'>Description</th>
              <th className='text-nowrap'>Response_body</th>
              <th className='text-nowrap'>Name</th>
              <th className='text-nowrap'>Created At</th>
              <th className='text-nowrap'>Updated At</th>
              <th className='text-nowrap'>Action</th>
            </tr>
          </thead>
          <tbody>
          
            {record.map((item) => (
              item.deleted_at.Valid === false && (
              <tr key={item.id}>
                <td className='text-nowrap'>{item.status_code}</td>
                <td >{item.description}</td>
                <td  id='copy-btn1'>{JSON.stringify(item.response_body) }
                <div className='copy-btn-div'>
                <button className="copy-btn2" onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(item.response_body));}}>
                  <img src={copyIcon} alt="copy" border="0" /> 
                </button></div></td>
                <td className='text-nowrap'>{item.status_code_identifier}</td>
                <td >{item.created_at ? item.created_at.toString() : ''}</td>
                <td >{item.updated_at ? item.updated_at.toString() : ''}</td>
                
                    {/* <ReactBootStrap.Button variant="primary" onClick={() => {handleUpdateButtonClick(item);toggleModalUpdate()}}><BsPencilSquare />{" "}</ReactBootStrap.Button> */}
                    <td >
                      <div className='edit-btn-div'>
                          <button className="edit-btn2" onClick={() => {handleUpdateButtonClick(item);toggleModalUpdate()}}>
                          <img src={editIcon} alt="edit" border="0" /> 
                        </button>
                        </div>
                        <div className='delete-btn-div'>
                          <button className="delete-btn2" onClick={() => {handleUpdateButtonClick(item);toggleModalDelete()}}>
                          <img src={deleteIcon} alt="delete" border="0" /> 
                        </button>
                      </div>
                   
                    {/* <ReactBootStrap.Button variant="danger" onClick={() => {handleUpdateButtonClick(item);toggleModalDelete()}}><BsTrash/>{" "}</ReactBootStrap.Button> */}
                    
               
                </td>

                {entry && modalUpdate && <UpdateStatusCodePopUp  onClose={toggleModalUpdate} record={entry} />}
                {entry && modalDelete && <DeleteStatusCodePopUp  onClose={toggleModalDelete} record={entry.id} />}

              </tr>
        )))}
            
          </tbody>
     
    </ReactBootStrap.Table>
    </div>
    );
};
export default StatusCodeTable;