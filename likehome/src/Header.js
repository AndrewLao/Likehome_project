import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
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
          <p>Sign In/Login</p>
          <Avatar />
        </div>
    </div>
  )
}

export default Header