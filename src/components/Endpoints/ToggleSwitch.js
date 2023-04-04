import { useState } from "react";
import ReactSwitch from "react-switch";
import { MDBSwitch } from "mdb-react-ui-kit";
import { type } from "@testing-library/user-event/dist/type";

const ToggleSwitch = ({ value, id }) => {
  const [checked, setChecked] = useState(value.Bool);
  const handleChange = (val) => {
    setChecked(!checked);
    console.log(checked);
    endpointActivate(!checked);
  };
  const endpointActivate = async (val) => {
    console.log(val, id,);
    const requestBody = {
      active: Number(val),
    };
    try {
      const response = await fetch(`http://localhost:9002/v1/endpoint/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log(requestBody);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
        //console.log(description);
      }
    } catch (error) {
      console.error(error);
    }
  };

//   (document).ready(function() {
//     console.log("ready");
//     var checkboxinp = ("#checkboxinp");
//     (".switch").click(function () {
//       console.log(checkboxinp.checked);
//       console.log(checkboxinp.data("on"));
//   });
// });
  

  return (<>
    {/* <ReactSwitch style={{height:'18px',width:'35px'}}  className="toggle-switch" checked={checked}
    onChange={handleChange}></ReactSwitch> */}
        <MDBSwitch style={{height:'18px',width:'35px'}}  id='flexSwitchCheckDefault' checked={checked}  onChange={handleChange}/>

    </>
    // <label class="switch">
    //   <input  type="checkbox" value={checked} onChange={handleChange}/>
    //   <div class="toggleSlidder round"></div>
    // </label>   
  );
};
export default ToggleSwitch;
