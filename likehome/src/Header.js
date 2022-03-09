import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';

function Header() {
  return (
    <div className='header'>
        <img className="header__icon"
        src={require('./logo.png')} />

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