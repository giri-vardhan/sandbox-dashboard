import React from 'react';
import backIcon from '../components/icons/back.png';
import EndpointTable from '../components/Endpoints/EndpointTable';
import StatusCodeTable from '../components/Endpoints/StatusCodeTable';
import {useNavigate} from "react-router-dom";

const Status = ({entry,result,handleClickBack}) => {
  return (
    <>
    <div className='endpoint-table'>
<div className='endpointHeader'>
<button className='backButton' onClick={handleClickBack}>
      <img src={backIcon} alt="Back"/>
    </button>
    <h2 className='endpoint-header' >Endpoint</h2>{entry && <EndpointTable  record={entry} />}
    
    </div>
    
    {/* <button className='backButton' onClick={handleClickBack}>
      <img src={backIcon} alt="Back"/>
    </button> */}
    { <div >  <StatusCodeTable record={result} endpoint={entry} /></div>}
    </div>
    </>
  );
};

export default Status;