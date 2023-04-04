import React , {useState,useRef} from 'react';
import { Button } from 'react-bootstrap';
import Endpoints from '../components/Endpoints/Endpoints';
import EndpointTable from '../components/Endpoints/EndpointTable';
import StatusCodeTable from '../components/Endpoints/StatusCodeTable';
import Footer from '../components/Footer/Footer';
import backIcon from '../components/icons/back.png';
import Status from './about.js';

const APIs = () => {
  const [entry,setEntry] =useState();
  const [result,setResult] =useState();

  const infoSectionRef = useRef(null);
  
 
  const [showComponentA, setShowComponentA] = useState(false);

  const handleClickInfo = (data,stattus) => 
  {
    console.log("here in info")
    setEntry(data)
    setResult(stattus)
    setShowComponentA(true);
  };

  const handleClickAccordion = (e) => {
    e.stopPropagation(); 
    //Add code to toggle the accordion
  };


  // const handleClickInfo = (e) => {
  //   e.stopPropagation();
  //   scrollToDiv(infoSectionRef);
  // };
const handleClickBack=()=>{
  setShowComponentA(false)
}
  return (
    <div className='page'>
    {/* <div 
      // style={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   height: '90vh'
      // }}
    //> */}
      {/* <h1 style={{textAlign:'center', marginTop:'10px'}}>API's</h1> */}
      {/* <ul className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <li className=''>
          <a class="getBalance-link" href="!#" data-sw-translate>getBalance</a>
          <div className="container">
            <button onClick={handleClickInfo}>Info</button>
          </div>
        </li>
        <li>
          <a className="getOTP" href="!#" >getOTP</a>
        </li>
        <li>
          <a className="getOTP" href="!#" >getOTP</a>
        </li>
        <li>
          <a className="getOTP" href="!#" >getOTP</a>
        </li>

      </ul>
    </div>

    <div ref={infoSectionRef} className="info-section">
        <h2>Info Section</h2>
        <p>
          This is some content in the info section. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed vel semper nunc, sit amet semper
          massa. In tincidunt ex ac quam commodo, a tincidunt eros aliquet.
  </p>*/}
    {/* <Endpoints /> */}
    {showComponentA === true ? (
      <div actiivesytle='true'>
        <Status  handleClickBack={handleClickBack} entry={entry} result={result}/>
      </div>
      
// {/* <div>
// <div className='endpointHeader'>
// <button className='backButton' onClick={handleClickBack}>
//       <img src={backIcon} alt="Back"/>
//     </button>
//     <h2 className='endpoint-header' >Endpoint</h2>{entry && <EndpointTable  record={entry} />}
    
//     </div>
    
//     {/* <button className='backButton' onClick={handleClickBack}>
//       <img src={backIcon} alt="Back"/>
//     </button> */}
//     { <div><h2 className='status-header'>Status Code Table</h2>  <StatusCodeTable record={result} endpoint={entry} /></div>}
//     </div> */}
) : (
  <Endpoints infoClick={handleClickInfo} />
)}
      {/* </div>  */}
      </div>
  );
};

export default APIs;