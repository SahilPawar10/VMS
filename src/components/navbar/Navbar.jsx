import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";

import { useProfileStaffMutation } from "../../apiservices/staffSlice";
import { setProfile } from "../../reducers/auth.reducer";
import { useDispatch } from "react-redux";

import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Profile from "../admin/Profile";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const [staffProfile] = useProfileStaffMutation();
  const navigate = useNavigate();

  const reduxDispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
    getProfile();
  }, []);

  async function getProfile() {
    const number = localStorage.getItem("mobile");
    // console.log(number);
    const formData = {
      mobile: number,
    };

    const { error, data } = await staffProfile(formData);

    if (error) {
      console.log(error);
    } else if (data) {
      // console.log(data, "navbar api");
      // setUser(data);
      // reduxDispatch(setProfile(data));
    }
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        {/* <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div> */}
        <div className="items">
          {/* <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div> */}
          {/* <div className="item">
            <Link to="/faq" style={{ textDecoration: "none", color: "gray" }}>
              <PsychologyOutlinedIcon className="icon" />
            </Link>
          </div> */}

          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div> */}
          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
          {/* <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
