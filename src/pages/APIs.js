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
const APIs = ({ isLog, auth,userData}) => {
  const [entry, setEntry] = useState();
  const [result, setResult] = useState();
  const navigate = useNavigate();

  const infoSectionRef = useRef(null);

  const [showComponentA, setShowComponentA] = useState(false);

  const handleClickInfo = (data, stattus) => {
    setEntry(data);
    setResult(stattus);
    setShowComponentA(true);
  };

  const handleClickAccordion = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isLog === false) {
      navigate("/");
    }
  });
  const handleClickBack = () => {
    setShowComponentA(false);
    navigate("/apis");
  };
  const handleClickApiIcon = () => {
    setShowComponentA(false);
  };
  return (
    <div className="page">
      {isLog && (
        <>
          <Navbar back={handleClickApiIcon} />
          <div >
          {showComponentA === true ? (
            <div  actiivesytle="true">
              <Status
                handleClickBack={handleClickBack}
                entry={entry}
                result={result}
                userData={userData}
                auth={auth}
              />
            </div>
          ) : (
            <div >
            <Endpoints infoClick={handleClickInfo} userData={userData} auth={auth}/></div>
          )}
          </div>
        </>
      )}
  
    </div>
  );
};

export default APIs;