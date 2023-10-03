// import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React from "react";
import MuiTabs from "./MuiTabs";
import CheckedIn from "../../components/Alllogs/CheckedIn";

function AllLogs() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <CheckedIn />
      </div>
    </div>
  );
}

export default AllLogs;
