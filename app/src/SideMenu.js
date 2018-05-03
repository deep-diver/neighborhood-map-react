import React, {Component} from 'react'
import './SideMenu.css'

class SideMenu extends Component {
  state = {
    width: "0"
  }

  openSideMenu() {
    document.querySelector('#mySidenav').style.width = "250px";
    document.querySelector("#map").style.marginLeft = "250px";
    document.querySelector("#top-bar").style.marginLeft = "250px";
  }

  closeSideMenu() {
    document.querySelector('#mySidenav').style.width = "0";
    document.querySelector("#map").style.marginLeft = "0";
    document.querySelector("#top-bar").style.marginLeft = "0";
  }

  render() {
    return (
      <div id="mySidenav" className="sidenav">
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>
    )
  }
}

export default SideMenu;
