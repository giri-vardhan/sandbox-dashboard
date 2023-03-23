import React, { useState, useEffect, useRef } from 'react';
import Popup from './AddEndpointPopup';
import * as ReactBootStrap from 'react-bootstrap';
import TablePopup from './Table';
import axios from 'axios';
import StatusCodeTable from './StatusCodeTable';
import SearchBar from '../Navbar/searchBar'
import EndpointTable from './EndpointTable';
import { FaStar } from 'react-icons/fa';
import infoIcon from '../icons/info.png';
import playIcon from '../icons/play.png';

const Endpoints = ({infoClick}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEndpoint,setTotalEndpoint]=useState(0);
  const [currentItems,setCurrentItem]=useState([])
const [itemsPerPage, setItemsPerPage] = useState(10);
  const [endpoints, setEndpoints] = useState([]);
  const [modal, setModal] = useState(false);
  const [tableData, setTableData] = useState()
  const [showTable, setShowTable] = useState(false);
  const [record,setRecord] = useState([]);
  const [buttonClick, setButtonClick] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [obj,setObj]=useState({});
  const [entry,setEntry] =useState();
  const [result,setResult] =useState();
  //const [endpointValue, setEndpointValue] = useState([]);
  const [selectedEndpoint, setSelectedEndpoxint] = useState(null);

  const handleAddEndpoint = () => {
    setEndpoints([...endpoints, { name: 'New Endpoint' }]);
  };

  const toggleModal = () => {
    setModal(!modal)
  }
  async function fetchStatusCode(value) {
    const url = `http://localhost:9002/v1/status-codes/${value.id}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      infoClick(value,data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async function callStatusApi(value){
    const data = await fetchStatusCode(value);
    return data
  }
  const handleInfoButtonClick = (value) =>{
    console.log(value);
    setSearchValue(value.id);
    console.log(searchValue);
    setEntry(value)
    const data=callStatusApi(value)
    setResult(data)
    //setButtonClick(!buttonClick);
    setObj(value);
    console.log(data);
    
  //  console.log("obj",setObj);
  }

  const tableRef = useRef(null);
  const handleScrollClick = () => {
    // scroll to the target element
    // targetRef.current.scrollIntoView({ behavior: 'smooth' });
    const element= document.getElementById('endpoint-table');
    if (element){
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
const addData=(data)=>{
  console.log(data)
  setRecord((prevRecord) => prevRecord.concat(data));
  setTotalEndpoint(totalEndpoint+1)
}
  // const tableRef = useRef(null);
  // const handleScrollClick = () => {
  //   tableRef.current.scrollIntoView({ behavior: "smooth" });
  // };


 
  

//   const getEndpoints = async () => {
//     try {
//       const response = await fetch('http://localhost:9002/v1/endpoints');
//       const data = await response.json();
//       setEndpoints(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   getEndpoints();
const  endpointData =async(page)=>{
  console.log(currentPage)
  await axios.get(`http://localhost:9002/v1/endpoints/${page}`)
  .then(response => {
    const newData= response.data.Endpoint
    // setRecord(newData);
    setCurrentItem(newData)
    console.log('api response' , response.data.Endpoint)
  })
  .catch(error => {
    console.error(error);
  });
}


const pageNumbers = [];
// const indexOfLastItem = currentPage * itemsPerPage;
// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//  setCurrentItem(record.slice(indexOfFirstItem, indexOfLastItem));
const totalPages = Math.ceil(totalEndpoint / itemsPerPage);
for (let i = 1; i <= totalPages; i++) {
  pageNumbers.push(i);
  }

const handelPage= async (page)=>{
 
// setTimeout(()=>{setCurrentPage(page)},1000)
 endpointData(page)
 setCurrentPage(page)
}

const handleSearch=(input)=>{
console.log(input,record)
record.filter((i) => {
  console.log(i)
  if (i.endpoint===input){
    console.log(i)
    handleInfoButtonClick(i)
    return
  }
});
}

useEffect(() => {
    console.log("hgfhgdtrdhtdy")
    // if (endpointValue) {
      // axios.get(`http://localhost:9002/v1/endpoints/count`)
      // .then(response=>{
      //   setTotalEndpoint(response.data)
      // })
      // .catch(error=>{
      //   console.error(error)
      // })
      axios.get(`http://localhost:9002/v1/endpoints/${currentPage}`)
      .then(response => {
        setTotalEndpoint(response.data.Count)
        setCurrentItem(response.data.Endpoint)
        console.log("fyfvhfvhhgvhyg")
        console.log('api response' , response.data)
        console.log("Record:", currentItems); 
      })
      .catch(error => {
        console.error(error);
      });
   // }
  }, []);
  

//   const handleTableClick = (value) => {
//     console.log("value",value);
//     setButtonClick(true);
    // { record  && record.length && <DyanmicTable record = {value} />}
    // console.log(endpointList.endpoint)
    // axios.get(`http://localhost:9002/v1/endpoints?endpoint=${endpointList.endpoint}`)
    //   .then(response => {
    //     setEndpointData(response.data);
    //      setModal(true);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
 // };

// const handleTableClick = (endpointList) => {
    
//     const endpointValue = endpointList.endpoint;
//     setEndpointValue(endpointValue);
//   };

  return (

    <>
    <SearchBar header={'Endpoints'} onSearch={handleSearch}/>
    <div className='endpoints' >
      
      
   
      <div id="swagger-ui-container" className='swagger-wrap'>
      <button className="btn btn-success" id='add-endpoint' onClick={toggleModal}>Add Endpoint
      </button>
      <ReactBootStrap.Table striped bordered hover  className="table table-bordered">
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
        </thead><tbody>
        {currentItems.map(recordList => (
        <tr key={record.id}>
              <td className='text-nowrap'>{recordList.endpoint}</td>
              <td className='text-nowrap'>{recordList.method}</td>
              <td className='text-nowrap'>{recordList.active ?<text >Active</text>:<text >InActive</text>}</td>
              <td className='text-nowrap'> {recordList.description}</td>
              <td className='text-nowrap'>{recordList.file_path ? recordList.file_path.String.toString() : ''}</td>
              <td>{recordList.created_at.toString()}</td>
              <td>{recordList.updated_at.toString()}</td>
              <td>
              <button className="info-button" onClick={() => {handleInfoButtonClick(recordList); handleScrollClick() }}>
              <img src={infoIcon}alt="Info" border="0" />
            {/* <span className="tooltiptext">{recordList.endpoint}</span> */}
            </button>
            <button className="info-button" style={{marginRight:'0px'}} >
              <img src={playIcon}alt="Run" border="0" />
            </button>
              </td>
              </tr>))}
          </tbody></ReactBootStrap.Table>
      
      
      
      
      {modal && <Popup  onData={addData}onClose={toggleModal} />}
      <br /><br />
      {/* <button className="showTableBtn" onClick={handleTableOpen}>Show Table</button>
      {showTable && <TablePopup onClose={handleTableClose} />} */}
         
    
      
      </div>
     
     
    </div>
    <div className="pagination">
      {pageNumbers.map(number => (
        <button  id="page-no" key={number} onClick={() => handelPage(number)}>
          {number}
        </button>
      ))}
    </div>
   
        {/* { entry && <EndpointTable ref={tableRef} record ={entry} />}
        {result && result.length && <StatusCodeTable record ={result} /> } */}
        {/* { record  && record.length && <DyanmicTable record = {record} />} */}
    </>
  );
};

export default Endpoints;