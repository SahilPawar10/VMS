import React from "react";
import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Staff from "../../components/datatable/Staff";

function StaffData() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Staff />
      </div>
    </div>
  );
}

export default StaffData;
