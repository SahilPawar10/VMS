import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    console.log("hiiii", "logged out");
    navigate("/login");
  };
  return (
    <div className="sidebar ">
      <div className="top mt-3">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="" className="logo" />
          {/* <span>Admin@vms</span> */}
        </Link>
      </div>

      <div className="center mt-4">
        <ul>
          {/* <p className="title">MAIN</p> */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <li id="li1">
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          {/* <p className="title">LISTS</p> */}
          <Link to="/staff" style={{ textDecoration: "none" }}>
            <li id="li1">
              <PersonOutlineIcon className="icon" />
              <span>Staff</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Visitors</span>
            </li>
          </Link>
          <Link to="/approval" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Approvals</span>
            </li>
          </Link>
          <Link to="/logs" style={{ textDecoration: "none" }}>
            <li>
              {/* logs */}
              <PeopleOutlineIcon className="icon" />
              <span>Logs</span>
            </li>
          </Link>
          {/* <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li> */}
          {/* <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}

          {/* <p className="title">SERVICE</p>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>Contact </span>
            </li>
          </Link> */}
          {/* <Link to="/faq" style={{ textDecoration: "none" }}>
            <li>
              <PsychologyOutlinedIcon className="icon" />
              <span>FAQ</span>
            </li>
          </Link> */}
          {/* <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Contact Developer</span>
          </li> */}
          {/* <p className="title">USER</p> */}
          {/* profile */}
          {/* <li>
            <ExitToAppIcon className="icon" />
            <span onClick={() => logout()}>Logout</span>
          </li> */}
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
