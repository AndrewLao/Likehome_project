import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import UserPopover from "./UserPopover.js";
import Status from "../../Backend/SessionStatus.js";

function Header() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="header">
      <Link to="/">
        <img className="header__icon" src="./nav_logo.png" />
      </Link>

      <div className="header__center">
        <input type="text" />
        <SearchIcon />
      </div>

      <div className="header__right">
        <IconButton component={Link} to="/catalog">
          <MenuIcon />
        </IconButton>
        <IconButton onClick={() => setOpen(true)}>
          <Avatar />
        </IconButton>
        <UserPopover
          status={Status()}
          open={isOpen}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
}

export default Header;
