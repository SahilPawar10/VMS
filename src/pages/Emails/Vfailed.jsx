import React from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation
import "./Verifieds.scss";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Vfailed = () => {
  return (
    <>
      <div className="vh-100 d-flex justify-center align-center ">
        <div className="col-md-4 main_box">
          <div className="border custom-border"></div>
          <div className="mb-4 text-center">
            <ErrorOutlineIcon style={{ fontSize: "60px", color: "red" }} />
          </div>
          <div className="text-center">
            <h1 style={{ color: "red" }}>Verification Failed !</h1>
            <p>There was an error,Contact Admin</p>
            <Link>
              <button className="custom-button ">Thank You</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vfailed;
