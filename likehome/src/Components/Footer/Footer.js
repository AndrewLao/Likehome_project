import React from 'react'
import './Footer.css'

// footer
function Footer() {
  return (
    <div className='footer'>
        <p>&copy; {new Date().getFullYear()}         No rights reserved -Team Zeta class project for SJSU</p>
    </div>
  )
}

export default Footer