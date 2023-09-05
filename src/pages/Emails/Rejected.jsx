import React from "react";
import "./Verifieds.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Rejected() {
  return (
    <>
      <div className="vh-100 d-flex justify-center align-center ">
        <div className="col-md-4 main_box">
          <div className="border custom-border"></div>
          <div className="mb-4 text-center">
            <CheckCircleIcon style={{ fontSize: "60px", color: "#4caf50" }} />
          </div>
          <div className="text-center">
            <h1>Visit Rejected!</h1>
            <p>Team VMS</p>
            <button className="custom-button ">Thank You</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rejected;
