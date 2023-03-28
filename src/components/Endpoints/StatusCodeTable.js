import React, { useState, useEffect } from 'react';
import axios from 'axios';
import copyIcon from '../icons/copy.png';
import Popup from './AddStatusCodePopup';
import SearchBar from '../Navbar/searchBar'


import editIcon from '../icons/edit.png';
import deleteIcon from '../icons/delete.png';
import tickIcon from '../icons/doubleTick.png'
import * as ReactBootStrap from 'react-bootstrap';
import UpdateStatusCodePopUp from './UpdateStatusCodePopUp';
import DeleteStatusCodePopUp from './DeleteStatusCodePopUp';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import addIcon from '../icons/add.png';

const StatusCodeTable = (props) => {
  const [record,setRecord] = useState(props.record)
  const [endpoint,setEndpoint]=useState(props.endpoint)

    console.log('props recived statuscode' , record)
    
    const [modalUpdate,setModalUpdate]= useState();
    const [modalDelete,setModalDelete]= useState();
    const [entry,setEntry] =useState();
    const [modalAdd,setModalAdd]=useState();
    const handleUpdateButtonClick = (value) =>{
      setEntry(value)
    }
    const toggleModalAdd = () => {
      setModalAdd(!modalAdd)
    }
    const handleDeleteClick =(value)=>{
      const newEntry=record.filter((item)=>item.id!==value)
      setRecord(newEntry);
      console.log(record)
    }
    const handleUpdateClick = (value) => {
      var newEntry=record.filter((item)=>item.id!==value.id)
      newEntry=[...newEntry,value]
      newEntry.sort((a,b)=>a.status_code-b.status_code)
      setRecord(newEntry);
      console.log(record)

    }
    const toggleModalUpdate = ()=> {
      setModalUpdate(!modalUpdate)
    }
    const toggleModalDelete = ()=> {
      setModalDelete(!modalDelete)
    }
    const addData =(data)=>{
      console.log(data)
      
      const body={
        id:data.id,
        status_code:data.status_code,
        status_code_identifier:data.status_code_identifier,
        response_body:data.response_body,
        description:data.description,
        endpoint_id:data.endpoint_id,
        created_at:new Date().toLocaleTimeString(),
        updated_at:new Date().toLocaleTimeString(),
        deleted_at:{Time:null,Valid:false} 
      }
      if (record.status_code && record.status_code===400){
        console.log(data)
        setRecord([body])
        return
      }
      const newEntry=[...record,body]
      newEntry.sort((a,b)=>a.status_code-b.status_code)
      console.log(body,record)
      setRecord(newEntry)
      
    }
    const handleSearch=(input)=>{
      
      record.filter((i) => {
        
        if (i.status_code_identifier===input){
          console.log(i)
          setRecord([])
          setRecord(preRecord=>preRecord.concat(i))
          return 
        }
      });
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
    // const img=[copyIcon,tickIcon]
    
    // const [index,setIndex]=useState(0)
    // const [currentImage,setCurrentImage]=useState(img[index])
    // const handleCopy=async ()=>{
    //   console.log(index,currentImage)
    //   setIndex( (prevRecord) =>  prevRecord+1);
    //   setCurrentImage(img[index]);
    //   setTimeout(()=>{
    //     setIndex(0)
    //     setCurrentImage(img[index])
    //   },5000);
    //   console.log(index,currentImage)
    // }
      console.log(record.length);

    return (
      
      
      <div>
        <div className='search-statusCode'>
      <SearchBar header={'Status Code'} onSearch={handleSearch}/></div>
      <button className="btn btn-success" id='add-Status' onClick={toggleModalAdd}>
     Add Status Code
    </button>
    {record.status_code &&record.status_code===400 ?
        <h1 className='status-not'>No Status code available</h1>:
        <div className="table-responsive">
        {/* <div id="swagger-ui-container" className="swagger-wrap"> */}
<div>
          <ReactBootStrap.Table bordered hover size="sm" className="table table-sm table-bordered">
          <thead className="text-white">
            <tr>
              <th className='text-nowrap'style={{width:'10%'}}>Name</th>
              <th className='text-nowrap'>Status Code</th>
              <th className='text-nowrap'>Description</th>
              <th className='text-nowrap'>Response_body</th>
              {/* <th className='text-nowrap'>Created At</th> */}
              <th className='text-nowrap'>Last Updated</th>
              <th className='text-nowrap'>Action</th>
            </tr>
          </thead>
          
          <tbody>
            {record.map((item) => (
              item.deleted_at.Valid === false && (
              <tr key={item.id}>
                <td style={{width:'10%'}}>{item.status_code_identifier}</td>
                <td className='text-nowrap'>{item.status_code}</td>
                <td >{item.description?item.description:"-"}</td>
                <td  id='copy-btn1'>
                <div className='copy-btn-div'>
                  <text className=''>{JSON.stringify(item.response_body) }</text>
                  </div> <div className='copy-btn-div'>
                <button className="copy-btn2" onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(item.response_body));}}>
                  <img src={copyIcon} alt="copy" border="0" /> 
                </button></div></td>
                {/* <td>{new Date(item.created_at.toString()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</td> */}
                <td>{new Date(item.updated_at.toString()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</td>
                
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

                
              </tr>
        )))}
            
          </tbody>
     
    </ReactBootStrap.Table>
    </div>
    </div>}
    {entry && modalUpdate && <UpdateStatusCodePopUp onUpdate={handleUpdateClick} onClose={toggleModalUpdate} record={entry} />}
                {entry && modalDelete && <DeleteStatusCodePopUp  onDelete={handleDeleteClick}onClose={toggleModalDelete} record={entry} />}
                {modalAdd && <Popup  onData={addData} onClose={toggleModalAdd} endpoint={endpoint} />}
     </div>
     
    );
};
export default StatusCodeTable;