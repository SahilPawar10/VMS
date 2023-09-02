// import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React from "react";
import MuiTabs from "./MuiTabs";

function AllLogs() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <MuiTabs />
      </div>
    </div>
  );
}

export default AllLogs;
