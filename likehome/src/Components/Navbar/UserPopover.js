import React from "react";
import Popover from "@material-ui/core/Popover";
import { logout } from "../../Backend/auth.js";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const UserPopover = (props) => {
  return (
    <Popover
      id="user-popover"
      open={props.open}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {props.status ? (
        <div className="header__right">
          <IconButton size="small" onClick={logout}>
            <p>Logout</p>
          </IconButton>
        </div>
      ) : (
        <div className="header__right">
          <IconButton
            size="small"
            onClick={props.onClose}
            component={Link}
            to="/login"
          >
            <p>Login</p>
          </IconButton>
          <p>/</p>
          <IconButton
            size="small"
            onClick={props.onClose}
            component={Link}
            to="/signup"
          >
            <p>Sign-Up</p>
          </IconButton>
        </div>
      )}
      <IconButton
        size="small"
        onClick={props.onClose}
        component={Link}
        to="/account"
      >
        <p>Account</p>
      </IconButton>
    </Popover>
  );
};

export default UserPopover;
