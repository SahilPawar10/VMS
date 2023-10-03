import { useState, useEffect } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import {
  AllVisitor,
  ViewLogs,
  VisitorIn,
  VisitorOut,
} from "../../api/visitor/apis";
import { useNavigate } from "react-router-dom";

const Widget = ({ type, dataCount = 0 }) => {
  const navigate = useNavigate();
  // const [visitor, setVisitor] = useState([]);
  const [visitorIN, setVisitorIN] = useState([]);
  const [visitorOut, setVisitorOut] = useState([]);
  const [visitorAll, setVisitorAll] = useState([]);
  const [approval, setApproval] = useState();
  const [path, setPath] = useState();

  let data;
  //temporary

  const redirect = (path) => {
    // e.preventDefault();
    // navigate(path);
    console.log("welcomde", path);
    navigate(path);
  };

  useEffect(() => {
    ViewLogs()
      .then((data) => {
        // console.log(data.data, "Visitors");

        let temp = 0;
        data.data.forEach((visitor) => {
          if (visitor.aprooval === "pending") temp += 1;
        });
        setApproval(temp);
        // setVisitor(data.data);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    AllVisitor()
      .then((res) => {
        let addedId = [];
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].srNo = i + 1;
          addedId.push(res.data[i]);
        }

        setVisitorAll(res.data.length);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    VisitorOut()
      .then((data) => {
        // console.log(data.data.length, "VisitorsOUT");
        setVisitorOut(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  switch (type) {
    case "user":
      data = {
        title: "Visitor IN",
        isMoney: false,
        link: "view list",
        amount: dataCount,
        path: "/logs",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Visitor Out",
        isMoney: false,
        link: "View list",
        amount: dataCount,
        path: "/logs",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "Approvals",
        isMoney: true,
        link: "View approvals",
        amount: approval,
        path: "/approval",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "Overall Visitors",
        isMoney: true,
        link: `See details `,
        amount: visitorAll,
        path: "/users",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget" key={data}>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        <span
          // defaultValue={data.path}
          className="link"
          onClick={() => {
            redirect(data.path);
          }}
        >
          {data.link}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {/* {diff} % */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
