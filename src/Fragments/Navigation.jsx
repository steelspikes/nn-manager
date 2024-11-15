import React from "react";
import '../Styles/Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faNetworkWired } from '@fortawesome/free-solid-svg-icons'

function Navigation() {
  return (
    <div className="nav">
      <nav className="fixed top-0 w-full h-16 flex items-center justify-between px-8">
        <a href="#"><FontAwesomeIcon icon={faNetworkWired} size="2x" /></a>
        <a href="#"><FontAwesomeIcon icon={faUser} size="2x" /></a>
      </nav>
    </div>
  );
}

export default Navigation;
