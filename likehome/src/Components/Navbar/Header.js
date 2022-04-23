import React, { useState, useEffect } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import { Avatar } from "@mui/material";
import { BrowserRouter, Link, useHistory, useLocation } from "react-router-dom";
import { logout } from "../../Backend/auth.js";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

function Header(props) {
  const [search, setSearch] = useState("");
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const handleLogout = () => {
    logout();
    props.setStatus(false);
  };

  // handles searching by price, location, and rating
  const handleSearch = () => {
    if (search === "") {
      props.setSorted(props.hotels);
    } else {
      setCalendarOpen(true);
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

    //  Attributes for calendar
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1);  // Default guests number is 1

  
    const handleSelect = (ranges) => {
      setStartDate(ranges.selection.startDate);    //Updating local state of start date
      setEndDate(ranges.selection.endDate);
      props.setRange({startDate: ranges.selection.startDate.toLocaleDateString(), 
        endDate: ranges.selection.endDate.toLocaleDateString(), guests: noOfGuests})
    }
    
    // Hitting the cancel putting erases search input
    const resetInput = () => {  
      setSearch("");
      setCalendarOpen(false);
    }

    const handleGuests = (num) => {
      setNoOfGuests(num);
      props.setRange({startDate: startDate.toLocaleDateString(),
        endDate: endDate.toLocaleDateString(), guests: num});
    }

    //  Function for hitting the search bar to move to catalog page
    const searching = () => {
      history.push({
        pathname: '/catalog',
      });
      setCalendarOpen(false);
    };

    //  Range for calendar
    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    }


  return (
    <>
    <div className="header">

      <img className="header__icon" src="./nav_logo.png" alt="" onClick={() => history.push("/")}/>

      <div className="header__center">
        <input type="text" placeholder="Begin your search here!" value={search} onClick={() => setCalendarOpen(true)} onChange={(e) => setSearch(e.target.value)}/>
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

    <div className="header__bottom">
      {isCalendarOpen && (
      <div className="header__calendar">
        <DateRangePicker ranges={[selectionRange]} 
        minDate={new Date()}    // Minimum date is current date
        onChange={handleSelect} 
        />
        <div className="header__guests">
          <h2 className="header__calendarGuests">Number of Guests</h2>
          <PersonIcon />
            <input
            className="guest__selector"
            type="number"
            value={noOfGuests}
            onChange={event => handleGuests(event.target.value)}
            min={1}
            />   
        </div>
        
        <div className="button__box">
          <Button variant="outlined" className="calendar__buttons" onClick={resetInput}>Cancel</Button>
          <Button variant="contained" className="calendar__buttons" onClick={searching}>Search</Button>
        </div>

      </div>
      )}
    </div>


    </>
  );
}

export default Header;
