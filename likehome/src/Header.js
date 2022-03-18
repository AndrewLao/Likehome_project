import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className='header'>

      <Link to='/'>
        <img className="header__icon"
        src={require('./logo.png')} />
      </Link>


      <div className='header__center'>
        <input type='text' />
        <SearchIcon />
      </div>

          <div className='header__right'>
              <IconButton size="small" component={Link} to="/login">
                   <p>Login</p>
              </IconButton>
              <p>/</p>
              <IconButton size="small" component={Link} to="/signup">
                  <p>Sign-Up</p>
              </IconButton>
              <IconButton component={Link} to="/catalog">
                  <MenuIcon />
                </IconButton>
              <IconButton component={Link} to="/account">
                  <Avatar />
               </IconButton>
      </div>
    </div>
  )
}

export default Header