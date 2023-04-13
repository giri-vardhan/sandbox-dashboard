import { wait } from "@testing-library/user-event/dist/utils";
import { Button } from "bootstrap"
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Box } from "../components/Footer/FooterStyles";
import APIs from "./APIs";
import openLogo from "../components/icons/open.svg"


const Login=({auth,userDetails})=>{
    const [userId,setUserId]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate();
    
    const [inValidUser,setInvalidUser]=useState(false)
    const handleUserIdChange =(event)=>{
        setUserId(event.target.value)
    }
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        if(userId!=="" && password!==""){
            getToken(userId)
        }
        else{
            setInvalidUser(true)
        }
    }
    const getToken=async (name)=>{
        const requestBody={
            user_id:userId,
            password:password, 
        }
        try{
            const response = await fetch(`http://localhost:9002/u1/user/validate`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(requestBody),
            });
            if(response.ok && response.status===200){
                auth(true)
                setInvalidUser(false)
                navigate('/apis')
                const data = await response.json();

                userDetails(data)
            }
            else{
                setInvalidUser(true)
                auth(false)
                throw new Error('Network response was not ok.');

            }
        }
        catch(error){
            console.error(error)
        }

    }

    return(<>
   
        <div className="background-block">
            {(inValidUser)&&(<h5 id="invalid-user">Invalid User Name/Password</h5>)}
            
            <div
             className="form-block" >
                <div className="open-logo-block">
                    <img className="open-logo-login" src={openLogo}/>
                </div>
                
                    <h3>Log In</h3>
                    <div className="login-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <label className="login-label">
                        User Name:
                        <input required className="login-input" onChange={handleUserIdChange}/>
                    </label>
                    <label className="login-label">
                        Password:
                        <input required className="login-input" type='password' onChange={handlePasswordChange}/>
                    </label>
                    <div className="login-block">
                    <button type="submit" className='btn-login'>Log In</button></div>
                </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login;