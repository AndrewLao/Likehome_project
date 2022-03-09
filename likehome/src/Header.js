import React from 'react'
import './Header.css'

function Header() {
  return (
    <div className = 'header'>
        <img className="header__icon"
        src={require('./logo.png')} />
    </div>
  )
}

export default Header