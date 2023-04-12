import {Route,Navigate} from 'react-router-dom';
import React from 'react';

const Protected=({auth,omponent:Component,...rest})=>{
    return(
        <Route {...rest} render={(prop)=>{
            if(auth) return <component {...prop}/>
            if(!auth) return <Navigate to={{path:"/",state:{from:prop.location}}}/>
        }}/>
    );
};
export default Protected;