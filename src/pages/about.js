import React from 'react';
import backIcon from '../components/icons/back.png';
import EndpointTable from '../components/Endpoints/EndpointTable';
import StatusCodeTable from '../components/Endpoints/StatusCodeTable';

const Status = ({entry,result,handleClickBack}) => {
  return (
    <>
    <div>
<div className='endpointHeader'>
<button className='backButton' onClick={handleClickBack}>
      <img src={backIcon} alt="Back"/>
    </button>
    <h2 className='endpoint-header' >Endpoint</h2>{entry && <EndpointTable  record={entry} />}
    
    </div>
    
    {/* <button className='backButton' onClick={handleClickBack}>
      <img src={backIcon} alt="Back"/>
    </button> */}
    { <div><h2 className='status-header'>Status Code Table</h2>  <StatusCodeTable record={result} endpoint={entry} /></div>}
    </div>
    </>
  );
};

export default Status;