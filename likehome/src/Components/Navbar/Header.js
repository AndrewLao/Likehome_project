import React, { useState, useEffect } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { logout } from "../../Backend/auth.js";

function Header(props) {
  const [search, setSearch] = useState("");
  const handleLogout = () => {
    logout();
    props.setStatus(false);
  };

  // handles searching by price, location, and rating
  const handleSearch = () => {
    if (search === "") {
      props.setSorted(props.hotels);
    } else {
      props.setSorted(props.hotels.filter( (hotel) => 
        ((hotel.addr + " " + hotel.details + " " + hotel.hotelname)
          .toLowerCase()
            .includes(search.toLowerCase())
        )));
    }
  }

  useEffect(() => {
    handleSearch();
  }, [search])

  return (
    <div className="header">
      <Link to="/">
        <img className="header__icon" src="./nav_logo.png" alt="" />
      </Link>

      <div className="header__center">
        <input type="text" onChange={(e) => setSearch(e.target.value)}/>
        <SearchIcon />
      </div>

      <div className="header__right">
        {props.status ? (
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
        {props.status ? (
          <>
            <IconButton component={Link} to="/account">
              <Avatar />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton>
              <Avatar />
            </IconButton>
          </>
        )}
        
      </div>
    </div>
  );
}

export default Header;
