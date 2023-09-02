import { useState, useEffect } from "react";
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { ViewLogs, VisitorIn, VisitorOut } from "../../api/apis";
import { useNavigate } from "react-router-dom";

const Widget = ({ type }) => {
  const navigate = useNavigate();
  const [visitor, setVisitor] = useState([]);
  const [visitorIN, setVisitorIN] = useState([]);
  const [visitorOut, setVisitorOut] = useState([]);
  const [visitorAll, setVisitorAll] = useState([]);
  const [approval, setApproval] = useState();
  const [path, setPath] = useState();

  let data;
  //temporary
  const amount = 100;
  const diff = 20;

  const onChange = (e) => {
    // const name = e.target.name;
    const value = e.target.value;
    // setPath((preveState) => ({
    //   ...preveState,
    //   [name]: value,
    // }));
    console.log(e);
    setPath(value);
  };

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
          if (visitor.aprooval === false) temp += 1;
        });
        setApproval(temp);
        setVisitor(data.data);
        setVisitorAll(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
      });

    VisitorIn()
      .then((data) => {
        setVisitorIN(data.data.length);
      })
      .catch((err) => {
        console.log(err, "error");
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
        title: "VisitorIN",
        isMoney: false,
        link: "view list",
        amount: visitorIN,
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
        title: "VisitorOut",
        isMoney: false,
        link: "View list",
        amount: visitorOut,
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
        link: "View pending approvals",
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
        title: "OverAll Visitors",
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
