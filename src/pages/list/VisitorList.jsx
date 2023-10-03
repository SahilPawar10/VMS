// import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React from "react";
// import Visitor from "../../components/datatable/Visitor";
import Visitor from "../../components/datatable/Visitor";
import { useSelector } from "react-redux";
import { selectCount } from "../../reducers/auth.reducer";

function VisitorList() {

  const approl  = useSelector(selectCount)
  console.log(approl,"vistoraapro");
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
