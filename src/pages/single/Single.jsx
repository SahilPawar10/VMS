/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
// import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { viewOne } from "../../api/visitor/apis";
import ViewOne from "../../components/table/ViewOne";

const Single = () => {
  const params = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(params.userId);

    viewOne(params.userId)
      .then((user) => {
        setUser(user.data);
        console.log(user.data);
      })
      .catch((err) => console.log(err));

    // getOnesVisitorMeets(params.userId)
    //   .then((res) => console.log(res, "GetOnesVisitorMeets"))
    //   .catch((err) => console.log(err));
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">view</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={`data:image/jpeg;base64,${user.image}`}
                className="itemImg"
              />
              <div className="details">
                {/* <h1 className="itemTitle">{user.name}</h1> */}
                <div className="detailItem">
                  <span className="itemKey">Name:</span>
                  <span className="itemValue">{user.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.name}@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.number}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{user.address}</span>
                </div>
                {/* <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Visits ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Overall Visits</h1>
          <ViewOne id={params.userId} />
        </div>
      </div>
    </div>
  );
};

export default Single;
