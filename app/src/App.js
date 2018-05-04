import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'
import Top from './Top.js'
import SideMenu from './SideMenu.js'

class App extends Component {
  state = {
    center: {
      lat: 37.566535,
      lng: 126.977969
    }
  }

  onCenterChangeHandler(center) {
    console.log(center)
    this.setState({
      center: {
        lat: center.lat(),
        lng: center.lng()
      }
    })
  }

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
        <SideMenu ref={instance => {this.sideMenu = instance}} center={this.state.center}/>
        <Map center={this.state.center} onCenterChangeHandler={this.onCenterChangeHandler.bind(this)}/>
      </div>
    );
  }
}

export default App;
