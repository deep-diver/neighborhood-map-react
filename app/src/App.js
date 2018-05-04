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
    },

    places: []
  }

  onPlacesUpdated(updatedPlaces) {
    this.setState({
      places: updatedPlaces
    })

    console.log(this.state.places)
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
        <SideMenu ref={instance => {this.sideMenu = instance}} center={this.state.center} onPlacesUpdated={this.onPlacesUpdated.bind(this)}/>
        <Map center={this.state.center} places={this.state.places} onCenterChangeHandler={this.onCenterChangeHandler.bind(this)}/>
      </div>
    );
  }
}

export default App;
