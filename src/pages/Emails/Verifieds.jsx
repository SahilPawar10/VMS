import React from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation
import "./Verifieds.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Verifieds = () => {
  return (
    <>
      <div className="vh-100 d-flex justify-center align-center ">
        <div className="col-md-4 main_box">
          <div className="border custom-border"></div>
          <div className="mb-4 text-center">
            <CheckCircleIcon style={{ fontSize: "60px", color: "#4caf50" }} />
          </div>
          <div className="text-center">
            <h1>Visit Approved !</h1>
            <p>
              We've sent the link to your inbox. Lorem ipsum dolor sit, lorem
              lorem
            </p>
            <button className="custom-button ">Back Home</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verifieds;
