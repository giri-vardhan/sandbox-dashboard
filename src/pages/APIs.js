import React , {useState,useRef} from 'react';
import Endpoints from '../components/Endpoints/Endpoints';
import Table from '../components/Endpoints/Table';
import Footer from '../components/Footer/Footer';


const APIs = () => {

  const infoSectionRef = useRef(null);
  const myDivRef = useRef(null);

  const scrollToDiv = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClickAccordion = (e) => {
    e.stopPropagation(); 
    //Add code to toggle the accordion
  };


  const handleClickInfo = (e) => {
    e.stopPropagation();
    scrollToDiv(infoSectionRef);
  };

  return (
    <>
    <div 
      // style={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   height: '90vh'
      // }}
    >
      <h1 style={{textAlign:'center', marginTop:'10px'}}>API's</h1>
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
    <Endpoints />
    
      </div> 
    </>
  );
};

export default APIs;