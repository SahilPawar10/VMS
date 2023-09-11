import React from "react";
import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Approval from "../../components/datatable/Approval";

function ApprovalList() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Approval />
      </div>
    </div>
  );
}

export default ApprovalList;
