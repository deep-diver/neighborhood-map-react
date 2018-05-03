import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Top from './Top.js'
import SideMenu from './SideMenu.js'

class App extends Component {
  openSideMenu() {
    this.sideMenu.openSideMenu()
  }

  closeSideMenu() {
    this.sideMenu.closeSideMenu()
  }

  render() {
    return (
      <div className="App">
        <Top openSideMenuHandler={this.openSideMenu.bind(this)} closeSideMenuHandler={this.closeSideMenu.bind(this)}/>
        <SideMenu ref={instance => {this.sideMenu = instance}}/>
        <Map/>
      </div>
    );
  }
}

export default App;
