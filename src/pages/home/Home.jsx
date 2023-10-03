import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useViewTodaysQuery } from "../../apiservices/visitorSlice";
import { selectCount, selectUser } from "../../reducers/auth.reducer";

const Home = () => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState();
  const [tableData, setTableData] = useState();
  const [checkOut, setCheckOut] = useState(0);

  const approvalsCount = useSelector(selectUser);

  console.log(approvalsCount, "UserHOME");

  const { data, error, isError, isLoading, isSuccess } = useViewTodaysQuery();

  useEffect(() => {
    if (error) {
      console.log(error, "Home page Error");
    }
    if (data) {
      // console.log(data, "Data in Home page");
      setCheckIn(data.length);

      let tableData = data.map((item, index) => ({
        srNo: index + 1,
        ...item,
      }));
      setTableData(tableData);
      const outData = data.filter((item) => item.checkout);
      setCheckOut(outData.length);
      // console.log(outData, "filtered");
    }
  }, [data, isError]);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="H_dashboard mt-3 px-4">
          <u>Dashboard</u>
        </div>

        <div className="widgets">
          <Widget type="user" dataCount={checkIn} />
          <Widget type="order" dataCount={checkOut} />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          {/* <Featured /> */}
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
          <Table dataTable={tableData} />
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
