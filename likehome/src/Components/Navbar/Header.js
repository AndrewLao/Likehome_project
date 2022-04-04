import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { logout } from "../../Backend/auth.js";
import Status from "../../Backend/SessionStatus.js";

function Header() {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header__icon" src="./nav_logo.png" alt="" />
      </Link>

      <div className="header__center">
        <input type="text" />
        <SearchIcon />
      </div>

      <div className="header__right">
        {Status() ? (
          <>
            <IconButton size="small" onClick={handleLogout}>
              <p>Logout</p>
            </IconButton>
          </>
        ) : (
          <>
            <IconButton size="small" component={Link} to="/login">
              <p>Login</p>
            </IconButton>
            <div className="sadSlash">/</div>
            <IconButton size="small" component={Link} to="/signup">
              <p>Sign-Up</p>
            </IconButton>
          </>
        )}

        <IconButton component={Link} to="/catalog">
          <MenuIcon />
        </IconButton>
        <IconButton component={Link} to="">
          <Avatar />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
