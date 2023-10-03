import React, { useEffect } from "react";
import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Approval from "../../components/datatable/Approval";

import { useSelector, useDispatch } from "react-redux";
import { selectCount, setCount } from "../../reducers/auth.reducer";

function ApprovalList() {
  const data = useSelector(selectCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCount(5));
  }, []);

  console.log("DataCountINAPP:", data);
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
