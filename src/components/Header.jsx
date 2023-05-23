import { useState } from 'react'
import { Link } from 'react-router-dom'
import { List } from 'react-bootstrap-icons'
import MobileMenu from '../components/MobileMenu'
import logo from '../assets/logo_mobilitydogs_transparent.png'

const Header = () => {

  // Declare on/off state for mobile menu
  const [menuIsOpen, openMenu] = useState(false);

  // Toggle the state of openMenu
  const toggleMobileMenu =() => {
    openMenu(!menuIsOpen);
    document.body.classList.toggle('no-scroll');
  }

  return (
    <>
      <div id='topnav'>
        <div id='logo'>
          <Link to="/"><img src={logo}/></Link>
        </div>

        {/* DESKTOP MENU */}
        <ul id='menu'>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/about">ABOUT</Link>
          </li>
          <li>
            <Link to="/dogs">SERVICE DOGS</Link>
          </li>
          <li>
            <Link to="/largest">Large </Link>
          </li>
          <li>
            <Link to="/medium">Medium </Link>
          </li>
          <li>
            <Link to="/small">Small </Link>
          </li>
          <li>
            <Link to="/shop">DONATE</Link>
          </li>
          <li>
            <Link to="/contact">CONTACT</Link>
          </li>
        </ul>
        

        {/* HAMBURGER ICON */}
        <div id='menu-containter'>
          <button id='show-mobile-menu-button' onClick={toggleMobileMenu}>
            <List id='hamburger-icon'/>
          </button>
        </div>
      </div>

        {/* If menuIsOpen, show the mobile menu */}
        {/* This also gives the mobile menu our close method */}
        {menuIsOpen && <MobileMenu closeMethod={toggleMobileMenu} />}
    </>
  )
}

export default Header
