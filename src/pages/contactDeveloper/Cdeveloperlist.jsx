import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Cdeveloper from "./Cdeveloper";

const Cdeveloperlist= () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Cdeveloper />
      </div>
    </div>
  );
};

export default Cdeveloperlist;
