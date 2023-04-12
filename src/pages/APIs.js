import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Endpoints from "../components/Endpoints/Endpoints";
import EndpointTable from "../components/Endpoints/EndpointTable";
import StatusCodeTable from "../components/Endpoints/StatusCodeTable";
import Footer from "../components/Footer/Footer";
import backIcon from "../components/icons/back.png";
import Status from "./status.js";
import { useNavigate } from "react-router-dom";
const APIs = ({ isLog, auth }) => {
  const [entry, setEntry] = useState();
  const [result, setResult] = useState();
  const navigate = useNavigate();

  const infoSectionRef = useRef(null);

  const [showComponentA, setShowComponentA] = useState(false);

  // if (isLog===false){
  //   console.log("in if")
  //   navigate('/' replace)
  // }
  console.log(isLog);
  const handleClickInfo = (data, stattus) => {
    console.log("here in info");
    setEntry(data);
    setResult(stattus);
    setShowComponentA(true);
  };

  const handleClickAccordion = (e) => {
    e.stopPropagation();
    //Add code to toggle the accordion
  };

  useEffect(() => {
    if (isLog === false) {
      console.log("in if");
      navigate("/");
    }
  });
  // const handleClickInfo = (e) => {
  //   e.stopPropagation();
  //   scrollToDiv(infoSectionRef);
  // };
  const handleClickBack = () => {
    setShowComponentA(false);
    navigate(-1);
  };
  const handleClickApiIcon = () => {
    setShowComponentA(false);
  };
  return (
    <div className="page">
      {isLog && (
        <>
          <Navbar back={handleClickApiIcon} auth={auth} />
          <div >
          {showComponentA === true ? (
            <div  actiivesytle="true">
              <Status
                handleClickBack={handleClickBack}
                entry={entry}
                result={result}
              />
            </div>
          ) : (
            <div >
            <Endpoints infoClick={handleClickInfo} /></div>
          )}
          </div>
        </>
      )}
  
    </div>
  );
};

export default APIs;