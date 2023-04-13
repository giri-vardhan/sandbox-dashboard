import { useState } from "react";
import ReactSwitch from "react-switch";
import { MDBSwitch } from "mdb-react-ui-kit";
import { type } from "@testing-library/user-event/dist/type";

const ToggleSwitch = ({ value, id }) => {
  const [checked, setChecked] = useState(value.Bool);
  const handleChange = (val) => {
    setChecked(!checked);
    endpointActivate(!checked);
  };
  const endpointActivate = async (val) => {
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
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MDBSwitch
        style={{ height: "18px", width: "35px" }}
        id="flexSwitchCheckDefault"
        checked={checked}
        onChange={handleChange}
      />
    </>
  );
};
export default ToggleSwitch;
