import React, { useContext } from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom";
import { AppContext } from './AppContext';
import LogoutBtn from './LogoutBtn';

export default function Navbar
  () {

  const { user } = useContext(AppContext)

    if (user.type === "user") {
      return (
        <ul className='navbar'>
          <li className='navbar-li'>
            <Link className='navbar-link' to="/transactions">Home</Link>
          </li>
          <li className='navbar-li'>
            <Link className='navbar-link' to="/accept_claim">Pay Claim</Link>
          </li>
          <li className='navbar-li'>
            <LogoutBtn/>
          </li>
        </ul>
      )
    }

    if (user.type === "hospital") {
      return (
        <ul className='navbar'>
          <li className='navbar-li'>
            <Link className='navbar-link' to="/home-hospital">Home</Link>
          </li>
          <li className='navbar-li'>
            <Link className='navbar-link' to="/get_licence">Buy Licence</Link>
          </li>
          <li className='navbar-li'>
            <Link className='navbar-link' to="/file_claim ">File Claim</Link>
          </li>
          <li className='navbar-li'>
            <LogoutBtn/>
          </li>
          
        </ul>
      )
    }

}
