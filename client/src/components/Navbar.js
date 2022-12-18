import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom";

export default function Navbar
  () {
  
  return (
    <ul className='navbar'>
      <li className='navbar-li'>
        <Link className='navbar-link' to="/transactions">Home</Link> 
      </li>
      <li className='navbar-li'>
        <Link className='navbar-link' to="/invoices">Invoices</Link> 
      </li>
    </ul>
  )
}
