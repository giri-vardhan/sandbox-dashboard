import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./UserPopup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ onClose, userData }) => {
const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [isEdit, setIsEdit] = useState(false);
  const [userName,setUserName]=useState(userData.user_id)
  const [password,setPassword]=useState(userData.password)
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handleEditButton = () => {
    setIsEdit(!isEdit);
  };
 const updateUserDetails = async()=>{
    const requestBody={
        user_id_old:userData.user_id,
        password_old:userData.password,
        user_id_new:userName,
        password_new:password,
    }
    try{
        const response =await fetch("http://localhost:9002/u1/user/update",{
            method:'PUT',
            headers: {
                "Content-Type": "application/json",
              },
              body:JSON.stringify(requestBody),
        })
        if (response.ok && response.status===200) {
            onClose();
            const data=await response.json()
            userData=data
            navigate('/')
        }
        else{
            throw new Error("Network response was not ok.");
        }

    }
    catch(error){
        console.error(error);
    }
 }
 const handlePasswordChange=(event)=>{
    setPassword(event.target.value)
 }
 const handleUserNameChange=(event)=>{
    setUserName(event.target.value)
 }
  return (
    <div className="popup-container">
      <div className="popup-content">
        <div className="titleCloseBtn">
          <button onClick={onClose} id="close-btn">
            X
          </button>
          <div className="profile-icon-div">
            <FontAwesomeIcon icon={faUser} className="user-div-icon" />
            <h3 className="profile-header">Profile</h3>
          </div>
          <div className="profile-details-div">
            
            <label>
              User Name :
              <br/>
              <div className={isEdit?"label-holder-edit":"label-holder"}>
              <input
                className="in-user"
                disabled={!isEdit}
                value={userName}
                onChange={handleUserNameChange}
              /></div>
            </label>
           <br/>
            <label>
              Password :
              <br/>
              <div className={isEdit?"label-holder-edit":"label-holder"}>
              <input
                
                className="in-paswd"
                type={passwordType}
                disabled={!isEdit}
                value={password}
                onChange={handlePasswordChange}
              >
              </input>
              
               {passwordType === "password" ? (
                  <FontAwesomeIcon icon={faEyeSlash} onClick={togglePassword} />
                ) : (
                  <FontAwesomeIcon icon={faEye} onClick={togglePassword} />
                )} 
              </div>
            </label>
          </div>
          <div className="btn-div">
            <button className="btn btn-success u-edit"hidden={isEdit} onClick={handleEditButton}>
              Edit
            </button>
            <button className="btn btn-success u-update" hidden={!isEdit} onClick={updateUserDetails}>Update</button>
            <button className="btn btn-danger u-cancel" hidden={!isEdit} onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
