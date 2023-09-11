import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Tooltip from "@mui/material/Tooltip";
import { Person, Call, Email } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
// import { ViewProfile } from "../../api/apis";

import { useState, useEffect } from "react";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import { ViewProfile } from "../../api/staff/staff.api";

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [User, setUser] = useState({});

  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const handleLogout = (id) => {
    localStorage.clear();
    navigate("/login");
  };

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = () => {
    // setId(id);
    setDeleteMessage(`Are you sure you want logout from app ?`);

    setDisplayConfirmationModal(true);
  };

  const user = User.name ? (
    <Avatar sx={{ width: 32, height: 32, backgroundColor: "#7451f8" }}>
      {User.name[0]}
    </Avatar>
  ) : (
    "A"
  );
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    }
    getProfile();
  }, []);

  function getProfile() {
    const number = localStorage.getItem("mobile");
    console.log(number);
    const data = {
      mobile: number,
    };
    ViewProfile(data)
      .then((res) => {
        // console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {user}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem>{User?.name}</MenuItem>
        <MenuItem>{User?.number}</MenuItem>
        <MenuItem>{User?.role}</MenuItem>
        <MenuItem onClick={logOut}>Logout</MenuItem> */}

        <MenuItem>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>

          {User?.name}
        </MenuItem>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Call fontSize="small" />
          </ListItemIcon>

          {User?.number}
        </MenuItem>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <PermContactCalendarIcon fontSize="small" />
          </ListItemIcon>

          {User?.role}
        </MenuItem>

        <Divider />

        <MenuItem onClick={showDeleteModal}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>

        <Divider />
      </Menu>

      <ConfirmDelete
        showModal={displayConfirmationModal}
        hideModal={hideConfirmationModal}
        confirmDelete={handleLogout}
        message={deleteMessage}
        confirmtype={"Confirm Logout"}
      />
    </React.Fragment>
  );
}
