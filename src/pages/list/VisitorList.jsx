// import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React from "react";
// import Visitor from "../../components/datatable/Visitor";
import Visitor from "../../components/datatable/Visitor";

function VisitorList() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Visitor />
      </div>
    </div>
  );
}

export default VisitorList;
