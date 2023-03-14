import React, { useState, useEffect, useRef } from 'react';
import Popup from './AddEndpointPopup';
import TablePopup from './Table';
import axios from 'axios';
import StatusCodeTable from './StatusCodeTable';
import EndpointTable from './EndpointTable';
import { FaStar } from 'react-icons/fa';
import downIcon from '../icons/down.png';

const Endpoints = () => {
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
  const [endpointData, setEndpointData] = useState([]);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  const handleAddEndpoint = () => {
    setEndpoints([...endpoints, { name: 'New Endpoint' }]);
  };

  const toggleModal = () => {
    setModal(!modal)
  }

  const handleButtonClick = (value) =>{
    console.log(value);
    setSearchValue(value.id);
    console.log(searchValue);
    setEntry(value)
    var url=`http://localhost:9002/v1/status-codes/${value.id}`
        console.log("here statuscode",record);
            console.log("xyz",url)
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setResult(data);
                  console.log(data);
                })
                .catch(error => console.error(error));
    //setButtonClick(!buttonClick);
    setObj(value);
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

useEffect(() => {
    console.log("hgfhgdtrdhtdy")
    // if (endpointValue) {
      axios.get(`http://localhost:9002/v1/endpoints`)
        .then(response => {
          setRecord(response.data);
          console.log("fyfvhfvhhgvhyg")
          console.log('api response' , response.data)
        })
        .catch(error => {
          console.error(error);
        });
   // }
  }, []);
  
 console.log("Record:", record); 

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
    <div className='endpoints'>
      <h2>Endpoints List</h2>
      <div id="swagger-ui-container" className='swagger-wrap'>
      <ul>
        <li>
      {record.map(recordList => (

        <div key={recordList.id} className="endpoint-list-links">
           <div className='endpoint-link'>
            
              <button className='endpoint-method'>{recordList.method}</button>
              <a href='#!' >
                <h6 >{recordList.endpoint}</h6>
                {/* <button>info</button> */}
              </a>
            
              <button className="info-button" onClick={() => {handleButtonClick(recordList); handleScrollClick() }}>
              <img src={downIcon}alt="Info" border="0" />
            {/* <span className="tooltiptext">{recordList.endpoint}</span> */}
            </button>
            
            {/* <TablePopup endpointValue={endpointValue} /> */}
            </div>
        </div>
      ))}
      
      <button className="btn btn-success" onClick={toggleModal}>Add Endpoint</button>
      {modal && <Popup  onClose={toggleModal} />}
      <br /><br />
      {/* <button className="showTableBtn" onClick={handleTableOpen}>Show Table</button>
      {showTable && <TablePopup onClose={handleTableClose} />} */}
          </li>
      </ul>
      </div>
    </div>
        { entry && <EndpointTable ref={tableRef} record ={entry} />}
        {result && result.length && <StatusCodeTable record ={result} /> }
        {/* { record  && record.length && <DyanmicTable record = {record} />} */}
    </>
  );
};

export default Endpoints;