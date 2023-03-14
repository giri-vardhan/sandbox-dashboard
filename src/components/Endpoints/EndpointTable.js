import React, { useState, useEffect, useRef,forwardRef } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import StatusCodeTable from './StatusCodeTable';
import UpdateEndpointPopUp from './UpdateEndpointPopUp';
import { BsPencilSquare } from "react-icons/bs";

const EndpointTable = forwardRef((props,ref) => {
  const { record } = props;
  console.log('props recived' , record)
  const [data,setData] =useState([]);
  const [modal,setModal] =useState(false);
  const [searchValue,setSearchValue] = useState([]);
  console.log('record****' , record)

  const toggleModal = () => {
    setModal(!modal)
  }
  const handleUpdateClick = (value) => {

  }

  const tableRef = useRef(null)

  // useEffect(() => {
  //    if (record) {
  //     axios.get(`http://localhost:9002/v1/endpoints?endpoint=${record}`)
  //       .then(response => {
  //         setData(response.data);
  //         console.log(response.data)
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }
  // }, []);

  //   useEffect(() => {
  //   fetch('http://localhost:9002/v1/endpoints')
  //     .then(response => response.json())
  //     .then(data => setData(data))
  //     .catch(error => console.error(error));
  // }, []);
  
  // const filteredData = data.filter(item => item.endpoint === record);
  // console.log("filtered data",filteredData);

  
  return(
    <div className='table-responsive' id='endpoint-table' >
      <h4 ref={ref}>Endpoint Table</h4>
      <ReactBootStrap.Table striped bordered hover size="sm" className="table table-bordered">
        <thead className="bg-dark text-white">
          <tr>
            
            <th className='text-nowrap'>Name</th>
            <th className='text-nowrap'>Method</th>
            <th className='text-nowrap'>Active </th>
            <th className='text-nowrap'>Description</th>
            <th className='text-nowrap'>File Path</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {/* {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.endpoint}</td>
              <td>{item.method}</td>
              <td>{item.active ? item.active.Bool.toString() : ''}</td>
              <td>{item.description}</td>
              <td>{item.created_at ? item.created_at.toString() : ''}</td>
              <td>{item.updated_at ? item.updated_at.toString() : ''}</td>
              <td>{item.deleted_at ? item.deleted_at.Time.toString() : ''}</td>
              <td><ReactBootStrap.Button onClick={() => (toggleModal,item.id)}>Update</ReactBootStrap.Button></td>
              {modal && <UpdateEndpointPopUp  onClose={toggleModal} />}
            </tr>
          ))} */}

          {
            <tr key={record.id}>
              <td className='text-nowrap'>{record.endpoint}</td>
              <td className='text-nowrap'>{record.method}</td>
              <td className='text-nowrap'>{record.active ? record.active.Bool.toString() : ''}</td>
              <td className='text-nowrap'> {record.description}</td>
              <td className='text-nowrap'>{record.file_path ? record.file_path.String.toString() : ''}</td>
              <td>{record.created_at ? record.created_at.toString() : ''}</td>
              <td>{record.updated_at ? record.updated_at.toString() : ''}</td>
              {/* <td>{record.deleted_at ? record.deleted_at.Time.toString() : ''}</td> */}
              <td><ReactBootStrap.Button variant='primary' onClick={toggleModal}><BsPencilSquare />{" "}</ReactBootStrap.Button></td>
              {modal && <UpdateEndpointPopUp  onClose={toggleModal} record={record} />}
            </tr>
          }
          
        </tbody>
      
    </ReactBootStrap.Table>
    {/* <StatusCodeTable record = {filteredData} /> */}
    </div>
  );

  // return(
  //   <div>
  //     <ReactBootStrap.Table striped bordered hover size="sm">
  //     <thead>
  //       <tr>
  //         <th>#</th>
  //         <th>Column 2</th>
  //         <th>Column 3</th>
  //         <th>Column 4</th>
  //         <th>Column 5</th>
  //         <th>Column 6</th>
  //         <th>Column 7</th>
  //         <th>Column 8</th>
  //       </tr>
  //     </thead>
  //     <tbody>
      
  //       {data.map(item => (
  //         <tr key={item.id}>
  //           <td>{item.id}</td>
  //           <td>{item.endpoint}</td>
  //           <td>{item.method}</td>
  //           <td>{item.active ? item.active.Bool.toString() : ''}</td>
  //           <td>{item.description}</td>
  //           <td>{item.created_at ? item.created_at.toString() : ''}</td>
  //           <td>{item.updated_at ? item.updated_at.toString() : ''}</td>
  //           <td>{item.deleted_at ? item.deleted_at.Time.toString() : ''}</td>

  //         </tr>
  //       ))}
        
  //     </tbody>
      
  //   </ReactBootStrap.Table>
  //   <StatusCodeTable />
  //   </div>
  // );
    
});
export default EndpointTable;


// return(
//   <div className='table'>
//   <div className=''>
//   <div className="headerCloseBtn">
//     <button onClick={onClose}>X</button>
//   </div>
//   <div className="table-header">
//     <h1>Endpoint Table</h1>
//   </div>
//   <div className='table-body'>
// <table>
// <thead>
//   <tr>
//     <th>Column 1</th>
//     <th>Column 2</th>
//     <th>Column 3</th>
//     <th>Column 4</th>
//     <th>Column 5</th>
//     <th>Column 6</th>
//     <th>Column 7</th>
//     <th>Column 8</th>

//   </tr>
// </thead>
// <tbody>
//   {data.map(row => (
//     <tr key={row.id}>
//       <td>{row.id}</td>
//       <td>{row.endpoint}</td>
//       <td>{row.method}</td>
//       <td>{row.active ? item.active.Bool.toString() : ''}</td>
//       <td>{row.description}</td>
//       <td>{row.created_at ? item.created_at.toString() : ''}</td>
//       <td>{row.updated_at ? item.updated_at.toString() : ''}</td>
//       <td>{row.deleted_at ? item.deleted_at.Time.toString() : ''}</td>

//     </tr>
//   ))}
// </tbody>
// <div className='table-footer'>
// <button className="close-table" id="closeBtn" type="button" onClick={onClose}>Close</button>
// </div>
// </table>
// <br /> 
// <br />
// </div>
// </div>
// </div>
// );