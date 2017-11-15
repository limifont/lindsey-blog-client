import React, { Component } from "react";
import RouteNavItem from './RouteNavItem.js';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="header">
        <img alt="logo" src="https://instagram.fsnc1-1.fna.fbcdn.net/t51.2885-15/e35/21568947_1945369679010838_1465175849048211456_n.jpg" className="logo">
        </img>
        <div className="links">
          <ul>  
            <RouteNavItem href="/tech">tech</RouteNavItem>
            <RouteNavItem href="/photo">photo</RouteNavItem>
            <RouteNavItem href="/services">services</RouteNavItem>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;